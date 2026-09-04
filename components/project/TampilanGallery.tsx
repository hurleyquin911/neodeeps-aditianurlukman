"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { Project } from "@/lib/projects";
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

function TileArt({
  project,
  mood,
  large,
}: {
  project: Project;
  mood: number;
  large?: boolean;
}) {
  const pad = large ? "p-6" : "p-3";
  return (
    <div
      className={`relative flex h-full min-h-[140px] flex-col justify-end overflow-hidden ${pad}`}
      style={{
        background: `linear-gradient(${120 + mood * 18}deg, ${project.palette.from}, ${project.palette.via}, ${project.palette.to})`,
      }}
    >
      <div className="pointer-events-none absolute inset-0 opacity-30" style={{
        backgroundImage:
          "radial-gradient(rgba(255,255,255,0.18) 1px, transparent 1px)",
        backgroundSize: "16px 16px",
      }} />
      {mood % 6 === 0 ? (
        <div className="mx-auto w-[46%] max-w-[9rem] rounded-[1.4rem] border border-white/25 bg-black/35 p-2.5 shadow-lg">
          <div className="mx-auto mb-2 h-1 w-8 rounded-full bg-white/30" />
          <div className="space-y-1.5">
            <div className="h-8 rounded-lg bg-white/15" />
            <div className="h-6 rounded-lg bg-white/10" />
            <div className="h-10 rounded-lg bg-white/12" />
          </div>
        </div>
      ) : mood % 6 === 1 ? (
        <div className="grid h-full grid-cols-2 gap-2">
          <div className="rounded-xl bg-black/25" />
          <div className="space-y-2">
            <div className="h-3 w-2/3 rounded-full bg-white/35" />
            <div className="h-2 w-full rounded-full bg-white/15" />
            <div className="h-2 w-4/5 rounded-full bg-white/15" />
            <div className="mt-auto h-16 rounded-xl bg-black/20" />
          </div>
        </div>
      ) : mood % 6 === 2 ? (
        <div className="space-y-2">
          <div className="max-w-[70%] rounded-2xl rounded-bl-md bg-black/30 px-3 py-2">
            <div className="h-2 w-24 rounded-full bg-white/35" />
          </div>
          <div className="ml-auto max-w-[70%] rounded-2xl rounded-br-md bg-white/15 px-3 py-2">
            <div className="h-2 w-20 rounded-full bg-white/50" />
          </div>
          <div className="max-w-[60%] rounded-2xl rounded-bl-md bg-black/30 px-3 py-2">
            <div className="h-2 w-16 rounded-full bg-white/30" />
          </div>
        </div>
      ) : mood % 6 === 3 ? (
        <div className="flex h-full items-end gap-2">
          <div className="h-[55%] flex-1 rounded-lg bg-white/10" />
          <div className="h-[80%] flex-1 rounded-lg bg-white/18" />
          <div className="h-[40%] flex-1 rounded-lg bg-white/10" />
        </div>
      ) : mood % 6 === 4 ? (
        <div className="grid h-full grid-cols-3 gap-2">
          {["A", "B", "C"].map((label) => (
            <div key={label} className="rounded-xl bg-black/25 p-2">
              <p className="text-[10px] text-white/50">{label}</p>
              <div className="mt-2 h-2 w-3/4 rounded-full bg-white/25" />
              <div className="mt-1 h-8 rounded-md bg-white/10" />
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-2">
          <div className="h-3 w-1/3 rounded-full bg-white/40" />
          <div className="h-2 w-2/3 rounded-full bg-white/20" />
          <div className="mt-3 grid grid-cols-2 gap-2">
            <div className="h-20 rounded-xl bg-black/25" />
            <div className="h-20 rounded-xl bg-black/20" />
          </div>
        </div>
      )}
    </div>
  );
}

export function TampilanGallery({ project }: { project: Project }) {
  const tiles = tilesFrom(project);
  const overlayRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<Tile | null>(null);

  const close = useCallback(() => {
    const overlay = overlayRef.current;
    const panel = panelRef.current;
    if (!overlay || !panel || reducedMotion()) {
      setActive(null);
      return;
    }
    gsap.to(overlay, { opacity: 0, duration: 0.22, ease: "power1.in" });
    gsap.to(panel, {
      y: 28,
      scale: 0.94,
      opacity: 0,
      duration: 0.28,
      ease: "power2.in",
      onComplete: () => setActive(null),
    });
  }, []);

  useEffect(() => {
    if (!active) return;
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
        { y: 36, scale: 0.96, opacity: 0 },
        { y: 0, scale: 1, opacity: 1, duration: 0.45, ease: "power4.out" },
      );
    }

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.documentElement.classList.remove("dialog-open");
      window.__lenis?.start();
      window.removeEventListener("keydown", onKey);
    };
  }, [active, close]);

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
        {tiles.map((tile) => (
          <button
            key={tile.id}
            type="button"
            onClick={() => setActive(tile)}
            onMouseEnter={onTileEnter}
            onMouseLeave={onTileLeave}
            className={`${tile.span} group relative overflow-hidden rounded-[1.4rem] text-left shadow-[0_8px_30px_rgba(0,0,0,0.35)]`}
            style={{
              border: `4px solid ${project.palette.accent}`,
            }}
          >
            <TileArt project={project} mood={tile.mood} />
            <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-3 pt-8 pb-3">
              <span className="font-display text-sm font-bold text-white">
                {tile.title}
              </span>
            </span>
          </button>
        ))}
      </div>

      {active
        ? createPortal(
            <div
              ref={overlayRef}
              className="fixed inset-0 z-[130] flex items-center justify-center bg-black/88 px-4 py-6 backdrop-blur-xl md:px-8 md:py-10"
              onClick={close}
              role="presentation"
            >
              <div
                ref={panelRef}
                role="dialog"
                aria-modal="true"
                aria-labelledby="tampilan-popup-title"
                className="flex max-h-[min(88dvh,42rem)] w-full max-w-2xl flex-col overflow-hidden rounded-[1.6rem] border border-line bg-ink shadow-[0_32px_80px_rgba(0,0,0,0.65)]"
                onClick={(event) => event.stopPropagation()}
              >
                <div className="relative h-48 shrink-0 md:h-64">
                  <TileArt project={project} mood={active.mood} large />
                </div>
                <div className="min-h-0 overflow-y-auto px-6 py-5 md:px-8 md:py-6">
                  <p className="text-sm font-medium text-acid">{project.title}</p>
                  <h3
                    id="tampilan-popup-title"
                    className="font-display mt-1 text-2xl font-bold"
                  >
                    {active.title}
                  </h3>
                  <p className="mt-3 text-base leading-relaxed text-stone">
                    {active.note}
                  </p>
                  <button
                    type="button"
                    onClick={close}
                    className="mt-6 rounded-full border border-line px-5 py-2 text-sm text-cream transition-colors hover:border-acid hover:text-acid"
                  >
                    Tutup
                  </button>
                </div>
              </div>
            </div>,
            document.body,
          )
        : null}
    </>
  );
}
