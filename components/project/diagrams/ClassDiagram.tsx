"use client";

import { useMemo, useState } from "react";
import type { ProjectDiagrams, UmlClass, UmlRelationKind } from "@/lib/diagrams";
import {
  DetailCard,
  DiagramShell,
  EdgeLabel,
  INK,
} from "@/components/project/diagrams/DiagramShell";

const BW = 260;
const LH = 18;
const PAD = 48;
const GX = 112;
const GY = 84;
const COLS = 3;
const WIDTH = PAD * 2 + COLS * BW + (COLS - 1) * GX;

type Box = UmlClass & { x: number; y: number; w: number; h: number; head: number; split: number };

const RELATION_LABEL: Record<UmlRelationKind, string> = {
  assoc: "asosiasi",
  compose: "komposisi",
  inherit: "pewarisan",
};

function boxHeight(cls: UmlClass) {
  const head = 38 + (cls.stereotype ? 14 : 0);
  const attrs = Math.max(1, cls.attrs.length) * LH + 16;
  const methods = Math.max(1, cls.methods.length) * LH + 16;
  return { head, split: head + attrs, h: head + attrs + methods };
}

function clip(box: Box, tx: number, ty: number) {
  const cx = box.x + box.w / 2;
  const cy = box.y + box.h / 2;
  const dx = tx - cx;
  const dy = ty - cy;
  if (dx === 0 && dy === 0) return { x: cx, y: cy };
  const scale = Math.min(
    dx === 0 ? Infinity : box.w / 2 / Math.abs(dx),
    dy === 0 ? Infinity : box.h / 2 / Math.abs(dy),
  );
  return { x: cx + dx * scale, y: cy + dy * scale };
}

function Markers({ id }: { id: string }) {
  return (
    <>
      {(["dim", "lit"] as const).map((state) => {
        const color = state === "lit" ? INK.lit : "rgba(214,220,230,0.9)";
        return (
          <g key={state}>
            <marker
              id={`${id}-inherit-${state}`}
              viewBox="0 0 14 14"
              refX="13"
              refY="7"
              markerWidth="13"
              markerHeight="13"
              markerUnits="userSpaceOnUse"
              orient="auto-start-reverse"
            >
              <path d="M 1 1 L 13 7 L 1 13 z" fill={INK.bg} stroke={color} strokeWidth="1.4" />
            </marker>
            <marker
              id={`${id}-compose-${state}`}
              viewBox="0 0 16 10"
              refX="15"
              refY="5"
              markerWidth="16"
              markerHeight="10"
              markerUnits="userSpaceOnUse"
              orient="auto-start-reverse"
            >
              <path d="M 1 5 L 8 1 L 15 5 L 8 9 z" fill={color} />
            </marker>
            <marker
              id={`${id}-assoc-${state}`}
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="10"
              markerHeight="10"
              markerUnits="userSpaceOnUse"
              orient="auto-start-reverse"
            >
              <path d="M 1 1 L 9 5 L 1 9" fill="none" stroke={color} strokeWidth="1.5" />
            </marker>
          </g>
        );
      })}
    </>
  );
}

export function ClassDiagram({
  data,
  slug,
}: {
  data: ProjectDiagrams["uml"];
  slug: string;
}) {
  const [selected, setSelected] = useState(data.classes[0]?.id ?? "");
  const markerId = `uml-${slug}`;

  const { boxes, height } = useMemo(() => {
    const sized = data.classes.map((cls) => ({ cls, ...boxHeight(cls) }));
    const rows: (typeof sized)[] = [];
    sized.forEach((item, index) => {
      const row = Math.floor(index / COLS);
      (rows[row] ??= []).push(item);
    });
    const list: Box[] = [];
    let y = PAD;
    rows.forEach((row) => {
      const rowH = Math.max(...row.map((item) => item.h));
      const offset = ((COLS - row.length) * (BW + GX)) / 2;
      row.forEach((item, col) => {
        list.push({
          ...item.cls,
          x: PAD + offset + col * (BW + GX),
          y: y + (rowH - item.h) / 2,
          w: BW,
          h: item.h,
          head: item.head,
          split: item.split,
        });
      });
      y += rowH + GY;
    });
    return { boxes: list, height: y - GY + PAD };
  }, [data.classes]);

  const links = useMemo(() => {
    const byId = new Map(boxes.map((box) => [box.id, box]));
    return data.relations.flatMap(([from, to, kind, label], index) => {
      const a = byId.get(from);
      const b = byId.get(to);
      if (!a || !b) return [];
      const p1 = clip(a, b.x + b.w / 2, b.y + b.h / 2);
      const p2 = clip(b, a.x + a.w / 2, a.y + a.h / 2);
      return [{ id: `${from}-${to}-${index}`, from, to, kind, label, p1, p2 }];
    });
  }, [boxes, data.relations]);

  const current = boxes.find((box) => box.id === selected) ?? boxes[0];
  const nameOf = (id: string) => boxes.find((box) => box.id === id)?.name ?? id;
  const related = data.relations.filter(([from, to]) => from === current?.id || to === current?.id);

  return (
    <div>
      <ul className="mb-3 flex flex-wrap gap-x-5 gap-y-1.5 text-xs text-stone">
        <li className="flex items-center gap-1.5">
          <svg width="30" height="10" aria-hidden>
            <line x1="0" y1="5" x2="22" y2="5" stroke="currentColor" />
            <path d="M 21 1 L 29 5 L 21 9" fill="none" stroke="currentColor" />
          </svg>
          Asosiasi
        </li>
        <li className="flex items-center gap-1.5">
          <svg width="30" height="10" aria-hidden>
            <path d="M 1 5 L 7 1 L 13 5 L 7 9 z" fill="currentColor" />
            <line x1="13" y1="5" x2="30" y2="5" stroke="currentColor" />
          </svg>
          Komposisi (bagian dari)
        </li>
        <li className="flex items-center gap-1.5">
          <svg width="30" height="10" aria-hidden>
            <line x1="0" y1="5" x2="20" y2="5" stroke="currentColor" />
            <path d="M 20 1 L 29 5 L 20 9 z" fill="none" stroke="currentColor" />
          </svg>
          Pewarisan
        </li>
      </ul>

      <DiagramShell
        width={WIDTH}
        height={height}
        hint="Klik kelas untuk membaca atribut, method, dan relasinya. Tarik untuk menggeser."
      >
        <defs>
          <Markers id={markerId} />
        </defs>

        {links.map((link) => {
          const lit = link.from === selected || link.to === selected;
          const state = lit ? "lit" : "dim";
          return (
            <path
              key={link.id}
              className="dg-draw"
              d={`M ${link.p1.x} ${link.p1.y} L ${link.p2.x} ${link.p2.y}`}
              stroke={lit ? INK.lit : INK.wire}
              strokeWidth={lit ? 2 : 1.4}
              fill="none"
              pathLength={1}
              strokeDasharray="1"
              opacity={lit ? 1 : 0.7}
              markerStart={link.kind === "compose" ? `url(#${markerId}-compose-${state})` : undefined}
              markerEnd={
                link.kind === "inherit"
                  ? `url(#${markerId}-inherit-${state})`
                  : link.kind === "assoc"
                    ? `url(#${markerId}-assoc-${state})`
                    : undefined
              }
            />
          );
        })}

        {boxes.map((box) => {
          const on = box.id === selected;
          const stroke = on ? INK.lit : "rgba(167,139,250,0.6)";
          return (
            <g
              key={box.id}
              className="dg-node cursor-pointer"
              onClick={() => setSelected(box.id)}
              role="button"
              aria-label={box.name}
            >
              <rect x={box.x} y={box.y} width={box.w} height={box.h} rx={12} fill="#131118" stroke={stroke} strokeWidth={on ? 2 : 1.3} />
              <path
                d={`M ${box.x} ${box.y + box.head} V ${box.y + 12} Q ${box.x} ${box.y} ${box.x + 12} ${box.y} H ${box.x + box.w - 12} Q ${box.x + box.w} ${box.y} ${box.x + box.w} ${box.y + 12} V ${box.y + box.head} Z`}
                fill={on ? "rgba(212,255,63,0.12)" : "rgba(167,139,250,0.16)"}
              />
              {box.stereotype ? (
                <text x={box.x + box.w / 2} y={box.y + 18} textAnchor="middle" fontSize={10} fill={INK.stone}>
                  «{box.stereotype}»
                </text>
              ) : null}
              <text
                x={box.x + box.w / 2}
                y={box.y + (box.stereotype ? 36 : 25)}
                textAnchor="middle"
                fontSize={14}
                fontWeight={700}
                fontStyle={box.stereotype === "abstract" ? "italic" : undefined}
                fill={on ? INK.lit : INK.cream}
              >
                {box.name}
              </text>
              <line x1={box.x} x2={box.x + box.w} y1={box.y + box.head} y2={box.y + box.head} stroke={stroke} strokeOpacity={0.6} />
              <line x1={box.x} x2={box.x + box.w} y1={box.y + box.split} y2={box.y + box.split} stroke={stroke} strokeOpacity={0.6} />
              {box.attrs.map((attr, index) => (
                <text
                  key={attr}
                  x={box.x + 14}
                  y={box.y + box.head + 22 + index * LH}
                  fontSize={11.5}
                  fontFamily="var(--font-geist-mono), monospace"
                  fill={INK.aqua}
                >
                  {attr}
                </text>
              ))}
              {box.methods.map((method, index) => (
                <text
                  key={method}
                  x={box.x + 14}
                  y={box.y + box.split + 22 + index * LH}
                  fontSize={11.5}
                  fontFamily="var(--font-geist-mono), monospace"
                  fill={INK.sun}
                >
                  {method}
                </text>
              ))}
            </g>
          );
        })}

        {links.map((link) =>
          link.label ? (
            <EdgeLabel
              key={`${link.id}-label`}
              x={(link.p1.x + link.p2.x) / 2}
              y={(link.p1.y + link.p2.y) / 2}
              text={link.label}
              lit={link.from === selected || link.to === selected}
            />
          ) : null,
        )}
      </DiagramShell>

      {current ? (
        <DetailCard
          kicker={current.stereotype ? `Kelas «${current.stereotype}»` : "Kelas"}
          title={current.name}
          accent={INK.grape}
        >
          <div className="mt-3 grid gap-4 text-sm md:grid-cols-3">
            <div>
              <p className="text-xs font-semibold tracking-wide text-stone uppercase">Atribut</p>
              <ul className="mt-2 space-y-1 font-mono text-xs text-aqua">
                {current.attrs.map((attr) => (
                  <li key={attr}>{attr}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs font-semibold tracking-wide text-stone uppercase">Method</p>
              <ul className="mt-2 space-y-1 font-mono text-xs text-sun">
                {current.methods.map((method) => (
                  <li key={method}>{method}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs font-semibold tracking-wide text-stone uppercase">Relasi</p>
              <ul className="mt-2 space-y-1.5 text-cream/90">
                {related.length ? (
                  related.map(([from, to, kind, label]) => (
                    <li key={`${from}-${to}`}>
                      {nameOf(from)} <span className="text-grape">{RELATION_LABEL[kind]}</span> {nameOf(to)}
                      {label ? <span className="text-stone"> ({label})</span> : null}
                    </li>
                  ))
                ) : (
                  <li className="text-stone">Tidak ada</li>
                )}
              </ul>
            </div>
          </div>
        </DetailCard>
      ) : null}
    </div>
  );
}
