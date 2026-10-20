# Work and Play views

- **Where:** `components/WorkView.tsx` (`section#work`) and `components/PlayView.tsx` (`section#play`),
  mounted one at a time by `components/SiteShell.tsx` inside `[data-view]`.
- **Drive:** toggle or menu (see header-toggle.md, burger-menu.md); load `/#play` or `/#story`.
- **Proof today:** each shows a dashed "… view placeholder (next ticket)" box.
- **Extend:** ABOU-PJ7E80 (Work) and ABOU-Y1X7TQ (Play) replace the placeholders. Add their
  sections and selectors here and to `drive.mjs` when they land.
