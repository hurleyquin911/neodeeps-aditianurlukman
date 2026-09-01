"use client";

import { useEffect, useState } from "react";
import { nav, site } from "@/lib/data";
import { gsap, useGSAP } from "@/lib/gsap";
import { useIntro } from "@/lib/intro-context";
import { Magnetic } from "@/components/ui/Magnetic";

function scrollToHash(href: string) {
  const id = href.replace("#", "");
  const el = document.getElementById(id);
  if (!el) return;
  if (window.__lenis) window.__lenis.scrollTo(el, { offset: -20 });
  else el.scrollIntoView({ behavior: "smooth" });
}

function JakartaClock() {
  const [time, setTime] = useState("--:--");

  useEffect(() => {
    const tick = () => {
      setTime(
        new Intl.DateTimeFormat("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
          timeZone: site.timezone,
        }).format(new Date()),
      );
    };
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <span className="font-mono text-[11px] tracking-widest text-stone">
      {time} WIB
    </span>
  );
}

export function Navbar() {
  const { ready } = useIntro();
  const [open, setOpen] = useState(false);

  useGSAP(
    () => {
      if (!ready) return;
      gsap.from(".nav-item", {
        y: -24,
        autoAlpha: 0,
        duration: 0.9,
        stagger: 0.06,
        ease: "power3.out",
      });
    },
    { dependencies: [ready] },
  );

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const onNav = (href: string) => {
    setOpen(false);
    scrollToHash(href);
  };

  return (
    <>
      <header className="nav-item pointer-events-none fixed top-0 right-0 left-0 z-50 px-5 py-5 md:px-10">
        <div className="pointer-events-auto flex items-center justify-between">
          <a
            href="#top"
            data-cursor="Home"
            className="font-display text-sm font-extrabold tracking-[0.22em] uppercase"
            onClick={(event) => {
              event.preventDefault();
              if (window.__lenis) window.__lenis.scrollTo(0);
              else window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            {site.brand}
          </a>

          <nav className="hidden items-center gap-8 lg:flex">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                data-cursor="Go"
                className="text-[12px] tracking-[0.2em] text-stone uppercase transition-colors hover:text-cream"
                onClick={(event) => {
                  event.preventDefault();
                  onNav(item.href);
                }}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-5">
            <div className="hidden sm:block">
              <JakartaClock />
            </div>
            <Magnetic>
              <a
                href="#contact"
                data-cursor="Talk"
                className="hidden rounded-full border border-line px-4 py-2 text-[11px] tracking-[0.18em] uppercase transition-colors hover:border-acid hover:bg-acid hover:text-void md:inline-flex"
                onClick={(event) => {
                  event.preventDefault();
                  onNav("#contact");
                }}
              >
                Let&apos;s talk
              </a>
            </Magnetic>
            <button
              type="button"
              className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 lg:hidden"
              aria-label={open ? "Tutup menu" : "Buka menu"}
              onClick={() => setOpen((v) => !v)}
            >
              <span
                className={`h-px w-6 bg-cream transition ${open ? "translate-y-[3.5px] rotate-45" : ""}`}
              />
              <span
                className={`h-px w-6 bg-cream transition ${open ? "-translate-y-[3.5px] -rotate-45" : ""}`}
              />
            </button>
          </div>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-40 bg-void px-6 pt-28 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] lg:hidden ${
          open ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <nav className="flex flex-col gap-2">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="font-display border-b border-line py-5 text-5xl font-extrabold tracking-tight"
              onClick={(event) => {
                event.preventDefault();
                onNav(item.href);
              }}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <p className="mt-10 text-sm text-stone">{site.location}</p>
      </div>
    </>
  );
}
