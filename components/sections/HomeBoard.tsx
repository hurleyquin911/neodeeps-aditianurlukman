"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { services, site, stats } from "@/lib/data";
import { projects } from "@/lib/projects";
import { accentStyle } from "@/lib/accents";
import { useLiftHover, useReveal } from "@/lib/motion";
import { StatCard } from "@/components/ui/StatCard";
import { Magnetic } from "@/components/ui/Magnetic";
import { HomeCharts } from "@/components/sections/HomeCharts";
import { BusinessCardModal } from "@/components/ui/BusinessCardModal";
import { ProjectCard } from "@/components/project/ProjectCard";

const shortcuts = [
  {
    href: "/layanan",
    kicker: "Layanan",
    title: "Empat fokus",
    body: "Fullstack, Android, desain, dan renewal sistem. Bisa dipisah, lebih kuat jika digabung.",
    accent: 4,
  },
  {
    href: "/kontak",
    kicker: "Kontak",
    title: site.availability,
    body: site.email,
    accent: 5,
  },
] as const;

const featured = projects.slice(0, 3);

export function HomeBoard() {
  const rootRef = useRef<HTMLElement>(null);
  const [cardOpen, setCardOpen] = useState(false);
  useReveal(rootRef);
  useLiftHover(rootRef);

  return (
    <section
      ref={rootRef}
      className="mx-auto max-w-6xl px-5 pt-16 pb-20 md:px-8 md:pt-20 md:pb-28"
    >
      <div className="reveal flex flex-wrap items-end justify-between gap-4 pb-6">
        <div>
          <p className="kicker">Ringkasan</p>
          <h2 className="font-display mt-4 text-3xl font-bold md:text-4xl">
            Overview & <span className="text-spectrum">Highlights</span>
          </h2>
        </div>
        <p className="max-w-sm text-sm leading-relaxed text-stone">
          Rangkuman status, kapabilitas, dan distribusi karya sebagai gambaran
          cepat sebelum menjelajahi situs lebih jauh.
        </p>
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-3">
        {stats.map((stat, index) => (
          <StatCard
            key={stat.label}
            value={stat.value}
            label={stat.label}
            accent={index * 2}
          />
        ))}
      </div>

      <div className="mt-20">
        <div className="reveal flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="kicker" style={accentStyle(1)}>
              Karya pilihan
            </p>
            <h2 className="font-display mt-4 text-3xl font-bold md:text-4xl">
              Proyek terbaru
            </h2>
          </div>
          <Link
            href="/portofolio"
            className="rounded-full border border-aqua/40 bg-aqua/10 px-4 py-2 text-sm font-medium text-aqua transition-colors hover:bg-aqua hover:text-void"
          >
            Semua {projects.length} karya →
          </Link>
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((project, index) => (
            <ProjectCard key={project.slug} project={project} index={index} />
          ))}
        </div>
      </div>

      <div className="mt-20">
        <div className="reveal">
          <p className="kicker" style={accentStyle(2)}>
            Data
          </p>
          <h2 className="font-display mt-4 text-3xl font-bold md:text-4xl">
            Distribusi & produk tayang
          </h2>
        </div>
        <HomeCharts />
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-3">
        <button
          type="button"
          onClick={() => setCardOpen(true)}
          style={accentStyle(3)}
          className="js-lift reveal tint block w-full cursor-pointer rounded-2xl p-5 text-left"
        >
          <p className="accent-text text-sm font-semibold">Tentang</p>
          <h3 className="font-display mt-2 text-xl font-bold">{site.name}</h3>
          <p className="mt-2 text-sm leading-relaxed text-stone">
            {site.role}. Satu alur dari desain sampai sistem.
          </p>
          <p className="accent-text mt-4 text-sm font-medium">Kartu nama →</p>
        </button>
        {shortcuts.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            style={accentStyle(item.accent)}
            className="js-lift reveal tint block rounded-2xl p-5"
          >
            <p className="accent-text text-sm font-semibold">{item.kicker}</p>
            <h3 className="font-display mt-2 text-xl font-bold">{item.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-stone">{item.body}</p>
            <p className="accent-text mt-4 text-sm font-medium">Buka →</p>
          </Link>
        ))}
      </div>

      <BusinessCardModal open={cardOpen} onClose={() => setCardOpen(false)} />

      <div className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
        <div className="reveal tint tint-static overflow-hidden rounded-2xl">
          <div className="flex items-center justify-between border-b border-line px-5 py-3">
            <p className="text-sm font-semibold text-cream">Indeks karya</p>
            <Link
              href="/portofolio"
              className="text-sm text-acid hover:underline"
            >
              Semua
            </Link>
          </div>
          <ul>
            {projects.map((project) => (
              <li
                key={project.slug}
                style={accentStyle(project.palette.accent)}
                className="border-b border-line last:border-b-0"
              >
                <Link
                  href={`/portofolio/${project.slug}`}
                  className="group grid grid-cols-[auto_1fr_auto] items-center gap-4 px-5 py-3.5 text-sm transition-colors hover:bg-[color-mix(in_oklab,var(--accent)_10%,transparent)]"
                >
                  <span className="accent-text font-mono font-semibold">{project.id}</span>
                  <span>
                    <span className="font-medium text-cream transition-colors group-hover:text-[var(--accent)]">
                      {project.title}
                    </span>
                    <span className="mt-0.5 block text-stone">
                      {project.category}
                    </span>
                  </span>
                  <span className="flex items-center gap-3 text-stone">
                    {project.year}
                    <span className="accent-bg size-2 rounded-full opacity-60 transition-opacity group-hover:opacity-100" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-4">
          <div
            className="js-lift reveal tint flex-1 rounded-2xl p-5"
            style={accentStyle(2)}
          >
            <p className="accent-text text-sm font-semibold">Layanan</p>
            <ul className="mt-4 space-y-4">
              {services.map((service, index) => (
                <li
                  key={service.id}
                  style={accentStyle(index + 1)}
                  className="flex items-center gap-3"
                >
                  <span className="accent-text grid size-9 shrink-0 place-items-center rounded-xl bg-[color-mix(in_oklab,var(--accent)_14%,transparent)] font-mono text-xs font-bold">
                    {service.id}
                  </span>
                  <p className="font-display text-lg font-bold">{service.title}</p>
                </li>
              ))}
            </ul>
            <Link
              href="/layanan"
              className="mt-6 inline-block text-sm font-medium text-cream hover:text-grape"
            >
              Rincian layanan →
            </Link>
          </div>
          <div
            className="js-lift reveal tint relative overflow-hidden rounded-2xl p-5"
            style={accentStyle(0)}
          >
            <span className="bg-spectrum pointer-events-none absolute inset-x-0 top-0 h-1" />
            <p className="accent-text flex items-center gap-2 text-sm font-semibold">
              <span className="accent-bg size-2 animate-pulse rounded-full" />
              Sekarang
            </p>
            <p className="font-display mt-2 text-lg font-bold">
              {site.availability}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-stone">
              {site.location}. Proyek terpilih: web, Android, dan perawatan sistem.
            </p>
            <Magnetic className="mt-4 inline-block">
              <Link
                href="/kontak"
                className="bg-spectrum inline-flex rounded-full px-4 py-2 text-sm font-bold text-void"
              >
                Mulai percakapan
              </Link>
            </Magnetic>
          </div>
        </div>
      </div>
    </section>
  );
}
