# Play view

- **Where:** `components/PlayView.tsx` (`div#play`), built on the section primitives in
  `components/ui/Section.tsx`. Copy is verbatim from the `<!-- PLAY -->` block of
  `design/reference.html`.
- **Blocks, in order:** "Me in a nutshell"; `section#story` (h2 "Back Story." + four
  paragraphs, links to the hackathon site and a mailto); the italic pull quote band;
  "On the other side"; "Random facts" (six facts, each a `span[aria-hidden]` ✓ badge).
- **Drive:** click the `play` toggle; load `/#story`; or open the burger and click
  **Back Story** from the Work view.
- **Proof:** `drive.mjs` checks the heading, six facts, 2 columns for the story and facts
  grids at 1440px and 1 column at 390px, `scrollWidth <= width`, and that the Back Story
  heading is in the viewport after `/#story` and after the menu link. Screenshots:
  `play-1440.png`, `play-390.png` (full page) and `story-1440.png` (`/#story`).
- **Compare:** against the reference rendered in a browser (open
  `design/reference.html` and call `show('play')`).
