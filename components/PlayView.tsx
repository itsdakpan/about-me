"use client";

import { useEffect } from "react";
import { Big, Intro, Label, Section } from "@/components/ui/Section";

// Copy from the PLAY block of design/reference.html.
const facts = [
  "My go-to coffee is a coconut Americano with caramel. Simple, really.",
  "I've been to 15 countries so far, and I'm nowhere near done.",
  "My favourite food is broccoli. Yes, really.",
  "My lucky number is 5.",
  "I'm fluent in Italian.",
  "I train BJJ and Muay Thai, so I'm happy standing up or on the ground.",
];

const storyLink = "text-warm underline";

// The view remounts on every toggle while the hash stays, so only jump on page load.
let jumpedToStory = false;

export default function PlayView() {
  // On /#story the browser jumps before this view mounts, so jump once here.
  useEffect(() => {
    if (!jumpedToStory && window.location.hash === "#story") {
      jumpedToStory = true;
      document.getElementById("story")?.scrollIntoView();
    }
  }, []);

  return (
    <div id="play">
      <Section>
        <Label>Me in a nutshell</Label>
        <Big>
          I&apos;m a son, a brother, a friend, an anime lover, a gamer, a coffee
          enthusiast, and an engineer who became a software developer.
        </Big>
      </Section>

      <Section id="story">
        <div className="grid grid-cols-[220px_1fr] gap-10 max-[700px]:grid-cols-1 max-[700px]:gap-2.5">
          <h2 className="text-[42px] leading-none font-normal">Back Story.</h2>
          <div className="text-[16.5px] text-[#444] [&_p]:mb-[18px]">
            <p>
              Since I was a kid, I knew what I wanted to be: an engineer.
              Building things just felt natural to me, so I spent years in
              school becoming one.
            </p>
            <p>
              Then I got there, and slowly realised it wasn&apos;t quite my
              calling. Engineering is slow. There are a lot of processes to
              follow, and not much room to be creative.
            </p>
            <p>
              Then I found code, and it unlocked a kind of creativity and flow
              I&apos;d never had before. You can make something real in a short
              time, especially now with AI, and once it&apos;s live, loads of
              people can use what you built. My team once built an app in two
              and a half hours and{" "}
              <a
                href="https://itsdakpan.github.io/cursor-hackathon-salaya"
                className={storyLink}
              >
                won a hackathon with it
              </a>
              .
            </p>
            <p>
              That&apos;s what I love about it. It&apos;s fulfilling, it&apos;s
              exciting, and I&apos;m still the kid who just wants to build
              things. The rest of the story&apos;s better over a coffee, so{" "}
              <a href="mailto:dakpan0593@gmail.com" className={storyLink}>
                come and say hi
              </a>
              .
            </p>
          </div>
        </div>
      </Section>

      <div className="mx-auto max-w-[900px] border-y border-line px-4 py-20 text-center">
        <div className="text-[clamp(34px,6vw,64px)] leading-[1.1] tracking-[-1px] italic [&_em]:text-warm">
          Still the kid who just wants to <em>build things</em>.
        </div>
      </div>

      <Section>
        <Label>On the other side</Label>
        <Big>
          Outside of code, I&apos;m a man of many interests. I run, I train{" "}
          <em>BJJ</em> and <em>Muay Thai</em>, and I love, love, love to{" "}
          <em>travel</em>.
        </Big>
        <Intro>
          I&apos;m big on self-development and I&apos;m always learning
          something new. And when I finally switch off, you&apos;ll find me deep
          in an anime, losing hours to a game, or hunting down a good cup of
          coffee.
        </Intro>
      </Section>

      <Section>
        <Label>Random facts</Label>
        <div className="mt-6 grid grid-cols-2 gap-x-10 gap-y-[18px] max-[700px]:grid-cols-1">
          {facts.map((fact) => (
            <div key={fact} className="flex gap-3">
              <span
                aria-hidden
                className="mt-[3px] flex size-[22px] flex-none items-center justify-center rounded-full bg-ink text-[12px] text-white"
              >
                ✓
              </span>
              {fact}
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}
