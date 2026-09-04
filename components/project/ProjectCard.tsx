"use client";

import { useRef } from "react";
import Link from "next/link";
import type { Project } from "@/lib/projects";
import { gsap, useGSAP, ScrollTrigger } from "@/lib/gsap";
import { finePointer, reducedMotion } from "@/lib/motion";

function CoverScene({ project }: { project: Project }) {
  const kind = project.category;

  if (kind === "Mobile Product") {
    return (
      <div className="cover-mock mx-auto w-[42%] max-w-[8.8rem]">
        <div className="rounded-[1.5rem] border border-white/25 bg-black/40 p-2.5 shadow-2xl">
          <div className="mx-auto mb-2 h-1 w-8 rounded-full bg-white/35" />
          <div className="space-y-1.5">
            <div className="h-8 rounded-lg bg-white/18" />
            <div className="h-6 rounded-lg bg-white/12" />
            <div className="h-11 rounded-lg bg-white/15" />
          </div>
        </div>
      </div>
    );
  }

  if (kind.includes("AI")) {
    return (
      <div className="cover-mock w-full max-w-[16rem] space-y-2 px-2">
        <div className="max-w-[78%] rounded-2xl rounded-bl-md bg-black/35 px-3 py-2.5">
          <div className="h-2 w-28 rounded-full bg-white/40" />
        </div>
        <div className="ml-auto max-w-[72%] rounded-2xl rounded-br-md bg-white/18 px-3 py-2.5">
          <div className="h-2 w-24 rounded-full bg-white/55" />
        </div>
        <div className="max-w-[64%] rounded-2xl rounded-bl-md bg-black/35 px-3 py-2.5">
          <div className="h-2 w-20 rounded-full bg-white/30" />
        </div>
      </div>
    );
  }

  if (kind === "Rich Media") {
    return (
      <div className="cover-mock flex h-full items-end justify-center gap-2.5 px-6">
        <div className="h-[46%] w-16 rounded-lg bg-white/12" />
        <div className="h-[72%] w-24 rounded-lg bg-white/20" />
        <div className="h-[38%] w-20 rounded-lg bg-white/12" />
      </div>
    );
  }

  if (kind.includes("Dashboard")) {
    return (
      <div className="cover-mock grid w-full grid-cols-3 gap-2 px-5">
        {["A", "B", "C"].map((label) => (
          <div key={label} className="rounded-xl bg-black/30 p-2.5">
            <p className="text-[10px] text-white/50">{label}</p>
            <div className="mt-2 h-1.5 w-3/4 rounded-full bg-white/30" />
            <div className="mt-1.5 h-8 rounded-md bg-white/10" />
          </div>
        ))}
      </div>
    );
  }

  if (kind === "Ecommerce") {
    return (
      <div className="cover-mock w-full space-y-2 px-5">
        <div className="flex items-center justify-between">
          <div className="h-2 w-16 rounded-full bg-white/45" />
          <div className="h-2 w-8 rounded-full bg-white/25" />
        </div>
        <div className="grid grid-cols-2 gap-2">
          {[1, 2, 3, 4].map((tile) => (
            <div key={tile} className="rounded-lg bg-black/30 p-2">
              <div className="h-10 rounded-md bg-white/12" />
              <div className="mt-1.5 h-1.5 w-3/4 rounded-full bg-white/35" />
              <div className="mt-1 h-1.5 w-1/2 rounded-full bg-white/20" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="cover-mock w-full space-y-3 px-6">
      <div className="flex items-center gap-1.5 rounded-t-lg bg-black/30 px-2.5 py-1.5">
        <span className="size-1.5 rounded-full bg-white/35" />
        <span className="size-1.5 rounded-full bg-white/25" />
        <span className="size-1.5 rounded-full bg-white/20" />
      </div>
      <div className="h-2.5 w-1/3 rounded-full bg-white/40" />
      <div className="h-2 w-2/3 rounded-full bg-white/20" />
      <div className="grid grid-cols-2 gap-2">
        <div className="h-[4.5rem] rounded-xl bg-black/25" />
        <div className="h-[4.5rem] rounded-xl bg-black/20" />
      </div>
    </div>
  );
}

export function ProjectCard({
  project,
  wide = false,
  index = 0,
}: {
  project: Project;
  wide?: boolean;
  index?: number;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const coverRef = useRef<HTMLDivElement>(null);
  const mockRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const sweepRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const card = ref.current;
      if (!card) return;

      if (!reducedMotion()) {
        gsap.from(card, {
          y: 48,
          opacity: 0,
          duration: 0.85,
          delay: (index % 6) * 0.08,
          ease: "power4.out",
          immediateRender: false,
          scrollTrigger: {
            trigger: card,
            start: "top 88%",
            once: true,
          },
        });
        gsap.from(mockRef.current, {
          y: 18,
          opacity: 0,
          duration: 0.7,
          delay: 0.12 + (index % 6) * 0.08,
          ease: "power3.out",
          immediateRender: false,
          scrollTrigger: {
            trigger: card,
            start: "top 88%",
            once: true,
          },
        });
        const idle = gsap.to(".cover-mock", {
          y: -7,
          duration: 2.6,
          yoyo: true,
          repeat: -1,
          ease: "sine.inOut",
          paused: true,
        });
        ScrollTrigger.create({
          trigger: card,
          start: "top 92%",
          once: true,
          onEnter: () => idle.play(),
        });
      }
    },
    { scope: ref, dependencies: [index] },
  );

  const onEnter = () => {
    if (!finePointer() || reducedMotion()) return;
    gsap.to(ref.current, {
      y: -10,
      boxShadow: `0 24px 48px rgba(0,0,0,0.38), 0 0 0 1px ${project.palette.accent}59`,
      duration: 0.4,
      ease: "power2.out",
    });
    gsap.to(coverRef.current, { scale: 1.06, duration: 0.55, ease: "power2.out" });
    gsap.to(mockRef.current, { y: -8, scale: 1.04, duration: 0.45, ease: "power2.out" });
    gsap.to(arrowRef.current, { x: 8, duration: 0.3, ease: "power2.out" });
    gsap.to(glowRef.current, { opacity: 1, duration: 0.3 });
    gsap.fromTo(
      sweepRef.current,
      { xPercent: -120 },
      { xPercent: 120, duration: 0.85, ease: "power2.inOut" },
    );
  };

  const onMove = (event: React.MouseEvent<HTMLAnchorElement>) => {
    const el = ref.current;
    const glow = glowRef.current;
    if (!el || !glow || !finePointer() || reducedMotion()) return;
    const rect = el.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    gsap.set(glow, {
      background: `radial-gradient(280px circle at ${x}px ${y}px, ${project.palette.accent}55, transparent 58%)`,
    });
  };

  const onLeave = () => {
    gsap.to(ref.current, {
      y: 0,
      boxShadow: "0 0 0 0 transparent",
      duration: 0.55,
      ease: "power3.out",
    });
    gsap.to(coverRef.current, { scale: 1, duration: 0.5, ease: "power3.out" });
    gsap.to(mockRef.current, { y: 0, scale: 1, duration: 0.5, ease: "power3.out" });
    gsap.to(arrowRef.current, { x: 0, duration: 0.35, ease: "power3.out" });
    gsap.to(glowRef.current, { opacity: 0, duration: 0.35 });
  };

  return (
    <Link
      ref={ref}
      href={`/portofolio/${project.slug}`}
      onMouseEnter={onEnter}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`group relative flex h-full flex-col overflow-hidden rounded-[1.4rem] border border-line bg-ink transition-colors hover:border-cream/25 ${
        wide ? "md:flex-row" : ""
      }`}
    >
      <div
        className={`relative overflow-hidden ${
          wide ? "aspect-[16/10] md:aspect-auto md:min-h-[280px] md:w-[52%]" : "aspect-[16/10]"
        }`}
      >
        <div
          ref={coverRef}
          className="absolute inset-0 origin-center"
          style={{
            background: `linear-gradient(148deg, ${project.palette.from}, ${project.palette.via}, ${project.palette.to})`,
          }}
        />
        <div
          className="pointer-events-none absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "radial-gradient(rgba(255,255,255,0.22) 1px, transparent 1px)",
            backgroundSize: "16px 16px",
          }}
        />
        <div
          className="pointer-events-none absolute -top-10 -right-8 size-44 rounded-full opacity-50"
          style={{
            background: `radial-gradient(circle, ${project.palette.accent}66, transparent 68%)`,
          }}
        />
        <div
          ref={glowRef}
          className="pointer-events-none absolute inset-0 opacity-0 mix-blend-screen"
        />
        <div
          ref={sweepRef}
          className="pointer-events-none absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-transparent via-white/25 to-transparent opacity-70"
          style={{ transform: "translateX(-120%)" }}
        />
        <div
          ref={mockRef}
          className="absolute inset-0 flex items-center justify-center p-5"
        >
          <CoverScene project={project} />
        </div>
        <div className="absolute inset-x-0 top-0 flex items-start justify-between p-4">
          <span className="font-mono text-xs tracking-wider text-white/80">
            {project.id}
          </span>
          <span className="rounded-full border border-white/20 bg-black/40 px-2.5 py-1 text-[11px] text-white/90 backdrop-blur-sm">
            {project.year}
          </span>
        </div>
        <span className="absolute right-4 bottom-4 rounded-full bg-black/50 px-3 py-1 text-xs text-white backdrop-blur-sm">
          {project.category}
        </span>
      </div>

      <div className={`flex flex-1 flex-col p-5 md:p-6 ${wide ? "md:justify-center" : ""}`}>
        <div
          className="h-0.5 w-8 rounded-full"
          style={{ background: project.palette.accent }}
        />
        <h3 className="font-display mt-3 text-2xl font-bold tracking-[-0.03em]">
          {project.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-stone">
          {project.description}
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-line px-2.5 py-1 text-xs text-cream"
            >
              {tag}
            </span>
          ))}
        </div>
        <p className="mt-auto pt-5 text-sm font-medium text-acid">
          Buka studi kasus{" "}
          <span ref={arrowRef} className="inline-block">
            →
          </span>
        </p>
      </div>
    </Link>
  );
}
