"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { services, site, skills, stats } from "@/lib/data";
import { projects } from "@/lib/projects";
import { useLiftHover, useReveal } from "@/lib/motion";
import { StatCard } from "@/components/ui/StatCard";
import { Magnetic } from "@/components/ui/Magnetic";
import { HomeCharts } from "@/components/sections/HomeCharts";
import { BusinessCardModal } from "@/components/ui/BusinessCardModal";

const shortcuts = [
  {
    href: "/layanan",
    kicker: "Layanan",
    title: "Empat fokus",
    body: "Fullstack, Android, desain, dan renewal sistem. Bisa dipisah, lebih kuat jika digabung.",
  },
  {
    href: "/kontak",
    kicker: "Kontak",
    title: site.availability,
    body: site.email,
  },
] as const;

export function HomeBoard() {
  const rootRef = useRef<HTMLElement>(null);
  const [cardOpen, setCardOpen] = useState(false);
  useReveal(rootRef);
  useLiftHover(rootRef);

  return (
    <section
      ref={rootRef}
      className="mx-auto max-w-6xl px-5 pb-20 md:px-8 md:pb-28"
    >
      <div className="reveal flex flex-wrap items-end justify-between gap-4 border-b border-line pb-6">
        <div>
          <p className="text-sm font-medium text-acid">Ringkasan</p>
          <h2 className="font-display mt-2 text-2xl font-bold md:text-3xl">
            Overview & Highlights
          </h2>
        </div>
        <p className="max-w-sm text-sm leading-relaxed text-stone">
          Rangkuman status, kapabilitas, dan distribusi karya sebagai gambaran
          cepat sebelum menjelajahi situs lebih jauh.
        </p>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {stats.map((stat) => (
          <StatCard key={stat.label} value={stat.value} label={stat.label} />
        ))}
      </div>

      <HomeCharts />

      <div className="mt-4 grid gap-4 md:grid-cols-3">
        <button
          type="button"
          onClick={() => setCardOpen(true)}
          className="js-lift reveal block w-full cursor-pointer rounded-2xl border border-line bg-ink p-5 text-left transition-colors hover:border-acid/40"
        >
          <p className="text-sm text-acid">Tentang</p>
          <h3 className="font-display mt-2 text-xl font-bold">{site.name}</h3>
          <p className="mt-2 text-sm leading-relaxed text-stone">
            {site.role}. Satu alur dari desain sampai sistem.
          </p>
          <p className="mt-4 text-sm font-medium text-cream">Kartu nama →</p>
        </button>
        {shortcuts.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="js-lift reveal block rounded-2xl border border-line bg-ink p-5 transition-colors hover:border-acid/40"
          >
            <p className="text-sm text-acid">{item.kicker}</p>
            <h3 className="font-display mt-2 text-xl font-bold">{item.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-stone">{item.body}</p>
            <p className="mt-4 text-sm font-medium text-cream">Buka →</p>
          </Link>
        ))}
      </div>

      <BusinessCardModal open={cardOpen} onClose={() => setCardOpen(false)} />

      <div className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
        <div className="reveal overflow-hidden rounded-2xl border border-line">
          <div className="flex items-center justify-between border-b border-line px-5 py-3">
            <p className="text-sm font-medium text-cream">Indeks karya</p>
            <Link
              href="/portofolio"
              className="text-sm text-acid hover:underline"
            >
              Semua
            </Link>
          </div>
          <ul>
            {projects.map((project) => (
              <li key={project.slug} className="border-b border-line last:border-b-0">
                <Link
                  href={`/portofolio/${project.slug}`}
                  className="grid grid-cols-[auto_1fr_auto] items-center gap-4 px-5 py-3.5 text-sm transition-colors hover:bg-cream/5"
                >
                  <span className="font-mono text-acid">{project.id}</span>
                  <span>
                    <span className="font-medium text-cream">{project.title}</span>
                    <span className="mt-0.5 block text-stone">
                      {project.category}
                    </span>
                  </span>
                  <span className="text-stone">{project.year}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-4">
          <div className="js-lift reveal flex-1 rounded-2xl border border-line bg-ink p-5">
            <p className="text-sm text-acid">Layanan</p>
            <ul className="mt-4 space-y-4">
              {services.map((service) => (
                <li key={service.id}>
                  <p className="font-mono text-xs text-stone">{service.id}</p>
                  <p className="font-display text-lg font-bold">{service.title}</p>
                </li>
              ))}
            </ul>
            <Link
              href="/layanan"
              className="mt-6 inline-block text-sm font-medium text-cream hover:text-acid"
            >
              Rincian layanan →
            </Link>
          </div>
          <div className="js-lift reveal rounded-2xl border border-line p-5">
            <p className="text-sm text-acid">Sekarang</p>
            <p className="font-display mt-2 text-lg font-bold">
              {site.availability}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-stone">
              {site.location}. Proyek terpilih: web, Android, dan perawatan sistem.
            </p>
            <Magnetic className="mt-4 inline-block">
              <Link
                href="/kontak"
                className="inline-flex rounded-full bg-acid px-4 py-2 text-sm font-semibold text-void"
              >
                Mulai percakapan
              </Link>
            </Magnetic>
          </div>
        </div>
      </div>

      <div className="reveal mt-4 rounded-2xl border border-line px-5 py-5">
        <p className="text-sm text-acid">Stack yang sering dipakai</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {skills.map((skill) => (
            <span
              key={skill}
              className="rounded-full border border-line bg-ink px-3 py-1.5 text-sm text-cream"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
