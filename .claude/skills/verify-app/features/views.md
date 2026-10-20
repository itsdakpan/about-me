# Work and Play views

- **Where:** `components/WorkView.tsx` (`section#work`) and `components/PlayView.tsx` (`div#play`),
  mounted one at a time by `components/SiteShell.tsx` inside `[data-view]`.
- **Drive:** toggle or menu (see header-toggle.md, burger-menu.md); load `/#play` or `/#story`.
- **Proof today:** Work shows a dashed "Work view placeholder (next ticket)" box; Play is
  built (see play-view.md).
- **Extend:** ABOU-PJ7E80 (Work) replaces its placeholder. Add its sections and selectors
  here and to `drive.mjs` when it lands.
