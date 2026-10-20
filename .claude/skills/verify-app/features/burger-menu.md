# Burger menu

- **Where:** `components/Header.tsx` (`nav#menu`).
- **Drive:** click `button[aria-label="Menu"]`; click a link by text; press Escape.
- **Proof:** opening sets `aria-expanded="true"` and shows `nav#menu`. A link click closes it;
  Experience and Projects switch to Work, Back Story switches to Play, Contact jumps to the footer.
  Escape closes it. Target anchors (`#projects`, `#story`) only exist once the Work/Play tickets land;
  until then the jump is a no-op.
