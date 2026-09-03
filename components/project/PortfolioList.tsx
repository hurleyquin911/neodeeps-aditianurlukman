"use client";

import { useRef } from "react";
import { projects } from "@/lib/projects";
import { gsap, useGSAP } from "@/lib/gsap";
import { reducedMotion } from "@/lib/motion";
import { ProjectCard } from "@/components/project/ProjectCard";

export function PortfolioList() {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (reducedMotion()) return;

      gsap.from(".folio-kicker", {
        y: 14,
        duration: 0.55,
        ease: "power3.out",
      });
      gsap.from(".folio-title", {
        y: 36,
        duration: 0.85,
        ease: "power4.out",
      });
      gsap.from(".folio-copy", {
        y: 18,
        duration: 0.7,
        delay: 0.1,
        ease: "power3.out",
      });
      gsap.fromTo(
        ".folio-rule",
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 0.9,
          delay: 0.18,
          ease: "power3.out",
          transformOrigin: "left center",
        },
      );
    },
    { scope: rootRef },
  );

  return (
    <section
      ref={rootRef}
      className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-20"
    >
      <p className="folio-kicker text-sm font-medium text-acid">Portofolio</p>
      <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
        <h1 className="folio-title font-display text-[clamp(2rem,5vw,3.4rem)] font-extrabold tracking-[-0.04em]">
          Semua proyek
        </h1>
        <p className="folio-copy font-mono text-sm text-stone">
          {String(projects.length).padStart(2, "0")} karya
        </p>
      </div>
      <p className="folio-copy mt-4 max-w-2xl text-base leading-relaxed text-stone md:text-lg">
        Daftar lengkap studi kasus. Buka salah satu proyek untuk melihat
        tampilan, alur pemakaian, dan deskripsi presentasi.
      </p>
      <div className="folio-rule mt-8 h-px origin-left bg-line" />

      <div className="mt-10 grid gap-5 md:grid-cols-2 md:gap-6">
        {projects.map((project, index) => (
          <div
            key={project.slug}
            className={index === 0 ? "md:col-span-2" : undefined}
          >
            <ProjectCard
              project={project}
              wide={index === 0}
              index={index}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
