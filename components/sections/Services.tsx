"use client";

import { useRef } from "react";
import Link from "next/link";
import { services } from "@/lib/data";
import { useLiftHover, useReveal } from "@/lib/motion";
import { accentStyle } from "@/lib/accents";
import { Magnetic } from "@/components/ui/Magnetic";
import { ServiceCycle } from "@/components/sections/ServiceCycle";

export function Services() {
  const rootRef = useRef<HTMLElement>(null);
  useReveal(rootRef);
  useLiftHover(rootRef);

  return (
    <article
      ref={rootRef}
      id="services"
      className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24"
    >
      <p className="reveal kicker" style={accentStyle(4)}>
        Layanan
      </p>
      <h1 className="reveal font-display mt-5 text-[clamp(2rem,4.6vw,3.6rem)] font-extrabold tracking-[-0.03em]">
        Yang saya <span className="text-spectrum">kerjakan</span>
      </h1>
      <p className="reveal mt-4 max-w-2xl text-base leading-relaxed text-stone md:text-lg">
        Fullstack dari desain sampai backend, aplikasi Android, dan perawatan
        setelah rilis. Paket di bawah ini bisa berdiri sendiri, atau digabung
        jika proyeknya butuh dari konsep sampai pembaruan berkelanjutan.
      </p>
      <p className="reveal mt-4 max-w-2xl text-sm leading-relaxed text-stone">
        Yang tidak saya tawarkan: template cepat tanpa alur, aplikasi yang
        ditinggal setelah publish, atau janji yang belum ada fondasinya.
      </p>

      <ServiceCycle />

      <div className="mt-12 space-y-6">
        {services.map((service, index) => (
          <article
            key={service.id}
            style={accentStyle(index + 1)}
            className="js-lift reveal tint relative overflow-hidden rounded-3xl p-6 md:p-8"
          >
            <span className="accent-text pointer-events-none absolute -top-6 right-4 font-display text-[7rem] leading-none font-extrabold opacity-10 md:text-[9rem]">
              {service.id}
            </span>
            <p className="accent-text inline-grid size-10 place-items-center rounded-xl bg-[color-mix(in_oklab,var(--accent)_15%,transparent)] font-mono text-sm font-bold">
              {service.id}
            </p>
            <h2 className="font-display mt-4 text-2xl font-bold md:text-3xl">
              {service.title}
            </h2>
            <p className="mt-3 max-w-3xl text-base leading-relaxed text-stone">
              {service.body}
            </p>
            <div className="mt-8 grid gap-8 md:grid-cols-2">
              <div>
                <h3 className="text-sm font-medium text-cream">Yang diserahkan</h3>
                <ul className="mt-3 space-y-2 text-sm leading-relaxed text-stone">
                  {service.deliverables.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span className="accent-bg mt-2 size-1.5 shrink-0 rounded-full" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-medium text-cream">Urutan kerja</h3>
                <ol className="mt-3 space-y-2 text-sm leading-relaxed text-stone">
                  {service.process.map((item, index) => (
                    <li key={item} className="flex gap-3">
                      <span className="accent-text font-mono">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div
        className="reveal tint tint-static relative mt-12 overflow-hidden rounded-3xl p-6 md:p-8"
        style={accentStyle(2)}
      >
        <span className="bg-spectrum pointer-events-none absolute inset-x-0 top-0 h-1" />
        <h2 className="font-display text-2xl font-bold">Cocok untuk siapa</h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-stone md:text-base">
          Tim atau founder yang butuh seseorang memegang produk digital sampai
          ke implementasi, rilis, dan perawatannya. Jika yang dicari hanya slide
          tanpa kode, atau rilis sekali lalu ditinggal, biasanya bukan saya.
        </p>
        <div className="mt-6">
          <Magnetic>
            <Link
              href="/kontak"
              className="bg-spectrum inline-flex rounded-full px-6 py-3 text-sm font-bold text-void"
            >
              Ceritakan proyeknya
            </Link>
          </Magnetic>
        </div>
      </div>
    </article>
  );
}
