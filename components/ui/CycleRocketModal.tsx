"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { serviceCycle } from "@/lib/data";
import { gsap } from "@/lib/gsap";
import { reducedMotion } from "@/lib/motion";

type CycleRocketModalProps = {
  index: number | null;
  onClose: () => void;
  onChange: (index: number) => void;
};

function BlackHole() {
  return (
    <div className="relative size-44">
      <div
        className="hole-halo absolute inset-[-55%] rounded-full"
        style={{
          background:
            "radial-gradient(circle, transparent 42%, rgba(212,255,63,0.16) 52%, rgba(125,211,252,0.12) 60%, transparent 72%)",
        }}
      />
      <div
        className="hole-ring absolute inset-[-22%] rounded-full"
        style={{
          border: "1px solid rgba(212,255,63,0.35)",
          boxShadow:
            "0 0 28px rgba(212,255,63,0.18), inset 0 0 24px rgba(0,0,0,0.9)",
        }}
      />
      <div
        className="hole-ring-slow absolute inset-[-8%] rounded-full"
        style={{
          border: "1px dashed rgba(246,244,239,0.18)",
        }}
      />
      <div className="absolute inset-0 rounded-full bg-black shadow-[0_0_50px_rgba(0,0,0,0.95)]" />
      <div
        className="absolute inset-[22%] rounded-full"
        style={{
          background:
            "radial-gradient(circle at 38% 32%, #1a1a1e 0%, #000 55%, #000 100%)",
        }}
      />
    </div>
  );
}

export function CycleRocketModal({
  index,
  onClose,
  onChange,
}: CycleRocketModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const holeRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const closingRef = useRef(false);
  const indexRef = useRef(index);
  const onChangeRef = useRef(onChange);
  const spinRef = useRef<gsap.core.Tween[]>([]);
  const [mounted, setMounted] = useState(false);
  const open = index !== null;
  const step = index === null ? serviceCycle[0] : serviceCycle[index];
  const nextIndex = index === null ? 0 : (index + 1) % serviceCycle.length;
  const prevIndex =
    index === null ? 0 : (index - 1 + serviceCycle.length) % serviceCycle.length;
  indexRef.current = index;
  onChangeRef.current = onChange;

  useEffect(() => {
    setMounted(true);
  }, []);

  const stopSpin = () => {
    spinRef.current.forEach((tween) => tween.kill());
    spinRef.current = [];
  };

  const close = useCallback(() => {
    if (closingRef.current) return;
    closingRef.current = true;

    const overlay = overlayRef.current;
    const panel = panelRef.current;
    const hole = holeRef.current;
    if (!overlay || !panel || reducedMotion()) {
      stopSpin();
      onClose();
      return;
    }

    gsap.killTweensOf([overlay, panel, hole]);
    const leave = gsap.timeline({
      onComplete: () => {
        stopSpin();
        onClose();
      },
    });
    leave.to(panel, {
      scale: 0.08,
      rotation: -12,
      opacity: 0,
      duration: 0.38,
      ease: "power3.in",
    });
    if (hole) {
      leave.to(
        hole,
        { scale: 1.15, opacity: 1, duration: 0.2, ease: "power2.out" },
        "<",
      );
      leave.to(hole, {
        scale: 0,
        opacity: 0,
        duration: 0.32,
        ease: "power3.in",
      });
    }
    leave.to(overlay, { opacity: 0, duration: 0.2 }, "-=0.12");
  }, [onClose]);

  useEffect(() => {
    if (!open || !mounted) {
      closingRef.current = false;
      return;
    }

    const overlay = overlayRef.current;
    const panel = panelRef.current;
    const hole = holeRef.current;
    if (!overlay || !panel) return;

    closingRef.current = false;
    document.body.style.overflow = "hidden";
    window.__lenis?.stop();
    closeBtnRef.current?.focus();

    gsap.killTweensOf([overlay, panel, hole]);
    stopSpin();

    if (reducedMotion()) {
      gsap.set(overlay, { opacity: 1 });
      gsap.set(panel, { scale: 1, opacity: 1, rotation: 0, clearProps: "transform" });
      if (hole) gsap.set(hole, { scale: 0.4, opacity: 0.35 });
    } else {
      gsap.set(overlay, { opacity: 0 });
      gsap.set(panel, { scale: 0.06, opacity: 0, rotation: 18 });
      if (hole) gsap.set(hole, { scale: 0, opacity: 1 });

      const rings = hole?.querySelectorAll(".hole-ring, .hole-ring-slow, .hole-halo");
      rings?.forEach((ring, i) => {
        const tween = gsap.to(ring, {
          rotation: i % 2 === 0 ? 360 : -360,
          duration: 7 + i * 3,
          ease: "none",
          repeat: -1,
        });
        spinRef.current.push(tween);
      });

      const enter = gsap.timeline();
      enter.to(overlay, { opacity: 1, duration: 0.24, ease: "power2.out" });
      if (hole) {
        enter.to(
          hole,
          { scale: 1.12, duration: 0.42, ease: "power3.out" },
          0.02,
        );
        enter.to(hole, { scale: 1, duration: 0.28, ease: "power2.inOut" });
      }
      enter.to(
        panel,
        { scale: 1, opacity: 1, rotation: 0, duration: 0.62, ease: "power4.out" },
        "-=0.12",
      );
      if (hole) {
        enter.to(
          hole,
          { scale: 0.42, opacity: 0.28, duration: 0.45, ease: "power2.out" },
          "-=0.35",
        );
      }
    }

    const onKey = (event: KeyboardEvent) => {
      const current = indexRef.current;
      if (event.key === "Escape") close();
      if (current === null) return;
      if (event.key === "ArrowRight") {
        onChangeRef.current((current + 1) % serviceCycle.length);
      }
      if (event.key === "ArrowLeft") {
        onChangeRef.current(
          (current - 1 + serviceCycle.length) % serviceCycle.length,
        );
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      stopSpin();
      gsap.killTweensOf([overlay, panel, hole]);
      document.body.style.overflow = "";
      window.__lenis?.start();
      window.removeEventListener("keydown", onKey);
    };
  }, [open, mounted, close]);

  if (!mounted || !open) return null;

  return createPortal(
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[80] flex items-center justify-center bg-black/82 px-4 py-8 backdrop-blur-sm"
      onClick={close}
      role="presentation"
    >
      <div
        className="relative w-full max-w-lg"
        onClick={(event) => event.stopPropagation()}
      >
        <div
          ref={holeRef}
          className="pointer-events-none absolute top-1/2 left-1/2 z-0 -translate-x-1/2 -translate-y-1/2"
        >
          <BlackHole />
        </div>

        <div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="cycle-void-title"
          className="relative z-10 overflow-hidden rounded-[1.6rem] border border-line bg-ink shadow-[0_28px_80px_rgba(0,0,0,0.55)]"
        >
          <div className="absolute inset-y-0 left-0 w-1.5 bg-acid" />
          <div
            className="pointer-events-none absolute -top-20 right-0 size-56 rounded-full opacity-25"
            style={{
              background:
                "radial-gradient(circle, rgba(212,255,63,0.22), transparent 68%)",
            }}
          />

          <div className="relative px-6 pt-6 pb-6 pl-7 md:px-8 md:pt-7 md:pb-7 md:pl-9">
            <div className="flex items-start justify-between gap-4">
              <p className="font-mono text-xs tracking-[0.18em] text-acid uppercase">
                Siklus {step.id} / 05
              </p>
              <button
                ref={closeBtnRef}
                type="button"
                onClick={close}
                className="shrink-0 rounded-full border border-line px-3 py-1 text-xs text-stone transition-colors hover:border-acid hover:text-acid"
              >
                Tutup
              </button>
            </div>

            <h2
              id="cycle-void-title"
              className="font-display mt-3 text-3xl font-extrabold tracking-[-0.03em]"
            >
              {step.title}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-cream/90 md:text-base">
              {step.detail}
            </p>

            <p className="mt-5 text-sm font-medium text-cream">Yang dikerjakan</p>
            <ul className="mt-2 space-y-2">
              {step.points.map((point) => (
                <li
                  key={point}
                  className="flex gap-3 text-sm leading-relaxed text-stone"
                >
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-acid" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>

            <div className="mt-5 rounded-2xl border border-line bg-void/70 px-4 py-3">
              <p className="text-xs tracking-wide text-acid uppercase">
                Hasil langkah
              </p>
              <p className="mt-1 text-sm leading-relaxed text-cream/90">
                {step.output}
              </p>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => onChange(prevIndex)}
                className="text-sm text-stone hover:text-cream"
              >
                ← {serviceCycle[prevIndex].title}
              </button>
              <button
                type="button"
                onClick={() => onChange(nextIndex)}
                className="rounded-full bg-acid px-4 py-2 text-sm font-semibold text-void"
              >
                Lanjut ke {serviceCycle[nextIndex].title}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}
