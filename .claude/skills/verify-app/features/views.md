# Work and Play views

- **Where:** `components/WorkView.tsx` and `components/PlayView.tsx`, mounted one at a time by
  `components/SiteShell.tsx` inside `[data-view]`. Shared section primitives (`Section`, `Label`,
  `Big`, `Intro`) live in `components/ui/Section.tsx`.
- **Drive:** toggle or menu (see header-toggle.md, burger-menu.md); load `/#play` or `/#story`.
- **Work proof:** `section#work` holds the "What I've been doing" headline, intro and 3 rows
  (`#work .job`); `section#projects` holds 4 cards (`#projects a.proj`, 2 columns above 700px,
  1 column at 390px) and 11 chips (`#projects .stack span`). The menu's Projects link switches
  to Work and jumps to `#projects` (the page bottoms out ~85px short at 1440×900, same as the
  reference). `drive.mjs` checks all of this.
- **Play proof:** see play-view.md (back story, pull quote, interests, 6 facts, `/#story`).
