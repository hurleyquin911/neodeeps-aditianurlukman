"use client";

import { useRef, useState } from "react";
import {
  formatPrice,
  productKinds,
  products,
  productsByKind,
  type DigitalProduct,
} from "@/lib/products";
import { accentStyle } from "@/lib/accents";
import { useLiftHover, useReveal } from "@/lib/motion";
import { ProductDetailModal } from "@/components/ui/ProductDetailModal";

function ProductCard({
  product,
  index,
  onOpen,
}: {
  product: DigitalProduct;
  index: number;
  onOpen: (product: DigitalProduct) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onOpen(product)}
      style={accentStyle(index + 1)}
      className="js-lift reveal tint group flex h-full w-full flex-col overflow-hidden rounded-[1.4rem] text-left transition-[box-shadow,transform] hover:shadow-[0_20px_48px_-28px_rgba(23,23,23,0.35)]"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-[color-mix(in_oklab,var(--accent)_12%,var(--void))]">
        {product.cover ? (
          <img
            src={product.cover}
            alt=""
            className="absolute inset-0 size-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-display text-5xl font-bold tracking-[-0.04em] text-cream/20">
              {product.name.slice(0, 1)}
            </span>
          </div>
        )}
        <div className="absolute inset-x-0 top-0 flex items-start justify-between gap-2 p-4">
          <span className="rounded-full border border-white/20 bg-black/45 px-2.5 py-1 font-mono text-[11px] text-white backdrop-blur-sm">
            {product.kind}
          </span>
          <span className="rounded-full border border-white/20 bg-black/45 px-2.5 py-1 text-[11px] text-white backdrop-blur-sm">
            Detail
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5 md:p-6">
        <h2 className="font-display text-2xl font-bold tracking-[-0.03em]">
          {product.name}
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-stone">{product.summary}</p>

        <div className="mt-auto flex items-end justify-between gap-3 border-t border-line pt-5">
          <div>
            <p className="font-display text-xl font-bold tracking-[-0.02em]">
              {formatPrice(product.price)}
            </p>
            <p className="mt-0.5 text-xs text-stone">{product.priceNote}</p>
          </div>
          <span className="text-sm font-medium text-cream underline-offset-4 group-hover:underline">
            Lihat detail
          </span>
        </div>
      </div>
    </button>
  );
}

export function Products() {
  const rootRef = useRef<HTMLElement>(null);
  const [kind, setKind] =
    useState<(typeof productKinds)[number]>("Semua");
  const [selected, setSelected] = useState<DigitalProduct | null>(null);
  useReveal(rootRef);
  useLiftHover(rootRef);

  const list = productsByKind(kind);

  return (
    <>
      <article
        ref={rootRef}
        id="products"
        className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24"
      >
        <p className="reveal kicker" style={accentStyle(2)}>
          Products
        </p>
        <div className="mt-5 flex flex-wrap items-end justify-between gap-4">
          <h1 className="reveal font-display max-w-3xl text-[clamp(2.1rem,5vw,3.4rem)] font-semibold tracking-[-0.03em]">
            Produk <span className="text-spectrum">digital</span> NEODEEPS
          </h1>
          <p
            className="reveal chip rounded-full px-3 py-1 font-mono text-sm"
            style={accentStyle(3)}
          >
            {String(products.length).padStart(2, "0")} produk
          </p>
        </div>
        <p className="reveal mt-4 max-w-2xl text-base leading-relaxed text-stone md:text-lg">
          Saya menyediakan berbagai software, website, dan platform digital yang
          bisa langsung digunakan, lengkap dengan harga dan detail setiap
          layanan. Klik kartu untuk melihat fitur, isi paket, dan cara pemesanan.
          Untuk melihat hasil pekerjaan kami sebelumnya, silakan kunjungi halaman
          portofolio.
        </p>

        <div className="reveal mt-8 flex flex-wrap gap-2">
          {productKinds.map((item, index) => {
            const active = kind === item;
            return (
              <button
                key={item}
                type="button"
                onClick={() => setKind(item)}
                style={accentStyle(index)}
                className={`rounded-full px-3.5 py-1.5 text-sm transition-colors ${
                  active
                    ? "bg-cream text-white"
                    : "chip hover:border-cream/40 hover:text-cream"
                }`}
              >
                {item}
              </button>
            );
          })}
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
          {list.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              index={index}
              onOpen={setSelected}
            />
          ))}
        </div>

        {list.length === 0 ? (
          <p className="reveal mt-10 text-sm text-stone">
            Belum ada produk di kategori ini.
          </p>
        ) : null}
      </article>

      <ProductDetailModal
        product={selected}
        onClose={() => setSelected(null)}
      />
    </>
  );
}
