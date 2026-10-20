# Burger menu

- **Where:** `components/Header.tsx` (`nav#menu`).
- **Drive:** click `button[aria-label="Menu"]`; click a link by text; press Escape.
- **Proof:** opening sets `aria-expanded="true"` and shows `nav#menu`. A link click closes it;
  Experience and Projects switch to Work, Back Story switches to Play, Contact jumps to the footer.
  Escape closes it. Projects jumps to `#projects` in the Work view; `#story` only exists once the
  Play ticket lands, until then that jump is a no-op.

## Anchor offset and scrolled header

- **Where:** `scroll-mt-[96px] max-[700px]:scroll-mt-[84px]` on `Section` (`components/ui/Section.tsx`),
  `div#play` and `footer#contact`; the scrolled state in `components/Header.tsx`.
- **Drive:** at 1440×900 and 390×844, use the menu's Projects, Back Story and Contact links, and load
  `/#projects` and `/#story` directly.
- **Proof:** the target's first heading or label (`#projects > div`, `#story h2`, `#contact a`) has
  `getBoundingClientRect().top` ≥ `header.getBoundingClientRect().bottom` (94px desktop, 82px at ≤700px).
  At scrollY 0 the header's computed `backdropFilter` is `none` and its background transparent; once
  scrolled it is `blur(12px)` over the page colour at 80% (`--color-bg` / 0.8).
