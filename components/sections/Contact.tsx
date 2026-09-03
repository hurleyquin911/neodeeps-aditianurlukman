"use client";

import { FormEvent, useRef, useState } from "react";
import { briefPoints, contactFaq, contactTopics, site } from "@/lib/data";
import { useReveal } from "@/lib/motion";
import { Magnetic } from "@/components/ui/Magnetic";

export function Contact() {
  const rootRef = useRef<HTMLElement>(null);
  const [status, setStatus] = useState("");
  useReveal(rootRef);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    const subject = `Proyek baru dari ${name}`;
    const body = `Nama: ${name}\nEmail: ${email}\n\n${message}`;
    const gmail = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
      site.email,
    )}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    const opened = window.open(gmail, "_blank", "noopener,noreferrer");
    if (!opened) {
      window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    }
    setStatus("Gmail terbuka. Jika tidak, kirim manual ke email di atas.");
    event.currentTarget.reset();
  };

  return (
    <article
      ref={rootRef}
      id="contact"
      className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24"
    >
      <p className="reveal text-sm font-medium text-acid">Kontak</p>
      <h1 className="reveal font-display mt-3 text-[clamp(1.8rem,4vw,3rem)] font-extrabold tracking-[-0.03em]">
        Mulai diskusikan proyek digital Anda
      </h1>
      <p className="reveal mt-3 text-sm text-stone">{site.availability}</p>
      <Magnetic>
        <a
          href={`mailto:${site.email}`}
          className="reveal mt-4 inline-block text-lg text-acid underline-offset-4 transition-transform hover:underline md:text-xl"
        >
          {site.email}
        </a>
      </Magnetic>
      <p className="reveal mt-4 max-w-2xl text-base leading-relaxed text-stone md:text-lg">
        Ceritakan website, dashboard, aplikasi, atau desain yang ingin dibuat.
        Saya membalas dengan jelas: apakah cocok, apa yang masih kabur, dan usulan
        langkah pertama - bukan template otomatis.
      </p>

      <div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)]">
        <form className="reveal space-y-6" onSubmit={onSubmit}>
          <label className="block">
            <span className="text-sm text-stone">Nama</span>
            <input
              required
              name="name"
              autoComplete="name"
              className="mt-2 w-full rounded-xl border border-line bg-ink px-4 py-3 text-base outline-none transition-colors focus:border-acid"
            />
          </label>
          <label className="block">
            <span className="text-sm text-stone">Email</span>
            <input
              required
              type="email"
              name="email"
              autoComplete="email"
              className="mt-2 w-full rounded-xl border border-line bg-ink px-4 py-3 text-base outline-none transition-colors focus:border-acid"
            />
          </label>
          <label className="block">
            <span className="text-sm text-stone">Cerita proyek</span>
            <textarea
              required
              name="message"
              rows={7}
              placeholder="Siapa penggunanya, apa yang sudah ada, dan kapan dibutuhkan."
              className="mt-2 w-full resize-y rounded-xl border border-line bg-ink px-4 py-3 text-base outline-none transition-colors focus:border-acid"
            />
          </label>
          <Magnetic>
            <button
              type="submit"
              className="rounded-full bg-acid px-6 py-3 text-sm font-semibold text-void"
            >
              Kirim pesan
            </button>
          </Magnetic>
          {status ? (
            <p className="text-sm text-stone" role="status">
              {status}
            </p>
          ) : null}
        </form>

        <div className="space-y-8">
          <section className="reveal rounded-2xl border border-line bg-ink p-6">
            <h2 className="font-display text-lg font-bold">Topik yang biasa masuk</h2>
            <ul className="mt-4 space-y-2 text-sm leading-relaxed text-stone">
              {contactTopics.map((topic) => (
                <li key={topic} className="flex gap-3">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-acid" />
                  <span>{topic}</span>
                </li>
              ))}
            </ul>
          </section>
          <section className="reveal rounded-2xl border border-line p-6">
            <h2 className="font-display text-lg font-bold">
              Yang membantu di pesan pertama
            </h2>
            <ul className="mt-4 space-y-2 text-sm leading-relaxed text-stone">
              {briefPoints.map((point) => (
                <li key={point} className="flex gap-3">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-acid" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>

      <section className="mt-16">
        <h2 className="reveal font-display text-2xl font-bold">Pertanyaan singkat</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {contactFaq.map((item) => (
            <article
              key={item.q}
              className="reveal rounded-2xl border border-line p-5"
            >
              <h3 className="font-display text-lg font-bold">{item.q}</h3>
              <p className="mt-3 text-sm leading-relaxed text-stone">{item.a}</p>
            </article>
          ))}
        </div>
      </section>
    </article>
  );
}
