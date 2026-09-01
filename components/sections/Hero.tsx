"use client";

import { useRef } from "react";
import { site } from "@/lib/data";
import { gsap, useGSAP } from "@/lib/gsap";
import { useIntro } from "@/lib/intro-context";
import { Magnetic } from "@/components/ui/Magnetic";

export function Hero() {
  const rootRef = useRef<HTMLElement>(null);
  const orbRef = useRef<HTMLDivElement>(null);
  const { ready } = useIntro();

  useGSAP(
    () => {
      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (reduced) {
        gsap.set(".hero-line", { yPercent: 0 });
        gsap.set(".hero-kicker, .hero-copy", { autoAlpha: 1, y: 0 });
        return;
      }

      if (!ready) {
        gsap.set(".hero-line", { yPercent: 110 });
        gsap.set(".hero-kicker, .hero-copy", { autoAlpha: 0, y: 24 });
        return;
      }

      gsap.fromTo(
        ".hero-line",
        { yPercent: 110 },
        {
          yPercent: 0,
          duration: 1.25,
          stagger: 0.08,
          ease: "power4.out",
        },
      );
      gsap.fromTo(
        ".hero-kicker, .hero-copy",
        { autoAlpha: 0, y: 24 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.95,
          stagger: 0.08,
          delay: 0.2,
          ease: "power3.out",
        },
      );
    },
    { scope: rootRef, dependencies: [ready], revertOnUpdate: false },
  );

  useGSAP(
    () => {
      if (!ready) return;
      const orb = orbRef.current;
      if (!orb) return;

      const onMove = (event: MouseEvent) => {
        gsap.to(orb, {
          x: event.clientX,
          y: event.clientY,
          duration: 1.6,
          ease: "power3.out",
        });
      };

      window.addEventListener("mousemove", onMove);
      return () => window.removeEventListener("mousemove", onMove);
    },
    { dependencies: [ready] },
  );

  return (
    <section
      ref={rootRef}
      id="top"
      className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden px-5 pt-28 pb-8 md:px-10 md:pb-10"
    >
      <div
        ref={orbRef}
        className="pointer-events-none absolute top-0 left-0 z-0 size-[42vw] max-h-[520px] max-w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-acid/25 blur-[90px]"
        aria-hidden
      />

      <div className="hero-kicker relative z-10 mb-8 flex flex-wrap items-center justify-between gap-4 md:mb-10">
        <p className="text-[11px] tracking-[0.28em] text-stone uppercase">
          {site.role}
        </p>
        <span className="rounded-full border border-line px-3 py-1 text-[11px] tracking-[0.18em] text-acid uppercase">
          {site.availability}
        </span>
      </div>

      <h1 className="relative z-10">
        <span className="block overflow-hidden">
          <span className="hero-line font-display block text-[clamp(4.6rem,22vw,17rem)] leading-[0.78] font-extrabold tracking-[-0.07em]">
            NEO
          </span>
        </span>
        <span className="block overflow-hidden">
          <span className="hero-line outline-text font-display block text-[clamp(4.6rem,22vw,17rem)] leading-[0.78] font-extrabold tracking-[-0.07em]">
            DEEPS
          </span>
        </span>
      </h1>

      <div className="relative z-10 mt-8 flex flex-col gap-8 md:mt-10 md:flex-row md:items-end md:justify-between">
        <div className="hero-copy max-w-md">
          <p className="text-lg leading-relaxed text-cream/90 md:text-xl">
            {site.tagline}.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-stone md:text-base">
            {site.bio}
          </p>
        </div>

        <div className="hero-copy flex items-center justify-between gap-6 md:justify-end">
          <p className="text-[11px] tracking-[0.22em] text-stone uppercase">
            {site.location}
          </p>
          <Magnetic>
            <a
              href="#work"
              data-cursor="Scroll"
              className="inline-flex size-16 items-center justify-center rounded-full border border-line text-[10px] tracking-[0.16em] uppercase transition-colors hover:border-acid hover:bg-acid hover:text-void"
              onClick={(event) => {
                event.preventDefault();
                const el = document.getElementById("work");
                if (el) {
                  if (window.__lenis) window.__lenis.scrollTo(el, { offset: -20 });
                  else el.scrollIntoView({ behavior: "smooth" });
                }
              }}
            >
              Scroll
            </a>
          </Magnetic>
        </div>
      </div>
    </section>
  );
}
