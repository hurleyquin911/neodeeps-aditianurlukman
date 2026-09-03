"use client";

import { useRef } from "react";
import Link from "next/link";
import { featuredProjects } from "@/lib/projects";
import { useReveal } from "@/lib/motion";
import { ProjectCard } from "@/components/project/ProjectCard";
import { Magnetic } from "@/components/ui/Magnetic";

export function Work() {
  const rootRef = useRef<HTMLElement>(null);
  useReveal(rootRef);

  return (
    <section
      ref={rootRef}
      id="work"
      className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28"
    >
      <p className="reveal text-sm font-medium text-acid">Karya</p>
      <h2 className="reveal font-display mt-3 text-[clamp(1.8rem,4vw,3rem)] font-extrabold tracking-[-0.03em]">
        Proyek terpilih
      </h2>
      <p className="reveal mt-3 max-w-xl text-base text-stone">
        Beberapa studi kasus. Buka kartu untuk melihat tampilan, flow, dan
        deskripsi lengkap.
      </p>

      <div className="mt-10 grid gap-5 md:grid-cols-2 md:gap-6">
        {featuredProjects().map((project, index) => (
          <ProjectCard key={project.slug} project={project} index={index} />
        ))}
      </div>

      <div className="reveal mt-10">
        <Magnetic>
          <Link
            href="/portofolio"
            className="inline-flex rounded-full border border-line px-6 py-3 text-sm font-semibold text-cream transition-colors hover:border-acid hover:text-acid"
          >
            Lihat semua portofolio
          </Link>
        </Magnetic>
      </div>
    </section>
  );
}
