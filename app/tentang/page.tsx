import type { Metadata } from "next";
import { SiteFrame } from "@/components/layout/SiteFrame";
import { About } from "@/components/sections/About";

export const metadata: Metadata = {
  title: "Tentang",
  description:
    "Tentang Aditia Nur Lukman / NEODEEPS - creative developer dan UI designer di Jakarta.",
};

export default function TentangPage() {
  return (
    <SiteFrame>
      <About />
    </SiteFrame>
  );
}
