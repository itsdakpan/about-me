# about-me

About Me page built with Fredrin. A static Next.js (App Router) site with TypeScript,
Tailwind CSS and the Fraunces font. `design/reference.html` is the design source of truth.

## Run locally

```sh
npm install
npm run dev     # http://localhost:3000
```

Other scripts: `npm run build`, `npm run start`, `npm run lint`.

## Deploy

Deploy on Vercel with the **Next.js** framework preset and no extra settings: Vercel builds
a preview per branch and production on merge. The site is fully static, with no database,
env vars or API keys.

## Verify

The `verify-app` skill (`.claude/skills/verify-app/`) launches the site and drives it in a
headless browser at desktop and phone widths.
