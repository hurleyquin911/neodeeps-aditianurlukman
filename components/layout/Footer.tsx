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
        const leave = () => gsap.to(el, { y: 0, color: "#12141a", duration: 0.3 });
        el.addEventListener("mouseenter", enter);
        el.addEventListener("mouseleave", leave);
      });
    },
    { scope: rootRef },
  );

  return (
    <footer ref={rootRef} className="relative">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="relative overflow-hidden rounded-[1.75rem] border border-line bg-ink px-6 py-12 md:px-12 md:py-16">
          <div className="relative flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="kicker">Punya ide?</p>
              <h2 className="font-display mt-5 max-w-xl text-[clamp(1.9rem,4.2vw,3rem)] leading-[1.12] font-semibold tracking-[-0.03em]">
                Mari bangun sesuatu yang{" "}
                <span className="text-spectrum">berarti</span>.
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
                  className="btn-primary px-6 py-3 text-sm"
                >
                  Mulai proyek →
                </Link>
              </Magnetic>
              <Magnetic strength={0.2}>
                <a href={`mailto:${site.email}`} className="btn-secondary px-6 py-3 text-sm">
                  Kirim email
                </a>
              </Magnetic>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-14 grid max-w-6xl gap-8 border-t border-line px-5 py-10 md:grid-cols-[1.4fr_1fr_1fr] md:px-8">
        <div>
          <p className="font-display flex items-center gap-2.5 text-lg font-semibold">
            <span className="grid size-7 place-items-center rounded-md bg-[#171717] text-xs font-semibold text-white">
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
          © {new Date().getFullYear()} {site.brand}. {site.tagline}
        </p>
      </div>
    </footer>
  );
}
