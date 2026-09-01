"use client";

import { useRef } from "react";
import { site } from "@/lib/data";
import { gsap, useGSAP } from "@/lib/gsap";
import { useIntro } from "@/lib/intro-context";

export function Preloader() {
  const rootRef = useRef<HTMLDivElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const { setReady } = useIntro();

  useGSAP(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      gsap.set(rootRef.current, { autoAlpha: 0 });
      setReady(true);
      return;
    }

    const counter = { value: 0 };
    const tl = gsap.timeline({
      onComplete: () => {
        setReady(true);
      },
    });

    tl.to(counter, {
      value: 100,
      duration: 1.7,
      ease: "power3.inOut",
      onUpdate: () => {
        if (countRef.current) {
          countRef.current.textContent = String(Math.round(counter.value)).padStart(
            2,
            "0",
          );
        }
      },
    })
      .to(
        barRef.current,
        { scaleX: 1, duration: 1.7, ease: "power3.inOut" },
        0,
      )
      .to(
        rootRef.current,
        {
          yPercent: -100,
          duration: 1.05,
          ease: "power4.inOut",
          onComplete: () => {
            gsap.set(rootRef.current, { autoAlpha: 0, pointerEvents: "none" });
          },
        },
        "+=0.12",
      );
  }, []);

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[90] flex flex-col justify-between bg-void px-5 py-6 text-cream md:px-10 md:py-8"
      aria-hidden
    >
      <div className="flex items-start justify-between">
        <p className="font-display text-xs font-semibold tracking-[0.28em] uppercase">
          {site.brand}
        </p>
        <p className="font-mono text-[11px] tracking-widest text-stone uppercase">
          Loading
        </p>
      </div>

      <div className="flex items-end justify-between gap-6">
        <h2 className="font-display text-[clamp(3rem,10vw,8rem)] leading-[0.8] font-extrabold tracking-[-0.06em]">
          {site.brand}
        </h2>
        <span
          ref={countRef}
          className="font-display text-[clamp(3rem,10vw,8rem)] leading-none font-extrabold tracking-[-0.07em]"
        >
          00
        </span>
      </div>

      <div className="h-px w-full origin-left overflow-hidden bg-line">
        <div
          ref={barRef}
          className="h-px w-full origin-left scale-x-0 bg-acid"
        />
      </div>
    </div>
  );
}
