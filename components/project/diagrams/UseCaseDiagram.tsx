"use client";

import { useMemo, useState } from "react";
import type { ProjectDiagrams } from "@/lib/diagrams";
import {
  DetailCard,
  DiagramShell,
  INK,
  wrapText,
} from "@/components/project/diagrams/DiagramShell";

const WIDTH = 1000;
const SYS_X = 200;
const SYS_W = 600;
const RX = 118;
const RY = 30;
const STEP = 86;
const TOP = 112;
const ACTOR_X = { left: 90, right: 910 };

type Point = { x: number; y: number };

function ellipseEdge(c: Point, toward: Point, pad = 0) {
  const dx = toward.x - c.x;
  const dy = toward.y - c.y;
  if (dx === 0 && dy === 0) return c;
  const t = 1 / Math.sqrt((dx * dx) / ((RX + pad) * (RX + pad)) + (dy * dy) / ((RY + pad) * (RY + pad)));
  return { x: c.x + dx * t, y: c.y + dy * t };
}

function Actor({ x, y, label, on, color }: { x: number; y: number; label: string; on: boolean; color: string }) {
  const stroke = on ? INK.lit : color;
  return (
    <g>
      <circle cx={x} cy={y - 34} r={12} fill={INK.bg} stroke={stroke} strokeWidth={1.8} />
      <path
        d={`M ${x} ${y - 22} V ${y + 8} M ${x - 20} ${y - 10} H ${x + 20} M ${x} ${y + 8} L ${x - 15} ${y + 32} M ${x} ${y + 8} L ${x + 15} ${y + 32}`}
        fill="none"
        stroke={stroke}
        strokeWidth={1.8}
        strokeLinecap="round"
      />
      <text x={x} y={y + 52} textAnchor="middle" fontSize={12.5} fontWeight={600} fill={on ? INK.lit : INK.cream}>
        {label}
      </text>
    </g>
  );
}

export function UseCaseDiagram({
  data,
  slug,
}: {
  data: ProjectDiagrams["useCase"];
  slug: string;
}) {
  const [selected, setSelected] = useState(data.actors[0]?.[0] ?? "");
  const markerId = `uc-${slug}`;

  const layout = useMemo(() => {
    const twoCols = data.cases.length > 5;
    const actorSide = new Map(data.actors.map(([id, , s]) => [id, s]));
    const columns: [string, string][][] = [[], []];
    if (twoCols) {
      const pending: [string, string][] = [];
      data.cases.forEach((item) => {
        const sides = data.links.filter(([, uc]) => uc === item[0]).map(([actor]) => actorSide.get(actor));
        if (sides.length && sides.every((s) => s === "left")) columns[0].push(item);
        else if (sides.length && sides.every((s) => s === "right")) columns[1].push(item);
        else pending.push(item);
      });
      pending.forEach((item) => columns[columns[0].length <= columns[1].length ? 0 : 1].push(item));
    } else {
      columns[0] = [...data.cases];
    }
    const actorRank = new Map(data.actors.map(([id], index) => [id, index]));
    const caseRank = (caseId: string) =>
      Math.min(
        data.actors.length,
        ...data.links.filter(([, uc]) => uc === caseId).map(([actor]) => actorRank.get(actor) ?? data.actors.length),
      );
    columns.forEach((list) => list.sort((a, b) => caseRank(a[0]) - caseRank(b[0])));
    const perCol = Math.max(columns[0].length, columns[1].length);
    const cases = new Map<string, Point & { label: string; col: number }>();
    columns.forEach((list, col) => {
      const offset = ((perCol - list.length) * STEP) / 2;
      list.forEach(([id, label], row) => {
        cases.set(id, {
          x: twoCols ? (col === 0 ? 348 : 652) : 500,
          y: TOP + offset + row * STEP,
          label,
          col,
        });
      });
    });
    const sysH = perCol * STEP + 70;
    const height = TOP - 52 + sysH + 48;

    const actors = new Map<string, Point & { label: string; side: "left" | "right" }>();
    (["left", "right"] as const).forEach((side) => {
      const list = data.actors.filter((actor) => actor[2] === side);
      const span = sysH;
      list.forEach(([id, label], index) => {
        actors.set(id, {
          x: ACTOR_X[side],
          y: TOP - 52 + (span / (list.length + 1)) * (index + 1),
          label,
          side,
        });
      });
    });
    return { cases, actors, sysH, height };
  }, [data]);

  const isActor = layout.actors.has(selected);
  const litCases = new Set<string>();
  if (isActor) {
    data.links.forEach(([actor, useCase]) => actor === selected && litCases.add(useCase));
  } else {
    litCases.add(selected);
    data.relations.forEach(([from, to]) => {
      if (from === selected) litCases.add(to);
      if (to === selected) litCases.add(from);
    });
  }
  const litActors = new Set<string>(
    isActor ? [selected] : data.links.filter(([, useCase]) => useCase === selected).map(([actor]) => actor),
  );

  const label = (id: string) =>
    layout.actors.get(id)?.label ?? layout.cases.get(id)?.label ?? id;

  return (
    <div>
      <ul className="mb-3 flex flex-wrap gap-x-5 gap-y-1.5 text-xs text-stone">
        <li className="flex items-center gap-1.5">
          <span className="text-base leading-none text-aqua">웃</span> Aktor
        </li>
        <li className="flex items-center gap-1.5">
          <span className="h-3.5 w-7 rounded-[50%] border border-coral/70 bg-[#2a1018]" /> Use case
        </li>
        <li className="flex items-center gap-1.5">
          <span className="w-6 border-t border-dashed border-cream/70" /> «include» / «extend»
        </li>
      </ul>

      <DiagramShell
        width={WIDTH}
        height={layout.height}
        hint="Klik aktor untuk melihat apa saja yang bisa ia lakukan, atau klik use case untuk melihat relasinya."
      >
        <defs>
          {(["dim", "lit"] as const).map((state) => (
            <marker
              key={state}
              id={`${markerId}-${state}`}
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="9"
              markerHeight="9"
              markerUnits="userSpaceOnUse"
              orient="auto"
            >
              <path d="M 1 1 L 9 5 L 1 9" fill="none" stroke={state === "lit" ? INK.lit : "rgba(214,220,230,0.9)"} strokeWidth="1.5" />
            </marker>
          ))}
        </defs>

        <g className="dg-node">
          <rect
            x={SYS_X}
            y={TOP - 52}
            width={SYS_W}
            height={layout.sysH}
            rx={22}
            fill="rgba(251,113,133,0.04)"
            stroke="rgba(251,113,133,0.45)"
            strokeWidth={1.4}
          />
          <text x={SYS_X + 22} y={TOP - 26} fontSize={13} fontWeight={700} fill={INK.coral}>
            {data.system}
          </text>
        </g>

        {data.links.map(([actorId, caseId]) => {
          const actor = layout.actors.get(actorId);
          const uc = layout.cases.get(caseId);
          if (!actor || !uc) return null;
          const from = { x: actor.x + (actor.side === "left" ? 24 : -24), y: actor.y - 10 };
          const to = ellipseEdge(uc, from);
          const lit = isActor ? actorId === selected : caseId === selected;
          return (
            <path
              key={`${actorId}-${caseId}`}
              className="dg-draw"
              d={`M ${from.x} ${from.y} L ${to.x} ${to.y}`}
              stroke={lit ? INK.lit : INK.wire}
              strokeWidth={lit ? 2 : 1.3}
              pathLength={1}
              strokeDasharray="1"
              opacity={lit ? 1 : 0.65}
            />
          );
        })}

        {data.relations.map(([fromId, toId, kind]) => {
          const a = layout.cases.get(fromId);
          const b = layout.cases.get(toId);
          if (!a || !b) return null;
          const lit = fromId === selected || toId === selected;
          let d: string;
          let mx: number;
          let my: number;
          if (a.col === b.col && Math.abs(a.x - b.x) < 1) {
            const side = a.col === 1 ? -1 : 1;
            const s = { x: a.x + side * RX, y: a.y };
            const e = { x: b.x + side * RX, y: b.y };
            const bulge = side * 60;
            d = `M ${s.x} ${s.y} C ${s.x + bulge} ${s.y}, ${e.x + bulge} ${e.y}, ${e.x} ${e.y}`;
            mx = (s.x + e.x) / 2 + bulge * 0.75;
            my = (s.y + e.y) / 2;
          } else {
            const s = ellipseEdge(a, b, 2);
            const e = ellipseEdge(b, a, 4);
            d = `M ${s.x} ${s.y} L ${e.x} ${e.y}`;
            mx = (s.x + e.x) / 2;
            my = (s.y + e.y) / 2;
          }
          const text = `«${kind}»`;
          return (
            <g key={`${fromId}-${toId}`}>
              <path
                className="dg-wire"
                d={d}
                fill="none"
                stroke={lit ? INK.lit : "rgba(214,220,230,0.75)"}
                strokeWidth={lit ? 1.8 : 1.3}
                strokeDasharray="6 8"
                markerEnd={`url(#${markerId}-${lit ? "lit" : "dim"})`}
              />
              <g className="dg-node">
                <rect x={mx - 32} y={my - 10} width={64} height={20} rx={10} fill={INK.bg} stroke={lit ? INK.lit : "rgba(246,244,239,0.16)"} />
                <text x={mx} y={my + 4} textAnchor="middle" fontSize={10.5} fontStyle="italic" fill={lit ? INK.lit : INK.stone}>
                  {text}
                </text>
              </g>
            </g>
          );
        })}

        {[...layout.cases].map(([id, uc]) => {
          const on = litCases.has(id);
          const lines = wrapText(uc.label, 24);
          return (
            <g key={id} className="dg-node cursor-pointer" onClick={() => setSelected(id)} role="button" aria-label={uc.label}>
              <ellipse
                cx={uc.x}
                cy={uc.y}
                rx={RX}
                ry={RY}
                fill={on ? "rgba(212,255,63,0.1)" : "#2a1018"}
                stroke={on ? INK.lit : "rgba(251,113,133,0.7)"}
                strokeWidth={id === selected ? 2.2 : 1.4}
              />
              <text x={uc.x} y={uc.y + 5 - ((lines.length - 1) * 15) / 2} textAnchor="middle" fontSize={13} fontWeight={600} fill={INK.cream}>
                {lines.map((line, index) => (
                  <tspan key={`${line}-${index}`} x={uc.x} dy={index === 0 ? 0 : 15}>
                    {line}
                  </tspan>
                ))}
              </text>
            </g>
          );
        })}

        {[...layout.actors].map(([id, actor]) => (
          <g key={id} className="dg-node cursor-pointer" onClick={() => setSelected(id)} role="button" aria-label={actor.label}>
            <rect x={actor.x - 70} y={actor.y - 54} width={140} height={120} fill="transparent" />
            <Actor x={actor.x} y={actor.y} label={actor.label} on={litActors.has(id)} color={actor.side === "left" ? INK.aqua : INK.sun} />
          </g>
        ))}
      </DiagramShell>

      <DetailCard
        kicker={isActor ? "Aktor" : "Use case"}
        title={label(selected)}
        accent={INK.coral}
      >
        <div className="mt-3 text-sm text-cream/90">
          {isActor ? (
            <>
              <p className="text-xs font-semibold tracking-wide text-stone uppercase">Bisa melakukan</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {[...litCases].map((id) => (
                  <span key={id} className="chip">{label(id)}</span>
                ))}
              </div>
            </>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <p className="text-xs font-semibold tracking-wide text-stone uppercase">Dijalankan oleh</p>
                <p className="mt-2">
                  {[...litActors].map(label).join(", ") || "Dipicu dari use case lain"}
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold tracking-wide text-stone uppercase">Relasi</p>
                <ul className="mt-2 space-y-1">
                  {data.relations.filter(([from, to]) => from === selected || to === selected).length ? (
                    data.relations
                      .filter(([from, to]) => from === selected || to === selected)
                      .map(([from, to, kind]) => (
                        <li key={`${from}-${to}`}>
                          {label(from)} <span className="text-coral italic">«{kind}»</span> {label(to)}
                        </li>
                      ))
                  ) : (
                    <li className="text-stone">Tidak ada</li>
                  )}
                </ul>
              </div>
            </div>
          )}
        </div>
      </DetailCard>
    </div>
  );
}
