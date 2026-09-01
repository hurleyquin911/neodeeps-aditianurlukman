"use client";

import { FormEvent, useRef, useState } from "react";
import { site } from "@/lib/data";
import { gsap, useGSAP } from "@/lib/gsap";

const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

function scrambleTo(el: HTMLElement, finalText: string) {
  let frame = 0;
  const total = finalText.length;
  const id = window.setInterval(() => {
    el.textContent = finalText
      .split("")
      .map((char, index) => {
        if (char === " " || index < frame) return char;
        return chars[Math.floor(Math.random() * chars.length)];
      })
      .join("");
    frame += 1;
    if (frame > total) window.clearInterval(id);
  }, 28);
}

export function Contact() {
  const rootRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLAnchorElement>(null);
  const [status, setStatus] = useState("");

  useGSAP(
    () => {
      gsap.from(".contact-reveal", {
        y: 40,
        autoAlpha: 0,
        duration: 1,
        stagger: 0.1,
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
    setStatus("Gmail terbuka. Kalau tidak, kirim manual ke email di atas.");
    event.currentTarget.reset();
  };

  return (
    <section
      ref={rootRef}
      id="contact"
      className="px-5 py-24 md:px-10 md:py-32"
    >
      <p className="contact-reveal text-[11px] tracking-[0.28em] text-stone uppercase">
        Contact
      </p>
      <h2 className="contact-reveal font-display mt-4 text-[clamp(3rem,10vw,8rem)] leading-[0.85] font-extrabold tracking-[-0.06em]">
        Punya ide?
      </h2>

      <a
        ref={titleRef}
        href={`mailto:${site.email}`}
        data-cursor="Email"
        className="contact-reveal mt-6 inline-block text-2xl text-acid md:text-4xl"
        onMouseEnter={() => {
          if (titleRef.current) scrambleTo(titleRef.current, site.email);
        }}
      >
        {site.email}
      </a>

      <div className="mt-16 grid gap-16 lg:grid-cols-[0.9fr_1.1fr]">
        <p className="contact-reveal max-w-md text-base leading-relaxed text-stone md:text-lg">
          Ceritakan proyekmu — website, dashboard, aplikasi, atau eksperimen
          interaksi. Saya baca setiap pesan dan merespons dengan jelas.
        </p>

        <form className="contact-reveal space-y-8" onSubmit={onSubmit}>
          <label className="block">
            <span className="text-[11px] tracking-[0.2em] text-stone uppercase">
              Nama
            </span>
            <input
              required
              name="name"
              autoComplete="name"
              className="mt-2 w-full border-b border-line bg-transparent py-3 text-lg outline-none transition-colors focus:border-acid"
            />
          </label>
          <label className="block">
            <span className="text-[11px] tracking-[0.2em] text-stone uppercase">
              Email
            </span>
            <input
              required
              type="email"
              name="email"
              autoComplete="email"
              className="mt-2 w-full border-b border-line bg-transparent py-3 text-lg outline-none transition-colors focus:border-acid"
            />
          </label>
          <label className="block">
            <span className="text-[11px] tracking-[0.2em] text-stone uppercase">
              Cerita proyek
            </span>
            <textarea
              required
              name="message"
              rows={4}
              className="mt-2 w-full resize-none border-b border-line bg-transparent py-3 text-lg outline-none transition-colors focus:border-acid"
            />
          </label>
          <button
            type="submit"
            data-cursor="Send"
            className="rounded-full bg-cream px-8 py-4 text-[12px] font-semibold tracking-[0.2em] text-void uppercase transition-colors hover:bg-acid"
          >
            Kirim pesan
          </button>
          {status ? (
            <p className="text-sm text-stone" role="status">
              {status}
            </p>
          ) : null}
        </form>
      </div>
    </section>
  );
}
