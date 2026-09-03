import { SiteFrame } from "@/components/layout/SiteFrame";
import { Hero } from "@/components/sections/Hero";
import { HomeBoard } from "@/components/sections/HomeBoard";

export default function Home() {
  return (
    <SiteFrame>
      <Hero />
      <HomeBoard />
    </SiteFrame>
  );
}
