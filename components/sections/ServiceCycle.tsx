"use client";

import { useRef, useState } from "react";
import { serviceCycle } from "@/lib/data";
import { gsap, useGSAP } from "@/lib/gsap";
import { finePointer, reducedMotion } from "@/lib/motion";
import { accentAt, accentStyle } from "@/lib/accents";
import { CycleRocketModal } from "@/components/ui/CycleRocketModal";

function CycleCard({
  step,
  current,
  onHold,
  onRelease,
  onOpen,
}: {
  step: (typeof serviceCycle)[number];
  current: boolean;
  onHold: () => void;
  onRelease: () => void;
  onOpen: () => void;
}) {
  const color = accentAt(Number(step.id) - 1);
  return (
    <button
      type="button"
      onClick={onOpen}
      onMouseEnter={onHold}
      onMouseLeave={onRelease}
      onFocus={onHold}
      onBlur={onRelease}
      className="cycle-node flex h-full min-h-44 w-full cursor-pointer flex-col rounded-2xl border p-4 text-left transition-[background,border-color,box-shadow] duration-300"
      style={{
        ...accentStyle(color),
        borderColor: current ? color : "rgba(246,244,239,0.14)",
        background: current
          ? `linear-gradient(160deg, ${color}22, rgba(12,12,14,0.92) 70%)`
          : "rgba(12,12,14,0.9)",
        boxShadow: current
          ? `0 0 0 1px ${color}40, 0 18px 44px -14px ${color}90`
          : "none",
      }}
    >
      <p className="accent-text font-mono text-xs font-bold">{step.id}</p>
      <h3 className="font-display mt-1 text-lg font-bold">{step.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-stone">{step.body}</p>
      <p className="accent-text mt-auto pt-3 text-xs font-medium">Detail →</p>
    </button>
  );
}

function Mark({
  dir,
  lit,
}: {
  dir: "right" | "left" | "down" | "up";
  lit: boolean;
}) {
  const symbol = { right: "→", left: "←", down: "↓", up: "↑" }[dir];
  return (
    <span
      className={`cycle-mark flex items-center justify-center font-mono text-lg ${
        lit ? "text-spectrum" : "text-stone/45"
      }`}
    >
      {symbol}
    </span>
  );
}

export function ServiceCycle() {
  const rootRef = useRef<HTMLElement>(null);
  const pulseRef = useRef<gsap.core.Timeline | null>(null);
  const detailOpenRef = useRef(false);
  const [active, setActive] = useState(0);
  const [detail, setDetail] = useState<number | null>(null);

  useGSAP(
    () => {
      if (reducedMotion()) return;

      gsap.from(".cycle-board", {
        y: 24,
        opacity: 0,
        duration: 0.65,
        ease: "power3.out",
        immediateRender: false,
        scrollTrigger: { trigger: rootRef.current, start: "top 78%", once: true },
      });

      gsap.from(".cycle-node", {
        y: 20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.08,
        ease: "power3.out",
        immediateRender: false,
        scrollTrigger: { trigger: rootRef.current, start: "top 78%", once: true },
      });

      gsap.from(".cycle-mark", {
        opacity: 0,
        duration: 0.45,
        stagger: 0.06,
        delay: 0.25,
        ease: "power2.out",
        immediateRender: false,
        scrollTrigger: { trigger: rootRef.current, start: "top 78%", once: true },
      });

      const pulse = gsap.timeline({ repeat: -1, delay: 0.5 });
      serviceCycle.forEach((_, index) => {
        pulse.call(() => setActive(index));
        pulse.to({}, { duration: 2.6 });
      });
      pulseRef.current = pulse;
    },
    { scope: rootRef },
  );

  const hold = (index: number) => {
    if (finePointer()) pulseRef.current?.pause();
    setActive(index);
  };

  const release = () => {
    if (detailOpenRef.current) return;
    pulseRef.current?.resume();
  };

  const openDetail = (index: number) => {
    detailOpenRef.current = true;
    pulseRef.current?.pause();
    setActive(index);
    setDetail(index);
  };

  const closeDetail = () => {
    detailOpenRef.current = false;
    setDetail(null);
    pulseRef.current?.resume();
  };

  const step = (index: number) => serviceCycle[index];

  return (
    <section ref={rootRef} className="mt-12">
      <p className="reveal kicker" style={accentStyle(1)}>
        Proses
      </p>
      <h2 className="reveal font-display mt-4 text-2xl font-bold md:text-3xl">
        Siklus kerja
      </h2>
      <p className="reveal mt-2 max-w-2xl text-sm leading-relaxed text-stone">
        Rilis pertama bukan titik akhir. Renewal memutar ulang ke pemahaman,
        bukan menutup proyek. Klik kartu untuk melihat detail langkahnya.
      </p>

      <div className="cycle-board tint tint-static relative mt-8 rounded-[1.6rem] p-5 md:p-7">
        <div
          className="pointer-events-none absolute inset-0 rounded-[1.6rem] opacity-25"
          style={{
            backgroundImage:
              "radial-gradient(rgba(246,244,239,0.14) 1px, transparent 1px)",
            backgroundSize: "18px 18px",
          }}
        />

        <div className="relative hidden lg:grid lg:grid-cols-[minmax(0,1fr)_2rem_minmax(0,1fr)_2rem_minmax(0,1fr)] lg:grid-rows-[minmax(11.5rem,auto)_2.5rem_minmax(11.5rem,auto)] lg:items-stretch lg:gap-x-2 lg:gap-y-1">
          <CycleCard
            step={step(0)}
            current={active === 0}
            onHold={() => hold(0)}
            onRelease={release}
            onOpen={() => openDetail(0)}
          />
          <Mark dir="right" lit={active === 1} />
          <CycleCard
            step={step(1)}
            current={active === 1}
            onHold={() => hold(1)}
            onRelease={release}
            onOpen={() => openDetail(1)}
          />
          <Mark dir="right" lit={active === 2} />
          <CycleCard
            step={step(2)}
            current={active === 2}
            onHold={() => hold(2)}
            onRelease={release}
            onOpen={() => openDetail(2)}
          />

          <Mark dir="up" lit={active === 0} />
          <span />
          <span />
          <span />
          <Mark dir="down" lit={active === 3} />

          <CycleCard
            step={step(4)}
            current={active === 4}
            onHold={() => hold(4)}
            onRelease={release}
            onOpen={() => openDetail(4)}
          />
          <Mark dir="left" lit={active === 4} />
          <button
            type="button"
            onClick={() => openDetail(active)}
            style={accentStyle(active)}
            className="relative flex h-full min-h-44 cursor-pointer flex-col items-center justify-center overflow-hidden rounded-2xl border border-[color-mix(in_oklab,var(--accent)_45%,transparent)] bg-void/70 px-4 text-center transition-colors duration-300"
          >
            <span className="accent-bg pointer-events-none absolute size-32 rounded-full opacity-25 blur-3xl transition-colors duration-300" />
            <p className="accent-text relative font-mono text-xs tracking-[0.2em] uppercase">
              Siklus
            </p>
            <p className="font-display relative mt-2 text-2xl font-extrabold">
              {serviceCycle[active].title}
            </p>
            <p className="relative mt-1 font-mono text-xs text-stone">
              {serviceCycle[active].id} / 05
            </p>
            <p className="accent-text relative mt-3 text-xs">Buka detail →</p>
          </button>
          <Mark dir="left" lit={active === 4} />
          <CycleCard
            step={step(3)}
            current={active === 3}
            onHold={() => hold(3)}
            onRelease={release}
            onOpen={() => openDetail(3)}
          />
        </div>

        <ol className="relative space-y-4 lg:hidden">
          {serviceCycle.map((item, index) => {
            const current = active === index;
            const color = accentAt(index);
            return (
              <li key={item.id} className="flex gap-4" style={accentStyle(color)}>
                <div className="flex w-6 flex-col items-center">
                  <span
                    className={`size-3 rounded-full ${
                      current ? "accent-bg shadow-[0_0_10px_var(--accent)]" : "bg-cream/25"
                    }`}
                  />
                  {index < serviceCycle.length - 1 ? (
                    <span className="mt-1 w-px flex-1 bg-line" />
                  ) : (
                    <span className="mt-1 h-8 w-px bg-acid/50" />
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => openDetail(index)}
                  className="cycle-node flex-1 rounded-2xl border p-4 text-left"
                  style={{
                    borderColor: current ? color : "rgba(246,244,239,0.14)",
                    background: current ? `${color}12` : "transparent",
                  }}
                >
                  <p className="accent-text font-mono text-xs font-bold">{item.id}</p>
                  <h3 className="font-display mt-1 text-lg font-bold">
                    {item.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-stone">
                    {item.body}
                  </p>
                </button>
              </li>
            );
          })}
          <li className="pl-10 text-sm text-acid">Kembali ke Pahami →</li>
        </ol>
      </div>

      <CycleRocketModal
        index={detail}
        onClose={closeDetail}
        onChange={(next) => {
          setDetail(next);
          setActive(next);
        }}
      />
    </section>
  );
}
