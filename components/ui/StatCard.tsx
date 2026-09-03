"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { reducedMotion } from "@/lib/motion";

export function StatCard({ value, label }: { value: string; label: string }) {
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
    <div className="js-lift rounded-2xl border border-line bg-ink px-5 py-6">
      <p
        ref={numRef}
        className="font-display text-4xl font-extrabold tracking-tight"
      >
        {value}
      </p>
      <p className="mt-2 text-sm text-stone">{label}</p>
    </div>
  );
}
