import type { Metadata } from "next";
import { SiteFrame } from "@/components/layout/SiteFrame";
import { PortfolioList } from "@/components/project/PortfolioList";

export const metadata: Metadata = {
  title: "Portofolio",
  description:
    "Daftar lengkap proyek Aditia Nur Lukman - tampilan, flow, dan deskripsi presentasi setiap karya.",
};

export default function PortfolioPage() {
  return (
    <SiteFrame>
      <PortfolioList />
    </SiteFrame>
  );
}
