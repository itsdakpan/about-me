---
name: verify-app
description: Launch the About Me Next.js site locally and drive it like a user (toggle, burger menu, hash routes, footer links) at 1440px and 390px, capturing screenshots and state as evidence. Use to prove a change to the site works in the real app.
---

# verify-app

Proves the About Me site works by running it and driving it in headless Chromium.
Everything runs from the repo root. Scratch output goes under `.fredrin/tmp/verify/`.

## Doctor (read-only)

Run before Launch; fix anything red first.

```sh
node -v            # Next.js 16 needs >= 20.9
npm -v
test -d node_modules && echo "node_modules ok" || echo "run npm install"
lsof -iTCP:3100 -sTCP:LISTEN || echo "port 3100 free"
npm run build      # dry check: must exit 0
```

## Launch

```sh
npm install
mkdir -p .fredrin/tmp
npx next dev -p 3100 > .fredrin/tmp/verify-dev.log 2>&1 &
echo $! > .fredrin/tmp/verify-dev.pid
until curl -sf http://localhost:3100/ | grep -q "Hi, I&#x27;m Dylan\|Hi, I'm Dylan"; do sleep 1; done
```

Port 3100 is used throughout; if it is busy, pick another and use it in every block.
Ready means `curl -sf http://localhost:3100/` returns HTML containing "Hi, I'm Dylan"
(React escapes the apostrophe as `&#x27;`).

## Drive

The driver needs Playwright. Install it without touching `package.json` or the lockfile,
and fetch Chromium if it isn't cached:

```sh
npm install --no-save playwright@1.63.0
npx playwright install chromium
node .claude/skills/verify-app/drive.mjs http://localhost:3100 .fredrin/tmp/verify
```

`drive.mjs` uses real selectors only:

- toggle buttons by role + text: `work`, `play` (state in `aria-pressed`)
- burger: `button[aria-label="Menu"]` (state in `aria-expanded`); the menu is `nav#menu`
- menu links by text: Experience, Projects, Back Story, Contact
- footer links: `footer a[aria-label="LinkedIn|GitHub|Email"]`
- the mounted view: `[data-view]` wrapper, holding `section#work` or `section#play`
- routes: `/`, `/#play` and `/#story`
- viewports: 1440×900 and 390×844, full-page screenshots

It exits non-zero if any step fails. Extend it when a feature below changes.

## Evidence

`drive.mjs` prints JSON: one entry per step with `ok` and the resulting state
(which toggle has `aria-pressed=true`, which view is mounted, menu visibility,
`scrollWidth`, the photo's natural size), the list of failures, and the screenshot paths:

- `.fredrin/tmp/verify/home-1440.png`, `home-390.png`: full page
- `.fredrin/tmp/verify/menu-open-1440.png`: menu open

Compare the screenshots by eye against the approved mockups (`desktop.png`,
`mobile.png`, `footer.png` on ticket ABOU-C5G7C5). On a Fredrin ticket, upload them
with `./.fredrin/fredrin ticket upload <file> --kind after --pair <screen-slug>`.

## Cleanup

Kill only the dev server this skill started, and keep the screenshots:

```sh
kill "$(cat .fredrin/tmp/verify-dev.pid)" && rm .fredrin/tmp/verify-dev.pid
```

## Feature map

One file per feature under `features/`: what it does, how to drive it, what proves it.

- [header-toggle.md](features/header-toggle.md): work/play toggle
- [burger-menu.md](features/burger-menu.md): burger and dropdown menu
- [hero.md](features/hero.md): headline, face photo, pill, lede, floating squares
- [footer.md](features/footer.md): social icons and copyright
- [views.md](features/views.md): Work and Play views (placeholders until their tickets land)
