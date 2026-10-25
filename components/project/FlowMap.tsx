"use client";

import { useMemo, useRef, useState } from "react";
import type { Project } from "@/lib/projects";
import { gsap, useGSAP } from "@/lib/gsap";
import { finePointer, reducedMotion } from "@/lib/motion";
import { PanZoomCanvas } from "@/components/project/PanZoomCanvas";

type NodeKind = "start" | "process" | "decision" | "end";

type MapNode = {
  id: string;
  title: string;
  caption: string;
  body: string;
  column: number;
  lane: number;
  kind: NodeKind;
  inner: { title: string; note?: string }[];
};

type MapEdge = {
  id: string;
  from: string;
  to: string;
  label: string;
};

type Box = { x: number; y: number; w: number; h: number };

const CELL_W = 224;
const CELL_H = 164;
const GAP_X = 60;
const GAP_Y = 28;
const PAD = 48;

const INK = "#171717";
const WIRE = "rgba(23,23,23,0.38)";

function sizeFor(kind: NodeKind) {
  if (kind === "decision") return { w: 172, h: 172 };
  if (kind === "start" || kind === "end") return { w: 180, h: 68 };
  return { w: 212, h: 128 };
}

function buildMap(project: Project) {
  const steps = project.flow;
  const start: MapNode = {
    id: "start",
    title: "Pengguna",
    caption: "Mulai",
    body: "Titik masuk. Dari sini alur bisa bercabang, lalu bertemu lagi sebelum selesai.",
    column: 0,
    lane: 1,
    kind: "start",
    inner: [{ title: project.title, note: "Masuk" }],
  };

  const nodes: MapNode[] = [
    start,
    ...steps.map((step, index) => ({
      id: step.step,
      title: step.title,
      caption: step.kind === "decision" ? "Keputusan" : `Langkah ${step.step}`,
      body: step.body,
      column: step.column ?? index + 1,
      lane: step.lane ?? 1,
      kind: (step.kind ?? (index === steps.length - 1 ? "end" : "process")) as NodeKind,
      inner: step.inner ?? [],
    })),
  ];

  const edges: MapEdge[] = [];
  steps.forEach((step, index) => {
    const sources = step.from ?? [
      { id: index === 0 ? "start" : steps[index - 1].step },
    ];
    sources.forEach((source) => {
      edges.push({
        id: `${source.id}-${step.step}`,
        from: source.id,
        to: step.step,
        label: source.label ?? "",
      });
    });
  });

  return { nodes, edges };
}

function cellBox(node: MapNode, minLane: number): Box {
  const size = sizeFor(node.kind);
  const ox = PAD + node.column * (CELL_W + GAP_X);
  const oy = PAD + (node.lane - minLane) * (CELL_H + GAP_Y);
  return {
    x: ox + (CELL_W - size.w) / 2,
    y: oy + (CELL_H - size.h) / 2,
    w: size.w,
    h: size.h,
  };
}

function route(from: MapNode, to: MapNode, a: Box, b: Box, minLane: number) {
  const acx = a.x + a.w / 2;
  const acy = a.y + a.h / 2;
  const bcx = b.x + b.w / 2;
  const bcy = b.y + b.h / 2;
  const backward = b.x + b.w < a.x - 12;

  if (backward) {
    const topLoop = from.lane <= minLane || to.lane <= minLane;
    const y = topLoop
      ? Math.max(18, Math.min(a.y, b.y) - 26)
      : Math.max(a.y + a.h, b.y + b.h) + 26;
    const y1 = topLoop ? a.y : a.y + a.h;
    const y2 = topLoop ? b.y : b.y + b.h;
    return {
      d: `M ${acx} ${y1} L ${acx} ${y} L ${bcx} ${y} L ${bcx} ${y2}`,
      lx: (acx + bcx) / 2,
      ly: y - 10,
    };
  }

  if (Math.abs(from.column - to.column) < 1) {
    const down = b.y > a.y;
    return {
      d: down
        ? `M ${acx} ${a.y + a.h} L ${bcx} ${b.y}`
        : `M ${acx} ${a.y} L ${bcx} ${b.y + b.h}`,
      lx: acx + 18,
      ly: (acy + bcy) / 2,
    };
  }

  const x1 = a.x + a.w;
  const x2 = b.x;
  if (Math.abs(acy - bcy) < 8) {
    return {
      d: `M ${x1} ${acy} L ${x2} ${bcy}`,
      lx: (x1 + x2) / 2,
      ly: acy - 14,
    };
  }

  const mid = x1 + Math.max(30, (x2 - x1) / 2);
  return {
    d: `M ${x1} ${acy} L ${mid} ${acy} L ${mid} ${bcy} L ${x2} ${bcy}`,
    lx: mid,
    ly: acy + (bcy - acy) * 0.28,
  };
}

export function FlowMap({ project }: { project: Project }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState("start");

  const { nodes, edges } = useMemo(() => buildMap(project), [project]);
  const selected = nodes.find((node) => node.id === active) ?? nodes[0];
  const columns = Math.max(...nodes.map((node) => node.column)) + 1;
  const minLane = Math.min(...nodes.map((node) => node.lane));
  const maxLane = Math.max(...nodes.map((node) => node.lane));
  const laneCount = maxLane - minLane + 1;
  const width = PAD * 2 + columns * CELL_W + (columns - 1) * GAP_X;
  const height = PAD * 2 + laneCount * CELL_H + (laneCount - 1) * GAP_Y;
  const markerId = `flow-arrow-${project.slug}`;

  const boxes = useMemo(() => {
    const map = new Map<string, Box>();
    nodes.forEach((node) => map.set(node.id, cellBox(node, minLane)));
    return map;
  }, [nodes, minLane]);

  const paths = useMemo(
    () =>
      edges
        .map((edge) => {
          const from = nodes.find((node) => node.id === edge.from);
          const to = nodes.find((node) => node.id === edge.to);
          const a = boxes.get(edge.from);
          const b = boxes.get(edge.to);
          if (!from || !to || !a || !b) return null;
          const drawn = route(from, to, a, b, minLane);
          return {
            id: edge.id,
            from: edge.from,
            to: edge.to,
            label: edge.label,
            ...drawn,
          };
        })
        .filter((item): item is NonNullable<typeof item> => item !== null),
    [edges, nodes, boxes, minLane],
  );

  useGSAP(
    () => {
      if (reducedMotion()) return;
      gsap.from(".flow-node", {
        y: 10,
        opacity: 0,
        duration: 0.45,
        stagger: 0.04,
        ease: "power2.out",
        immediateRender: false,
        scrollTrigger: { trigger: wrapRef.current, start: "top 80%", once: true },
      });
    },
    { scope: wrapRef, dependencies: [project.slug] },
  );

  const legend = (
    <ul className="mb-3 flex flex-wrap gap-x-5 gap-y-1.5 text-xs text-stone">
      <li className="flex items-center gap-2">
        <span className="h-3 w-7 rounded-full bg-cream" />
        Mulai / selesai
      </li>
      <li className="flex items-center gap-2">
        <span className="size-3.5 rounded-[5px] border border-cream/50 bg-ink" />
        Proses
      </li>
      <li className="flex items-center gap-2">
        <span className="size-3 rotate-45 border border-cream/60 bg-ink" />
        Keputusan
      </li>
      <li className="flex items-center gap-2">
        <span className="h-0 w-6 border-t-2 border-dashed border-cream" />
        Alur terpilih
      </li>
    </ul>
  );

  const detail = (
    <div className="rounded-2xl border border-line bg-ink p-5">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <p className="kicker">{selected.caption}</p>
        <p className="font-mono text-xs text-stone">
          {nodes.length} simpul · {edges.length} jalur
        </p>
      </div>
      <h3 className="font-display mt-2 text-xl font-bold">{selected.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-stone md:text-base">
        {selected.body}
      </p>
      {selected.inner.length ? (
        <ul className="mt-4 flex flex-wrap gap-2">
          {selected.inner.map((item) => (
            <li
              key={item.title}
              className="rounded-lg border border-line bg-void px-3 py-1.5 text-sm text-cream"
            >
              {item.title}
              {item.note ? (
                <span className="ml-2 text-xs text-stone">{item.note}</span>
              ) : null}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );

  return (
    <div ref={wrapRef}>
      <PanZoomCanvas
        width={width}
        height={height}
        hint="Seluruh alur ditampilkan sekaligus. Klik simpul untuk membaca langkahnya, tarik untuk menggeser."
        legend={legend}
        footer={detail}
      >
        <div className="relative" style={{ width, height }}>
          <svg
            className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
            viewBox={`0 0 ${width} ${height}`}
          >
            <defs>
              <marker
                id={`${markerId}-dim`}
                viewBox="0 0 10 10"
                refX="9"
                refY="5"
                markerWidth="7"
                markerHeight="7"
                orient="auto-start-reverse"
              >
                <path d="M 0 0 L 10 5 L 0 10 z" fill="rgba(23,23,23,0.55)" />
              </marker>
              <marker
                id={`${markerId}-lit`}
                viewBox="0 0 10 10"
                refX="9"
                refY="5"
                markerWidth="7"
                markerHeight="7"
                orient="auto-start-reverse"
              >
                <path d="M 0 0 L 10 5 L 0 10 z" fill={INK} />
              </marker>
            </defs>

            {paths.map((path) => {
              const lit = path.from === active || path.to === active;
              return (
                <g key={path.id}>
                  <path
                    d={path.d}
                    fill="none"
                    stroke={lit ? INK : WIRE}
                    strokeWidth={lit ? 2.2 : 1.5}
                    strokeLinejoin="round"
                    markerEnd={`url(#${markerId}-${lit ? "lit" : "dim"})`}
                  />
                  {lit ? (
                    <path
                      className="flow-wire"
                      d={path.d}
                      fill="none"
                      stroke="#fbfbfa"
                      strokeWidth="1.2"
                      strokeDasharray="5 6"
                    />
                  ) : null}
                  {path.label ? (
                    <>
                      <rect
                        x={path.lx - Math.max(20, path.label.length * 3.6)}
                        y={path.ly - 10}
                        width={Math.max(40, path.label.length * 7.2)}
                        height="19"
                        rx="9.5"
                        fill="#ffffff"
                        stroke={lit ? INK : "rgba(23,23,23,0.25)"}
                      />
                      <text
                        x={path.lx}
                        y={path.ly + 3.5}
                        textAnchor="middle"
                        fill={INK}
                        fontSize="10.5"
                        fontWeight="600"
                      >
                        {path.label}
                      </text>
                    </>
                  ) : null}
                </g>
              );
            })}
          </svg>

          {nodes.map((node) => {
            const pos = boxes.get(node.id);
            if (!pos) return null;
            const on = node.id === active;
            const decision = node.kind === "decision";
            const pill = node.kind === "start" || node.kind === "end";

            const shape = decision
              ? ""
              : pill
                ? `rounded-full bg-cream text-white ${
                    on ? "ring-2 ring-cream ring-offset-4 ring-offset-[#fbfbfa]" : ""
                  }`
                : `rounded-2xl border bg-ink ${
                    on
                      ? "border-cream shadow-[0_16px_34px_-16px_rgba(23,23,23,0.5)] ring-1 ring-cream"
                      : "border-[rgba(23,23,23,0.2)] shadow-[0_8px_20px_-14px_rgba(23,23,23,0.35)]"
                  }`;

            return (
              <button
                key={node.id}
                type="button"
                aria-pressed={on}
                className={`flow-node absolute text-left transition-[border-color,box-shadow] ${shape}`}
                style={{ left: pos.x, top: pos.y, width: pos.w, height: pos.h }}
                onMouseEnter={(event) => {
                  if (!finePointer() || reducedMotion()) return;
                  gsap.to(event.currentTarget, {
                    scale: 1.04,
                    duration: 0.25,
                    ease: "power2.out",
                  });
                }}
                onMouseLeave={(event) => {
                  gsap.to(event.currentTarget, {
                    scale: 1,
                    duration: 0.3,
                    ease: "power2.out",
                  });
                }}
                onClick={() => setActive(node.id)}
              >
                {decision ? (
                  <>
                    <svg
                      className="absolute inset-0 h-full w-full"
                      viewBox="0 0 100 100"
                      aria-hidden
                      style={{ filter: "drop-shadow(0 8px 10px rgba(23,23,23,0.14))" }}
                    >
                      <polygon
                        points="50,3 97,50 50,97 3,50"
                        fill={on ? INK : "#ffffff"}
                        stroke={on ? INK : "rgba(23,23,23,0.5)"}
                        strokeWidth="1.4"
                        vectorEffect="non-scaling-stroke"
                      />
                    </svg>
                    <span className="relative z-10 flex h-full flex-col items-center justify-center px-9 text-center">
                      <span
                        className={`text-[10px] font-semibold tracking-[0.16em] uppercase ${
                          on ? "text-white/65" : "text-stone"
                        }`}
                      >
                        {node.caption}
                      </span>
                      <span
                        className={`font-display mt-1 text-[15px] leading-tight font-semibold ${
                          on ? "text-white" : "text-cream"
                        }`}
                      >
                        {node.title}
                      </span>
                    </span>
                  </>
                ) : pill ? (
                  <span className="flex h-full flex-col items-center justify-center px-4 text-center">
                    <span className="text-[10px] font-semibold tracking-[0.16em] text-white/60 uppercase">
                      {node.caption}
                    </span>
                    <span className="font-display text-[15px] font-bold text-white">
                      {node.title}
                    </span>
                  </span>
                ) : (
                  <>
                    <div className="flex items-center justify-between px-3.5 pt-3">
                      <span
                        className={`grid size-6 place-items-center rounded-full border font-mono text-[11px] ${
                          on
                            ? "border-cream bg-cream text-white"
                            : "border-[rgba(23,23,23,0.25)] text-stone"
                        }`}
                      >
                        {node.id}
                      </span>
                      <span className="truncate pl-2 text-xs text-stone">
                        {node.caption}
                      </span>
                    </div>
                    <p className="font-display truncate px-3.5 pt-2 text-[15px] font-semibold text-cream">
                      {node.title}
                    </p>
                    {node.inner[0] ? (
                      <div className="mt-2.5 px-3.5">
                        <div className="rounded-lg border border-line bg-void px-2.5 py-1.5">
                          <p className="truncate text-xs font-medium text-cream">
                            {node.inner[0].title}
                          </p>
                          {node.inner[0].note ? (
                            <p className="truncate text-[11px] text-stone">
                              {node.inner[0].note}
                            </p>
                          ) : null}
                        </div>
                      </div>
                    ) : null}
                  </>
                )}
              </button>
            );
          })}
        </div>
      </PanZoomCanvas>
    </div>
  );
}
