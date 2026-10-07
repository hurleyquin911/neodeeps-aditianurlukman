"use client";

import { useRef } from "react";
import Link from "next/link";
import { nav, site } from "@/lib/data";
import { accentAt } from "@/lib/accents";
import { gsap, useGSAP } from "@/lib/gsap";
import { finePointer, reducedMotion } from "@/lib/motion";
import { Magnetic } from "@/components/ui/Magnetic";

export function Footer() {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (reducedMotion() || !finePointer()) return;
      gsap.utils.toArray<HTMLAnchorElement>(".footer-link").forEach((el, index) => {
        const enter = () =>
          gsap.to(el, { y: -3, color: accentAt(index + 1), duration: 0.25 });
        const leave = () => gsap.to(el, { y: 0, color: "#f6f4ef", duration: 0.3 });
        el.addEventListener("mouseenter", enter);
        el.addEventListener("mouseleave", leave);
      });
    },
    { scope: rootRef },
  );

  return (
    <footer ref={rootRef} className="relative">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="relative overflow-hidden rounded-[2rem] p-[1px]">
          <div className="bg-spectrum absolute inset-0" />
          <div className="relative overflow-hidden rounded-[calc(2rem-1px)] bg-void/90 px-6 py-12 md:px-12 md:py-16">
            <span className="pointer-events-none absolute -top-24 -left-16 size-72 rounded-full bg-grape/30 blur-3xl" />
            <span className="pointer-events-none absolute -right-10 -bottom-28 size-80 rounded-full bg-aqua/25 blur-3xl" />
            <span className="pointer-events-none absolute top-1/2 left-1/2 size-56 -translate-1/2 rounded-full bg-coral/15 blur-3xl" />
            <div className="relative flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="kicker">Punya ide?</p>
                <h2 className="font-display mt-5 max-w-xl text-[clamp(2rem,4.6vw,3.4rem)] leading-[1.05] font-extrabold tracking-[-0.04em]">
                  Mari bangun sesuatu yang{" "}
                  <span className="text-spectrum">berwarna</span>.
                </h2>
                <p className="mt-4 max-w-md text-sm leading-relaxed text-stone md:text-base">
                  Ceritakan produknya, saya bantu dari desain sampai rilis dan
                  perawatan.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Magnetic>
                  <Link
                    href="/kontak"
                    className="bg-spectrum inline-flex rounded-full px-6 py-3 text-sm font-bold text-void shadow-[0_12px_40px_-12px_rgba(251,113,133,0.9)]"
                  >
                    Mulai proyek →
                  </Link>
                </Magnetic>
                <Magnetic strength={0.2}>
                  <a
                    href={`mailto:${site.email}`}
                    className="inline-flex rounded-full border border-cream/20 bg-cream/5 px-6 py-3 text-sm font-semibold text-cream transition-colors hover:border-aqua hover:text-aqua"
                  >
                    Kirim email
                  </a>
                </Magnetic>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-14 grid max-w-6xl gap-8 border-t border-line px-5 py-10 md:grid-cols-[1.4fr_1fr_1fr] md:px-8">
        <div>
          <p className="font-display flex items-center gap-2.5 text-lg font-bold">
            <span className="bg-spectrum grid size-7 place-items-center rounded-lg text-xs text-void">
              N
            </span>
            {site.brand}
          </p>
          <p className="mt-2 text-sm text-stone">
            {site.name} · {site.location}
          </p>
          <p className="mt-1 text-sm text-stone">{site.tagline}</p>
        </div>
        <div>
          <p className="text-xs font-semibold tracking-[0.14em] text-grape uppercase">
            Navigasi
          </p>
          <ul className="mt-3 space-y-2">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="footer-link inline-block text-sm text-cream">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-xs font-semibold tracking-[0.14em] text-aqua uppercase">
            Sosial
          </p>
          <ul className="mt-3 space-y-2">
            {site.socials.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  target={social.href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  className="footer-link inline-block text-sm text-cream"
                >
                  {social.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-line">
        <p className="mx-auto max-w-6xl px-5 py-5 text-xs text-stone md:px-8">
          © {new Date().getFullYear()} {site.brand}. Dibuat dengan Next.js, GSAP,
          dan banyak warna.
        </p>
      </div>
    </footer>
  );
}
