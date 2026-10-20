"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export type View = "work" | "play";

const menuLinks: { href: string; label: string; view?: View }[] = [
  { href: "#top", label: "Experience", view: "work" },
  { href: "#projects", label: "Projects", view: "work" },
  { href: "#story", label: "Back Story", view: "play" },
  { href: "#contact", label: "Contact" },
];

type Props = {
  view: View;
  onViewChange: (view: View) => void;
};

export default function Header({ view, onViewChange }: Props) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Start from the current position, so a page loaded mid-scroll (/#story,
  // back/forward) shows the background straight away.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 0);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  const show = (next: View) => {
    onViewChange(next);
    setMenuOpen(false);
  };

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-10 flex items-center justify-between px-7 py-5 transition-[background-color,backdrop-filter] duration-200 max-[700px]:px-4 max-[700px]:py-3.5 ${
          scrolled ? "bg-bg/80 backdrop-blur-md" : "bg-transparent"
        }`}
      >
        <div className="size-[54px] overflow-hidden rounded-full border-[3px] border-white bg-white shadow-[0_0_0_2px_#2b2b2b22,0_6px_18px_#0000001a]">
          <Image
            src="/memoji.jpg"
            alt="Dylan"
            width={96}
            height={96}
            priority
            className="size-full scale-[1.15] rounded-full object-cover"
          />
        </div>

        <div className="flex rounded-[30px] bg-[#e8e4dd] p-[5px] shadow-[0_6px_18px_#0000000f]">
          {(["work", "play"] as const).map((option) => {
            const on = view === option;
            return (
              <button
                key={option}
                type="button"
                aria-pressed={on}
                onClick={() => show(option)}
                className={`cursor-pointer rounded-3xl px-[22px] py-2 text-[15px] transition-all duration-250 ease-[ease] max-[700px]:px-4 max-[700px]:py-[7px] ${
                  on
                    ? "bg-white font-bold text-ink shadow-[0_2px_6px_#0000001a]"
                    : "text-[#888]"
                }`}
              >
                {option}
              </button>
            );
          })}
        </div>

        <button
          type="button"
          aria-label="Menu"
          aria-expanded={menuOpen}
          aria-controls="menu"
          onClick={() => setMenuOpen((open) => !open)}
          className="flex size-12 cursor-pointer items-center justify-center rounded-full bg-card text-2xl shadow-[0_6px_18px_#0000001a]"
        >
          ☰
        </button>
      </header>

      <nav
        id="menu"
        hidden={!menuOpen}
        className="fixed top-20 right-7 z-11 min-w-[180px] rounded-2xl bg-white py-3.5 shadow-[0_10px_30px_#00000022]"
      >
        {menuLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            onClick={() => (link.view ? show(link.view) : setMenuOpen(false))}
            className="block px-[22px] py-2 no-underline hover:bg-bg"
          >
            {link.label}
          </a>
        ))}
      </nav>
    </>
  );
}
