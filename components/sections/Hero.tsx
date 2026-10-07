"use client";

import { useRef } from "react";
import Link from "next/link";
import { playStoreApps, site } from "@/lib/data";
import { projects } from "@/lib/projects";
import { accentStyle } from "@/lib/accents";
import { gsap, useGSAP } from "@/lib/gsap";
import { reducedMotion } from "@/lib/motion";
import { Magnetic } from "@/components/ui/Magnetic";

const focus = [
  { label: "Web App", accent: 1 },
  { label: "Android", accent: 5 },
  { label: "UI Design", accent: 2 },
  { label: "Renewal", accent: 3 },
] as const;

const orbitNodes = [
  { cx: 160, cy: 28, r: 6, color: "#d4ff3f" },
  { cx: 292, cy: 160, r: 5, color: "#38bdf8" },
  { cx: 160, cy: 292, r: 5.5, color: "#fb7185" },
  { cx: 28, cy: 160, r: 4.5, color: "#a78bfa" },
  { cx: 253, cy: 67, r: 3.5, color: "#fbbf24" },
  { cx: 67, cy: 253, r: 3.5, color: "#34d399" },
];

export function Hero() {
  const rootRef = useRef<HTMLElement>(null);
  const words = site.name.split(" ");

  useGSAP(
    () => {
      if (reducedMotion()) return;

      gsap.from(".hero-kicker", {
        y: 12,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out",
      });
      gsap.from(".hero-word", {
        yPercent: 70,
        duration: 0.85,
        stagger: 0.08,
        ease: "power4.out",
        delay: 0.08,
      });
      gsap.from(".hero-copy", {
        y: 18,
        duration: 0.7,
        stagger: 0.08,
        delay: 0.28,
        ease: "power3.out",
      });
      gsap.from(".hero-node", {
        scale: 0,
        transformOrigin: "center",
        duration: 0.5,
        stagger: 0.08,
        delay: 0.35,
        ease: "back.out(1.7)",
      });
      gsap.from(".hero-float", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        delay: 0.45,
        ease: "power3.out",
      });
      gsap.to(".hero-orbit", {
        rotate: 360,
        transformOrigin: "50% 50%",
        duration: 60,
        repeat: -1,
        ease: "none",
      });
    },
    { scope: rootRef },
  );

  return (
    <section
      ref={rootRef}
      id="top"
      className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 py-16 md:px-8 md:py-24 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)]"
    >
      <div>
        <p className="hero-kicker kicker" style={accentStyle("#34d399")}>
          {site.availability}
        </p>
        <h1 className="font-display mt-6 text-[clamp(2.6rem,6.4vw,5rem)] leading-[1.02] font-extrabold tracking-[-0.045em]">
          {words.map((word, index) => (
            <span key={word} className="inline-block overflow-hidden pr-[0.24em] pb-[0.06em]">
              <span
                className={`hero-word inline-block ${
                  index === words.length - 1 ? "text-spectrum" : ""
                }`}
              >
                {word}
              </span>
            </span>
          ))}
        </h1>
        <p className="hero-copy mt-3 text-lg font-medium text-cream/90 md:text-xl">
          {site.role}
        </p>
        <p className="hero-copy mt-5 max-w-xl text-base leading-relaxed text-stone md:text-lg">
          {site.bio}
        </p>

        <ul className="hero-copy mt-6 flex flex-wrap gap-2">
          {focus.map((item) => (
            <li
              key={item.label}
              style={accentStyle(item.accent)}
              className="chip rounded-full px-3 py-1.5 text-sm font-medium"
            >
              {item.label}
            </li>
          ))}
        </ul>

        <div className="hero-copy mt-9 flex flex-wrap gap-3">
          <Magnetic>
            <Link
              href="/portofolio"
              className="bg-spectrum inline-flex rounded-full px-6 py-3 text-sm font-bold text-void shadow-[0_12px_40px_-12px_rgba(56,189,248,0.9)]"
            >
              Lihat karya →
            </Link>
          </Magnetic>
          <Magnetic strength={0.22}>
            <Link
              href="/kontak"
              className="inline-flex rounded-full border border-cream/20 bg-cream/5 px-6 py-3 text-sm font-semibold text-cream backdrop-blur-sm transition-colors hover:border-grape hover:text-grape"
            >
              Hubungi saya
            </Link>
          </Magnetic>
        </div>
      </div>

      <div className="relative mx-auto aspect-square w-full max-w-[26rem]" aria-hidden>
        <div className="absolute inset-[14%] rounded-full bg-[conic-gradient(from_90deg,#d4ff3f,#34d399,#38bdf8,#a78bfa,#fb7185,#fbbf24,#d4ff3f)] opacity-35 blur-3xl" />
        <svg viewBox="0 0 320 320" className="relative size-full">
          <g className="hero-orbit">
            <circle cx="160" cy="160" r="132" fill="none" stroke="rgba(246,244,239,0.12)" strokeDasharray="3 7" />
            <circle cx="160" cy="160" r="92" fill="none" stroke="rgba(167,139,250,0.35)" />
            <circle cx="160" cy="160" r="52" fill="none" stroke="rgba(56,189,248,0.35)" />
            {orbitNodes.map((node) => (
              <g key={`${node.cx}-${node.cy}`}>
                <line
                  x1="160"
                  y1="160"
                  x2={node.cx}
                  y2={node.cy}
                  stroke={node.color}
                  strokeOpacity="0.28"
                />
                <circle
                  className="hero-node"
                  cx={node.cx}
                  cy={node.cy}
                  r={node.r}
                  fill={node.color}
                  style={{ filter: `drop-shadow(0 0 6px ${node.color})` }}
                />
              </g>
            ))}
          </g>
          <circle cx="160" cy="160" r="26" fill="#0c0c0e" stroke="#d4ff3f" strokeWidth="1.5" />
          <text
            x="160"
            y="166"
            textAnchor="middle"
            fill="#f6f4ef"
            fontSize="16"
            fontWeight="800"
          >
            N
          </text>
        </svg>

        <div
          className="hero-float tint tint-static absolute top-[6%] -left-2 rounded-2xl px-4 py-3 md:-left-6"
          style={accentStyle(1)}
        >
          <div className="float-y">
            <p className="font-display accent-text text-2xl font-extrabold">
              {String(projects.length).padStart(2, "0")}
            </p>
            <p className="text-xs text-stone">Studi kasus</p>
          </div>
        </div>
        <div
          className="hero-float tint tint-static absolute top-[44%] -right-2 rounded-2xl px-4 py-3 md:-right-6"
          style={accentStyle(3)}
        >
          <div className="float-y [animation-delay:-1.6s]">
            <p className="font-display accent-text text-2xl font-extrabold">
              {String(playStoreApps.length).padStart(2, "0")}
            </p>
            <p className="text-xs text-stone">App di Play Store</p>
          </div>
        </div>
        <div
          className="hero-float tint tint-static absolute bottom-[4%] left-[12%] rounded-2xl px-4 py-3"
          style={accentStyle(2)}
        >
          <div className="float-y flex items-center gap-2 [animation-delay:-3.2s]">
            <span className="accent-bg size-2 animate-pulse rounded-full" />
            <p className="text-sm font-medium text-cream">{site.tagline}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
