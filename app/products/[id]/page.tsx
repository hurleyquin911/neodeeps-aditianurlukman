import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteFrame } from "@/components/layout/SiteFrame";
import { ProductDetail } from "@/components/sections/ProductDetail";
import { getProductById, products } from "@/lib/products";

type ProductPageProps = {
  params: Promise<{ id: string }>;
};

/**
 * `output: "export"` menolak route dinamis tanpa satu pun path hasil
 * generateStaticParams. Selama katalog masih kosong, kita sediakan satu
 * path placeholder; begitu produk ditambahkan, placeholder ini hilang.
 */
const PLACEHOLDER_ID = "segera-hadir";

export function generateStaticParams() {
  if (products.length === 0) return [{ id: PLACEHOLDER_ID }];
  return products.map((product) => ({ id: product.id }));
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { id } = await params;
  const product = getProductById(id);
  if (!product) return { title: "Produk" };
  return {
    title: product.name,
    description: product.summary,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = getProductById(id);

  if (!product) {
    if (products.length === 0 && id === PLACEHOLDER_ID) {
      return (
        <SiteFrame>
          <section className="mx-auto max-w-3xl px-5 py-28 text-center md:px-8">
            <p className="kicker">Products</p>
            <h1 className="font-serif mt-5 text-[clamp(2rem,4.5vw,3.2rem)] leading-[1.1] text-cream">
              Produk belum <span className="italic">tersedia.</span>
            </h1>
            <p className="mx-auto mt-4 max-w-md text-stone">
              Katalog produk digital sedang disiapkan.
            </p>
            <Link href="/products" className="btn-secondary mt-8 inline-flex px-5 py-2.5 text-sm">
              Kembali ke Products
            </Link>
          </section>
        </SiteFrame>
      );
    }
    notFound();
  }

  return (
    <SiteFrame>
      <ProductDetail product={product} />
    </SiteFrame>
  );
}
