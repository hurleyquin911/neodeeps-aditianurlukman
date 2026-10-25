"use client";

import { useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { nav, site } from "@/lib/data";
import { Magnetic } from "@/components/ui/Magnetic";
import { SocialIcon } from "@/components/ui/SocialIcon";

function socialHandle(label: string, href: string) {
  if (label === "Email") return href.replace("mailto:", "");
  if (label === "Upwork") return "Freelancer profile";
  try {
    const parts = new URL(href).pathname.split("/").filter(Boolean);
    const last = parts[parts.length - 1] ?? "";
    return label === "GitHub" ? `@${last}` : last;
  } catch {
    return href;
  }
}

export function Footer() {
  const rootRef = useRef<HTMLElement>(null);
  const pathname = usePathname();

  const toTop = () => {
    if (window.__lenis) window.__lenis.scrollTo(0);
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer ref={rootRef} className="relative">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="relative overflow-hidden rounded-[1.75rem] border border-line bg-ink px-6 py-12 md:px-12 md:py-16">
          <div className="relative flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="kicker">Punya ide?</p>
              <h2 className="font-display mt-5 max-w-xl text-[clamp(1.9rem,4.2vw,3rem)] leading-[1.12] font-semibold tracking-[-0.03em]">
                Mari bangun sesuatu yang{" "}
                <span className="text-spectrum">berarti</span>.
              </h2>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-stone md:text-base">
                Ceritakan produknya, saya bantu dari desain sampai rilis dan
                perawatan.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Magnetic>
                <Link
                  href="/kontak"
                  className="btn-primary px-6 py-3 text-sm"
                >
                  Mulai proyek →
                </Link>
              </Magnetic>
              <Magnetic strength={0.2}>
                <a href={`mailto:${site.email}`} className="btn-secondary px-6 py-3 text-sm">
                  Kirim email
                </a>
              </Magnetic>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-14 grid max-w-6xl gap-8 border-t border-line px-5 py-10 md:grid-cols-[1.4fr_1fr_1fr] md:px-8">
        <div className="flex flex-col">
          <p className="font-display flex items-center gap-2.5 text-lg font-semibold">
            <span className="grid size-7 place-items-center rounded-md bg-[#171717] text-xs font-semibold text-white">
              N
            </span>
            {site.brand}
          </p>
          <p className="mt-3 text-sm text-stone">
            {site.name} · {site.location}
          </p>
          <p className="mt-1 text-sm font-medium text-cream">{site.tagline}</p>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-stone">
            {site.bio}
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3 md:mt-auto md:pt-6">
            <button
              type="button"
              onClick={toTop}
              className="btn-secondary group gap-2 px-4 py-2 text-sm"
            >
              <svg
                viewBox="0 0 20 20"
                className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden
              >
                <path d="M10 16V4M5 9l5-5 5 5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Kembali ke atas
            </button>
          </div>
        </div>
        <div>
          <p className="text-xs font-semibold tracking-[0.14em] text-stone uppercase">
            Navigasi
          </p>
          <ul className="mt-4 border-t border-line">
            {nav.map((item) => {
              const active =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);
              return (
                <li key={item.href} className="border-b border-line">
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`group flex items-center justify-between py-2.5 text-sm transition-colors ${
                      active ? "font-semibold text-cream" : "text-stone hover:text-cream"
                    }`}
                  >
                    <span className="flex items-center gap-2.5">
                      <span
                        className={`size-1.5 rounded-full transition-colors ${
                          active ? "bg-cream" : "bg-line group-hover:bg-cream"
                        }`}
                      />
                      {item.label}
                    </span>
                    <svg
                      viewBox="0 0 20 20"
                      className="size-4 -translate-x-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      aria-hidden
                    >
                      <path d="M4 10h12M11 5l5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
        <div>
          <p className="text-xs font-semibold tracking-[0.14em] text-stone uppercase">
            Sosial
          </p>
          <ul className="mt-4 space-y-2.5">
            {site.socials.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  target={social.href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  aria-label={social.label}
                  className="group flex items-center gap-3 text-sm text-cream"
                >
                  <span className="grid size-10 shrink-0 place-items-center rounded-xl border border-line bg-ink text-cream transition-all duration-300 group-hover:-translate-y-0.5 group-hover:border-[#171717] group-hover:bg-[#171717] group-hover:text-white group-hover:shadow-[0_10px_24px_-12px_rgba(0,0,0,0.5)]">
                    <SocialIcon label={social.label} className="size-[18px]" />
                  </span>
                  <span className="min-w-0">
                    <span className="block font-medium">{social.label}</span>
                    <span className="block truncate text-xs text-stone">
                      {socialHandle(social.label, social.href)}
                    </span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-line">
        <p className="mx-auto max-w-6xl px-5 py-5 text-xs text-stone md:px-8">
          © {new Date().getFullYear()} {site.brand}. {site.tagline}
        </p>
      </div>
    </footer>
  );
}
