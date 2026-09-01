"use client";

import { useRef } from "react";
import { projects } from "@/lib/data";
import { gsap, useGSAP } from "@/lib/gsap";

function Cover({
  palette,
  title,
}: {
  palette: (typeof projects)[number]["palette"];
  title: string;
}) {
  return (
    <div
      className="relative aspect-[16/11] overflow-hidden rounded-[1.6rem]"
      style={{
        background: `linear-gradient(145deg, ${palette.from} 0%, ${palette.via} 48%, ${palette.to} 140%)`,
      }}
    >
      <div
        className="absolute -top-16 -right-10 size-56 rounded-full blur-2xl"
        style={{ background: palette.accent, opacity: 0.35 }}
      />
      <div className="absolute inset-0 opacity-30 mix-blend-overlay [background-image:linear-gradient(rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.12)_1px,transparent_1px)] [background-size:42px_42px]" />
      <div className="absolute bottom-6 left-6">
        <span className="font-display text-4xl font-extrabold tracking-tight text-white/90">
          {title}
        </span>
      </div>
    </div>
  );
}

export function Work() {
  const rootRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const track = trackRef.current;
      const section = rootRef.current;
      if (!track || !section) return;

      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        const getDistance = () => track.scrollWidth - window.innerWidth;

        const tween = gsap.to(track, {
          x: () => -getDistance(),
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${getDistance()}`,
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        return () => tween.kill();
      });

      mm.add("(max-width: 1023px)", () => {
        gsap.from(".work-card", {
          y: 40,
          autoAlpha: 0,
          duration: 0.9,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 75%",
            once: true,
          },
        });
      });

      return () => mm.revert();
    },
    { scope: rootRef, dependencies: [] },
  );

  return (
    <section ref={rootRef} id="work" className="relative">
      <div className="px-5 pt-10 pb-6 md:px-10 lg:absolute lg:top-10 lg:right-0 lg:left-0 lg:z-10">
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="text-[11px] tracking-[0.28em] text-stone uppercase">
              Selected work
            </p>
            <h2 className="font-display mt-3 text-4xl font-extrabold tracking-tight md:text-6xl">
              Proyek terpilih
            </h2>
          </div>
          <p className="hidden max-w-xs text-right text-sm text-stone md:block">
            Geser dengan scroll. Setiap karya adalah ruang untuk menguji rasa
            dan ketelitian.
          </p>
        </div>
      </div>

      <div
        ref={trackRef}
        className="flex flex-col gap-8 px-5 pb-16 lg:h-screen lg:w-max lg:flex-row lg:items-end lg:gap-10 lg:px-10 lg:pt-36 lg:pb-16"
      >
        {projects.map((project) => (
          <a
            key={project.id}
            href={project.href}
            target="_blank"
            rel="noreferrer"
            data-cursor="View"
            className="work-card block w-full shrink-0 lg:w-[72vw] xl:w-[58vw]"
          >
            <Cover palette={project.palette} title={project.title} />
            <div className="mt-5 flex items-start justify-between gap-6">
              <div>
                <div className="flex items-baseline gap-3">
                  <span className="font-mono text-xs text-acid">
                    {project.id}
                  </span>
                  <h3 className="font-display text-2xl font-bold tracking-tight md:text-3xl">
                    {project.title}
                  </h3>
                </div>
                <p className="mt-2 max-w-lg text-sm leading-relaxed text-stone">
                  {project.description}
                </p>
              </div>
              <div className="hidden text-right sm:block">
                <p className="text-[11px] tracking-[0.18em] text-stone uppercase">
                  {project.category}
                </p>
                <p className="mt-1 font-mono text-xs text-cream/70">
                  {project.year}
                </p>
              </div>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-line px-3 py-1 text-[11px] tracking-[0.14em] text-stone uppercase"
                >
                  {tag}
                </span>
              ))}
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
