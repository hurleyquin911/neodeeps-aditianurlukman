"use client";

import { useRef } from "react";
import Link from "next/link";
import type { Project } from "@/lib/projects";
import { adjacentProjects } from "@/lib/projects";
import { scrollToId, useLiftHover, useReveal } from "@/lib/motion";
import { TampilanGallery } from "@/components/project/TampilanGallery";
import { FlowMap } from "@/components/project/FlowMap";
import { Magnetic } from "@/components/ui/Magnetic";

const tabs = [
  { id: "tampilan", label: "1. Tampilan" },
  { id: "flow", label: "2. Flow" },
  { id: "deskripsi", label: "3. Deskripsi" },
] as const;

export function ProjectDetail({ project }: { project: Project }) {
  const rootRef = useRef<HTMLElement>(null);
  const { prev, next } = adjacentProjects(project.slug);
  useReveal(rootRef);
  useLiftHover(rootRef);

  return (
    <article ref={rootRef} className="pb-20">
      <header className="mx-auto max-w-6xl px-5 pt-10 pb-8 md:px-8 md:pt-14">
        <Link
          href="/portofolio"
          className="reveal text-sm text-stone transition-colors hover:text-cream"
        >
          ← Semua portofolio
        </Link>
        <p className="reveal mt-6 text-sm font-medium text-acid">
          {project.category} · {project.year}
        </p>
        <h1 className="reveal font-display mt-3 text-[clamp(2rem,5vw,3.6rem)] font-extrabold tracking-[-0.04em]">
          {project.title}
        </h1>
        <p className="reveal mt-4 max-w-2xl text-base leading-relaxed text-stone md:text-lg">
          {project.description}
        </p>
        <div className="reveal mt-5 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-line px-3 py-1 text-sm text-cream"
            >
              {tag}
            </span>
          ))}
        </div>
      </header>

      <nav className="sticky top-[57px] z-40 border-y border-line bg-void/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl gap-1 overflow-x-auto px-5 md:px-8">
          {tabs.map((tab) => (
            <Magnetic key={tab.id} strength={0.18}>
              <a
                href={`#${tab.id}`}
                className="inline-block shrink-0 px-3 py-3 text-sm text-stone transition-colors hover:text-cream"
                onClick={(event) => {
                  event.preventDefault();
                  scrollToId(`#${tab.id}`);
                }}
              >
                {tab.label}
              </a>
            </Magnetic>
          ))}
        </div>
      </nav>

      <div className="mx-auto max-w-6xl space-y-20 px-5 py-14 md:px-8">
        <section id="tampilan" className="scroll-mt-32">
          <p className="reveal text-sm font-medium text-acid">1. Tampilan</p>
          <h2 className="reveal font-display mt-2 text-3xl font-bold">
            Seperti apa produk ini terlihat
          </h2>
          <p className="reveal mt-4 max-w-2xl text-base leading-relaxed text-cream/85">
            {project.tampilan.headline}
          </p>
          <div className="reveal mt-8">
            <TampilanGallery project={project} />
          </div>
          <ul className="reveal mt-8 space-y-3 text-base text-stone">
            {project.tampilan.points.map((point) => (
              <li key={point} className="flex gap-3">
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-acid" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {project.tampilan.screens.map((screen) => (
              <div
                key={screen.name}
                className="reveal js-lift rounded-2xl border border-line bg-ink p-5"
              >
                <p className="font-display text-lg font-bold">{screen.name}</p>
                <p className="mt-2 text-sm leading-relaxed text-stone">
                  {screen.note}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section id="flow" className="scroll-mt-32">
          <p className="reveal text-sm font-medium text-acid">2. Flow</p>
          <h2 className="reveal font-display mt-2 text-3xl font-bold">
            Bagaimana orang memakainya
          </h2>
          <p className="reveal mt-3 max-w-2xl text-sm leading-relaxed text-stone md:text-base">
            Flowchart pemakaian: ada cabang, keputusan, dan jalur yang bertemu
            lagi. Klik simpul untuk membaca langkahnya; tarik peta untuk melihat
            keseluruhan.
          </p>
          <FlowMap project={project} />
        </section>

        <section id="deskripsi" className="scroll-mt-32">
          <p className="reveal text-sm font-medium text-acid">
            3. Deskripsi presentasi
          </p>
          <h2 className="reveal font-display mt-2 text-3xl font-bold">
            Narasi lengkap untuk dipresentasikan
          </h2>
          <p className="reveal mt-6 max-w-3xl text-lg leading-relaxed text-cream">
            {project.deskripsi.pitch}
          </p>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <section className="reveal js-lift rounded-2xl border border-line p-6">
              <h3 className="text-sm font-medium text-acid">Masalah</h3>
              <p className="mt-3 text-base leading-relaxed text-stone">
                {project.deskripsi.masalah}
              </p>
            </section>
            <section className="reveal js-lift rounded-2xl border border-line p-6">
              <h3 className="text-sm font-medium text-acid">Solusi</h3>
              <p className="mt-3 text-base leading-relaxed text-stone">
                {project.deskripsi.solusi}
              </p>
            </section>
            <section className="reveal js-lift rounded-2xl border border-line p-6">
              <h3 className="text-sm font-medium text-acid">Peran</h3>
              <p className="mt-3 text-base leading-relaxed text-stone">
                {project.deskripsi.peran}
              </p>
            </section>
            <section className="reveal js-lift rounded-2xl border border-line p-6">
              <h3 className="text-sm font-medium text-acid">Hasil</h3>
              <p className="mt-3 text-base leading-relaxed text-stone">
                {project.deskripsi.hasil}
              </p>
            </section>
          </div>
          <div className="reveal mt-8">
            <Magnetic>
              <a
                href={project.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex rounded-full border border-line px-5 py-3 text-sm font-medium text-cream transition-colors hover:border-acid hover:text-acid"
              >
                {project.href.includes("github.com")
                  ? "Lihat di GitHub"
                  : "Buka situs"}
              </a>
            </Magnetic>
          </div>
        </section>
      </div>

      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-4 border-t border-line px-5 pt-8 md:px-8">
        {prev ? (
          <Magnetic strength={0.16}>
            <Link href={`/portofolio/${prev.slug}`} className="inline-block text-sm text-stone hover:text-cream">
              ← {prev.title}
            </Link>
          </Magnetic>
        ) : (
          <span />
        )}
        {next ? (
          <Magnetic strength={0.16}>
            <Link href={`/portofolio/${next.slug}`} className="inline-block text-sm text-stone hover:text-cream">
              {next.title} →
            </Link>
          </Magnetic>
        ) : (
          <span />
        )}
      </nav>
    </article>
  );
}
