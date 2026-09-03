"use client";

import type { RefObject } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

export function reducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function finePointer() {
  return window.matchMedia("(hover: hover) and (pointer: fine)").matches;
}

export function useReveal(
  scope: RefObject<HTMLElement | null>,
  selector = ".reveal",
) {
  useGSAP(
    () => {
      if (reducedMotion()) return;

      gsap.utils.toArray<HTMLElement>(selector).forEach((el, index) => {
        gsap.from(el, {
          y: 22,
          duration: 0.7,
          delay: (index % 6) * 0.04,
          ease: "power3.out",
          immediateRender: false,
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
            once: true,
          },
        });
      });
    },
    { scope, dependencies: [] },
  );
}

export function useLiftHover(
  scope: RefObject<HTMLElement | null>,
  selector = ".js-lift",
) {
  useGSAP(
    () => {
      if (reducedMotion() || !finePointer()) return;

      gsap.utils.toArray<HTMLElement>(selector).forEach((el) => {
        const enter = () =>
          gsap.to(el, { y: -8, duration: 0.35, ease: "power2.out" });
        const leave = () =>
          gsap.to(el, { y: 0, duration: 0.5, ease: "power3.out" });
        el.addEventListener("mouseenter", enter);
        el.addEventListener("mouseleave", leave);
      });
    },
    { scope, dependencies: [] },
  );
}

export function scrollToId(href: string) {
  const id = href.replace("#", "");
  const el = document.getElementById(id);
  if (!el) return;
  if (window.__lenis) window.__lenis.scrollTo(el, { offset: -72 });
  else el.scrollIntoView({ behavior: "smooth" });
}
