# Header toggle (work / play)

- **Where:** `components/Header.tsx`, state in `components/SiteShell.tsx`.
- **Drive:** click the `work` / `play` buttons (`getByRole("button", { name: "play", exact: true })`).
- **Proof:** the clicked button has `aria-pressed="true"` and the white "on" pill;
  `[data-view]` switches to `work` / `play` and the view fades in. Work is the default.
- **Mobile (≤700px):** header padding 14px 16px, toggle buttons 7px 16px; avatar, toggle and burger fit at 390px.
