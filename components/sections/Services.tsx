"use client";

import { useRef } from "react";
import { services } from "@/lib/data";
import { gsap, useGSAP } from "@/lib/gsap";

export function Services() {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".service-card", {
        y: 40,
        autoAlpha: 0,
        duration: 1,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top 75%",
          once: true,
        },
      });
    },
    { scope: rootRef, dependencies: [] },
  );

  return (
    <section
      ref={rootRef}
      id="services"
      className="px-5 py-24 md:px-10 md:py-32"
    >
      <div className="mb-14 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-[11px] tracking-[0.28em] text-stone uppercase">
            Services
          </p>
          <h2 className="font-display mt-3 text-4xl font-extrabold tracking-tight md:text-6xl">
            Yang saya kerjakan
          </h2>
        </div>
        <p className="max-w-sm text-sm leading-relaxed text-stone">
          Satu orang, satu alur. Desain dan development tidak dipisah supaya
          hasilnya utuh.
        </p>
      </div>

      <div className="divide-y divide-line border-y border-line">
        {services.map((service) => (
          <article
            key={service.id}
            className="service-card group grid gap-4 py-10 md:grid-cols-[5rem_1fr_1.2fr] md:items-start md:gap-10"
          >
            <p className="font-mono text-sm text-acid">{service.id}</p>
            <h3 className="font-display text-3xl font-bold tracking-tight transition-colors group-hover:text-acid md:text-4xl">
              {service.title}
            </h3>
            <p className="max-w-xl text-sm leading-relaxed text-stone md:text-base">
              {service.body}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
