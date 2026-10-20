import { Big, Intro, Label, Section } from "@/components/ui/Section";

// Copy and links from the WORK block of design/reference.html.
const jobs = [
  {
    title: "Software Developer, freelance",
    dates: "2025 to 2026",
    summary: "Web apps and workflow automations for small businesses.",
  },
  {
    title: "Electrical Engineer, Proseal",
    dates: "2024 to 2025",
    summary:
      "Worked on 15+ automated packaging machines and cut 12+ hours of downtime a week.",
  },
  {
    title: "Deployment Engineer, Automata",
    dates: "2023 to 2024",
    summary: "Took 5 lab automation systems from build to deployment.",
  },
];

const projects = [
  {
    name: "Care Companion",
    href: "https://itsdakpan.github.io/cursor-hackathon-salaya",
    summary:
      "AI check-ins and medication reminders for an older relative. Built in 2.5 hours, 1st of 22 teams at the Cursor Hackathon Bangkok.",
  },
  {
    name: "PaceLog",
    href: "https://pacelog-pai11.vercel.app",
    summary:
      "Running diary with streaks and race predictions. Rails API, React.",
  },
  {
    name: "21 Days Later",
    href: "https://two1-days-later.onrender.com",
    summary: "Group habit tracker on a shared board. Rails, Hotwire, Postgres.",
  },
  {
    name: "Power-Share",
    href: "https://power-share-sgq3.onrender.com",
    summary: "Booking marketplace with dates, reviews and listings. Rails 8.",
  },
];

const stack = [
  "TypeScript",
  "JavaScript",
  "React",
  "Next.js",
  "Ruby on Rails",
  "PostgreSQL",
  "Tailwind",
  "n8n",
  "Claude Code",
  "Cursor",
  "Git",
];

export default function WorkView() {
  return (
    <>
      <Section id="work">
        <Label>What I&apos;ve been doing</Label>
        <Big>
          I&apos;ve always loved building things. These days I just do it{" "}
          <em>from a laptop</em>.
        </Big>
        <Intro>
          Before code, I worked on lab automation equipment and factory
          machines. Then, almost by chance, I got into coding, and I loved it
          straight away. It felt like engineering: you&apos;re still building
          things. But doing it from a laptop was easier, more fun, and it
          brought out a creative side I didn&apos;t always get to use in a
          factory or a lab.
        </Intro>
        <div className="mt-[26px] border-t border-line">
          {jobs.map((job) => (
            <div
              key={job.title}
              className="job grid grid-cols-[1fr_auto] gap-x-5 gap-y-1.5 border-b border-line py-[22px]"
            >
              <b className="text-[18px] font-semibold">{job.title}</b>
              <small className="text-[length:smaller] text-soft">{job.dates}</small>
              <p className="col-span-full text-[#444]">{job.summary}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section id="projects">
        <Label>Things I&apos;ve built</Label>
        <div className="mt-[26px] grid grid-cols-2 gap-[18px] max-[700px]:grid-cols-1">
          {projects.map((project) => (
            <a
              key={project.name}
              href={project.href}
              className="proj rounded-[18px] bg-white p-[22px] no-underline shadow-[0_4px_14px_#0000000a] transition-all duration-200 ease-[ease] hover:-translate-y-[3px]"
            >
              <b className="text-[21px] font-semibold">{project.name}</b>
              <p className="mt-1.5 text-[15px] text-soft">{project.summary}</p>
            </a>
          ))}
        </div>
        <div className="stack mt-5 flex flex-wrap gap-2.5">
          {stack.map((tool) => (
            <span
              key={tool}
              className="rounded-[20px] border border-line bg-white px-3.5 py-1.5 text-[14px]"
            >
              {tool}
            </span>
          ))}
        </div>
      </Section>
    </>
  );
}
