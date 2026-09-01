"use client";

import { useRef } from "react";
import { experience, site, stats } from "@/lib/data";
import { gsap, useGSAP } from "@/lib/gsap";

export function About() {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(rootRef);
      gsap.from(q(".about-reveal"), {
        y: 48,
        autoAlpha: 0,
        duration: 1.1,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top 75%",
          once: true,
        },
      });
    },
    { scope: rootRef, dependencies: [] },
  );

  return (
    <section
      ref={rootRef}
      id="about"
      className="px-5 py-24 md:px-10 md:py-36"
    >
      <div className="mb-16 flex items-end justify-between gap-6">
        <p className="about-reveal text-[11px] tracking-[0.28em] text-stone uppercase">
          About
        </p>
        <p className="about-reveal max-w-xs text-right text-sm text-stone">
          {site.name} · {site.location}
        </p>
      </div>

      <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
        <div>
          <h2 className="about-reveal font-display text-[clamp(2.4rem,6vw,5.2rem)] leading-[0.95] font-extrabold tracking-[-0.05em]">
            Visual yang kuat harus terasa, bukan hanya terlihat.
          </h2>
          <div className="mt-10 max-w-xl space-y-5 text-base leading-relaxed text-stone md:text-lg">
            {site.about.map((paragraph) => (
              <p key={paragraph} className="about-reveal">
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        <div className="about-reveal">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-line bg-ink">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(212,255,63,0.22),transparent_42%),radial-gradient(circle_at_80%_80%,rgba(94,234,212,0.16),transparent_40%)]" />
            <div className="absolute inset-6 rounded-[1.4rem] border border-cream/10" />
            <div className="absolute inset-0 flex flex-col justify-between p-8">
              <p className="text-[11px] tracking-[0.24em] text-stone uppercase">
                Portrait
              </p>
              <div>
                <p className="font-display text-6xl font-extrabold tracking-[-0.06em]">
                  ANL
                </p>
                <p className="mt-2 text-sm text-stone">{site.tagline}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-20 grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-3">
        {stats.map((stat) => (
          <div key={stat.label} className="about-reveal bg-void px-6 py-8">
            <p className="font-display text-5xl font-extrabold tracking-tight md:text-6xl">
              {stat.value}
            </p>
            <p className="mt-3 text-[12px] tracking-[0.16em] text-stone uppercase">
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-16 grid gap-8 border-t border-line pt-12 md:grid-cols-3">
        {experience.map((item) => (
          <article key={item.place} className="about-reveal">
            <p className="text-[11px] tracking-[0.22em] text-acid uppercase">
              {item.period}
            </p>
            <h3 className="font-display mt-3 text-2xl font-bold tracking-tight">
              {item.role}
            </h3>
            <p className="mt-1 text-sm text-cream/80">{item.place}</p>
            <p className="mt-3 text-sm leading-relaxed text-stone">
              {item.detail}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
