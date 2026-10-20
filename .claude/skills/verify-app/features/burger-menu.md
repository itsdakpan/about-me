# Burger menu

- **Where:** `components/Header.tsx` (`nav#menu`).
- **Drive:** click `button[aria-label="Menu"]`; click a link by text; press Escape.
- **Proof:** opening sets `aria-expanded="true"` and shows `nav#menu`. A link click closes it;
  Experience and Projects switch to Work, Back Story switches to Play, Contact jumps to the footer.
  Escape closes it. Projects jumps to `#projects` in the Work view; `#story` only exists once the
  Play ticket lands, until then that jump is a no-op.
