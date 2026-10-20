"use client";

import { useRef } from "react";
import Link from "next/link";
import { playStoreApps, site } from "@/lib/data";
import { projects } from "@/lib/projects";
import { gsap, useGSAP } from "@/lib/gsap";
import { reducedMotion } from "@/lib/motion";
import { Magnetic } from "@/components/ui/Magnetic";

const focus = ["Web App", "Android", "Software", "UI Design", "Renewal"] as const;

export function Hero() {
  const rootRef = useRef<HTMLElement>(null);
  const [first, ...rest] = site.name.split(" ");
  const last = rest.join(" ");

  useGSAP(
    () => {
      if (reducedMotion()) return;

      gsap.from(".hero-kicker", {
        y: 10,
        opacity: 0,
        duration: 0.55,
        ease: "power3.out",
      });
      gsap.from(".hero-word", {
        yPercent: 55,
        duration: 0.9,
        stagger: 0.1,
        ease: "power4.out",
        delay: 0.06,
      });
      gsap.from(".hero-copy", {
        y: 16,
        opacity: 0,
        duration: 0.7,
        stagger: 0.07,
        delay: 0.28,
        ease: "power3.out",
      });
      gsap.from(".hero-panel", {
        y: 24,
        opacity: 0,
        duration: 0.85,
        delay: 0.35,
        ease: "power3.out",
      });
      gsap.from(".hero-float", {
        y: 18,
        opacity: 0,
        duration: 0.7,
        stagger: 0.1,
        delay: 0.5,
        ease: "power3.out",
      });
    },
    { scope: rootRef },
  );

  return (
    <section
      ref={rootRef}
      id="top"
      className="relative mx-auto grid max-w-6xl items-center gap-14 px-5 py-16 md:px-8 md:py-24 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.95fr)] lg:gap-16"
    >
      <div>
        <p className="hero-kicker kicker">{site.availability}</p>

        <h1 className="font-display mt-7 max-w-[13ch] text-[clamp(2.35rem,5.2vw,4rem)] leading-[1.1] font-semibold tracking-[-0.035em] text-cream">
          <span className="inline-block overflow-hidden">
            <span className="hero-word inline-block">{first}</span>
          </span>
          <br />
          <span className="inline-block overflow-hidden">
            <span className="hero-word inline-block">{last}</span>
          </span>
        </h1>

        <p className="hero-copy mt-5 text-lg font-medium tracking-[-0.01em] text-cream md:text-xl">
          {site.role}
        </p>
        <p className="hero-copy mt-4 max-w-lg text-[0.95rem] leading-relaxed text-stone md:text-base">
          {site.bio}
        </p>

        <ul className="hero-copy mt-7 flex flex-wrap gap-2">
          {focus.map((item) => (
            <li
              key={item}
              className="rounded-full border border-line bg-ink px-3.5 py-1.5 text-xs font-medium tracking-wide text-stone"
            >
              {item}
            </li>
          ))}
        </ul>

        <div className="hero-copy mt-10 flex flex-wrap gap-3">
          <Magnetic>
            <Link
              href="/portofolio"
              className="btn-primary px-6 py-3 text-sm"
            >
              Lihat karya →
            </Link>
          </Magnetic>
          <Magnetic strength={0.2}>
            <Link href="/kontak" className="btn-secondary px-6 py-3 text-sm">
              Hubungi saya
            </Link>
          </Magnetic>
        </div>
      </div>

      <div className="hero-panel relative mx-auto w-full max-w-[28rem]" aria-hidden>
        <div className="relative overflow-hidden rounded-[1.75rem] border border-line bg-ink shadow-[0_24px_60px_-36px_rgba(23,23,23,0.35)]">
          <div className="absolute inset-0 bg-[radial-gradient(80%_60%_at_70%_10%,rgba(23,23,23,0.06),transparent_55%)]" />
          <div className="relative aspect-[4/5] p-7 md:p-8">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[11px] font-medium tracking-[0.16em] text-stone uppercase">
                  NEODEEPS
                </p>
                <p className="font-serif mt-2 text-2xl text-cream italic md:text-3xl">
                  Portfolio
                </p>
              </div>
              <span className="grid size-9 place-items-center rounded-full border border-line text-xs font-semibold tracking-wide">
                N
              </span>
            </div>

            <div className="mt-10 space-y-5">
              <div className="border-t border-line pt-5">
                <p className="text-[11px] tracking-[0.14em] text-stone uppercase">Fokus</p>
                <p className="mt-2 text-sm leading-relaxed text-cream/85">
                  Produk digital dari antarmuka sampai sistem yang siap dipakai.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-2xl border border-line bg-void/80 px-4 py-4">
                  <p className="font-display text-2xl font-semibold tracking-tight">
                    {String(projects.length).padStart(2, "0")}
                  </p>
                  <p className="mt-1 text-xs text-stone">Studi kasus</p>
                </div>
                <div className="rounded-2xl border border-line bg-void/80 px-4 py-4">
                  <p className="font-display text-2xl font-semibold tracking-tight">
                    {String(playStoreApps.length).padStart(2, "0")}
                  </p>
                  <p className="mt-1 text-xs text-stone">App live</p>
                </div>
              </div>
            </div>

            <div className="absolute inset-x-7 bottom-7 flex items-center justify-between border-t border-line pt-4 md:inset-x-8 md:bottom-8">
              <p className="text-sm text-stone">{site.tagline}</p>
              <span className="flex items-center gap-2 text-xs font-medium text-cream">
                <span className="size-1.5 rounded-full bg-emerald-600" />
                Available
              </span>
            </div>
          </div>
        </div>

        <div className="hero-float absolute -top-3 -right-2 rounded-full border border-line bg-ink px-3.5 py-1.5 text-xs font-medium text-stone shadow-sm md:-right-4">
          Jakarta
        </div>
        <div className="hero-float absolute -bottom-3 -left-2 rounded-full border border-line bg-ink px-3.5 py-1.5 text-xs font-medium text-stone shadow-sm md:-left-4">
          2026
        </div>
      </div>
    </section>
  );
}
