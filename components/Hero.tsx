import Image from "next/image";
import type { CSSProperties } from "react";

// Floating squares, copied from design/reference.html.
const squares: CSSProperties[] = [
  { width: 22, height: 22, top: "22%", left: "14%" },
  { width: 34, height: 34, top: "30%", right: "18%", animationDelay: "-3s" },
  { width: 14, height: 14, top: "62%", left: "22%", animationDelay: "-5s" },
  { width: 26, height: 26, top: "70%", right: "12%", animationDelay: "-2s" },
  { width: 12, height: 12, top: "18%", left: "58%", animationDelay: "-7s" },
  {
    width: 40,
    height: 40,
    top: "52%",
    left: "7%",
    animationDelay: "-4s",
    opacity: 0.6,
  },
];

export default function Hero() {
  return (
    <div
      id="top"
      className="relative flex min-h-screen flex-col items-center justify-center px-4 text-center"
    >
      {squares.map((style, i) => (
        <div
          key={i}
          aria-hidden
          style={style}
          className="absolute animate-float rounded-[22%] bg-[#d6d0c5] max-[700px]:opacity-50"
        />
      ))}

      <h1 className="relative z-1 flex flex-wrap items-center justify-center gap-3.5 text-[clamp(40px,8vw,84px)] font-extrabold tracking-[-2px]">
        <span className="hero-title">Hi, I&apos;m Dylan</span>
        <span className="face relative inline-block size-[clamp(56px,9vw,86px)] rounded-full">
          <span className="absolute inset-0 overflow-hidden rounded-full bg-[#8a6a55]">
            <Image
              src="/dylan.jpg"
              alt="Dylan"
              width={1050}
              height={1400}
              priority
              sizes="310px"
              className="absolute top-[-200%] left-[-127%] w-[350%] max-w-none"
            />
          </span>
        </span>
      </h1>

      <div className="relative z-1 mt-[22px] inline-flex items-center gap-2 rounded-[30px] bg-white px-[18px] py-[7px] text-[15px] text-soft shadow-[0_4px_14px_#0000000d]">
        <i className="size-2 animate-pulse-dot rounded-full bg-[#3cb371]" />
        working remotely, open to anywhere
      </div>

      <p className="relative z-1 mt-3.5 max-w-[560px] text-lg text-soft">
        Ex mechanical engineer, now a developer. I build web apps and AI
        automations.
      </p>
    </div>
  );
}
