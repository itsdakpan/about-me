import type { ReactNode } from "react";

// Section primitives shared by the Work and Play views (design/reference.html:
// section, .label, .big, .intro).

export function Section({ id, children }: { id?: string; children: ReactNode }) {
  return (
    <section id={id} className="mx-auto max-w-[900px] scroll-mt-[96px] px-6 py-[70px] max-[700px]:scroll-mt-[84px]">
      {children}
    </section>
  );
}

export function Label({ children }: { children: ReactNode }) {
  return (
    <div className="text-[12px] font-semibold tracking-[3px] text-warm uppercase">
      {children}
    </div>
  );
}

// Wrap highlighted words in <em> to colour them warm.
export function Big({ children }: { children: ReactNode }) {
  return (
    <div className="mt-2.5 text-[clamp(28px,4.2vw,42px)] leading-[1.2] font-normal tracking-[-0.5px] [&_em]:text-warm">
      {children}
    </div>
  );
}

export function Intro({ children }: { children: ReactNode }) {
  return (
    <p className="mt-5 max-w-[680px] text-[18px] leading-[1.7] text-[#555]">
      {children}
    </p>
  );
}
