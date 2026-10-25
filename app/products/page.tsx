import type { Metadata } from "next";
import { SiteFrame } from "@/components/layout/SiteFrame";
import { Products } from "@/components/sections/Products";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Produk digital NEODEEPS dengan harga jelas: website lengkap, software, dan platform siap dipakai.",
};

export default function ProductsPage() {
  return (
    <SiteFrame>
      <Products />
    </SiteFrame>
  );
}
