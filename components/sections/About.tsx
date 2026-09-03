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
import { useLiftHover, useReveal } from "@/lib/motion";
import { StatCard } from "@/components/ui/StatCard";

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
      <p className="reveal text-sm font-medium text-acid">Tentang</p>
      <h1 className="reveal font-display mt-3 text-[clamp(1.8rem,4vw,3rem)] leading-tight font-extrabold tracking-[-0.03em]">
        Visual yang kuat harus terasa, bukan hanya terlihat.
      </h1>
      <p className="reveal mt-3 text-base text-stone">
        {site.name} · {site.role} · {site.location}
      </p>

      <div className="mt-8 max-w-3xl space-y-4 text-base leading-relaxed text-cream/85 md:text-lg">
        {site.about.map((paragraph) => (
          <p key={paragraph} className="reveal">
            {paragraph}
          </p>
        ))}
      </div>

      <div className="reveal mt-12 grid gap-4 sm:grid-cols-3">
        {stats.map((stat) => (
          <StatCard key={stat.label} value={stat.value} label={stat.label} />
        ))}
      </div>

      <section className="mt-16">
        <h2 className="reveal font-display text-2xl font-bold">Cara saya memutuskan</h2>
        <p className="reveal mt-2 max-w-2xl text-sm leading-relaxed text-stone md:text-base">
          Empat pegangan yang saya pakai saat merancang dan menulis kode. Kalau
          sebuah keputusan tidak lolos di sini, biasanya saya undur.
        </p>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {principles.map((item) => (
            <article
              key={item.title}
              className="js-lift reveal rounded-2xl border border-line bg-ink p-6"
            >
              <h3 className="font-display text-xl font-bold">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-stone">
                {item.body}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-16">
        <h2 className="reveal font-display text-2xl font-bold">Jejak kerja</h2>
        <p className="reveal mt-2 max-w-2xl text-sm leading-relaxed text-stone md:text-base">
          Bukan CV lengkap - ini konteks: di mana saya belajar merancang,
          membangun, dan menyelesaikan.
        </p>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {experience.map((item) => (
            <article
              key={item.place}
              className="js-lift reveal rounded-2xl border border-line p-5"
            >
              <p className="text-sm text-acid">{item.period}</p>
              <h3 className="font-display mt-2 text-xl font-bold">{item.role}</h3>
              <p className="mt-1 text-sm text-cream">{item.place}</p>
              <p className="mt-3 text-sm leading-relaxed text-stone">
                {item.detail}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-16">
        <h2 className="reveal font-display text-2xl font-bold">Alat yang dipakai</h2>
        <p className="reveal mt-2 max-w-2xl text-sm leading-relaxed text-stone md:text-base">
          Stack mengikuti masalah, bukan sebaliknya. Yang di bawah ini yang paling
          sering ada di meja.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {toolGroups.map((group) => (
            <article
              key={group.group}
              className="js-lift reveal rounded-2xl border border-line bg-ink p-5"
            >
              <h3 className="text-sm font-medium text-acid">{group.group}</h3>
              <p className="mt-3 text-base leading-relaxed text-cream">
                {group.items.join(" · ")}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-16 mb-4">
        <h2 className="reveal font-display text-2xl font-bold">Cara kerja sama</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {workingNotes.map((item) => (
            <article
              key={item.title}
              className="js-lift reveal rounded-2xl border border-line p-5"
            >
              <h3 className="font-display text-lg font-bold">{item.title}</h3>
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
