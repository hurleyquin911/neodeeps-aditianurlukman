import { SiteFrame } from "@/components/layout/SiteFrame";
import { Hero } from "@/components/sections/Hero";
import { HomeBoard } from "@/components/sections/HomeBoard";
import { SkillMarquee } from "@/components/sections/SkillMarquee";

export default function Home() {
  return (
    <SiteFrame>
      <Hero />
      <SkillMarquee />
      <HomeBoard />
    </SiteFrame>
  );
}
