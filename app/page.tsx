import { ClientShell } from "@/components/providers/ClientShell";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Marquee } from "@/components/sections/Marquee";
import { About } from "@/components/sections/About";
import { Work } from "@/components/sections/Work";
import { Services } from "@/components/sections/Services";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <ClientShell>
      <a
        href="#work"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-[120] focus:bg-acid focus:px-3 focus:py-2 focus:text-void"
      >
        Lewati ke konten
      </a>
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Work />
        <Services />
        <Contact />
      </main>
      <Footer />
    </ClientShell>
  );
}
