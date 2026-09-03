"use client";

import { useRef } from "react";
import { site } from "@/lib/data";
import { gsap, useGSAP } from "@/lib/gsap";
import { finePointer, reducedMotion } from "@/lib/motion";

export function Footer() {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (reducedMotion() || !finePointer()) return;
      gsap.utils.toArray<HTMLAnchorElement>(".footer-link").forEach((el) => {
        const enter = () => gsap.to(el, { y: -3, color: "#d4ff3f", duration: 0.25 });
        const leave = () => gsap.to(el, { y: 0, color: "#f6f4ef", duration: 0.3 });
        el.addEventListener("mouseenter", enter);
        el.addEventListener("mouseleave", leave);
      });
    },
    { scope: rootRef },
  );

  return (
    <footer ref={rootRef} className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-10 md:flex-row md:items-center md:justify-between md:px-8">
        <div>
          <p className="font-display text-lg font-bold">{site.brand}</p>
          <p className="mt-1 text-sm text-stone">
            {site.name} · {site.location}
          </p>
        </div>
        <div className="flex flex-wrap gap-5">
          {site.socials.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target={social.href.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
              className="footer-link inline-block text-sm text-cream underline-offset-4 hover:underline"
            >
              {social.label}
            </a>
          ))}
        </div>
        <p className="text-sm text-stone">
          © {new Date().getFullYear()} {site.brand}
        </p>
      </div>
    </footer>
  );
}
