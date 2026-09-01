"use client";

import { skills } from "@/lib/data";

export function Marquee() {
  const row = [...skills, ...skills];

  return (
    <section
      className="relative overflow-hidden border-y border-line py-5"
      aria-hidden
    >
      <div className="marquee-track flex w-max gap-10">
        {row.map((skill, index) => (
          <span
            key={`${skill}-${index}`}
            className="font-display flex items-center gap-10 text-sm font-semibold tracking-[0.22em] text-stone uppercase"
          >
            {skill}
            <span className="text-acid">●</span>
          </span>
        ))}
      </div>
    </section>
  );
}
