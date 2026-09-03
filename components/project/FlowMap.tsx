"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { Project } from "@/lib/projects";
import { gsap, useGSAP } from "@/lib/gsap";
import { finePointer, reducedMotion } from "@/lib/motion";

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

const CELL_W = 216;
const CELL_H = 168;
const GAP_X = 100;
const GAP_Y = 32;
const PAD = 56;

function sizeFor(kind: NodeKind) {
  if (kind === "decision") return { w: 164, h: 164 };
  if (kind === "start" || kind === "end") return { w: 188, h: 76 };
  return { w: 204, h: 124 };
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
      ly: acy - 12,
    };
  }

  const mid = x1 + Math.max(36, (x2 - x1) / 2);
  return {
    d: `M ${x1} ${acy} L ${mid} ${acy} L ${mid} ${bcy} L ${x2} ${bcy}`,
    lx: mid,
    ly: acy + (bcy - acy) * 0.28,
  };
}

function nodeTone(node: MapNode, on: boolean) {
  if (node.kind === "decision") {
    return on
      ? "text-cream"
      : "text-cream";
  }
  if (node.kind === "start" || node.kind === "end") {
    return on
      ? "border-acid/80 bg-[#10240c]/95 ring-1 ring-acid"
      : "border-acid/50 bg-[#10240c]/90";
  }
  return on
    ? "border-sky-400/70 bg-[#0b1b2c]/95 ring-1 ring-acid"
    : "border-sky-500/35 bg-[#0b1b2c]/90";
}

export function FlowMap({ project }: { project: Project }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef({
    active: false,
    moved: false,
    x: 0,
    y: 0,
    left: 0,
    top: 0,
  });
  const [active, setActive] = useState("start");
  const [zoom, setZoom] = useState(1);
  const [progress, setProgress] = useState(0);
  const [canPan, setCanPan] = useState({ left: false, right: false });

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
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.fromTo(
        ".flow-wire",
        { strokeDashoffset: 28 },
        { strokeDashoffset: 0, duration: 1.1, ease: "none", repeat: -1 },
      );
    },
    { scope: wrapRef, dependencies: [project.slug, paths.length] },
  );

  useGSAP(
    () => {
      if (reducedMotion()) return;
      gsap.from(".flow-node", {
        y: 10,
        duration: 0.45,
        stagger: 0.05,
        ease: "power2.out",
        immediateRender: false,
        scrollTrigger: { trigger: wrapRef.current, start: "top 80%", once: true },
      });
    },
    { scope: wrapRef, dependencies: [project.slug] },
  );

  const updatePan = () => {
    const el = scrollerRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setProgress(max <= 0 ? 1 : el.scrollLeft / max);
    setCanPan({
      left: el.scrollLeft > 4,
      right: el.scrollLeft < max - 4,
    });
  };

  useEffect(() => {
    updatePan();
    const el = scrollerRef.current;
    if (!el) return;
    el.addEventListener("scroll", updatePan, { passive: true });
    window.addEventListener("resize", updatePan);
    return () => {
      el.removeEventListener("scroll", updatePan);
      window.removeEventListener("resize", updatePan);
    };
  }, [project.slug, zoom, width]);

  const panBy = (delta: number) => {
    scrollerRef.current?.scrollBy({ left: delta, behavior: "smooth" });
  };

  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    const el = scrollerRef.current;
    if (!el) return;
    dragRef.current = {
      active: true,
      moved: false,
      x: event.clientX,
      y: event.clientY,
      left: el.scrollLeft,
      top: el.scrollTop,
    };
    el.setPointerCapture(event.pointerId);
  };

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const el = scrollerRef.current;
    const drag = dragRef.current;
    if (!el || !drag.active) return;
    const dx = event.clientX - drag.x;
    const dy = event.clientY - drag.y;
    if (Math.abs(dx) + Math.abs(dy) > 4) drag.moved = true;
    el.scrollLeft = drag.left - dx;
    el.scrollTop = drag.top - dy;
  };

  const onPointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    const el = scrollerRef.current;
    if (el?.hasPointerCapture(event.pointerId)) {
      el.releasePointerCapture(event.pointerId);
    }
    dragRef.current.active = false;
  };

  return (
    <div ref={wrapRef} className="mt-8">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-stone">
          Tarik peta untuk melihat cabang. Klik simpul untuk membaca langkahnya.
        </p>
        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label="Geser kiri"
            disabled={!canPan.left}
            className="grid size-8 place-items-center rounded-full border border-line text-cream transition disabled:opacity-30"
            onClick={() => panBy(-280)}
          >
            ‹
          </button>
          <button
            type="button"
            aria-label="Geser kanan"
            disabled={!canPan.right}
            className="grid size-8 place-items-center rounded-full border border-line text-cream transition disabled:opacity-30"
            onClick={() => panBy(280)}
          >
            ›
          </button>
          <button
            type="button"
            className="rounded-full border border-line px-2.5 py-1 text-sm"
            onClick={() => setZoom((z) => Math.max(0.7, Number((z - 0.1).toFixed(2))))}
          >
            −
          </button>
          <span className="font-mono text-xs text-stone">{Math.round(zoom * 100)}%</span>
          <button
            type="button"
            className="rounded-full border border-line px-2.5 py-1 text-sm"
            onClick={() => setZoom((z) => Math.min(1.2, Number((z + 0.1).toFixed(2))))}
          >
            +
          </button>
        </div>
      </div>

      <ul className="mb-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-stone">
        <li className="flex items-center gap-1.5">
          <span className="h-2.5 w-6 rounded-full border border-acid/50 bg-[#10240c]" />
          Mulai / selesai
        </li>
        <li className="flex items-center gap-1.5">
          <span className="size-3 rounded-sm border border-sky-500/50 bg-[#0b1b2c]" />
          Proses
        </li>
        <li className="flex items-center gap-1.5">
          <span className="size-3 rotate-45 border border-amber-200/50 bg-[#241c10]" />
          Keputusan
        </li>
      </ul>

      <div className="relative">
        <div
          ref={scrollerRef}
          className="flow-grid relative cursor-grab overflow-auto rounded-3xl border border-line select-none active:cursor-grabbing"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
        >
          <div
            className="relative origin-top-left"
            style={{
              width,
              height,
              transform: `scale(${zoom})`,
              marginBottom: zoom < 1 ? height * (zoom - 1) : 0,
            }}
          >
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
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="rgba(125,211,252,0.85)" />
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
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="#d4ff3f" />
                </marker>
              </defs>
              {paths.map((path) => {
                const lit = path.from === active || path.to === active;
                return (
                  <g key={path.id}>
                    <path
                      d={path.d}
                      fill="none"
                      stroke={lit ? "rgba(212,255,63,0.9)" : "rgba(148,163,184,0.45)"}
                      strokeWidth={lit ? 2.4 : 1.6}
                      markerEnd={`url(#${markerId}-${lit ? "lit" : "dim"})`}
                    />
                    <path
                      className="flow-wire"
                      d={path.d}
                      fill="none"
                      stroke={lit ? "#d4ff3f" : "#7dd3fc"}
                      strokeWidth="1.4"
                      strokeDasharray="7 12"
                    />
                    {path.label ? (
                      <>
                        <rect
                          x={path.lx - Math.max(18, path.label.length * 3.2)}
                          y={path.ly - 9}
                          width={Math.max(36, path.label.length * 6.4)}
                          height="16"
                          rx="8"
                          fill="#0c0c0e"
                          stroke="rgba(246,244,239,0.14)"
                        />
                        <text
                          x={path.lx}
                          y={path.ly + 3}
                          textAnchor="middle"
                          fill="#f6f4ef"
                          fontSize="9"
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

              return (
                <button
                  key={node.id}
                  type="button"
                  className={`flow-node absolute text-left shadow-[0_0_24px_rgba(0,0,0,0.35)] transition ${
                    decision ? "" : `rounded-2xl border ${nodeTone(node, on)}`
                  } ${pill ? "rounded-full" : ""}`}
                  style={{ left: pos.x, top: pos.y, width: pos.w, height: pos.h }}
                  onPointerDown={(event) => event.stopPropagation()}
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
                        className="absolute inset-0"
                        viewBox="0 0 100 100"
                        aria-hidden
                      >
                        <polygon
                          points="50,3 97,50 50,97 3,50"
                          fill={on ? "#2a220f" : "#1a160e"}
                          stroke={on ? "#d4ff3f" : "rgba(253,230,138,0.45)"}
                          strokeWidth="1.8"
                        />
                      </svg>
                      <span className="relative z-10 flex h-full flex-col items-center justify-center px-8 text-center">
                        <span className="text-[10px] tracking-wide text-amber-100/70 uppercase">
                          {node.caption}
                        </span>
                        <span className="mt-1 text-sm leading-tight font-semibold text-white">
                          {node.title}
                        </span>
                      </span>
                    </>
                  ) : pill ? (
                    <span className="flex h-full flex-col items-center justify-center px-4 text-center">
                      <span className="text-[10px] tracking-wide text-acid/80 uppercase">
                        {node.caption}
                      </span>
                      <span className="font-display text-sm font-bold text-white">
                        {node.title}
                      </span>
                    </span>
                  ) : (
                    <>
                      <div className="flex items-center justify-between px-3 pt-2.5">
                        <span className="flex size-5 items-center justify-center rounded-full border border-white/20 font-mono text-[10px] text-white/80">
                          {node.id === "start" ? "+" : node.id}
                        </span>
                        <span className="truncate pl-2 text-[11px] text-white/55">
                          {node.caption}
                        </span>
                      </div>
                      <p className="truncate px-3 pt-1 text-sm font-semibold text-white">
                        {node.title}
                      </p>
                      {node.inner[0] ? (
                        <div className="mt-2 px-3">
                          <div className="rounded-lg border border-white/10 bg-black/25 px-2 py-1.5">
                            <p className="truncate text-[11px] text-white">
                              {node.inner[0].title}
                            </p>
                            {node.inner[0].note ? (
                              <p className="truncate text-[10px] text-white/50">
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
        </div>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-10 rounded-l-3xl bg-gradient-to-r from-[#07080b] to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-10 rounded-r-3xl bg-gradient-to-l from-[#07080b] to-transparent" />
      </div>
      {canPan.left || canPan.right ? (
        <div className="mt-3 h-1 overflow-hidden rounded-full bg-white/8">
          <div
            className="h-full rounded-full bg-acid/70"
            style={{ width: `${8 + progress * 92}%` }}
          />
        </div>
      ) : null}

      <div className="mt-4 rounded-2xl border border-line bg-ink p-5">
        <p className="text-sm text-acid">{selected.caption}</p>
        <h3 className="font-display mt-1 text-xl font-bold">{selected.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-stone md:text-base">
          {selected.body}
        </p>
      </div>
    </div>
  );
}
