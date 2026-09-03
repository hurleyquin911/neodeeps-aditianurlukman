"use client";

import { useRef } from "react";
import Link from "next/link";
import { services } from "@/lib/data";
import { useLiftHover, useReveal } from "@/lib/motion";
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
      <p className="reveal text-sm font-medium text-acid">Layanan</p>
      <h1 className="reveal font-display mt-3 text-[clamp(1.8rem,4vw,3rem)] font-extrabold tracking-[-0.03em]">
        Yang saya kerjakan
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
        {services.map((service) => (
          <article
            key={service.id}
            className="js-lift reveal rounded-3xl border border-line bg-ink p-6 md:p-8"
          >
            <p className="font-mono text-sm text-acid">{service.id}</p>
            <h2 className="font-display mt-2 text-2xl font-bold">
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
                      <span className="mt-2 size-1.5 shrink-0 rounded-full bg-acid" />
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
                      <span className="font-mono text-acid">
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

      <div className="reveal mt-12 rounded-3xl border border-line p-6 md:p-8">
        <h2 className="font-display text-xl font-bold">Cocok untuk siapa</h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-stone md:text-base">
          Tim atau founder yang butuh seseorang memegang produk digital sampai
          ke implementasi, rilis, dan perawatannya. Jika yang dicari hanya slide
          tanpa kode, atau rilis sekali lalu ditinggal, biasanya bukan saya.
        </p>
        <div className="mt-6">
          <Magnetic>
            <Link
              href="/kontak"
              className="inline-flex rounded-full bg-acid px-6 py-3 text-sm font-semibold text-void"
            >
              Ceritakan proyeknya
            </Link>
          </Magnetic>
        </div>
      </div>
    </article>
  );
}
