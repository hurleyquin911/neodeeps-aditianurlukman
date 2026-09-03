import type { Metadata } from "next";
import { SiteFrame } from "@/components/layout/SiteFrame";
import { Services } from "@/components/sections/Services";

export const metadata: Metadata = {
  title: "Layanan",
  description:
    "Layanan NEODEEPS: fullstack development, aplikasi Android, product & UI design, serta renewal dan maintenance sistem.",
};

export default function LayananPage() {
  return (
    <SiteFrame>
      <Services />
    </SiteFrame>
  );
}
