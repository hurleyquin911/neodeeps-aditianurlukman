"use client";

import { useRef } from "react";
import { site } from "@/lib/data";
import { gsap, useGSAP } from "@/lib/gsap";

export function Footer() {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".footer-word", {
        yPercent: 30,
        autoAlpha: 0.4,
        ease: "none",
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top 90%",
          end: "bottom bottom",
          scrub: true,
        },
      });
    },
    { scope: rootRef, dependencies: [] },
  );

  return (
    <footer
      ref={rootRef}
      className="overflow-hidden border-t border-line px-5 pt-16 pb-8 md:px-10"
    >
      <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="text-[11px] tracking-[0.24em] text-stone uppercase">
            {site.name}
          </p>
          <p className="mt-2 max-w-sm text-sm text-stone">
            {site.role} · {site.location}
          </p>
        </div>
        <div className="flex flex-wrap gap-6">
          {site.socials.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target={social.href.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
              data-cursor="Open"
              className="text-[12px] tracking-[0.18em] text-cream uppercase transition-colors hover:text-acid"
            >
              {social.label}
            </a>
          ))}
        </div>
      </div>

      <p className="footer-word font-display mt-16 text-[clamp(3.4rem,16vw,14rem)] leading-[0.8] font-extrabold tracking-[-0.07em]">
        {site.brand}
      </p>

      <div className="mt-10 flex flex-col gap-3 text-[11px] tracking-[0.16em] text-stone uppercase sm:flex-row sm:justify-between">
        <p>© {new Date().getFullYear()} {site.brand}</p>
        <p>{site.tagline}</p>
      </div>
    </footer>
  );
}
