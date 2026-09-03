import type { Metadata } from "next";
import { SiteFrame } from "@/components/layout/SiteFrame";
import { Contact } from "@/components/sections/Contact";

export const metadata: Metadata = {
  title: "Kontak",
  description:
    "Hubungi Aditia Nur Lukman / NEODEEPS untuk proyek website, dashboard, aplikasi, atau desain.",
};

export default function KontakPage() {
  return (
    <SiteFrame>
      <Contact />
    </SiteFrame>
  );
}
