"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { reducedMotion } from "@/lib/motion";
import { accentStyle } from "@/lib/accents";

export function StatCard({
  value,
  label,
  accent = 0,
}: {
  value: string;
  label: string;
  accent?: number;
}) {
  const numRef = useRef<HTMLParagraphElement>(null);
  const number = Number.parseInt(value, 10);
  const suffix = value.replace(/[0-9]/g, "");

  useGSAP(() => {
    if (reducedMotion() || !numRef.current || Number.isNaN(number)) return;
    const state = { n: 0 };
    gsap.to(state, {
      n: number,
      duration: 1.35,
      ease: "power2.out",
      scrollTrigger: {
        trigger: numRef.current,
        start: "top 88%",
        once: true,
      },
      onUpdate: () => {
        if (!numRef.current) return;
        numRef.current.textContent = `${String(Math.round(state.n)).padStart(2, "0")}${suffix}`;
      },
    });
  }, []);

  return (
    <div
      className="js-lift tint relative overflow-hidden rounded-2xl px-5 py-6"
      style={accentStyle(accent)}
    >
      <span className="accent-bg pointer-events-none absolute -top-10 -right-10 size-28 rounded-full opacity-20 blur-2xl" />
      <p
        ref={numRef}
        className="font-display accent-text text-5xl font-extrabold tracking-tight"
      >
        {value}
      </p>
      <p className="mt-2 text-sm text-cream/80">{label}</p>
      <span className="accent-bg mt-4 block h-1 w-10 rounded-full" />
    </div>
  );
}
