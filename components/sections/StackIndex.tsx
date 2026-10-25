"use client";

import { useRef } from "react";
import { toolGroups } from "@/lib/data";
import { useReveal } from "@/lib/motion";

export function StackIndex() {
  const rootRef = useRef<HTMLElement>(null);
  useReveal(rootRef);

  const toolCount = toolGroups.reduce((sum, group) => sum + group.items.length, 0);

  return (
    <section
      ref={rootRef}
      aria-labelledby="stack-index-title"
      className="border-y border-line bg-ink/60"
    >
      <div className="mx-auto max-w-6xl px-5 py-14 md:px-8 md:py-20">
        <div className="reveal flex flex-wrap items-end justify-between gap-x-10 gap-y-4">
          <div>
            <p className="kicker">Perangkat kerja</p>
            <h2
              id="stack-index-title"
              className="font-serif mt-5 max-w-2xl text-[clamp(2rem,4.4vw,3.2rem)] leading-[1.08] tracking-[-0.01em] text-cream"
            >
              Alat dipilih untuk masalahnya,{" "}
              <span className="italic">bukan untuk daftar.</span>
            </h2>
          </div>
          <p className="font-mono text-xs tracking-[0.16em] text-stone uppercase">
            {String(toolGroups.length).padStart(2, "0")} bidang ·{" "}
            {String(toolCount).padStart(2, "0")} alat
          </p>
        </div>

        <ul className="mt-12 border-t border-line md:mt-14">
          {toolGroups.map((group, index) => (
            <li key={group.group} className="reveal border-b border-line">
              <div className="group -mx-3 grid grid-cols-[2.25rem_minmax(0,1fr)] items-baseline gap-x-3 gap-y-2 rounded-xl px-3 py-5 transition-colors duration-300 hover:bg-[#141414] md:grid-cols-[3.5rem_minmax(0,1.1fr)_minmax(0,1.4fr)] md:gap-x-6 md:py-6">
                <span className="font-mono text-xs font-semibold text-stone transition-colors duration-300 group-hover:text-white/50">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <h3 className="font-serif text-[clamp(1.6rem,3vw,2.35rem)] leading-none tracking-[-0.01em] text-cream transition-all duration-300 group-hover:translate-x-1.5 group-hover:text-white">
                  {group.group}
                </h3>

                <p className="col-start-2 text-sm leading-relaxed text-stone transition-colors duration-300 group-hover:text-white/75 md:col-start-3 md:text-[0.95rem]">
                  {group.items.map((item, itemIndex) => (
                    <span key={item}>
                      {itemIndex > 0 ? (
                        <span
                          aria-hidden
                          className="mx-2 inline-block h-px w-3 -translate-y-[3px] bg-current opacity-40"
                        />
                      ) : null}
                      {item}
                    </span>
                  ))}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
