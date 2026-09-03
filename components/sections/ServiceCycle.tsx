"use client";

import { useRef, useState } from "react";
import { serviceCycle } from "@/lib/data";
import { gsap, useGSAP } from "@/lib/gsap";
import { finePointer, reducedMotion } from "@/lib/motion";

const PLACES = serviceCycle.map((_, index) => {
  const angle = (index / serviceCycle.length) * Math.PI * 2 - Math.PI / 2;
  return {
    left: `${50 + Math.cos(angle) * 38}%`,
    top: `${50 + Math.sin(angle) * 36}%`,
  };
});

export function ServiceCycle() {
  const rootRef = useRef<HTMLElement>(null);
  const pathRef = useRef<SVGEllipseElement>(null);
  const armRef = useRef<HTMLDivElement>(null);
  const pulseRef = useRef<gsap.core.Timeline | null>(null);
  const spinRef = useRef<gsap.core.Tween | null>(null);
  const [active, setActive] = useState(0);

  useGSAP(
    () => {
      if (reducedMotion()) return;

      const nodes = gsap.utils.toArray<HTMLElement>(".cycle-node");
      const rails = gsap.utils.toArray<HTMLElement>(".cycle-rail");
      const path = pathRef.current;

      gsap.from(".cycle-board", {
        y: 28,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
        immediateRender: false,
        scrollTrigger: { trigger: rootRef.current, start: "top 78%", once: true },
      });

      gsap.from(nodes, {
        scale: 0.86,
        y: 22,
        opacity: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: "power3.out",
        immediateRender: false,
        scrollTrigger: { trigger: rootRef.current, start: "top 78%", once: true },
      });

      gsap.from(rails, {
        scaleY: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: "power2.out",
        transformOrigin: "top center",
        immediateRender: false,
        scrollTrigger: { trigger: rootRef.current, start: "top 78%", once: true },
      });

      if (path) {
        const length = path.getTotalLength();
        gsap.fromTo(
          path,
          { strokeDasharray: length, strokeDashoffset: length },
          {
            strokeDashoffset: 0,
            duration: 1.6,
            ease: "power2.inOut",
            immediateRender: false,
            scrollTrigger: {
              trigger: rootRef.current,
              start: "top 78%",
              once: true,
            },
          },
        );
      }

      if (armRef.current) {
        spinRef.current = gsap.to(armRef.current, {
          rotation: 360,
          duration: 14,
          ease: "none",
          repeat: -1,
          transformOrigin: "center center",
        });
      }

      const pulse = gsap.timeline({ repeat: -1, delay: 0.4 });
      serviceCycle.forEach((_, index) => {
        pulse.call(() => setActive(index));
        pulse.to({}, { duration: 2.8 });
      });
      pulseRef.current = pulse;
    },
    { scope: rootRef },
  );

  const hold = (index: number) => {
    if (!finePointer()) {
      setActive(index);
      return;
    }
    pulseRef.current?.pause();
    spinRef.current?.pause();
    setActive(index);
  };

  const release = () => {
    pulseRef.current?.resume();
    spinRef.current?.resume();
  };

  return (
    <section ref={rootRef} className="mt-12">
      <h2 className="reveal font-display text-xl font-bold md:text-2xl">
        Siklus kerja
      </h2>
      <p className="reveal mt-2 max-w-2xl text-sm leading-relaxed text-stone">
        Rilis pertama bukan titik akhir. Renewal memutar ulang ke pemahaman,
        bukan menutup proyek.
      </p>

      <div className="cycle-board relative mt-8 overflow-hidden rounded-[1.6rem] border border-line bg-ink">
        <div
          className="pointer-events-none absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "radial-gradient(rgba(246,244,239,0.14) 1px, transparent 1px)",
            backgroundSize: "18px 18px",
          }}
        />
        <div
          className="pointer-events-none absolute top-1/2 left-1/2 size-72 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-40"
          style={{
            background:
              "radial-gradient(circle, rgba(212,255,63,0.16), transparent 68%)",
          }}
        />

        <div className="relative hidden min-h-[38rem] lg:block">
          <svg
            className="pointer-events-none absolute inset-[12%]"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden
          >
            <ellipse
              cx="50"
              cy="50"
              rx="49"
              ry="49"
              fill="none"
              stroke="rgba(246,244,239,0.1)"
              strokeWidth="0.4"
            />
            <ellipse
              ref={pathRef}
              cx="50"
              cy="50"
              rx="49"
              ry="49"
              fill="none"
              stroke="#d4ff3f"
              strokeWidth="0.5"
              strokeLinecap="round"
            />
          </svg>

          <div
            ref={armRef}
            className="pointer-events-none absolute top-1/2 left-1/2 z-20 h-[72%] w-[76%] -translate-x-1/2 -translate-y-1/2"
          >
            <span className="absolute top-0 left-1/2 size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-acid shadow-[0_0_16px_#d4ff3f]" />
          </div>

          <div className="absolute top-1/2 left-1/2 z-10 w-44 -translate-x-1/2 -translate-y-1/2 text-center">
            <p className="font-mono text-xs tracking-[0.2em] text-acid uppercase">
              Siklus
            </p>
            <p className="font-display mt-2 text-2xl font-extrabold">
              {serviceCycle[active].title}
            </p>
            <p className="mt-1 font-mono text-xs text-stone">
              {serviceCycle[active].id} / 05
            </p>
          </div>

          {serviceCycle.map((step, index) => {
            const current = active === index;
            return (
              <button
                key={step.id}
                type="button"
                onMouseEnter={() => hold(index)}
                onMouseLeave={release}
                onFocus={() => hold(index)}
                onBlur={release}
                className="cycle-node absolute z-10 w-52 -translate-x-1/2 -translate-y-1/2 rounded-2xl border bg-void/92 p-4 text-left backdrop-blur-sm"
                style={{
                  left: PLACES[index].left,
                  top: PLACES[index].top,
                  borderColor: current
                    ? "rgba(212,255,63,0.7)"
                    : "rgba(246,244,239,0.14)",
                  boxShadow: current
                    ? "0 0 0 1px rgba(212,255,63,0.25), 0 16px 40px rgba(0,0,0,0.35)"
                    : "none",
                }}
              >
                <p className="font-mono text-xs text-acid">{step.id}</p>
                <h3 className="font-display mt-1 text-lg font-bold">{step.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-stone">
                  {step.body}
                </p>
              </button>
            );
          })}
        </div>

        <ol className="relative space-y-4 p-5 lg:hidden">
          {serviceCycle.map((step, index) => {
            const current = active === index;
            return (
              <li key={step.id} className="flex gap-4">
                <div className="flex w-6 flex-col items-center">
                  <span
                    className={`size-3 rounded-full ${
                      current ? "bg-acid" : "bg-cream/25"
                    }`}
                  />
                  {index < serviceCycle.length - 1 ? (
                    <span className="cycle-rail mt-1 w-px flex-1 bg-line" />
                  ) : (
                    <span className="cycle-rail mt-1 h-8 w-px bg-acid/50" />
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => setActive(index)}
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
                  <p className="font-mono text-xs text-acid">{step.id}</p>
                  <h3 className="font-display mt-1 text-lg font-bold">
                    {step.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-stone">
                    {step.body}
                  </p>
                </button>
              </li>
            );
          })}
          <li className="pl-10 text-sm text-acid">Kembali ke Pahami →</li>
        </ol>
      </div>
    </section>
  );
}
