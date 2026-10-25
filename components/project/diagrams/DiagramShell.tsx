"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { reducedMotion } from "@/lib/motion";
import { PanZoomCanvas } from "@/components/project/PanZoomCanvas";

/** Palet hitam-putih untuk semua diagram. */
export const INK = {
  aqua: "#171717",
  grape: "#404040",
  sun: "#525252",
  coral: "#262626",
  mint: "#404040",
  /** Warna elemen terpilih. */
  lit: "#171717",
  /** Teks utama di atas kanvas terang. */
  cream: "#171717",
  stone: "#525252",
  wire: "rgba(23,23,23,0.4)",
  /** Garis redup & isi putih kartu. */
  dim: "rgba(23,23,23,0.55)",
  soft: "rgba(23,23,23,0.22)",
  bg: "#ffffff",
  paper: "#fbfbfa",
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
        stroke={lit ? INK.lit : INK.soft}
      />
      <text
        x={x}
        y={y + 4}
        textAnchor="middle"
        fontSize={11}
        fontWeight={lit ? 700 : 500}
        fill={lit ? INK.lit : INK.stone}
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
          <path d="M 0 0 L 10 5 L 0 10 z" fill={state === "lit" ? INK.lit : INK.dim} />
        </marker>
      ))}
    </>
  );
}

export function DiagramShell({
  width,
  height,
  hint,
  legend,
  footer,
  children,
}: {
  width: number;
  height: number;
  hint?: ReactNode;
  legend?: ReactNode;
  footer?: ReactNode;
  children: ReactNode;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);

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
    },
    { scope: wrapRef },
  );

  return (
    <div ref={wrapRef}>
      <PanZoomCanvas
        width={width}
        height={height}
        hint={hint}
        legend={legend}
        footer={footer}
      >
        <svg
          width={width}
          height={height}
          viewBox={`0 0 ${width} ${height}`}
          className="block"
          fontFamily="var(--font-geist-sans), system-ui, sans-serif"
        >
          {children}
        </svg>
      </PanZoomCanvas>
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
      className="tint tint-static rounded-2xl p-5"
      style={{ ["--accent" as string]: accent } as React.CSSProperties}
    >
      <p className="accent-text text-sm font-semibold">{kicker}</p>
      <h3 className="font-display mt-1 text-xl font-bold">{title}</h3>
      {children}
    </div>
  );
}
