import { SiteFrame } from "@/components/layout/SiteFrame";
import { Hero } from "@/components/sections/Hero";
import { HomeBoard } from "@/components/sections/HomeBoard";
import { StackIndex } from "@/components/sections/StackIndex";

export default function Home() {
  return (
    <SiteFrame>
      <Hero />
      <StackIndex />
      <HomeBoard />
    </SiteFrame>
  );
}
