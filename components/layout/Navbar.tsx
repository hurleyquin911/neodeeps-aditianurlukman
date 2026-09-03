"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { nav, site } from "@/lib/data";
import { gsap, useGSAP } from "@/lib/gsap";
import { reducedMotion } from "@/lib/motion";
import { Magnetic } from "@/components/ui/Magnetic";

function JakartaClock() {
  const [time, setTime] = useState("");

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
    <span className="font-mono text-xs tracking-wide text-stone">
      {time ? `${time} WIB` : site.location}
    </span>
  );
}

function normalizePath(pathname: string) {
  if (pathname === "/") return "/";
  return pathname.replace(/\/$/, "") || "/";
}

export function Navbar() {
  const pathname = usePathname();
  const path = normalizePath(pathname);
  const [open, setOpen] = useState(false);
  const barRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (reducedMotion()) return;
      gsap.from(".nav-anim", {
        y: -12,
        duration: 0.55,
        stagger: 0.05,
        ease: "power3.out",
      });
    },
    { scope: barRef },
  );

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const onNav = () => {
    setOpen(false);
  };

  const isActive = (href: string) => {
    if (href === "/") return path === "/";
    return path === href || path.startsWith(`${href}/`);
  };

  return (
    <>
      <header
        ref={barRef}
        className="sticky top-0 z-50 border-b border-line bg-void/90 backdrop-blur-md"
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 md:px-8">
          <Magnetic strength={0.18}>
            <Link
              href="/"
              className="nav-anim font-display text-sm font-extrabold tracking-[0.18em] uppercase"
              onClick={() => setOpen(false)}
            >
              {site.brand}
            </Link>
          </Magnetic>

          <nav className="hidden items-center gap-7 md:flex">
            {nav.map((item) => (
              <Magnetic key={item.href} strength={0.2}>
                <Link
                  href={item.href}
                  className={`nav-anim relative text-sm transition-colors hover:text-cream ${
                    isActive(item.href) ? "text-cream" : "text-stone"
                  }`}
                  onClick={onNav}
                >
                  {item.label}
                  <span
                    className={`absolute -bottom-1 left-0 h-px w-full origin-left bg-acid transition-transform ${
                      isActive(item.href) ? "scale-x-100" : "scale-x-0"
                    }`}
                  />
                </Link>
              </Magnetic>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <div className="nav-anim hidden sm:block">
              <JakartaClock />
            </div>
            <Magnetic strength={0.22}>
              <Link
                href="/kontak"
                className="nav-anim hidden rounded-full bg-cream px-4 py-2 text-sm font-medium text-void md:inline-flex"
                onClick={onNav}
              >
                Hubungi
              </Link>
            </Magnetic>
            <button
              type="button"
              className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
              aria-label={open ? "Tutup menu" : "Buka menu"}
              onClick={() => setOpen((v) => !v)}
            >
              <span
                className={`h-px w-5 bg-cream transition ${open ? "translate-y-[3.5px] rotate-45" : ""}`}
              />
              <span
                className={`h-px w-5 bg-cream transition ${open ? "-translate-y-[3.5px] -rotate-45" : ""}`}
              />
            </button>
          </div>
        </div>
      </header>

      {open ? (
        <div className="fixed inset-0 z-40 bg-void px-6 pt-24 md:hidden">
          <nav className="flex flex-col gap-2">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="font-display border-b border-line py-4 text-3xl font-bold"
                onClick={onNav}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      ) : null}
    </>
  );
}
