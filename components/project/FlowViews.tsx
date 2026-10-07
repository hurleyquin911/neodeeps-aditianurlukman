"use client";

import { useState } from "react";
import type { Project } from "@/lib/projects";
import { diagramsFor } from "@/lib/diagrams";
import { accentStyle } from "@/lib/accents";
import { FlowMap } from "@/components/project/FlowMap";
import { DfdDiagram } from "@/components/project/diagrams/DfdDiagram";
import { ClassDiagram } from "@/components/project/diagrams/ClassDiagram";
import { UseCaseDiagram } from "@/components/project/diagrams/UseCaseDiagram";
import { SequenceDiagram } from "@/components/project/diagrams/SequenceDiagram";

const views = [
  {
    id: "flowchart",
    label: "Flowchart",
    color: "#d4ff3f",
    title: "Alur pemakaian",
    text: "Langkah demi langkah dari sisi pengguna, termasuk cabang keputusan dan jalur yang bertemu lagi.",
  },
  {
    id: "dfd",
    label: "DFD",
    color: "#38bdf8",
    title: "Data Flow Diagram",
    text: "Ke mana data bergerak: dari entitas luar, diolah oleh proses, lalu disimpan ke penyimpanan data.",
  },
  {
    id: "uml",
    label: "UML Class",
    color: "#a78bfa",
    title: "UML Class Diagram",
    text: "Struktur objek di dalam sistem: atribut, method, dan bagaimana kelas saling terhubung.",
  },
  {
    id: "usecase",
    label: "Use Case",
    color: "#fb7185",
    title: "Use Case Diagram",
    text: "Siapa saja aktornya dan apa yang bisa masing-masing lakukan di dalam batas sistem.",
  },
  {
    id: "sequence",
    label: "Sequence",
    color: "#fbbf24",
    title: "Sequence Diagram",
    text: "Urutan pesan antar komponen dalam satu skenario, dari permintaan pertama sampai balasan terakhir.",
  },
] as const;

type ViewId = (typeof views)[number]["id"];

export function FlowViews({ project }: { project: Project }) {
  const [view, setView] = useState<ViewId>("flowchart");
  const data = diagramsFor(project.slug);
  const available = data ? views : views.filter((item) => item.id === "flowchart");
  const current = available.find((item) => item.id === view) ?? available[0];

  return (
    <div className="mt-8">
      <div
        role="tablist"
        aria-label="Jenis diagram"
        className="flex gap-2 overflow-x-auto rounded-2xl border border-line bg-ink/70 p-1.5 [scrollbar-width:none]"
      >
        {available.map((item, index) => {
          const on = item.id === current.id;
          return (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={on}
              onClick={() => setView(item.id)}
              className={`group flex shrink-0 items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
                on ? "text-void" : "text-stone hover:bg-white/5 hover:text-cream"
              }`}
              style={on ? { background: item.color } : undefined}
            >
              <span
                className={`grid size-5 place-items-center rounded-full font-mono text-[10px] ${
                  on ? "bg-void/15" : "border border-white/15"
                }`}
                style={on ? undefined : { color: item.color }}
              >
                {index + 1}
              </span>
              {item.label}
            </button>
          );
        })}
      </div>

      <div className="tint tint-static mt-4 rounded-2xl px-5 py-4" style={accentStyle(current.color)}>
        <p className="accent-text text-xs font-semibold tracking-[0.2em] uppercase">{current.title}</p>
        <p className="mt-1 text-sm leading-relaxed text-cream/85">{current.text}</p>
      </div>

      <div key={current.id} role="tabpanel" className="mt-6">
        {current.id === "flowchart" || !data ? (
          <FlowMap project={project} />
        ) : current.id === "dfd" ? (
          <DfdDiagram data={data.dfd} slug={project.slug} />
        ) : current.id === "uml" ? (
          <ClassDiagram data={data.uml} slug={project.slug} />
        ) : current.id === "usecase" ? (
          <UseCaseDiagram data={data.useCase} slug={project.slug} />
        ) : (
          <SequenceDiagram data={data.sequence} slug={project.slug} />
        )}
      </div>
    </div>
  );
}
