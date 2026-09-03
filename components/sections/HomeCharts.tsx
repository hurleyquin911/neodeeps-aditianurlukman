"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { reducedMotion } from "@/lib/motion";
import { playStoreApps } from "@/lib/data";
import { projects } from "@/lib/projects";
import { AppBadge } from "@/components/sections/AppBadge";

function bucket(category: string) {
  if (category.includes("Mobile")) return "Mobile";
  if (category.includes("AI")) return "AI";
  if (category.includes("Media")) return "Motion";
  if (category.includes("Community")) return "Komunitas";
  return "Web";
}

const COLORS: Record<string, string> = {
  Mobile: "#5eead4",
  AI: "#d4ff3f",
  Motion: "#fdba74",
  Web: "#93c5fd",
  Komunitas: "#f6f4ef",
};

const mix = Object.entries(
  projects.reduce<Record<string, number>>((acc, project) => {
    const key = bucket(project.category);
    acc[key] = (acc[key] ?? 0) + 1;
    return acc;
  }, {}),
).map(([label, value]) => ({ label, value, color: COLORS[label] ?? "#c5c0b6" }));

const total = mix.reduce((sum, item) => sum + item.value, 0);

const R = 54;
const C = 2 * Math.PI * R;

function Donut() {
  let offset = 0;
  const slices = mix.map((item) => {
    const length = (item.value / total) * C;
    const slice = { ...item, length, offset };
    offset += length;
    return slice;
  });

  return (
    <svg viewBox="0 0 160 160" className="mx-auto size-40" aria-hidden>
      <circle cx="80" cy="80" r={R} fill="none" stroke="rgba(246,244,239,0.08)" strokeWidth="16" />
      <g transform="rotate(-90 80 80)">
        {slices.map((slice) => (
          <circle
            key={slice.label}
            className="chart-arc"
            cx="80"
            cy="80"
            r={R}
            fill="none"
            stroke={slice.color}
            strokeWidth="16"
            strokeDasharray={`${slice.length} ${C - slice.length}`}
            strokeDashoffset={-slice.offset}
            strokeLinecap="butt"
          />
        ))}
      </g>
      <text x="80" y="76" textAnchor="middle" fill="#f6f4ef" fontSize="22" fontWeight="800">
        {String(total).padStart(2, "0")}
      </text>
      <text x="80" y="94" textAnchor="middle" fill="#c5c0b6" fontSize="10">
        karya
      </text>
    </svg>
  );
}

export function HomeCharts() {
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (reducedMotion()) return;

      gsap.from(".chart-arc", {
        opacity: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: "power2.out",
        immediateRender: false,
        scrollTrigger: { trigger: rootRef.current, start: "top 82%", once: true },
      });

      gsap.from(".play-app", {
        y: 12,
        duration: 0.55,
        stagger: 0.08,
        ease: "power3.out",
        immediateRender: false,
        scrollTrigger: { trigger: rootRef.current, start: "top 82%", once: true },
      });

      gsap.fromTo(
        ".chart-line",
        { strokeDashoffset: 400 },
        {
          strokeDashoffset: 0,
          duration: 1.2,
          ease: "power2.out",
          immediateRender: false,
          scrollTrigger: { trigger: rootRef.current, start: "top 82%", once: true },
        },
      );

      gsap.from(".chart-plot", {
        scale: 0,
        transformOrigin: "center",
        duration: 0.45,
        stagger: 0.06,
        ease: "back.out(1.6)",
        immediateRender: false,
        scrollTrigger: { trigger: rootRef.current, start: "top 82%", once: true },
      });
    },
    { scope: rootRef },
  );

  const spark = [18, 28, 22, 36, 32, 44, 40, 52];

  return (
    <div
      ref={rootRef}
      className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.7fr)]"
    >
      <div className="flex flex-col gap-4">
        <article className="reveal rounded-2xl border border-line bg-ink p-5">
          <p className="text-sm text-acid">Komposisi karya</p>
          <p className="mt-1 text-sm text-stone">
            Pembagian dari {total} studi kasus di portofolio.
          </p>
          <div className="mt-4">
            <Donut />
          </div>
          <ul className="mt-2 space-y-1.5 text-sm">
            {mix.map((item) => (
              <li key={item.label} className="flex items-center justify-between gap-3">
                <span className="flex items-center gap-2 text-cream">
                  <span
                    className="size-2 rounded-full"
                    style={{ background: item.color }}
                  />
                  {item.label}
                </span>
                <span className="font-mono text-stone">
                  {item.value} · {Math.round((item.value / total) * 100)}%
                </span>
              </li>
            ))}
          </ul>
        </article>

        <article className="reveal rounded-2xl border border-line bg-ink p-5">
          <p className="text-sm text-acid">Ritme eksplorasi</p>
          <p className="mt-1 text-sm text-stone">
            Intensitas percobaan, bukan metrik produksi.
          </p>
          <svg viewBox="0 0 240 120" className="mt-6 w-full" aria-hidden>
            <line x1="8" y1="100" x2="232" y2="100" stroke="rgba(246,244,239,0.12)" />
            <polyline
              className="chart-line"
              fill="none"
              stroke="#d4ff3f"
              strokeWidth="2"
              strokeDasharray="400"
              strokeDashoffset="0"
              points={spark
                .map((y, i) => `${16 + i * 30},${100 - y}`)
                .join(" ")}
            />
            {spark.map((y, i) => (
              <circle
                key={i}
                className="chart-plot"
                cx={16 + i * 30}
                cy={100 - y}
                r="3.5"
                fill="#0c0c0e"
                stroke="#d4ff3f"
                strokeWidth="1.6"
              />
            ))}
          </svg>
          <div className="mt-2 flex justify-between text-xs text-stone">
            <span>Awal</span>
            <span>Sekarang</span>
          </div>
        </article>
      </div>

      <article className="reveal rounded-2xl border border-line bg-ink p-5 md:p-6">
        <p className="text-sm text-acid">Play Store</p>
        <p className="mt-1 text-sm text-stone">
          Aplikasi yang pernah tayang di Google Play.
        </p>

        <ul className="relative mt-6">
          <span
            aria-hidden
            className="absolute top-3 bottom-6 left-[3.3rem] w-px bg-[#c4b8a4]/70 md:left-[3.55rem]"
          />
          {playStoreApps.map((app) => (
            <li key={app.packageId} className="play-app">
              <a
                href={`https://play.google.com/store/apps/details?id=${app.packageId}`}
                target="_blank"
                rel="noreferrer"
                className="grid grid-cols-[2.75rem_1.1rem_minmax(0,1fr)] items-start gap-x-2 rounded-xl py-2.5 pr-1 transition-colors hover:bg-cream/5 md:grid-cols-[3rem_1.1rem_minmax(0,1fr)] md:gap-x-3"
              >
                <AppBadge mark={app.id} />
                <span className="relative mt-3 flex justify-center">
                  <span className="size-2.5 rounded-full bg-[#c4b8a4] ring-4 ring-ink" />
                </span>
                <span className="min-w-0 pt-0.5">
                  <span className="block font-serif text-[1.05rem] leading-snug font-bold text-cream md:text-lg">
                    {app.name}{" "}
                    <span className="font-normal text-stone">({app.packageId})</span>
                  </span>
                  <span className="mt-1 block pl-3 text-sm leading-relaxed text-stone">
                    <span className="mr-1.5 text-cream/70">•</span>
                    {app.blurb}
                  </span>
                </span>
              </a>
            </li>
          ))}
        </ul>

        <p className="mt-5 text-sm leading-relaxed text-stone">
          Lima produk mobile yang sudah pernah diunggah ke Play Store. Klik
          untuk membuka listing masing-masing.
        </p>
      </article>
    </div>
  );
}
