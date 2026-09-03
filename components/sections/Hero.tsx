"use client";

import { useRef } from "react";
import Link from "next/link";
import { site } from "@/lib/data";
import { gsap, useGSAP } from "@/lib/gsap";
import { reducedMotion } from "@/lib/motion";
import { Magnetic } from "@/components/ui/Magnetic";

export function Hero() {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (reducedMotion()) return;

      gsap.from(".hero-kicker", {
        y: 12,
        duration: 0.6,
        ease: "power3.out",
      });
      gsap.from(".hero-word", {
        yPercent: 70,
        duration: 0.85,
        stagger: 0.08,
        ease: "power4.out",
        delay: 0.08,
      });
      gsap.from(".hero-copy", {
        y: 18,
        duration: 0.7,
        stagger: 0.08,
        delay: 0.28,
        ease: "power3.out",
      });
      gsap.from(".hero-node", {
        scale: 0,
        transformOrigin: "center",
        duration: 0.5,
        stagger: 0.08,
        delay: 0.35,
        ease: "back.out(1.7)",
      });
    },
    { scope: rootRef },
  );

  return (
    <section
      ref={rootRef}
      id="top"
      className="relative mx-auto flex max-w-6xl flex-col justify-center overflow-hidden px-5 py-20 md:px-8 md:py-28"
    >
      <svg
        className="pointer-events-none absolute top-6 right-0 -z-10 hidden h-[22rem] w-[22rem] opacity-80 md:block"
        viewBox="0 0 320 320"
        aria-hidden
      >
        <circle cx="210" cy="110" r="88" fill="none" stroke="rgba(212,255,63,0.14)" />
        <circle cx="210" cy="110" r="52" fill="none" stroke="rgba(246,244,239,0.1)" />
        <circle className="hero-node" cx="210" cy="22" r="4" fill="#d4ff3f" />
        <circle className="hero-node" cx="298" cy="110" r="3.5" fill="#7dd3fc" />
        <circle className="hero-node" cx="210" cy="198" r="3" fill="#f6f4ef" />
        <circle className="hero-node" cx="122" cy="110" r="3.5" fill="#d4ff3f" />
        <line x1="210" y1="110" x2="210" y2="22" stroke="rgba(212,255,63,0.35)" />
        <line x1="210" y1="110" x2="298" y2="110" stroke="rgba(125,211,252,0.3)" />
        <line x1="210" y1="110" x2="210" y2="198" stroke="rgba(246,244,239,0.18)" />
        <line x1="210" y1="110" x2="122" y2="110" stroke="rgba(212,255,63,0.22)" />
        <circle cx="210" cy="110" r="6" fill="#0c0c0e" stroke="#d4ff3f" strokeWidth="1.5" />
      </svg>
      <p className="hero-kicker text-sm font-medium text-acid">
        <span className="mr-2 inline-block size-1.5 animate-pulse rounded-full bg-acid" />
        {site.role}
      </p>
      <h1 className="font-display mt-4 text-[clamp(2.4rem,6vw,4.4rem)] leading-[1.08] font-extrabold tracking-[-0.04em]">
        {site.name.split(" ").map((word) => (
          <span key={word} className="inline-block overflow-hidden pr-[0.28em]">
            <span className="hero-word inline-block">{word}</span>
          </span>
        ))}
      </h1>
      <p className="hero-copy mt-2 text-lg text-stone md:text-xl">
        {site.brand} - {site.tagline}
      </p>
      <p className="hero-copy mt-6 max-w-2xl text-base leading-relaxed text-cream/85 md:text-lg">
        {site.bio}
      </p>
      <div className="hero-copy mt-8 flex flex-wrap gap-3">
        <Magnetic>
          <Link
            href="/portofolio"
            className="inline-flex rounded-full bg-acid px-6 py-3 text-sm font-semibold text-void"
          >
            Lihat karya
          </Link>
        </Magnetic>
        <Magnetic strength={0.22}>
          <Link
            href="/kontak"
            className="inline-flex rounded-full border border-line px-6 py-3 text-sm font-semibold text-cream"
          >
            Hubungi saya
          </Link>
        </Magnetic>
      </div>
    </section>
  );
}
