import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import PlayView from "@/components/PlayView";
import SiteShell from "@/components/SiteShell";
import WorkView from "@/components/WorkView";

export default function Home() {
  return (
    <SiteShell
      hero={<Hero />}
      work={<WorkView />}
      play={<PlayView />}
      footer={<Footer />}
    />
  );
}
