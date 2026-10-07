"use client";

import { useRef } from "react";
import {
  experience,
  principles,
  site,
  stats,
  toolGroups,
  workingNotes,
} from "@/lib/data";
import { accentStyle } from "@/lib/accents";
import { useLiftHover, useReveal } from "@/lib/motion";
import { StatCard } from "@/components/ui/StatCard";

function SectionHead({
  kicker,
  title,
  body,
  accent,
}: {
  kicker: string;
  title: string;
  body?: string;
  accent: number;
}) {
  return (
    <>
      <p className="reveal kicker" style={accentStyle(accent)}>
        {kicker}
      </p>
      <h2 className="reveal font-display mt-4 text-2xl font-bold md:text-3xl">{title}</h2>
      {body ? (
        <p className="reveal mt-2 max-w-2xl text-sm leading-relaxed text-stone md:text-base">
          {body}
        </p>
      ) : null}
    </>
  );
}

export function About() {
  const rootRef = useRef<HTMLElement>(null);
  useReveal(rootRef);
  useLiftHover(rootRef);

  return (
    <article
      ref={rootRef}
      id="about"
      className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24"
    >
      <p className="reveal kicker" style={accentStyle(2)}>
        Tentang
      </p>
      <h1 className="reveal font-display mt-5 max-w-4xl text-[clamp(2rem,4.6vw,3.6rem)] leading-[1.08] font-extrabold tracking-[-0.03em]">
        Visual yang kuat harus <span className="text-spectrum">terasa</span>,
        bukan hanya terlihat.
      </h1>
      <p className="reveal mt-4 flex flex-wrap gap-2 text-sm">
        {[site.name, site.role, site.location].map((item, index) => (
          <span
            key={item}
            style={accentStyle(index + 1)}
            className="chip rounded-full px-3 py-1"
          >
            {item}
          </span>
        ))}
      </p>

      <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
        <div className="space-y-4 text-base leading-relaxed text-cream/85 md:text-lg">
          {site.about.map((paragraph, index) => (
            <p
              key={paragraph}
              style={accentStyle(index + 1)}
              className="reveal border-l-2 border-[var(--accent)] pl-5"
            >
              {paragraph}
            </p>
          ))}
        </div>
        <div className="reveal grid content-start gap-4">
          {stats.map((stat, index) => (
            <StatCard
              key={stat.label}
              value={stat.value}
              label={stat.label}
              accent={index * 2}
            />
          ))}
        </div>
      </div>

      <section className="mt-20">
        <SectionHead
          accent={0}
          kicker="Prinsip"
          title="Cara saya memutuskan"
          body="Empat pegangan yang saya pakai saat merancang dan menulis kode. Kalau sebuah keputusan tidak lolos di sini, biasanya saya undur."
        />
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {principles.map((item, index) => (
            <article
              key={item.title}
              style={accentStyle(index + 1)}
              className="js-lift reveal tint rounded-2xl p-6"
            >
              <p className="accent-text font-mono text-sm font-bold">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="font-display mt-2 text-xl font-bold">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-stone">
                {item.body}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-20">
        <SectionHead
          accent={1}
          kicker="Pengalaman"
          title="Jejak kerja"
          body="Bukan CV lengkap - ini konteks: di mana saya belajar merancang, membangun, dan menyelesaikan."
        />
        <div className="relative mt-8 grid gap-6 md:grid-cols-3">
          <span className="pointer-events-none absolute top-0 left-6 hidden h-0.5 w-[calc(100%-3rem)] bg-gradient-to-r from-acid via-aqua to-grape opacity-50 md:block" />
          {experience.map((item, index) => (
            <article
              key={item.place}
              style={accentStyle(index * 2)}
              className="js-lift reveal tint relative rounded-2xl p-5 md:mt-5"
            >
              <span className="accent-bg absolute -top-[1.6rem] left-5 hidden size-3 rounded-full shadow-[0_0_12px_var(--accent)] md:block" />
              <p className="accent-text text-sm font-semibold">{item.period}</p>
              <h3 className="font-display mt-2 text-xl font-bold">{item.role}</h3>
              <p className="mt-1 text-sm text-cream">{item.place}</p>
              <p className="mt-3 text-sm leading-relaxed text-stone">
                {item.detail}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-20">
        <SectionHead
          accent={4}
          kicker="Toolkit"
          title="Alat yang dipakai"
          body="Stack mengikuti masalah, bukan sebaliknya. Yang di bawah ini yang paling sering ada di meja."
        />
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {toolGroups.map((group, index) => (
            <article
              key={group.group}
              style={accentStyle(index + 2)}
              className="js-lift reveal tint rounded-2xl p-5"
            >
              <h3 className="accent-text text-sm font-semibold">{group.group}</h3>
              <ul className="mt-3 flex flex-wrap gap-2">
                {group.items.map((tool) => (
                  <li key={tool} className="chip rounded-full px-3 py-1 text-sm">
                    {tool}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-20 mb-4">
        <SectionHead accent={3} kicker="Kolaborasi" title="Cara kerja sama" />
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {workingNotes.map((item, index) => (
            <article
              key={item.title}
              style={accentStyle(index + 3)}
              className="js-lift reveal tint rounded-2xl p-5"
            >
              <div className="flex items-center gap-3">
                <span className="accent-text grid size-8 place-items-center rounded-lg bg-[color-mix(in_oklab,var(--accent)_14%,transparent)] font-mono text-xs font-bold">
                  {index + 1}
                </span>
                <h3 className="font-display text-lg font-bold">{item.title}</h3>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-stone">
                {item.body}
              </p>
            </article>
          ))}
        </div>
      </section>
    </article>
  );
}
