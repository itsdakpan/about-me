"use client";

import { useState, useSyncExternalStore, type ReactNode } from "react";
import Header, { type View } from "@/components/Header";

function subscribeToHash(onChange: () => void) {
  window.addEventListener("hashchange", onChange);
  return () => window.removeEventListener("hashchange", onChange);
}

// Like the reference script: /#play and /#story open on the Play view.
function viewFromHash(): View {
  const hash = window.location.hash;
  return hash === "#play" || hash === "#story" ? "play" : "work";
}

type Props = {
  hero: ReactNode;
  work: ReactNode;
  play: ReactNode;
  footer: ReactNode;
};

export default function SiteShell({ hero, work, play, footer }: Props) {
  const hashView = useSyncExternalStore(
    subscribeToHash,
    viewFromHash,
    (): View => "work",
  );
  // A click on the toggle or a menu link wins over the hash.
  const [chosenView, setChosenView] = useState<View | null>(null);
  const view = chosenView ?? hashView;

  return (
    <>
      <Header view={view} onViewChange={setChosenView} />
      {hero}
      <div key={view} className="animate-fade" data-view={view}>
        {view === "work" ? work : play}
      </div>
      {footer}
    </>
  );
}
