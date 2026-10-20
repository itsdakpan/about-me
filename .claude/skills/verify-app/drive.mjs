// Drives the running About Me site like a user and prints JSON evidence.
// Usage: node .claude/skills/verify-app/drive.mjs <baseUrl> <outDir>
import { mkdirSync } from "node:fs";
import { chromium } from "playwright";

const [baseUrl = "http://localhost:3000", outDir = ".fredrin/tmp/verify"] =
  process.argv.slice(2);
mkdirSync(outDir, { recursive: true });

const evidence = { baseUrl, steps: [], screenshots: [], failures: [] };
const expect = (name, ok, detail) => {
  evidence.steps.push({ name, ok, ...detail });
  if (!ok) evidence.failures.push(name);
};

const browser = await chromium.launch();

async function openPage(width, height, path = "/") {
  const page = await browser.newPage({ viewport: { width, height } });
  await page.goto(baseUrl + path, { waitUntil: "load", timeout: 180_000 });
  await page.waitForSelector("h1");
  // Wait for React to hydrate the header, so clicks and hash state are live.
  await page.waitForFunction(() => {
    const burger = document.querySelector('button[aria-label="Menu"]');
    return !!burger && Object.keys(burger).some((k) => k.startsWith("__react"));
  });
  await page.evaluate(() => document.fonts.ready);
  return page;
}

const state = (page) =>
  page.evaluate(() => {
    const pressed = [...document.querySelectorAll("header button[aria-pressed]")]
      .filter((b) => b.getAttribute("aria-pressed") === "true")
      .map((b) => b.textContent);
    const menu = document.getElementById("menu");
    return {
      pressed,
      view: document.querySelector("[data-view]")?.getAttribute("data-view"),
      mountedSection: document.querySelector("[data-view] > [id]")?.id,
      menuVisible: !!menu && getComputedStyle(menu).display !== "none",
      burgerExpanded: document
        .querySelector('button[aria-label="Menu"]')
        ?.getAttribute("aria-expanded"),
      scrollWidth: document.documentElement.scrollWidth,
    };
  });

// Play view: blocks present, column counts, and where the Back Story heading sits.
const playState = (page) =>
  page.evaluate(() => {
    const story = document.querySelector("#story h2");
    const cols = (el) =>
      el ? getComputedStyle(el).gridTemplateColumns.split(" ").length : 0;
    const top = story?.getBoundingClientRect().top ?? -1;
    return {
      storyHeading: story?.textContent,
      storyInViewport: top >= 0 && top < window.innerHeight,
      storyColumns: cols(document.querySelector("#story > div")),
      facts: document.querySelectorAll("#play .grid > div:has(> span[aria-hidden])").length,
      factColumns: cols(document.querySelector("#play section:last-child .grid")),
      pullQuote: document.querySelector("#play em")?.closest("div")?.textContent,
      scrollWidth: document.documentElement.scrollWidth,
    };
  });

for (const [width, height] of [
  [1440, 900],
  [390, 844],
]) {
  const page = await openPage(width, height);
  const s = await state(page);
  const file = `${outDir}/home-${width}.png`;
  await page.screenshot({ path: file, fullPage: true });
  evidence.screenshots.push(file);
  expect(`no horizontal scroll at ${width}px`, s.scrollWidth <= width, {
    scrollWidth: s.scrollWidth,
  });
  const text = await page.textContent("h1");
  expect(`headline at ${width}px`, text?.includes("Hi, I'm Dylan"), { text });
  const photo = await page.$eval('h1 img[alt="Dylan"]', (img) => ({
    naturalWidth: img.naturalWidth,
    naturalHeight: img.naturalHeight,
  }));
  expect(`face photo upright at ${width}px`, photo.naturalHeight > photo.naturalWidth, photo);
  const work = await page.evaluate(() => {
    const cards = [...document.querySelectorAll("#projects a.proj")];
    return {
      jobs: document.querySelectorAll("#work .job").length,
      projects: cards.length,
      chips: document.querySelectorAll("#projects .stack span").length,
      projectColumns: new Set(cards.map((a) => Math.round(a.getBoundingClientRect().left))).size,
      hrefs: cards.map((a) => a.getAttribute("href")),
    };
  });
  expect(
    `Work view has 3 jobs, 4 projects, 11 chips at ${width}px`,
    work.jobs === 3 && work.projects === 4 && work.chips === 11,
    work,
  );
  expect(
    `project grid has ${width > 700 ? 2 : 1} column(s) at ${width}px`,
    work.projectColumns === (width > 700 ? 2 : 1),
    work,
  );

  await page.getByRole("button", { name: "play", exact: true }).click();
  await page.waitForSelector("#story");
  const p = await playState(page);
  const columns = width > 700 ? 2 : 1;
  expect(
    `Play view blocks at ${width}px`,
    p.storyHeading === "Back Story." &&
      p.facts === 6 &&
      p.storyColumns === columns &&
      p.factColumns === columns &&
      p.scrollWidth <= width,
    p,
  );
  const playFile = `${outDir}/play-${width}.png`;
  await page.screenshot({ path: playFile, fullPage: true });
  evidence.screenshots.push(playFile);
  await page.close();
}

const page = await openPage(1440, 900);
expect("defaults to work", (await state(page)).view === "work", await state(page));

await page.getByRole("button", { name: "play", exact: true }).click();
let s = await state(page);
expect("play toggle mounts Play view", s.view === "play" && s.pressed[0] === "play", s);

await page.getByRole("button", { name: "work", exact: true }).click();
s = await state(page);
expect("work toggle restores Work view", s.view === "work" && s.pressed[0] === "work", s);

await page.click('button[aria-label="Menu"]');
s = await state(page);
expect("burger opens menu", s.menuVisible && s.burgerExpanded === "true", s);
await page.screenshot({ path: `${outDir}/menu-open-1440.png` });
evidence.screenshots.push(`${outDir}/menu-open-1440.png`);

await page.getByRole("link", { name: "Back Story" }).click();
s = await state(page);
expect("menu link closes menu and switches view", !s.menuVisible && s.view === "play", s);
await page.waitForTimeout(500);
const fromMenu = await playState(page);
expect("Back Story link scrolls to the story", fromMenu.storyInViewport, fromMenu);

await page.click('button[aria-label="Menu"]');
await page.getByRole("link", { name: "Projects" }).click();
await page.waitForTimeout(500);
s = await state(page);
// #projects sits near the bottom, so the jump can stop at max scroll (as in the reference).
const jump = await page.evaluate(() => ({
  projectsTop: document.getElementById("projects")?.getBoundingClientRect().top,
  scrollY: window.scrollY,
  maxScroll: document.documentElement.scrollHeight - window.innerHeight,
}));
expect(
  "Projects link switches to Work and scrolls #projects into view",
  s.view === "work" && s.pressed[0] === "work" && jump.projectsTop !== undefined &&
    jump.projectsTop >= -5 && jump.projectsTop < 900 &&
    (Math.abs(jump.projectsTop) < 5 || Math.abs(jump.scrollY - jump.maxScroll) < 2),
  { ...s, ...jump },
);
await page.screenshot({ path: `${outDir}/projects-link-1440.png` });
evidence.screenshots.push(`${outDir}/projects-link-1440.png`);

await page.click('button[aria-label="Menu"]');
await page.keyboard.press("Escape");
s = await state(page);
expect("Escape closes menu", !s.menuVisible && s.burgerExpanded === "false", s);

for (const label of ["LinkedIn", "GitHub", "Email"]) {
  const href = await page.getAttribute(`footer a[aria-label="${label}"]`, "href");
  expect(`footer ${label} link`, !!href, { href });
}
await page.close();

for (const hash of ["#play", "#story"]) {
  const playPage = await openPage(1440, 900, "/" + hash);
  // The hash view is applied in the render pass right after hydration.
  await playPage
    .waitForSelector('[data-view="play"]', { timeout: 5000 })
    .catch(() => {});
  s = await state(playPage);
  expect(`/${hash} opens on Play`, s.view === "play" && s.pressed[0] === "play", s);
  if (hash === "#story") {
    await playPage.waitForTimeout(500);
    const p = await playState(playPage);
    expect("/#story shows the Back Story heading", p.storyInViewport, p);
    await playPage.screenshot({ path: `${outDir}/story-1440.png` });
    evidence.screenshots.push(`${outDir}/story-1440.png`);
  }
  await playPage.close();
}

await browser.close();
console.log(JSON.stringify(evidence, null, 2));
process.exit(evidence.failures.length ? 1 : 0);
