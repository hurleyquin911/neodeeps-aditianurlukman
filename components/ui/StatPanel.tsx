"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { reducedMotion } from "@/lib/motion";

type Stat = { value: string; label: string };

export function StatPanel({
  stats,
  caption,
}: {
  stats: readonly Stat[];
  caption?: string;
}) {
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (reducedMotion()) return;
      gsap.utils.toArray<HTMLElement>(".stat-num").forEach((el) => {
        const target = Number.parseInt(el.dataset.target ?? "", 10);
        if (Number.isNaN(target)) return;
        const suffix = el.dataset.suffix ?? "";
        const state = { n: 0 };
        gsap.to(state, {
          n: target,
          duration: 1.4,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 90%", once: true },
          onUpdate: () => {
            el.textContent = `${String(Math.round(state.n)).padStart(2, "0")}${suffix}`;
          },
        });
      });
    },
    { scope: rootRef },
  );

  return (
    <div
      ref={rootRef}
      className="relative overflow-hidden rounded-[1.75rem] bg-[#141414] p-7 text-white shadow-[0_30px_70px_-40px_rgba(0,0,0,0.6)] md:p-8"
    >
      <span
        aria-hidden
        className="pointer-events-none absolute -top-24 -right-20 size-64 rounded-full bg-white/[0.07] blur-3xl"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "radial-gradient(#fff 1px, transparent 1px)",
          backgroundSize: "18px 18px",
        }}
      />

      <p className="relative font-mono text-[11px] font-semibold tracking-[0.2em] text-white/50 uppercase">
        Dalam angka
      </p>

      <ul className="relative mt-4 divide-y divide-white/12">
        {stats.map((stat) => {
          const suffix = stat.value.replace(/[0-9]/g, "");
          const target = Number.parseInt(stat.value, 10);
          return (
            <li
              key={stat.label}
              className="flex items-baseline justify-between gap-4 py-5 first:pt-3 last:pb-1"
            >
              <p
                className="stat-num font-display text-[clamp(2.8rem,5vw,3.8rem)] leading-none font-semibold tracking-[-0.04em] tabular-nums"
                data-target={Number.isNaN(target) ? undefined : target}
                data-suffix={suffix}
              >
                {stat.value}
              </p>
              <p className="max-w-[9rem] text-right text-sm leading-snug text-white/65">
                {stat.label}
              </p>
            </li>
          );
        })}
      </ul>

      {caption ? (
        <p className="relative mt-6 border-t border-white/12 pt-5 font-display text-lg text-white/90 italic">
          “{caption}”
        </p>
      ) : null}
    </div>
  );
}
