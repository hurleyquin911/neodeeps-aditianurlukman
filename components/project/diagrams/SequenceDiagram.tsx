"use client";

import { useEffect, useMemo, useState } from "react";
import type { ProjectDiagrams } from "@/lib/diagrams";
import {
  DetailCard,
  DiagramShell,
  INK,
  labelWidth,
  wrapText,
} from "@/components/project/diagrams/DiagramShell";

const COL_W = 210;
const LEFT = 110;
const HEAD_Y = 30;
const HEAD_H = 52;
const FIRST = 134;
const STEP = 52;

export function SequenceDiagram({
  data,
  slug,
}: {
  data: ProjectDiagrams["sequence"];
  slug: string;
}) {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(false);
  const markerId = `seq-${slug}`;
  const total = data.messages.length;

  const xOf = useMemo(() => {
    const map = new Map(data.participants.map(([id], index) => [id, LEFT + index * COL_W]));
    return (id: string) => map.get(id) ?? LEFT;
  }, [data.participants]);

  const width = LEFT * 2 + (data.participants.length - 1) * COL_W;
  const bottom = FIRST + total * STEP;
  const height = bottom + HEAD_H + 40;

  useEffect(() => {
    if (!playing) return;
    const timer = window.setTimeout(() => {
      if (active >= total - 1) setPlaying(false);
      else setActive(active + 1);
    }, 1100);
    return () => window.clearTimeout(timer);
  }, [active, playing, total]);

  const play = () => {
    if (playing) {
      setPlaying(false);
      return;
    }
    if (active >= total - 1) setActive(0);
    setPlaying(true);
  };

  const nameOf = (id: string) => data.participants.find(([pid]) => pid === id)?.[1] ?? id;
  const current = data.messages[active];

  const activation = (id: string) => {
    const rows = data.messages
      .map(([from, to], index) => (from === id || to === id ? index : -1))
      .filter((index) => index >= 0);
    if (!rows.length) return null;
    return { start: rows[0], end: rows[rows.length - 1] };
  };

  return (
    <div>
      <p className="mb-3 text-sm text-cream">
        <span className="font-semibold text-sun">Skenario:</span> {data.title}
      </p>
      <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
        <ul className="flex flex-wrap gap-x-5 gap-y-1.5 text-xs text-stone">
          <li className="flex items-center gap-1.5">
            <svg width="30" height="10" aria-hidden>
              <line x1="0" y1="5" x2="22" y2="5" stroke="currentColor" />
              <path d="M 21 1 L 29 5 L 21 9 z" fill="currentColor" />
            </svg>
            Panggilan
          </li>
          <li className="flex items-center gap-1.5">
            <svg width="30" height="10" aria-hidden>
              <line x1="0" y1="5" x2="26" y2="5" stroke="currentColor" strokeDasharray="4 3" />
              <path d="M 21 1 L 29 5 L 21 9" fill="none" stroke="currentColor" />
            </svg>
            Balasan
          </li>
        </ul>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => {
              setPlaying(false);
              setActive((value) => Math.max(0, value - 1));
            }}
            disabled={active === 0}
            className="grid size-9 place-items-center rounded-full border border-line text-cream transition hover:border-sun hover:text-sun disabled:opacity-30"
            aria-label="Langkah sebelumnya"
          >
            ←
          </button>
          <button
            type="button"
            onClick={play}
            className="rounded-full bg-sun px-4 py-2 text-sm font-semibold text-void transition hover:brightness-110"
          >
            {playing ? "Jeda" : active >= total - 1 ? "Putar ulang" : "Putar"}
          </button>
          <button
            type="button"
            onClick={() => {
              setPlaying(false);
              setActive((value) => Math.min(total - 1, value + 1));
            }}
            disabled={active >= total - 1}
            className="grid size-9 place-items-center rounded-full border border-line text-cream transition hover:border-sun hover:text-sun disabled:opacity-30"
            aria-label="Langkah berikutnya"
          >
            →
          </button>
        </div>
      </div>

      <DiagramShell
        width={width}
        height={height}
        hint="Klik pesan untuk membacanya, atau tekan Putar untuk menjalankan alurnya dari awal."
      >
        <defs>
          {(["dim", "lit"] as const).map((state) => {
            const color = state === "lit" ? INK.lit : "rgba(214,220,230,0.9)";
            return (
              <g key={state}>
                <marker
                  id={`${markerId}-call-${state}`}
                  viewBox="0 0 10 10"
                  refX="9"
                  refY="5"
                  markerWidth="9"
                  markerHeight="9"
                  markerUnits="userSpaceOnUse"
                  orient="auto"
                >
                  <path d="M 0 0 L 10 5 L 0 10 z" fill={color} />
                </marker>
                <marker
                  id={`${markerId}-reply-${state}`}
                  viewBox="0 0 10 10"
                  refX="9"
                  refY="5"
                  markerWidth="9"
                  markerHeight="9"
                  markerUnits="userSpaceOnUse"
                  orient="auto"
                >
                  <path d="M 1 1 L 9 5 L 1 9" fill="none" stroke={color} strokeWidth="1.5" />
                </marker>
              </g>
            );
          })}
        </defs>

        {data.participants.map(([id, label, actor]) => {
          const x = xOf(id);
          const span = activation(id);
          const lines = wrapText(label, 18);
          const involved = current && (current[0] === id || current[1] === id);
          const head = (y: number, key: string) =>
            actor ? (
              <g key={key}>
                <circle cx={x} cy={y + 8} r={8} fill={INK.bg} stroke={involved ? INK.lit : INK.aqua} strokeWidth={1.6} />
                <path
                  d={`M ${x} ${y + 16} V ${y + 32} M ${x - 12} ${y + 22} H ${x + 12} M ${x} ${y + 32} L ${x - 9} ${y + 44} M ${x} ${y + 32} L ${x + 9} ${y + 44}`}
                  stroke={involved ? INK.lit : INK.aqua}
                  strokeWidth={1.6}
                  strokeLinecap="round"
                  fill="none"
                />
                <text x={x} y={y + 60} textAnchor="middle" fontSize={12} fontWeight={600} fill={INK.cream}>
                  {label}
                </text>
              </g>
            ) : (
              <g key={key}>
                <rect
                  x={x - 82}
                  y={y}
                  width={164}
                  height={HEAD_H}
                  rx={12}
                  fill="#1f1709"
                  stroke={involved ? INK.lit : "rgba(251,191,36,0.6)"}
                  strokeWidth={involved ? 2 : 1.3}
                />
                <text x={x} y={y + HEAD_H / 2 + 5 - ((lines.length - 1) * 15) / 2} textAnchor="middle" fontSize={12.5} fontWeight={600} fill={INK.cream}>
                  {lines.map((line, index) => (
                    <tspan key={`${line}-${index}`} x={x} dy={index === 0 ? 0 : 15}>
                      {line}
                    </tspan>
                  ))}
                </text>
              </g>
            );
          return (
            <g key={id} className="dg-node">
              <line
                x1={x}
                x2={x}
                y1={HEAD_Y + HEAD_H + (actor ? 16 : 0)}
                y2={bottom + 8}
                stroke="rgba(246,244,239,0.22)"
                strokeDasharray="5 6"
              />
              {span ? (
                <rect
                  x={x - 6}
                  y={FIRST + span.start * STEP - 14}
                  width={12}
                  height={(span.end - span.start) * STEP + 28}
                  rx={3}
                  fill={involved ? "rgba(212,255,63,0.18)" : "rgba(246,244,239,0.08)"}
                  stroke={involved ? INK.lit : "rgba(246,244,239,0.25)"}
                />
              ) : null}
              {head(HEAD_Y, "top")}
              {actor ? null : head(bottom + 16, "bottom")}
            </g>
          );
        })}

        {data.messages.map(([from, to, label, reply], index) => {
          const y = FIRST + index * STEP;
          const x1 = xOf(from);
          const x2 = xOf(to);
          const lit = index === active;
          const done = index < active;
          const color = lit ? INK.lit : done ? "rgba(214,220,230,0.85)" : "rgba(148,163,184,0.45)";
          const marker = `url(#${markerId}-${reply ? "reply" : "call"}-${lit ? "lit" : "dim"})`;
          const self = from === to;
          const dir = x2 >= x1 ? 1 : -1;
          const d = self
            ? `M ${x1 + 6} ${y - 8} H ${x1 + 52} V ${y + 10} H ${x1 + 8}`
            : `M ${x1 + dir * 6} ${y} L ${x2 - dir * 7} ${y}`;
          const tx = self ? x1 + 60 : (x1 + x2) / 2;
          const lw = labelWidth(label, 11.5);
          return (
            <g
              key={`${from}-${to}-${index}`}
              className="dg-node cursor-pointer"
              onClick={() => {
                setPlaying(false);
                setActive(index);
              }}
              role="button"
              aria-label={`${index + 1}. ${label}`}
            >
              <rect x={Math.min(x1, x2) - 8} y={y - 24} width={Math.abs(x2 - x1) + (self ? 220 : 16)} height={36} fill="transparent" />
              {lit ? (
                <rect
                  x={self ? tx - 6 : tx - lw / 2 - 6}
                  y={y - 24}
                  width={lw + 12}
                  height={20}
                  rx={10}
                  fill="rgba(212,255,63,0.12)"
                />
              ) : null}
              <path
                d={d}
                fill="none"
                stroke={color}
                strokeWidth={lit ? 2.2 : 1.4}
                strokeDasharray={reply ? "6 5" : undefined}
                markerEnd={marker}
              />
              <text
                x={tx}
                y={y - 10}
                textAnchor={self ? "start" : "middle"}
                fontSize={11.5}
                fontWeight={lit ? 700 : 500}
                fill={lit ? INK.lit : done ? INK.cream : INK.stone}
              >
                {label}
              </text>
              <g>
                <circle cx={x1 + (self ? -18 : dir * -18)} cy={y} r={9} fill={lit ? INK.lit : INK.bg} stroke={lit ? INK.lit : "rgba(246,244,239,0.3)"} />
                <text
                  x={x1 + (self ? -18 : dir * -18)}
                  y={y + 3.5}
                  textAnchor="middle"
                  fontSize={9.5}
                  fontWeight={700}
                  fill={lit ? INK.bg : INK.stone}
                >
                  {index + 1}
                </text>
              </g>
            </g>
          );
        })}
      </DiagramShell>

      {current ? (
        <DetailCard
          kicker={`Langkah ${active + 1} dari ${total} · ${current[3] ? "Balasan" : "Panggilan"}`}
          title={current[2]}
          accent={INK.sun}
        >
          <p className="mt-2 text-sm text-cream/85">
            <span className="text-aqua">{nameOf(current[0])}</span>
            {current[0] === current[1] ? " memproses sendiri" : <> → <span className="text-sun">{nameOf(current[1])}</span></>}
          </p>
          <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-spectrum transition-[width] duration-500"
              style={{ width: `${((active + 1) / total) * 100}%` }}
            />
          </div>
        </DetailCard>
      ) : null}
    </div>
  );
}
