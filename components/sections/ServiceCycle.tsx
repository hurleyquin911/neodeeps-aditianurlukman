"use client";

import { useRef, useState } from "react";
import { serviceCycle } from "@/lib/data";
import { gsap, useGSAP } from "@/lib/gsap";
import { finePointer, reducedMotion } from "@/lib/motion";
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
  return (
    <button
      type="button"
      onClick={onOpen}
      onMouseEnter={onHold}
      onMouseLeave={onRelease}
      onFocus={onHold}
      onBlur={onRelease}
      className="cycle-node flex h-full min-h-44 w-full cursor-pointer flex-col rounded-2xl border bg-void/90 p-4 text-left"
      style={{
        borderColor: current ? "rgba(212,255,63,0.75)" : "rgba(246,244,239,0.14)",
        boxShadow: current
          ? "0 0 0 1px rgba(212,255,63,0.22), 0 14px 36px rgba(0,0,0,0.32)"
          : "none",
      }}
    >
      <p className="font-mono text-xs text-acid">{step.id}</p>
      <h3 className="font-display mt-1 text-lg font-bold">{step.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-stone">{step.body}</p>
      <p className="mt-auto pt-3 text-xs font-medium text-acid">Detail →</p>
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
        lit ? "text-acid" : "text-stone/45"
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
      <h2 className="reveal font-display text-xl font-bold md:text-2xl">
        Siklus kerja
      </h2>
      <p className="reveal mt-2 max-w-2xl text-sm leading-relaxed text-stone">
        Rilis pertama bukan titik akhir. Renewal memutar ulang ke pemahaman,
        bukan menutup proyek. Klik kartu untuk melihat detail langkahnya.
      </p>

      <div className="cycle-board relative mt-8 rounded-[1.6rem] border border-line bg-ink p-5 md:p-7">
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
            className="flex h-full min-h-44 cursor-pointer flex-col items-center justify-center rounded-2xl border border-acid/30 bg-void/70 px-4 text-center"
          >
            <p className="font-mono text-xs tracking-[0.2em] text-acid uppercase">
              Siklus
            </p>
            <p className="font-display mt-2 text-2xl font-extrabold">
              {serviceCycle[active].title}
            </p>
            <p className="mt-1 font-mono text-xs text-stone">
              {serviceCycle[active].id} / 05
            </p>
            <p className="mt-3 text-xs text-acid">Buka detail →</p>
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
            return (
              <li key={item.id} className="flex gap-4">
                <div className="flex w-6 flex-col items-center">
                  <span
                    className={`size-3 rounded-full ${
                      current ? "bg-acid" : "bg-cream/25"
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
                    borderColor: current
                      ? "rgba(212,255,63,0.7)"
                      : "rgba(246,244,239,0.14)",
                    background: current
                      ? "rgba(212,255,63,0.04)"
                      : "transparent",
                  }}
                >
                  <p className="font-mono text-xs text-acid">{item.id}</p>
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
