"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { finePointer, reducedMotion } from "@/lib/motion";

const WIDTH = 32;
const HEIGHT = 27;
const LENS_X = 5;
const LENS_Y = 5;
/** Klik di pusat cahaya; senter di tepi, lensa mengarah ke situ. */
const HOTSPOT_X = 0;
const HOTSPOT_Y = 0;
const CORE = 240;
const DOT = 12;
const BACK_X = 0.81;
const BACK_Y = 0.59;
const RIM = 54;
const IMG_LEFT = BACK_X * RIM - LENS_X;
const IMG_TOP = BACK_Y * RIM - LENS_Y;

function isTextTarget(target: EventTarget | null) {
  if (!(target instanceof Element)) return false;
  return Boolean(
    target.closest("input, textarea, select, [contenteditable='true']"),
  );
}

function isInteractiveTarget(target: EventTarget | null) {
  if (!(target instanceof Element)) return false;
  return Boolean(
    target.closest(
      "a, button, label, summary, [role='button'], .skill-chip, .js-lift",
    ),
  );
}

export function CursorGlow() {
  const rootRef = useRef<HTMLDivElement>(null);
  const beamRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (reducedMotion() || !finePointer()) return;

    const root = rootRef.current;
    const beam = beamRef.current;
    const img = imgRef.current;
    if (!root || !beam || !img) return;

    document.documentElement.classList.add("cursor-senter");
    gsap.set(root, { x: -80, y: -80, opacity: 0 });
    gsap.set(img, { scale: 1, transformOrigin: `${LENS_X}px ${LENS_Y}px` });
    gsap.set(beam, { opacity: 1, scale: 1, transformOrigin: "0px 0px" });

    const xTo = gsap.quickTo(root, "x", { duration: 0.42, ease: "power3.out" });
    const yTo = gsap.quickTo(root, "y", { duration: 0.42, ease: "power3.out" });
    let seen = false;
    let overText = false;
    let lastX = 0;
    let lastY = 0;

    const reveal = () => {
      gsap.killTweensOf(root, "opacity");
      gsap.set(root, { opacity: overText || document.hidden ? 0 : 1 });
    };

    const place = (x: number, y: number, immediate = false) => {
      lastX = x;
      lastY = y;
      if (!seen || immediate) {
        seen = true;
        gsap.set(root, { x: x - HOTSPOT_X, y: y - HOTSPOT_Y });
      } else {
        xTo(x - HOTSPOT_X);
        yTo(y - HOTSPOT_Y);
      }
      reveal();
    };

    const onMove = (event: MouseEvent) => {
      overText = isTextTarget(event.target);
      place(event.clientX, event.clientY);

      const hover = !overText && isInteractiveTarget(event.target);
      gsap.to(img, {
        scale: hover ? 1.12 : 1,
        duration: 0.22,
        ease: "power2.out",
      });
      gsap.to(beam, {
        scale: hover ? 1.16 : 1,
        duration: 0.22,
        ease: "power2.out",
      });
    };

    const onDown = () => {
      if (overText) return;
      gsap.to(img, { scale: 0.9, duration: 0.12, ease: "power2.out" });
      gsap.to(beam, { scale: 1.22, duration: 0.12 });
    };

    const onUp = (event: MouseEvent) => {
      if (overText) return;
      const hover = isInteractiveTarget(event.target);
      gsap.to(img, { scale: hover ? 1.12 : 1, duration: 0.22, ease: "power2.out" });
      gsap.to(beam, { scale: hover ? 1.16 : 1, duration: 0.22 });
    };

    const onLeaveWindow = () => {
      gsap.killTweensOf(root, "opacity");
      gsap.set(root, { opacity: 0 });
    };

    const onEnterWindow = (event: MouseEvent) => {
      overText = isTextTarget(event.target);
      place(event.clientX, event.clientY, true);
    };

    const onTabBack = () => {
      document.documentElement.classList.add("cursor-senter");
      if (document.hidden) {
        gsap.killTweensOf(root, "opacity");
        gsap.set(root, { opacity: 0 });
        return;
      }
      if (!seen) return;
      place(lastX, lastY, true);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    document.addEventListener("mouseleave", onLeaveWindow);
    document.documentElement.addEventListener("mouseenter", onEnterWindow);
    document.addEventListener("visibilitychange", onTabBack);
    window.addEventListener("focus", onTabBack);
    window.addEventListener("pageshow", onTabBack);

    return () => {
      document.documentElement.classList.remove("cursor-senter");
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.removeEventListener("mouseleave", onLeaveWindow);
      document.documentElement.removeEventListener("mouseenter", onEnterWindow);
      document.removeEventListener("visibilitychange", onTabBack);
      window.removeEventListener("focus", onTabBack);
      window.removeEventListener("pageshow", onTabBack);
    };
  }, []);

  return (
    <div
      ref={rootRef}
      className="pointer-events-none fixed top-0 left-0 z-[120] hidden overflow-visible md:block"
      aria-hidden
    >
      <div
        ref={beamRef}
        className="absolute overflow-visible"
        style={{ left: 0, top: 0, width: 0, height: 0 }}
      >
        <div
          className="absolute rounded-full"
          style={{
            width: CORE,
            height: CORE,
            left: -CORE / 2,
            top: -CORE / 2,
            background:
              "radial-gradient(circle, rgba(224,242,254,0.88) 0%, rgba(56,189,248,0.48) 36%, transparent 70%)",
            filter: "blur(12px)",
          }}
        />
        <div
          className="absolute z-20 rounded-full"
          style={{
            width: DOT,
            height: DOT,
            left: -DOT / 2,
            top: -DOT / 2,
            background:
              "radial-gradient(circle, rgba(255,255,255,0.9) 0%, rgba(186,230,253,0.45) 55%, transparent 78%)",
            filter: "blur(1.5px)",
          }}
        />
      </div>
      <img
        ref={imgRef}
        src="/senter2.png"
        alt=""
        width={WIDTH}
        height={HEIGHT}
        draggable={false}
        className="absolute z-10 max-w-none shrink-0 drop-shadow-[0_6px_16px_rgba(0,0,0,0.55)]"
        style={{
          left: IMG_LEFT,
          top: IMG_TOP,
          width: WIDTH,
          height: HEIGHT,
        }}
      />
    </div>
  );
}
