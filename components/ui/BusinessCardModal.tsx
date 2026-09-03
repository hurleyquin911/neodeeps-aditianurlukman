"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/data";
import { gsap } from "@/lib/gsap";
import { reducedMotion } from "@/lib/motion";

type BusinessCardModalProps = {
  open: boolean;
  onClose: () => void;
};

export function BusinessCardModal({ open, onClose }: BusinessCardModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const closingRef = useRef(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const close = useCallback(() => {
    if (closingRef.current) return;
    closingRef.current = true;

    const overlay = overlayRef.current;
    const panel = panelRef.current;
    if (!overlay || !panel || reducedMotion()) {
      onClose();
      return;
    }

    gsap.killTweensOf([overlay, panel]);
    gsap.to(overlay, { opacity: 0, duration: 0.18, ease: "power1.in" });
    gsap.to(panel, {
      y: 24,
      opacity: 0,
      duration: 0.22,
      ease: "power2.in",
      force3D: false,
      onComplete: onClose,
    });
  }, [onClose]);

  useEffect(() => {
    if (!open || !mounted) {
      closingRef.current = false;
      return;
    }

    const overlay = overlayRef.current;
    const panel = panelRef.current;
    if (!overlay || !panel) return;

    closingRef.current = false;
    document.body.style.overflow = "hidden";
    window.__lenis?.stop();
    closeBtnRef.current?.focus();

    gsap.killTweensOf([overlay, panel]);

    if (reducedMotion()) {
      gsap.set(overlay, { opacity: 1 });
      gsap.set(panel, { y: 0, opacity: 1, clearProps: "transform" });
    } else {
      gsap.fromTo(
        overlay,
        { opacity: 0 },
        { opacity: 1, duration: 0.28, ease: "power2.out" },
      );
      gsap.fromTo(
        panel,
        { y: 28, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.4,
          ease: "power3.out",
          force3D: false,
        },
      );
    }

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      gsap.killTweensOf([overlay, panel]);
      document.body.style.overflow = "";
      window.__lenis?.start();
      window.removeEventListener("keydown", onKey);
    };
  }, [open, mounted, close]);

  if (!mounted || !open) return null;

  const handle = (label: string) => {
    if (label === "Email") return site.email;
    if (label === "GitHub") return "hurleyquin911";
    return "aditia-lukman";
  };

  return createPortal(
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[80] flex items-center justify-center bg-black/75 px-4 py-8 backdrop-blur-sm"
      onClick={close}
      role="presentation"
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="business-card-name"
        className="w-full max-w-lg"
        onClick={(event) => event.stopPropagation()}
      >
        <article className="relative flex max-h-[min(90dvh,40rem)] flex-col overflow-hidden rounded-[1.6rem] border border-line bg-ink shadow-[0_28px_80px_rgba(0,0,0,0.55)]">
          <div className="absolute inset-y-0 left-0 w-1.5 bg-acid" />
          <div
            className="pointer-events-none absolute -top-24 -right-16 size-64 rounded-full opacity-25"
            style={{
              background:
                "radial-gradient(circle, rgba(212,255,63,0.28), transparent 68%)",
            }}
          />

          <div className="relative z-10 flex min-h-0 flex-1 flex-col overflow-y-auto px-6 py-5 pl-7 md:px-8 md:py-6 md:pl-9">
            <div className="flex items-start justify-between gap-4">
              <p className="font-display text-xs font-extrabold tracking-[0.22em] text-acid uppercase">
                {site.brand}
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

            <div className="mt-5 flex items-start gap-4">
              <Image
                src="/FotoAditiaNurLukman.png"
                alt={site.name}
                width={80}
                height={80}
                className="size-18 shrink-0 rounded-2xl border border-acid/40 object-cover object-top md:size-20"
              />
              <div className="min-w-0">
                <h2
                  id="business-card-name"
                  className="font-display text-2xl leading-tight font-extrabold tracking-[-0.03em]"
                >
                  {site.name}
                </h2>
                <p className="mt-1 text-sm text-acid">{site.role}</p>
                <p className="mt-1 text-sm text-stone">{site.location}</p>
              </div>
            </div>

            <div className="mt-5 flex flex-col gap-3 border-t border-line pt-5">
              <p className="text-sm leading-relaxed text-cream/90">{site.bio}</p>
              <p className="text-sm leading-relaxed text-stone">
                {site.about[0]}
              </p>
            </div>

            <div className="mt-5 grid shrink-0 gap-2 sm:grid-cols-3">
              {site.socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target={social.href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    social.href.startsWith("http")
                      ? "noopener noreferrer"
                      : undefined
                  }
                  className="rounded-xl border border-line bg-void/80 px-3 py-2.5 text-sm text-cream transition-colors hover:border-acid/50 hover:text-acid"
                >
                  <span className="block text-[0.65rem] tracking-wide text-stone uppercase">
                    {social.label}
                  </span>
                  <span className="mt-0.5 block truncate">
                    {handle(social.label)}
                  </span>
                </a>
              ))}
            </div>

            <div className="mt-5 flex shrink-0 flex-wrap items-center justify-between gap-3">
              <p className="text-sm text-stone">{site.availability}</p>
              <Link
                href="/tentang"
                className="inline-flex rounded-full bg-acid px-4 py-2 text-sm font-semibold text-void"
              >
                Halaman tentang
              </Link>
            </div>
          </div>
        </article>
      </div>
    </div>,
    document.body,
  );
}
