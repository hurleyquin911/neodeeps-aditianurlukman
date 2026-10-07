"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { Project } from "@/lib/projects";
import { accentStyle } from "@/lib/accents";
import { gsap } from "@/lib/gsap";
import { finePointer, reducedMotion } from "@/lib/motion";

type Tile = {
  id: string;
  title: string;
  note: string;
  span: string;
  mood: number;
};

const SPANS = [
  "col-span-12 min-h-[170px] md:col-span-6 md:min-h-[230px]",
  "col-span-6 min-h-[170px] md:col-span-3 md:min-h-[230px]",
  "col-span-6 min-h-[170px] md:col-span-3 md:min-h-[230px]",
  "col-span-6 min-h-[170px] md:col-span-3 md:min-h-[230px]",
  "col-span-6 min-h-[170px] md:col-span-3 md:min-h-[230px]",
  "col-span-12 min-h-[170px] md:col-span-6 md:min-h-[230px]",
];

function tilesFrom(project: Project): Tile[] {
  const screens = project.tampilan.screens;
  const labels = ["detail", "fokus", "konteks"];
  const items = [
    ...screens.map((screen) => ({ title: screen.name, note: screen.note })),
    ...screens.map((screen, index) => ({
      title: `${screen.name} · ${labels[index] ?? "frame"}`,
      note: screen.note,
    })),
  ].slice(0, 6);

  return items.map((item, index) => ({
    id: `${project.slug}-${index}`,
    title: item.title,
    note: item.note,
    span: SPANS[index],
    mood: index,
  }));
}

const CROPS = ["center", "left center", "right center", "center top", "center bottom", "30% center"];

function shotSrc(project: Project, index: number) {
  const count = Math.max(project.tampilan.screens.length, 1);
  return `/dummy/${project.slug}-${index % count}.svg`;
}

function Arrow({ dir }: { dir: "left" | "right" }) {
  return (
    <svg viewBox="0 0 20 20" className="size-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path
        d={dir === "left" ? "M12.5 4.5 7 10l5.5 5.5" : "M7.5 4.5 13 10l-5.5 5.5"}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function TampilanGallery({ project }: { project: Project }) {
  const tiles = tilesFrom(project);
  const overlayRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const directionRef = useRef(1);
  const [index, setIndex] = useState<number | null>(null);
  const open = index !== null;
  const active = index !== null ? tiles[index] : null;
  const accent = project.palette.accent;

  const close = useCallback(() => {
    const overlay = overlayRef.current;
    const panel = panelRef.current;
    if (!overlay || !panel || reducedMotion()) {
      setIndex(null);
      return;
    }
    gsap.to(overlay, { opacity: 0, duration: 0.22, ease: "power1.in" });
    gsap.to(panel, {
      y: 28,
      scale: 0.95,
      opacity: 0,
      duration: 0.28,
      ease: "power2.in",
      onComplete: () => setIndex(null),
    });
  }, []);

  const total = tiles.length;
  const go = useCallback(
    (step: number) => {
      directionRef.current = step;
      setIndex((current) =>
        current === null ? current : (current + step + total) % total,
      );
    },
    [total],
  );

  const jump = (next: number) => {
    if (index === null || next === index) return;
    directionRef.current = next > index ? 1 : -1;
    setIndex(next);
  };

  useEffect(() => {
    if (!open) return;
    const overlay = overlayRef.current;
    const panel = panelRef.current;
    if (!overlay || !panel) return;

    document.body.style.overflow = "hidden";
    document.documentElement.classList.add("dialog-open");
    window.__lenis?.stop();

    if (reducedMotion()) {
      gsap.set([overlay, panel], { opacity: 1, y: 0, scale: 1 });
    } else {
      gsap.fromTo(overlay, { opacity: 0 }, { opacity: 1, duration: 0.32, ease: "power2.out" });
      gsap.fromTo(
        panel,
        { y: 40, scale: 0.95, opacity: 0 },
        { y: 0, scale: 1, opacity: 1, duration: 0.5, ease: "power4.out" },
      );
    }

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      if (event.key === "ArrowRight") go(1);
      if (event.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.documentElement.classList.remove("dialog-open");
      window.__lenis?.start();
      window.removeEventListener("keydown", onKey);
    };
  }, [open, close, go]);

  useEffect(() => {
    if (index === null || !stageRef.current || reducedMotion()) return;
    gsap.fromTo(
      stageRef.current.querySelectorAll(".lb-anim"),
      { x: 36 * directionRef.current, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.45, stagger: 0.05, ease: "power3.out" },
    );
  }, [index]);

  const onTileEnter = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (!finePointer() || reducedMotion()) return;
    gsap.to(event.currentTarget, { y: -6, duration: 0.3, ease: "power2.out" });
  };

  const onTileLeave = (event: React.MouseEvent<HTMLButtonElement>) => {
    gsap.to(event.currentTarget, { y: 0, duration: 0.4, ease: "power3.out" });
  };

  return (
    <>
      <div className="grid grid-cols-12 gap-3 md:gap-4">
        {tiles.map((tile, tileIndex) => (
          <button
            key={tile.id}
            type="button"
            onClick={() => {
              directionRef.current = 1;
              setIndex(tileIndex);
            }}
            onMouseEnter={onTileEnter}
            onMouseLeave={onTileLeave}
            className={`${tile.span} group relative overflow-hidden rounded-[1.4rem] text-left shadow-[0_8px_30px_rgba(0,0,0,0.35)]`}
            style={{ border: `4px solid ${accent}` }}
          >
            <img
              src={shotSrc(project, tile.mood)}
              alt=""
              className="absolute inset-0 size-full object-cover transition-transform duration-500 group-hover:scale-105"
              style={{ objectPosition: CROPS[tile.mood % CROPS.length] }}
            />
            <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-3 pt-8 pb-3">
              <span className="font-display text-sm font-bold text-white">
                {tile.title}
              </span>
            </span>
            <span className="absolute top-3 right-3 grid size-8 place-items-center rounded-full bg-black/50 text-white opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
              <svg viewBox="0 0 20 20" className="size-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                <path d="M8 3H3v5M12 3h5v5M17 12v5h-5M3 12v5h5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </button>
        ))}
      </div>

      {active && index !== null
        ? createPortal(
            <div
              ref={overlayRef}
              className="fixed inset-0 z-[130] flex items-center justify-center bg-black/85 px-3 py-4 backdrop-blur-2xl md:px-8 md:py-8"
              onClick={close}
              role="presentation"
              style={accentStyle(accent)}
            >
              <span
                aria-hidden
                className="accent-bg pointer-events-none absolute top-1/2 left-1/2 size-[60vmin] -translate-1/2 rounded-full opacity-15 blur-[120px]"
              />
              <div
                ref={panelRef}
                role="dialog"
                aria-modal="true"
                aria-labelledby="tampilan-popup-title"
                className="relative flex max-h-[94dvh] w-full max-w-5xl flex-col overflow-hidden rounded-[1.75rem] border border-[color-mix(in_oklab,var(--accent)_35%,transparent)] bg-ink/95 shadow-[0_40px_120px_-20px_rgba(0,0,0,0.8)]"
                onClick={(event) => event.stopPropagation()}
              >
                <div className="flex items-center justify-between gap-4 border-b border-line px-4 py-3 md:px-6">
                  <div className="flex min-w-0 items-center gap-3">
                    <span className="kicker shrink-0" style={accentStyle(accent)}>
                      {project.title}
                    </span>
                    <span className="truncate text-sm text-stone">{project.category}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-sm text-cream">
                      <span className="accent-text font-bold">{String(index + 1).padStart(2, "0")}</span>
                      <span className="text-stone"> / {String(tiles.length).padStart(2, "0")}</span>
                    </span>
                    <button
                      type="button"
                      onClick={close}
                      aria-label="Tutup"
                      className="grid size-9 place-items-center rounded-full border border-line text-cream transition-colors hover:border-[var(--accent)] hover:bg-[var(--accent)] hover:text-void"
                    >
                      <svg viewBox="0 0 20 20" className="size-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                        <path d="M5 5l10 10M15 5 5 15" strokeLinecap="round" />
                      </svg>
                    </button>
                  </div>
                </div>

                <div ref={stageRef} className="relative min-h-0 flex-1 overflow-hidden bg-black">
                  <img
                    src={shotSrc(project, active.mood)}
                    alt=""
                    aria-hidden
                    className="absolute inset-0 size-full scale-110 object-cover opacity-40 blur-2xl"
                  />
                  <div className="relative flex h-[min(56dvh,34rem)] items-center justify-center p-4 md:p-8">
                    <img
                      src={shotSrc(project, active.mood)}
                      alt={active.title}
                      className="lb-anim max-h-full max-w-full rounded-xl object-contain shadow-[0_24px_60px_rgba(0,0,0,0.6)] ring-1 ring-white/10"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={() => go(-1)}
                    aria-label="Gambar sebelumnya"
                    className="absolute top-1/2 left-3 grid size-11 -translate-y-1/2 place-items-center rounded-full border border-white/15 bg-black/50 text-white backdrop-blur-md transition-all hover:scale-110 hover:border-transparent hover:bg-[var(--accent)] hover:text-void md:left-5 md:size-12"
                  >
                    <Arrow dir="left" />
                  </button>
                  <button
                    type="button"
                    onClick={() => go(1)}
                    aria-label="Gambar berikutnya"
                    className="absolute top-1/2 right-3 grid size-11 -translate-y-1/2 place-items-center rounded-full border border-white/15 bg-black/50 text-white backdrop-blur-md transition-all hover:scale-110 hover:border-transparent hover:bg-[var(--accent)] hover:text-void md:right-5 md:size-12"
                  >
                    <Arrow dir="right" />
                  </button>
                </div>

                <div className="grid gap-5 px-4 py-5 md:grid-cols-[minmax(0,1fr)_auto] md:items-end md:px-6">
                  <div className="min-w-0">
                    <h3 id="tampilan-popup-title" className="font-display text-xl font-bold md:text-2xl">
                      {active.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-stone md:text-base">{active.note}</p>
                  </div>
                  <div className="flex gap-2 overflow-x-auto pb-1">
                    {tiles.map((tile, tileIndex) => (
                      <button
                        key={tile.id}
                        type="button"
                        onClick={() => jump(tileIndex)}
                        aria-label={`Lihat ${tile.title}`}
                        aria-current={tileIndex === index ? "true" : undefined}
                        className={`relative h-12 w-[4.5rem] shrink-0 overflow-hidden rounded-lg transition-all duration-300 ${
                          tileIndex === index
                            ? "ring-2 ring-[var(--accent)] ring-offset-2 ring-offset-ink"
                            : "opacity-50 hover:opacity-100"
                        }`}
                      >
                        <img
                          src={shotSrc(project, tile.mood)}
                          alt=""
                          className="size-full object-cover"
                          style={{ objectPosition: CROPS[tile.mood % CROPS.length] }}
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>,
            document.body,
          )
        : null}
    </>
  );
}
