"use client";

import { useMemo, useState } from "react";
import type { ProjectDiagrams } from "@/lib/diagrams";
import {
  ArrowMarkers,
  DetailCard,
  DiagramShell,
  EdgeLabel,
  INK,
  labelWidth,
  wrapText,
} from "@/components/project/diagrams/DiagramShell";

type Kind = "entity" | "process" | "store";
type Node = {
  id: string;
  label: string;
  kind: Kind;
  no: string;
  x: number;
  y: number;
  w: number;
  h: number;
  cx: number;
  cy: number;
};

const SIZE: Record<Kind, { w: number; h: number }> = {
  entity: { w: 184, h: 68 },
  process: { w: 136, h: 136 },
  store: { w: 214, h: 54 },
};
const COL_X: Record<Kind, number> = { entity: 40, process: 424, store: 784 };
const COL: Record<Kind, number> = { entity: 0, process: 1, store: 2 };
const GAP = 34;
const PAD = 52;
const WIDTH = COL_X.store + SIZE.store.w + 40;
const KIND_LABEL: Record<Kind, string> = {
  entity: "Entitas eksternal",
  process: "Proses",
  store: "Penyimpanan data",
};

function anchor(node: Node, side: "l" | "r", off: number) {
  if (node.kind === "process") {
    const r = node.w / 2;
    const o = Math.max(-r + 10, Math.min(r - 10, off));
    const dx = Math.sqrt(r * r - o * o);
    return { x: node.cx + (side === "r" ? dx : -dx), y: node.cy + o };
  }
  return { x: side === "r" ? node.x + node.w : node.x, y: node.cy + off };
}

export function DfdDiagram({
  data,
  slug,
}: {
  data: ProjectDiagrams["dfd"];
  slug: string;
}) {
  const [selected, setSelected] = useState(data.processes[0]?.[0] ?? "");
  const markerId = `dfd-${slug}`;

  const { nodes, height } = useMemo(() => {
    const groups: [Kind, typeof data.entities][] = [
      ["entity", data.entities],
      ["process", data.processes],
      ["store", data.stores],
    ];
    const heights = groups.map(
      ([kind, items]) => items.length * SIZE[kind].h + Math.max(0, items.length - 1) * GAP,
    );
    const total = Math.max(...heights) + PAD * 2;
    const list: Node[] = [];
    groups.forEach(([kind, items]) => {
      const slot = (total - PAD * 2) / Math.max(1, items.length);
      items.forEach(([id, label], index) => {
        const { w, h } = SIZE[kind];
        const x = COL_X[kind];
        const y = PAD + slot * (index + 0.5) - h / 2;
        list.push({
          id,
          label,
          kind,
          no: kind === "process" ? `${index + 1}.0` : kind === "store" ? `D${index + 1}` : "",
          x,
          y,
          w,
          h,
          cx: x + w / 2,
          cy: y + h / 2,
        });
      });
    });
    return { nodes: list, height: total };
  }, [data]);

  const edges = useMemo(() => {
    const byId = new Map(nodes.map((node) => [node.id, node]));
    const pairCount = new Map<string, number>();
    const pairSeen = new Map<string, number>();
    const key = (a: string, b: string) => [a, b].sort().join("|");
    data.flows.forEach(([from, to]) => {
      const k = key(from, to);
      pairCount.set(k, (pairCount.get(k) ?? 0) + 1);
    });

    const placed: { x: number; y: number; w: number }[] = [];
    const free = (x: number, y: number, w: number) =>
      placed.every((p) => Math.abs(p.x - x) > (p.w + w) / 2 + 4 || Math.abs(p.y - y) > 22) &&
      nodes.every((node) => x + w / 2 < node.x - 4 || x - w / 2 > node.x + node.w + 4 || y + 10 < node.y || y - 10 > node.y + node.h);

    return data.flows.flatMap(([from, to, label], index) => {
      const a = byId.get(from);
      const b = byId.get(to);
      if (!a || !b) return [];
      const k = key(from, to);
      const n = pairCount.get(k) ?? 1;
      const i = pairSeen.get(k) ?? 0;
      pairSeen.set(k, i + 1);
      const off = (i - (n - 1) / 2) * 20;

      let s: { x: number; y: number };
      let e: { x: number; y: number };
      let c1x: number;
      let c2x: number;
      if (COL[a.kind] === COL[b.kind]) {
        s = anchor(a, "r", off);
        e = anchor(b, "r", off);
        c1x = s.x + 74;
        c2x = e.x + 74;
      } else {
        const forward = COL[a.kind] < COL[b.kind];
        s = anchor(a, forward ? "r" : "l", off);
        e = anchor(b, forward ? "l" : "r", off);
        const dx = (e.x - s.x) / 2;
        c1x = s.x + dx;
        c2x = e.x - dx;
      }
      const d = `M ${s.x} ${s.y} C ${c1x} ${s.y}, ${c2x} ${e.y}, ${e.x} ${e.y}`;
      const at = (t: number) => {
        const u = 1 - t;
        return {
          x: u * u * u * s.x + 3 * u * u * t * c1x + 3 * u * t * t * c2x + t * t * t * e.x,
          y: u * u * u * s.y + 3 * u * u * t * s.y + 3 * u * t * t * e.y + t * t * t * e.y,
        };
      };
      const w = labelWidth(label);
      const spot =
        [0.5, 0.62, 0.38, 0.72, 0.28, 0.8, 0.2].map(at).find((p) => free(p.x, p.y, w)) ?? at(0.5);
      placed.push({ x: spot.x, y: spot.y, w });
      return [{ id: `${from}-${to}-${index}`, from, to, label, d, mx: spot.x, my: spot.y }];
    });
  }, [data.flows, nodes]);

  const current = nodes.find((node) => node.id === selected) ?? nodes[0];
  const nameOf = (id: string) => nodes.find((node) => node.id === id)?.label ?? id;
  const incoming = data.flows.filter(([, to]) => to === current?.id);
  const outgoing = data.flows.filter(([from]) => from === current?.id);

  return (
    <div>
      <ul className="mb-3 flex flex-wrap gap-x-5 gap-y-1.5 text-xs text-stone">
        <li className="flex items-center gap-1.5">
          <span className="h-3 w-5 rounded-sm border border-aqua/70 bg-[#0b1b2c]" />
          Entitas eksternal
        </li>
        <li className="flex items-center gap-1.5">
          <span className="size-3.5 rounded-full border border-grape/70 bg-[#191330]" />
          Proses
        </li>
        <li className="flex items-center gap-1.5">
          <span className="h-3 w-6 border-y border-l border-sun/70 bg-[#1f1709]" />
          Penyimpanan data
        </li>
        <li className="flex items-center gap-1.5">
          <span className="h-px w-6 bg-cream/60" />
          Aliran data
        </li>
      </ul>

      <DiagramShell
        width={WIDTH}
        height={height}
        hint="Klik entitas, proses, atau penyimpanan untuk melihat data yang masuk dan keluar. Tarik untuk menggeser."
      >
        <defs>
          <ArrowMarkers id={markerId} />
        </defs>

        {edges.map((edge) => {
          const lit = edge.from === selected || edge.to === selected;
          return (
            <g key={edge.id} opacity={lit ? 1 : 0.55}>
              <path
                className="dg-draw"
                d={edge.d}
                fill="none"
                stroke={lit ? INK.lit : INK.wire}
                strokeWidth={lit ? 2.2 : 1.5}
                pathLength={1}
                strokeDasharray="1"
                markerEnd={`url(#${markerId}-${lit ? "lit" : "dim"})`}
              />
              {lit ? (
                <path
                  className="dg-wire"
                  d={edge.d}
                  fill="none"
                  stroke={INK.lit}
                  strokeWidth="1.2"
                  strokeDasharray="6 8"
                />
              ) : null}
            </g>
          );
        })}

        {nodes.map((node) => {
          const on = node.id === selected;
          const lines = wrapText(node.label, node.kind === "process" ? 13 : 20);
          const stroke =
            node.kind === "entity" ? INK.aqua : node.kind === "process" ? INK.grape : INK.sun;
          return (
            <g
              key={node.id}
              className="dg-node cursor-pointer"
              onClick={() => setSelected(node.id)}
              role="button"
              aria-label={node.label}
            >
              {node.kind === "entity" ? (
                <>
                  <rect
                    x={node.x + 5}
                    y={node.y + 5}
                    width={node.w}
                    height={node.h}
                    rx={10}
                    fill="none"
                    stroke={stroke}
                    strokeOpacity={0.25}
                  />
                  <rect
                    x={node.x}
                    y={node.y}
                    width={node.w}
                    height={node.h}
                    rx={10}
                    fill="#0b1b2c"
                    stroke={on ? INK.lit : stroke}
                    strokeWidth={on ? 2 : 1.4}
                  />
                </>
              ) : node.kind === "process" ? (
                <>
                  <circle
                    cx={node.cx}
                    cy={node.cy}
                    r={node.w / 2}
                    fill="#191330"
                    stroke={on ? INK.lit : stroke}
                    strokeWidth={on ? 2.2 : 1.5}
                  />
                  <line
                    x1={node.cx - 40}
                    x2={node.cx + 40}
                    y1={node.cy - 24}
                    y2={node.cy - 24}
                    stroke={stroke}
                    strokeOpacity={0.4}
                  />
                  <text
                    x={node.cx}
                    y={node.cy - 32}
                    textAnchor="middle"
                    fontSize={12}
                    fontWeight={700}
                    fill={stroke}
                  >
                    {node.no}
                  </text>
                </>
              ) : (
                <>
                  <rect x={node.x} y={node.y} width={node.w} height={node.h} fill="#1f1709" />
                  <path
                    d={`M ${node.x + node.w} ${node.y} H ${node.x} V ${node.y + node.h} H ${node.x + node.w}`}
                    fill="none"
                    stroke={on ? INK.lit : stroke}
                    strokeWidth={on ? 2 : 1.4}
                  />
                  <line
                    x1={node.x + 46}
                    x2={node.x + 46}
                    y1={node.y}
                    y2={node.y + node.h}
                    stroke={stroke}
                    strokeOpacity={0.6}
                  />
                  <text
                    x={node.x + 23}
                    y={node.cy + 4}
                    textAnchor="middle"
                    fontSize={12}
                    fontWeight={700}
                    fill={stroke}
                  >
                    {node.no}
                  </text>
                </>
              )}
              <text
                x={node.kind === "store" ? node.x + 46 + (node.w - 46) / 2 : node.cx}
                y={
                  node.kind === "process"
                    ? node.cy + 2 - ((lines.length - 1) * 16) / 2 + 6
                    : node.cy + 5 - ((lines.length - 1) * 16) / 2
                }
                textAnchor="middle"
                fontSize={13}
                fontWeight={600}
                fill={INK.cream}
              >
                {lines.map((line, index) => (
                  <tspan
                    key={line}
                    x={node.kind === "store" ? node.x + 46 + (node.w - 46) / 2 : node.cx}
                    dy={index === 0 ? 0 : 16}
                  >
                    {line}
                  </tspan>
                ))}
              </text>
            </g>
          );
        })}

        {edges.map((edge) => {
          const lit = edge.from === selected || edge.to === selected;
          return <EdgeLabel key={`${edge.id}-label`} x={edge.mx} y={edge.my} text={edge.label} lit={lit} />;
        })}
      </DiagramShell>

      {current ? (
        <DetailCard
          kicker={`${KIND_LABEL[current.kind]}${current.no ? ` · ${current.no}` : ""}`}
          title={current.label}
          accent={current.kind === "entity" ? INK.aqua : current.kind === "process" ? INK.grape : INK.sun}
        >
          <div className="mt-3 grid gap-4 text-sm md:grid-cols-2">
            <div>
              <p className="text-xs font-semibold tracking-wide text-stone uppercase">Data masuk</p>
              <ul className="mt-2 space-y-1.5">
                {incoming.length ? (
                  incoming.map(([from, , label]) => (
                    <li key={`${from}-${label}`} className="text-cream/90">
                      <span className="text-aqua">{nameOf(from)}</span> → {label}
                    </li>
                  ))
                ) : (
                  <li className="text-stone">Tidak ada</li>
                )}
              </ul>
            </div>
            <div>
              <p className="text-xs font-semibold tracking-wide text-stone uppercase">Data keluar</p>
              <ul className="mt-2 space-y-1.5">
                {outgoing.length ? (
                  outgoing.map(([, to, label]) => (
                    <li key={`${to}-${label}`} className="text-cream/90">
                      {label} → <span className="text-grape">{nameOf(to)}</span>
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
