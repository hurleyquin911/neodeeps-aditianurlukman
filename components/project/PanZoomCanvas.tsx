"use client";

import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";

const MIN_ZOOM = 0.15;
const MAX_ZOOM = 2.5;
const clampZoom = (value: number) => Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, value));

type PanZoomCanvasProps = {
  /** Lebar & tinggi konten dalam satuan px pada zoom 100%. */
  width: number;
  height: number;
  hint?: ReactNode;
  legend?: ReactNode;
  /** Ditampilkan di bawah kanvas (juga saat layar penuh). */
  footer?: ReactNode;
  children: ReactNode;
};

const toolButton =
  "grid h-8 min-w-8 place-items-center rounded-full border border-line bg-ink px-2 text-sm text-cream transition hover:border-cream/40 disabled:opacity-30";

/**
 * Kanvas diagram: otomatis "pas layar" saat pertama dibuka, zoom lewat
 * tombol atau Ctrl + scroll, geser dengan drag, dan bisa layar penuh.
 */
export function PanZoomCanvas({
  width,
  height,
  hint,
  legend,
  footer,
  children,
}: PanZoomCanvasProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const zoomRef = useRef(1);
  const pending = useRef<{ cx: number; cy: number; ax: number; ay: number } | null>(
    null,
  );
  const drag = useRef({ down: false, captured: false, id: 0, x: 0, y: 0, left: 0, top: 0 });

  const [size, setSize] = useState({ w: 0, h: 0 });
  const [userZoom, setUserZoom] = useState<number | null>(null);
  const [full, setFull] = useState(false);

  const viewH = Math.min(660, Math.max(380, Math.round((size.w * height) / width)));
  const fit =
    size.w && size.h
      ? clampZoom(Math.min((size.w - 32) / width, (size.h - 32) / height, 1))
      : 1;
  const zoom = userZoom ?? fit;

  useLayoutEffect(() => {
    zoomRef.current = zoom;
  });

  // Ukuran viewport kanvas
  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const measure = () => setSize({ w: el.clientWidth, h: el.clientHeight });
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, [full]);

  // Jaga titik fokus saat zoom berubah
  useLayoutEffect(() => {
    const el = scrollerRef.current;
    const content = contentRef.current;
    if (!el || !content) return;
    if (userZoom === null) {
      el.scrollTo(0, 0);
      pending.current = null;
      return;
    }
    const anchor = pending.current;
    if (!anchor) return;
    el.scrollLeft = anchor.cx * userZoom + content.offsetLeft - anchor.ax;
    el.scrollTop = anchor.cy * userZoom + content.offsetTop - anchor.ay;
    pending.current = null;
  }, [userZoom]);

  const zoomTo = (next: number, ax?: number, ay?: number) => {
    const el = scrollerRef.current;
    const content = contentRef.current;
    if (!el || !content) return;
    const target = clampZoom(next);
    const anchorX = ax ?? el.clientWidth / 2;
    const anchorY = ay ?? el.clientHeight / 2;
    const current = zoomRef.current;
    pending.current = {
      cx: (el.scrollLeft + anchorX - content.offsetLeft) / current,
      cy: (el.scrollTop + anchorY - content.offsetTop) / current,
      ax: anchorX,
      ay: anchorY,
    };
    setUserZoom(target);
  };

  // Ctrl / Cmd + scroll untuk zoom di titik kursor
  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const onWheel = (event: WheelEvent) => {
      if (!event.ctrlKey && !event.metaKey) return;
      event.preventDefault();
      const rect = el.getBoundingClientRect();
      zoomTo(
        zoomRef.current * Math.exp(-event.deltaY * 0.002),
        event.clientX - rect.left,
        event.clientY - rect.top,
      );
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [full]);

  // Layar penuh: kunci scroll halaman, Escape untuk keluar
  useEffect(() => {
    if (!full) return;
    document.body.style.overflow = "hidden";
    window.__lenis?.stop();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setFull(false);
        setUserZoom(null);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.__lenis?.start();
      window.removeEventListener("keydown", onKey);
    };
  }, [full]);

  const toggleFull = () => {
    setUserZoom(null);
    setFull((value) => !value);
  };

  const onPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    const el = scrollerRef.current;
    if (!el || event.pointerType !== "mouse" || event.button !== 0) return;
    drag.current = {
      down: true,
      captured: false,
      id: event.pointerId,
      x: event.clientX,
      y: event.clientY,
      left: el.scrollLeft,
      top: el.scrollTop,
    };
  };

  const onPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const el = scrollerRef.current;
    const state = drag.current;
    if (!el || !state.down) return;
    const dx = event.clientX - state.x;
    const dy = event.clientY - state.y;
    if (!state.captured && Math.abs(dx) + Math.abs(dy) > 5) {
      state.captured = true;
      el.setPointerCapture(state.id);
    }
    if (state.captured) {
      el.scrollLeft = state.left - dx;
      el.scrollTop = state.top - dy;
    }
  };

  const onPointerUp = () => {
    const el = scrollerRef.current;
    const state = drag.current;
    if (el && state.captured && el.hasPointerCapture(state.id)) {
      el.releasePointerCapture(state.id);
    }
    state.down = false;
    state.captured = false;
  };

  const toolbar = (
    <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
      <p className="max-w-xl text-sm text-stone">
        {hint}
        <span className="hidden text-stone/70 md:inline">
          {" "}
          Ctrl + scroll untuk zoom{full ? " · Esc untuk keluar" : ""}.
        </span>
      </p>
      <div className="flex items-center gap-1.5">
        <button
          type="button"
          aria-label="Perkecil"
          className={toolButton}
          disabled={zoom <= MIN_ZOOM + 0.001}
          onClick={() => zoomTo(zoom / 1.25)}
        >
          <svg viewBox="0 0 16 16" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden>
            <path d="M3 8h10" />
          </svg>
        </button>
        <button
          type="button"
          aria-label="Ukuran asli 100%"
          title="Ukuran asli"
          className={`${toolButton} w-14 font-mono text-xs`}
          onClick={() => zoomTo(1)}
        >
          {Math.round(zoom * 100)}%
        </button>
        <button
          type="button"
          aria-label="Perbesar"
          className={toolButton}
          disabled={zoom >= MAX_ZOOM - 0.001}
          onClick={() => zoomTo(zoom * 1.25)}
        >
          <svg viewBox="0 0 16 16" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden>
            <path d="M3 8h10M8 3v10" />
          </svg>
        </button>
        <button
          type="button"
          className={`${toolButton} px-3 text-xs`}
          disabled={userZoom === null}
          onClick={() => setUserZoom(null)}
        >
          Pas layar
        </button>
        <button
          type="button"
          aria-label={full ? "Keluar layar penuh" : "Layar penuh"}
          title={full ? "Keluar layar penuh" : "Layar penuh"}
          className={toolButton}
          onClick={toggleFull}
        >
          {full ? (
            <svg viewBox="0 0 16 16" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M6 2v4H2M10 14v-4h4M14 6h-4V2M2 10h4v4" />
            </svg>
          ) : (
            <svg viewBox="0 0 16 16" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M2 6V2h4M14 10v4h-4M10 2h4v4M6 14H2v-4" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );

  const canvas = (
    <div className={full ? "relative min-h-0 flex-1" : "relative"}>
      <div
        ref={scrollerRef}
        data-lenis-prevent
        className={`flow-paper relative flex cursor-grab overflow-auto overscroll-contain rounded-3xl border border-line select-none active:cursor-grabbing ${
          full ? "h-full" : ""
        }`}
        style={full ? undefined : { height: viewH }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <div
          ref={contentRef}
          className="relative m-auto shrink-0"
          style={{ width: width * zoom, height: height * zoom }}
        >
          <div
            className="absolute top-0 left-0 origin-top-left"
            style={{ width, height, transform: `scale(${zoom})` }}
          >
            {children}
          </div>
        </div>
      </div>
      {full && footer ? (
        <div
          data-lenis-prevent
          className="absolute bottom-4 left-4 max-h-[46%] w-[min(26rem,calc(100%-2rem))] overflow-auto rounded-2xl shadow-[0_24px_60px_-24px_rgba(23,23,23,0.45)]"
        >
          {footer}
        </div>
      ) : null}
    </div>
  );

  const footerBlock = footer && !full ? <div className="mt-4">{footer}</div> : null;

  if (full) {
    return (
      <>
        <div className="h-[420px] rounded-3xl border border-dashed border-line" />
        {createPortal(
          <div className="fixed inset-0 z-[90] flex flex-col bg-void p-4 md:p-6">
            {toolbar}
            {legend}
            {canvas}
            {footerBlock}
          </div>,
          document.body,
        )}
      </>
    );
  }

  return (
    <div>
      {toolbar}
      {legend}
      {canvas}
      {footerBlock}
    </div>
  );
}
