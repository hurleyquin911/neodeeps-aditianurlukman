"use client";

import { FormEvent, useRef, useState } from "react";
import { briefPoints, contactFaq, contactTopics, site } from "@/lib/data";
import { useReveal } from "@/lib/motion";
import { accentStyle } from "@/lib/accents";
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
      <p className="reveal kicker" style={accentStyle(5)}>
        {site.availability}
      </p>
      <h1 className="reveal font-display mt-5 max-w-4xl text-[clamp(2rem,4.4vw,3.25rem)] leading-[1.12] font-semibold tracking-[-0.03em]">
        Mulai diskusikan proyek <span className="text-spectrum">digital</span> Anda
      </h1>
      <Magnetic>
        <a
          href={`mailto:${site.email}`}
          className="reveal text-spectrum mt-5 inline-block text-xl font-semibold underline-offset-4 hover:underline md:text-2xl"
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
            <span className="text-sm font-medium text-stone">Nama</span>
            <input
              required
              name="name"
              autoComplete="name"
              className="field mt-2"
            />
          </label>
          <label className="block">
            <span className="text-sm font-medium text-stone">Email</span>
            <input
              required
              type="email"
              name="email"
              autoComplete="email"
              className="field mt-2"
            />
          </label>
          <label className="block">
            <span className="text-sm font-medium text-stone">Cerita proyek</span>
            <textarea
              required
              name="message"
              rows={7}
              placeholder="Siapa penggunanya, apa yang sudah ada, dan kapan dibutuhkan."
              className="field mt-2 min-h-40 resize-y"
            />
          </label>
          <Magnetic>
            <button type="submit" className="btn-primary px-6 py-3 text-sm">
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
          <section
            className="reveal tint tint-static rounded-2xl p-6"
            style={accentStyle(1)}
          >
            <h2 className="font-display text-lg font-bold">Topik yang biasa masuk</h2>
            <ul className="mt-4 flex flex-wrap gap-2 text-sm leading-relaxed">
              {contactTopics.map((topic, index) => (
                <li
                  key={topic}
                  style={accentStyle(index)}
                  className="chip rounded-full px-3 py-1.5"
                >
                  {topic}
                </li>
              ))}
            </ul>
          </section>
          <section
            className="reveal tint tint-static rounded-2xl p-6"
            style={accentStyle(3)}
          >
            <h2 className="font-display text-lg font-bold">
              Yang membantu di pesan pertama
            </h2>
            <ul className="mt-4 space-y-2 text-sm leading-relaxed text-stone">
              {briefPoints.map((point) => (
                <li key={point} className="flex gap-3">
                  <span className="accent-bg mt-2 size-1.5 shrink-0 rounded-full" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>

      <section className="mt-16">
        <p className="reveal kicker" style={accentStyle(4)}>
          FAQ
        </p>
        <h2 className="reveal font-display mt-4 text-2xl font-bold md:text-3xl">
          Pertanyaan singkat
        </h2>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {contactFaq.map((item, index) => (
            <article
              key={item.q}
              style={accentStyle(index + 2)}
              className="reveal tint rounded-2xl p-5"
            >
              <p className="accent-text font-display text-3xl font-extrabold">?</p>
              <h3 className="font-display mt-2 text-lg font-bold">{item.q}</h3>
              <p className="mt-3 text-sm leading-relaxed text-stone">{item.a}</p>
            </article>
          ))}
        </div>
      </section>
    </article>
  );
}
