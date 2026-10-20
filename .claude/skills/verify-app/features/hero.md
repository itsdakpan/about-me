# Hero

- **Where:** `components/Hero.tsx`, styles in `app/globals.css` (`.hero-title`, `.face::before`, keyframes).
- **Drive:** load `/` at 1440×900 and 390×844.
- **Proof:** full-viewport section with "Hi, I'm Dylan" in the grey→ink gradient, the face photo
  (`public/dylan.jpg`, cropped with width 350% / left -127% / top -200%) on a terracotta splash,
  the white pill with a pulsing green dot, the lede, and six floating squares (opacity .5 on phones).
  The photo must be upright: `naturalHeight > naturalWidth`.
- **Reduced motion:** squares and the dot stop animating.
