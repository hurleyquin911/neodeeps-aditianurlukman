"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import {
  formatPrice,
  productImages,
  type DigitalProduct,
} from "@/lib/products";
import { site } from "@/lib/data";
import { accentStyle } from "@/lib/accents";
import { gsap } from "@/lib/gsap";
import { reducedMotion } from "@/lib/motion";
import { Magnetic } from "@/components/ui/Magnetic";

type ProductDetailModalProps = {
  product: DigitalProduct | null;
  onClose: () => void;
};

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
          dir === "left" ? "M12.5 4.5 7 10l5.5 5.5" : "M7.5 4.5 13 10l-5.5 5.5"
        }
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ProductDetailModal({
  product,
  onClose,
}: ProductDetailModalProps) {
  const open = product !== null;
  const overlayRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const closingRef = useRef(false);
  const [mounted, setMounted] = useState(false);
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setSlide(0);
  }, [product?.id]);

  const close = useCallback(() => {
    if (closingRef.current) return;
    closingRef.current = true;

    const overlay = overlayRef.current;
    const panel = panelRef.current;
    if (!overlay || !panel || reducedMotion()) {
      onClose();
      return;
    }

    gsap.killTweensOf([overlay, panel]);
    gsap.to(overlay, { opacity: 0, duration: 0.18, ease: "power1.in" });
    gsap.to(panel, {
      y: 24,
      opacity: 0,
      duration: 0.22,
      ease: "power2.in",
      force3D: false,
      onComplete: onClose,
    });
  }, [onClose]);

  const images = product ? productImages(product) : [];
  const total = images.length;
  const hasCarousel = total > 1;

  const go = useCallback(
    (step: number) => {
      if (total <= 1) return;
      setSlide((current) => (current + step + total) % total);
    },
    [total],
  );

  useEffect(() => {
    if (!open || !mounted) {
      closingRef.current = false;
      return;
    }

    const overlay = overlayRef.current;
    const panel = panelRef.current;
    if (!overlay || !panel) return;

    closingRef.current = false;
    document.body.style.overflow = "hidden";
    window.__lenis?.stop();
    closeBtnRef.current?.focus();

    gsap.killTweensOf([overlay, panel]);

    if (reducedMotion()) {
      gsap.set(overlay, { opacity: 1 });
      gsap.set(panel, { y: 0, opacity: 1, clearProps: "transform" });
    } else {
      gsap.fromTo(
        overlay,
        { opacity: 0 },
        { opacity: 1, duration: 0.28, ease: "power2.out" },
      );
      gsap.fromTo(
        panel,
        { y: 28, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.4,
          ease: "power3.out",
          force3D: false,
        },
      );
    }

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      if (event.key === "ArrowLeft") go(-1);
      if (event.key === "ArrowRight") go(1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      gsap.killTweensOf([overlay, panel]);
      document.body.style.overflow = "";
      window.__lenis?.start();
      window.removeEventListener("keydown", onKey);
    };
  }, [open, mounted, close, go]);

  if (!mounted || !product) return null;

  const mailto = `mailto:${site.email}?subject=${encodeURIComponent(
    `Tanya produk: ${product.name}`,
  )}`;
  const currentSrc = images[slide];

  return createPortal(
    <div
      ref={overlayRef}
      data-lenis-prevent
      className="fixed inset-0 z-[130] flex items-end justify-center bg-black/70 px-3 py-4 backdrop-blur-xl sm:items-center md:px-8 md:py-8"
      onClick={close}
      role="presentation"
      style={accentStyle(2)}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="product-modal-title"
        className="relative flex max-h-[92dvh] w-full max-w-3xl flex-col overflow-hidden rounded-[1.75rem] border border-line bg-ink shadow-[0_40px_120px_-20px_rgba(0,0,0,0.55)]"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          ref={closeBtnRef}
          type="button"
          onClick={close}
          aria-label="Tutup"
          className="absolute top-3 right-3 z-20 grid size-9 place-items-center rounded-full border border-white/25 bg-black/55 text-white backdrop-blur-sm transition-colors hover:bg-white hover:text-cream"
        >
          <svg
            viewBox="0 0 20 20"
            className="size-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden
          >
            <path d="M5 5l10 10M15 5 5 15" strokeLinecap="round" />
          </svg>
        </button>

        <div
          data-lenis-prevent
          className="min-h-0 flex-1 overflow-y-auto overscroll-contain"
        >
          <div className="relative aspect-[16/10] overflow-hidden bg-[#ebe9e4]">
            {currentSrc ? (
              <img
                key={currentSrc}
                src={currentSrc}
                alt={`${product.name} — tampilan ${slide + 1}`}
                className="absolute inset-0 size-full object-contain"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-display text-6xl font-bold text-cream/15">
                  {product.name.slice(0, 1)}
                </span>
              </div>
            )}

            {hasCarousel ? (
              <>
                <span className="absolute top-3 left-3 z-10 rounded-full bg-black/60 px-2.5 py-1 font-mono text-[11px] text-white backdrop-blur-sm">
                  {String(slide + 1).padStart(2, "0")} /{" "}
                  {String(total).padStart(2, "0")}
                </span>
                <button
                  type="button"
                  onClick={() => go(-1)}
                  aria-label="Gambar sebelumnya"
                  className="absolute top-1/2 left-3 z-10 grid size-10 -translate-y-1/2 place-items-center rounded-full border border-white/25 bg-black/55 text-white backdrop-blur-sm transition-all hover:scale-105 hover:bg-white hover:text-cream"
                >
                  <Arrow dir="left" />
                </button>
                <button
                  type="button"
                  onClick={() => go(1)}
                  aria-label="Gambar berikutnya"
                  className="absolute top-1/2 right-3 z-10 grid size-10 -translate-y-1/2 place-items-center rounded-full border border-white/25 bg-black/55 text-white backdrop-blur-sm transition-all hover:scale-105 hover:bg-white hover:text-cream"
                >
                  <Arrow dir="right" />
                </button>
              </>
            ) : null}
          </div>

          {hasCarousel ? (
            <div className="flex gap-2 overflow-x-auto border-b border-line px-5 py-3 md:px-7">
              {images.map((src, index) => (
                <button
                  key={src}
                  type="button"
                  onClick={() => setSlide(index)}
                  aria-label={`Pratinjau ${index + 1}`}
                  aria-current={index === slide ? "true" : undefined}
                  className={`relative h-14 w-24 shrink-0 overflow-hidden rounded-lg border transition-all ${
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

          <div className="px-5 py-5 md:px-7 md:py-6">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="kicker">{product.kind}</p>
                <h2
                  id="product-modal-title"
                  className="font-display mt-2 text-2xl font-bold tracking-[-0.03em] md:text-3xl"
                >
                  {product.name}
                </h2>
              </div>
              <div className="text-right">
                <p className="font-display text-2xl font-bold tracking-[-0.02em] md:text-3xl">
                  {formatPrice(product.price)}
                </p>
                <p className="mt-1 text-sm text-stone">{product.priceNote}</p>
              </div>
            </div>

            <p className="mt-5 text-base leading-relaxed text-cream/90">
              {product.detail.pitch}
            </p>

            <div className="mt-6">
              <p className="text-sm font-semibold text-cream">Yang termasuk</p>
              <ul className="mt-3 space-y-2.5">
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
            </div>

            <p className="mt-6 rounded-2xl border border-line bg-void/80 px-4 py-3 text-sm leading-relaxed text-stone">
              <span className="font-semibold text-cream">Cocok untuk: </span>
              {product.detail.suitableFor}
            </p>

            <ul className="mt-5 flex flex-wrap gap-2">
              {product.tags.map((tag) => (
                <li key={tag} className="chip rounded-full px-2.5 py-1 text-xs">
                  {tag}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex shrink-0 flex-wrap items-center gap-3 border-t border-line px-5 py-4 md:px-7">
          <Magnetic>
            <a href={mailto} className="btn-primary px-5 py-2.5 text-sm">
              Tanya / pesan
            </a>
          </Magnetic>
          <Link
            href={`/products/${product.id}`}
            className="btn-secondary px-5 py-2.5 text-sm"
            onClick={close}
          >
            Full Detail
          </Link>
          <Link
            href="/kontak"
            className="text-sm text-stone underline-offset-4 hover:text-cream hover:underline"
            onClick={close}
          >
            Ke halaman kontak
          </Link>
        </div>
      </div>
    </div>,
    document.body,
  );
}
