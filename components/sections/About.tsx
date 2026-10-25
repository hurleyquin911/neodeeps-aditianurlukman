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
import { StatPanel } from "@/components/ui/StatPanel";

const aboutLabels = ["Yang saya bangun", "Cara berpikir", "Proyek yang cocok"];

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

      <div className="mt-12 grid items-start gap-12 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] lg:gap-14">
        <div>
          <p className="reveal font-display text-[clamp(1.35rem,2.4vw,1.85rem)] leading-[1.4] tracking-[-0.015em] text-cream">
            {site.about[0]}
          </p>

          <dl className="mt-10 divide-y divide-line border-y border-line">
            {site.about.slice(1).map((paragraph, index) => (
              <div
                key={paragraph}
                className="reveal grid gap-2 py-6 md:grid-cols-[8.5rem_minmax(0,1fr)] md:gap-8"
              >
                <dt className="flex items-center gap-3 md:items-start md:pt-1">
                  <span className="font-mono text-xs font-bold text-stone">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="text-xs font-semibold tracking-[0.14em] text-cream uppercase">
                    {aboutLabels[index] ?? "Catatan"}
                  </span>
                </dt>
                <dd className="text-[0.95rem] leading-relaxed text-stone md:text-base">
                  {paragraph}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="reveal lg:sticky lg:top-28">
          <StatPanel stats={stats} caption={site.tagline} />
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
          title="Tools yang digunakan"
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
        <SectionHead
          accent={3}
          kicker="Kolaborasi"
          title="Dari brief sampai dirawat"
          body="Bukan metodologi powerpoint. Ini urutan yang saya pakai supaya desain tidak lepas dari kode, dan rilis tidak berarti ditinggal."
        />
        <ol className="reveal relative mt-10 space-y-0 border-l border-line md:ml-2">
          {workingNotes.map((item, index) => (
            <li
              key={item.title}
              style={accentStyle(index + 3)}
              className="relative grid gap-3 py-6 pl-8 last:pb-0 md:grid-cols-[5.5rem_minmax(0,1fr)] md:gap-8 md:pl-10"
            >
              <span
                aria-hidden
                className="accent-bg absolute top-7 -left-[5px] size-2.5 rounded-full ring-4 ring-[var(--bg)]"
              />
              <p className="font-mono text-xs font-bold tracking-widest text-stone uppercase md:pt-1">
                Langkah {String(index + 1).padStart(2, "0")}
              </p>
              <div>
                <h3 className="font-display text-xl font-bold tracking-[-0.02em] md:text-2xl">
                  {item.title}
                </h3>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-stone md:text-base">
                  {item.body}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </section>
    </article>
  );
}
