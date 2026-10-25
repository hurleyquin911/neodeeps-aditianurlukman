"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import {
  formatPrice,
  productImages,
  products,
  type DigitalProduct,
} from "@/lib/products";
import { site } from "@/lib/data";
import { accentStyle } from "@/lib/accents";
import { useLiftHover, useReveal } from "@/lib/motion";
import { Magnetic } from "@/components/ui/Magnetic";

function Arrow({ dir }: { dir: "left" | "right" }) {
  return (
    <svg
      viewBox="0 0 20 20"
      className="size-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden
    >
      <path
        d={
          dir === "left"
            ? "M12.5 4.5 7 10l5.5 5.5"
            : "M7.5 4.5 13 10l-5.5 5.5"
        }
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Gallery({ product }: { product: DigitalProduct }) {
  const images = productImages(product);
  const [slide, setSlide] = useState(0);
  const total = images.length;

  if (total === 0) {
    return (
      <div className="grid aspect-[16/10] place-items-center rounded-[1.4rem] border border-line bg-[#ebe9e4]">
        <span className="font-display text-7xl font-bold text-cream/15">
          {product.name.slice(0, 1)}
        </span>
      </div>
    );
  }

  const go = (step: number) =>
    setSlide((current) => (current + step + total) % total);

  return (
    <div>
      <div className="relative aspect-[16/10] overflow-hidden rounded-[1.4rem] border border-line bg-[#ebe9e4]">
        <img
          key={images[slide]}
          src={images[slide]}
          alt={`${product.name} — tampilan ${slide + 1}`}
          className="absolute inset-0 size-full object-contain"
        />
        {total > 1 ? (
          <>
            <span className="absolute top-3 left-3 rounded-full bg-black/60 px-2.5 py-1 font-mono text-[11px] text-white backdrop-blur-sm">
              {String(slide + 1).padStart(2, "0")} /{" "}
              {String(total).padStart(2, "0")}
            </span>
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Gambar sebelumnya"
              className="absolute top-1/2 left-3 grid size-10 -translate-y-1/2 place-items-center rounded-full border border-white/25 bg-black/55 text-white backdrop-blur-sm transition-all hover:scale-105 hover:bg-white hover:text-cream"
            >
              <Arrow dir="left" />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Gambar berikutnya"
              className="absolute top-1/2 right-3 grid size-10 -translate-y-1/2 place-items-center rounded-full border border-white/25 bg-black/55 text-white backdrop-blur-sm transition-all hover:scale-105 hover:bg-white hover:text-cream"
            >
              <Arrow dir="right" />
            </button>
          </>
        ) : null}
      </div>

      {total > 1 ? (
        <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
          {images.map((src, index) => (
            <button
              key={src}
              type="button"
              onClick={() => setSlide(index)}
              aria-label={`Pratinjau ${index + 1}`}
              aria-current={index === slide ? "true" : undefined}
              className={`relative h-16 w-28 shrink-0 overflow-hidden rounded-lg border transition-all ${
                index === slide
                  ? "border-cream ring-1 ring-cream"
                  : "border-line opacity-60 hover:opacity-100"
              }`}
            >
              <img
                src={src}
                alt=""
                className="size-full object-cover object-top"
              />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}

export function ProductDetail({ product }: { product: DigitalProduct }) {
  const rootRef = useRef<HTMLElement>(null);
  useReveal(rootRef);
  useLiftHover(rootRef);

  const index = products.findIndex((item) => item.id === product.id);
  const prev = index > 0 ? products[index - 1] : undefined;
  const next = index < products.length - 1 ? products[index + 1] : undefined;
  const mailto = `mailto:${site.email}?subject=${encodeURIComponent(
    `Tanya produk: ${product.name}`,
  )}`;

  return (
    <article
      ref={rootRef}
      className="mx-auto max-w-6xl px-5 py-12 md:px-8 md:py-16"
      style={accentStyle(2)}
    >
      <Link
        href="/products"
        className="reveal text-sm text-stone transition-colors hover:text-cream"
      >
        ← Semua produk
      </Link>

      <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] lg:gap-12">
        <div className="reveal min-w-0">
          <Gallery product={product} />
        </div>

        <div className="reveal lg:pt-2">
          <p className="kicker">{product.kind}</p>
          <h1 className="font-display mt-3 text-[clamp(2rem,4.6vw,3.2rem)] font-semibold tracking-[-0.035em]">
            {product.name}
          </h1>
          <p className="mt-4 text-base leading-relaxed text-stone">
            {product.summary}
          </p>

          <div className="mt-6 rounded-2xl border border-line bg-ink p-5">
            <p className="text-sm text-stone">Harga</p>
            <p className="font-display mt-1 text-3xl font-bold tracking-[-0.02em]">
              {formatPrice(product.price)}
            </p>
            <p className="mt-1 text-sm text-stone">{product.priceNote}</p>
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <Magnetic>
                <a href={mailto} className="btn-primary px-5 py-2.5 text-sm">
                  Tanya / pesan
                </a>
              </Magnetic>
              {product.demo ? (
                <a
                  href={product.demo}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-secondary px-5 py-2.5 text-sm"
                >
                  Lihat demo
                </a>
              ) : null}
            </div>
          </div>

          <ul className="mt-5 flex flex-wrap gap-2">
            {product.tags.map((tag) => (
              <li key={tag} className="chip rounded-full px-3 py-1 text-sm">
                {tag}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <section className="mt-16">
        <p className="reveal kicker" style={accentStyle(1)}>
          Ikhtisar
        </p>
        <p className="reveal mt-4 max-w-3xl text-lg leading-relaxed text-cream/90 md:text-xl">
          {product.full.overview}
        </p>
      </section>

      <section className="mt-16">
        <p className="reveal kicker" style={accentStyle(2)}>
          Fitur
        </p>
        <h2 className="reveal font-display mt-3 text-2xl font-bold md:text-3xl">
          Yang Anda dapatkan
        </h2>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {product.full.features.map((feature, i) => (
            <div
              key={feature.title}
              style={accentStyle(i + 1)}
              className="js-lift reveal tint rounded-2xl p-5 md:p-6"
            >
              <p className="font-mono text-xs font-bold text-stone">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="font-display mt-2 text-lg font-bold">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-stone">
                {feature.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-16 grid gap-8 lg:grid-cols-2">
        <div>
          <p className="reveal kicker" style={accentStyle(3)}>
            Paket
          </p>
          <h2 className="reveal font-display mt-3 text-2xl font-bold">
            Yang termasuk
          </h2>
          <ul className="reveal mt-5 space-y-3">
            {product.detail.includes.map((item) => (
              <li
                key={item}
                className="flex gap-3 text-sm leading-relaxed text-stone"
              >
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-cream" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="reveal mt-6 rounded-2xl border border-line bg-ink px-4 py-3 text-sm leading-relaxed text-stone">
            <span className="font-semibold text-cream">Cocok untuk: </span>
            {product.detail.suitableFor}
          </p>
        </div>

        <div>
          <p className="reveal kicker" style={accentStyle(4)}>
            Teknologi
          </p>
          <h2 className="reveal font-display mt-3 text-2xl font-bold">
            Dibangun dengan
          </h2>
          <ul className="reveal mt-5 flex flex-wrap gap-2">
            {product.full.stack.map((item) => (
              <li key={item} className="chip rounded-full px-3 py-1 text-sm">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mt-16">
        <p className="reveal kicker" style={accentStyle(5)}>
          Pemesanan
        </p>
        <h2 className="reveal font-display mt-3 text-2xl font-bold md:text-3xl">
          Cara pemesanan & serah terima
        </h2>
        <ol className="reveal relative mt-8 border-l border-line md:ml-2">
          {product.full.delivery.map((step, i) => (
            <li
              key={step.title}
              className="relative grid gap-2 py-5 pl-8 last:pb-0 md:grid-cols-[5.5rem_minmax(0,1fr)] md:gap-8 md:pl-10"
            >
              <span
                aria-hidden
                className="absolute top-6 -left-[5px] size-2.5 rounded-full bg-cream"
              />
              <p className="font-mono text-xs font-bold tracking-widest text-stone uppercase md:pt-1">
                Langkah {String(i + 1).padStart(2, "0")}
              </p>
              <div>
                <h3 className="font-display text-lg font-bold">{step.title}</h3>
                <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-stone">
                  {step.body}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-16">
        <p className="reveal kicker" style={accentStyle(1)}>
          FAQ
        </p>
        <h2 className="reveal font-display mt-3 text-2xl font-bold md:text-3xl">
          Pertanyaan yang sering muncul
        </h2>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {product.full.faq.map((item) => (
            <div key={item.q} className="reveal tint rounded-2xl p-5">
              <h3 className="font-display text-base font-bold">{item.q}</h3>
              <p className="mt-2 text-sm leading-relaxed text-stone">
                {item.a}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="reveal mt-16 rounded-3xl border border-line bg-ink p-6 md:p-8">
        <h2 className="font-display text-2xl font-bold md:text-3xl">
          Tertarik dengan {product.name}?
        </h2>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-stone md:text-base">
          Ceritakan kebutuhan Anda. Saya balas dengan jelas: apakah cocok, apa
          yang perlu disesuaikan, dan langkah pertamanya.
        </p>
        <div className="mt-5 flex flex-wrap items-center gap-3">
          <Magnetic>
            <a href={mailto} className="btn-primary px-5 py-2.5 text-sm">
              Tanya / pesan
            </a>
          </Magnetic>
          <Link href="/kontak" className="btn-secondary px-5 py-2.5 text-sm">
            Ke halaman kontak
          </Link>
        </div>
      </section>

      {prev || next ? (
        <nav className="mt-12 grid gap-4 sm:grid-cols-2">
          {prev ? (
            <Link
              href={`/products/${prev.id}`}
              className="tint rounded-2xl p-5 transition-colors hover:border-cream/40"
            >
              <p className="text-xs text-stone">← Sebelumnya</p>
              <p className="font-display mt-1 text-lg font-bold">{prev.name}</p>
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link
              href={`/products/${next.id}`}
              className="tint rounded-2xl p-5 text-right transition-colors hover:border-cream/40"
            >
              <p className="text-xs text-stone">Berikutnya →</p>
              <p className="font-display mt-1 text-lg font-bold">{next.name}</p>
            </Link>
          ) : null}
        </nav>
      ) : null}
    </article>
  );
}
