"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { reducedMotion } from "@/lib/motion";

export const INK = {
  aqua: "#38bdf8",
  grape: "#a78bfa",
  sun: "#fbbf24",
  coral: "#fb7185",
  mint: "#34d399",
  lit: "#d4ff3f",
  cream: "#f6f4ef",
  stone: "#c5c0b6",
  wire: "rgba(148,163,184,0.5)",
  bg: "#0c0c0e",
};

export function wrapText(text: string, max: number) {
  const lines: string[] = [];
  let line = "";
  for (const word of text.split(" ")) {
    const next = line ? `${line} ${word}` : word;
    if (next.length > max && line) {
      lines.push(line);
      line = word;
    } else {
      line = next;
    }
  }
  if (line) lines.push(line);
  return lines;
}

export function labelWidth(text: string, size = 11) {
  return text.length * size * 0.56 + 16;
}

export function EdgeLabel({
  x,
  y,
  text,
  lit,
}: {
  x: number;
  y: number;
  text: string;
  lit?: boolean;
}) {
  const w = labelWidth(text);
  return (
    <g className="dg-node">
      <rect
        x={x - w / 2}
        y={y - 10}
        width={w}
        height={20}
        rx={10}
        fill={INK.bg}
        stroke={lit ? INK.lit : "rgba(246,244,239,0.16)"}
      />
      <text
        x={x}
        y={y + 4}
        textAnchor="middle"
        fontSize={11}
        fill={lit ? INK.lit : INK.cream}
      >
        {text}
      </text>
    </g>
  );
}

export function ArrowMarkers({ id }: { id: string }) {
  return (
    <>
      {(["dim", "lit"] as const).map((state) => (
        <marker
          key={state}
          id={`${id}-${state}`}
          viewBox="0 0 10 10"
          refX="9"
          refY="5"
          markerWidth="7"
          markerHeight="7"
          orient="auto-start-reverse"
        >
          <path d="M 0 0 L 10 5 L 0 10 z" fill={state === "lit" ? INK.lit : "rgba(186,198,214,0.9)"} />
        </marker>
      ))}
    </>
  );
}

export function DiagramShell({
  width,
  height,
  hint,
  children,
}: {
  width: number;
  height: number;
  hint?: string;
  children: React.ReactNode;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const drag = useRef({ down: false, captured: false, id: 0, x: 0, y: 0, left: 0, top: 0 });

  useGSAP(
    () => {
      if (reducedMotion()) return;
      gsap.from(".dg-node", {
        opacity: 0,
        y: 10,
        duration: 0.45,
        stagger: 0.025,
        ease: "power2.out",
      });
      gsap.fromTo(
        ".dg-draw",
        { strokeDashoffset: 1 },
        { strokeDashoffset: 0, duration: 0.9, stagger: 0.03, delay: 0.15, ease: "power2.inOut" },
      );
      gsap.fromTo(
        ".dg-wire",
        { strokeDashoffset: 28 },
        { strokeDashoffset: 0, duration: 1.1, ease: "none", repeat: -1 },
      );
    },
    { scope: wrapRef },
  );

  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    const el = scrollerRef.current;
    if (!el || event.pointerType !== "mouse") return;
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

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
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

  return (
    <div ref={wrapRef}>
      <div className="relative">
        <div
          ref={scrollerRef}
          className="flow-grid relative cursor-grab overflow-auto rounded-3xl border border-line select-none active:cursor-grabbing"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
        >
          <div className="mx-auto" style={{ width }}>
            <svg
              width={width}
              height={height}
              viewBox={`0 0 ${width} ${height}`}
              className="block"
              fontFamily="var(--font-geist-sans), system-ui, sans-serif"
            >
              {children}
            </svg>
          </div>
        </div>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-8 rounded-l-3xl bg-gradient-to-r from-[#07080b] to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-8 rounded-r-3xl bg-gradient-to-l from-[#07080b] to-transparent" />
      </div>
      {hint ? <p className="mt-3 text-xs text-stone">{hint}</p> : null}
    </div>
  );
}

export function DetailCard({
  kicker,
  title,
  accent,
  children,
}: {
  kicker: string;
  title: string;
  accent: string;
  children?: React.ReactNode;
}) {
  return (
    <div
      className="tint tint-static mt-4 rounded-2xl p-5"
      style={{ ["--accent" as string]: accent } as React.CSSProperties}
    >
      <p className="accent-text text-sm font-semibold">{kicker}</p>
      <h3 className="font-display mt-1 text-xl font-bold">{title}</h3>
      {children}
    </div>
  );
}
