"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { reducedMotion } from "@/lib/motion";
import { projects } from "@/lib/projects";
import { PlayStoreShowcase } from "@/components/sections/PlayStoreShowcase";

function bucket(category: string) {
  if (category.includes("Mobile")) return "Mobile";
  if (category.includes("AI")) return "AI";
  if (category.includes("Media")) return "Motion";
  if (category.includes("Community")) return "Komunitas";
  return "Web";
}

/** Skala abu — tetap bisa dibedakan, tetap hitam-putih. */
const GRAYS = ["#171717", "#3f3f46", "#71717a", "#a1a1aa", "#d4d4d8"];

const mix = Object.entries(
  projects.reduce<Record<string, number>>((acc, project) => {
    const key = bucket(project.category);
    acc[key] = (acc[key] ?? 0) + 1;
    return acc;
  }, {}),
).map(([label, value], index) => ({
  label,
  value,
  color: GRAYS[index % GRAYS.length],
}));

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
      <circle cx="80" cy="80" r={R} fill="none" stroke="rgba(23,23,23,0.08)" strokeWidth="16" />
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
      <text x="80" y="76" textAnchor="middle" fill="#171717" fontSize="22" fontWeight="700">
        {String(total).padStart(2, "0")}
      </text>
      <text x="80" y="94" textAnchor="middle" fill="#737373" fontSize="10">
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
      className="mt-8 grid gap-4 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.7fr)]"
    >
      <div className="flex flex-col gap-4">
        <article className="reveal tint tint-static rounded-2xl p-5">
          <p className="text-sm font-semibold text-cream">Komposisi karya</p>
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

        <article className="reveal tint tint-static rounded-2xl p-5">
          <p className="text-sm font-semibold text-cream">Ritme eksplorasi</p>
          <p className="mt-1 text-sm text-stone">
            Intensitas percobaan, bukan metrik produksi.
          </p>
          <svg viewBox="0 0 240 120" className="mt-6 w-full" aria-hidden>
            <defs>
              <linearGradient id="spark-fill" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#171717" stopOpacity="0.12" />
                <stop offset="100%" stopColor="#171717" stopOpacity="0" />
              </linearGradient>
            </defs>
            <line x1="8" y1="100" x2="232" y2="100" stroke="rgba(23,23,23,0.12)" />
            <polygon
              fill="url(#spark-fill)"
              points={`16,100 ${spark
                .map((y, i) => `${16 + i * 30},${100 - y}`)
                .join(" ")} ${16 + (spark.length - 1) * 30},100`}
            />
            <polyline
              className="chart-line"
              fill="none"
              stroke="#171717"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
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
                fill="#ffffff"
                stroke="#171717"
                strokeWidth="1.8"
              />
            ))}
          </svg>
          <div className="mt-2 flex justify-between text-xs text-stone">
            <span>Awal</span>
            <span>Sekarang</span>
          </div>
        </article>
      </div>

      <PlayStoreShowcase />
    </div>
  );
}
