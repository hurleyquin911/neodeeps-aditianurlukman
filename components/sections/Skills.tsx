"use client";

import { useRef } from "react";
import { skills } from "@/lib/data";
import { gsap, useGSAP } from "@/lib/gsap";
import { finePointer, reducedMotion } from "@/lib/motion";

export function Skills() {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (reducedMotion()) return;
      gsap.from(".skill-chip", {
        y: 12,
        duration: 0.45,
        stagger: 0.04,
        ease: "power2.out",
        immediateRender: false,
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top 90%",
          once: true,
        },
      });
    },
    { scope: rootRef },
  );

  const onEnter = (event: React.MouseEvent<HTMLSpanElement>) => {
    if (!finePointer() || reducedMotion()) return;
    gsap.to(event.currentTarget, {
      y: -4,
      scale: 1.06,
      duration: 0.28,
      ease: "power2.out",
    });
  };

  const onLeave = (event: React.MouseEvent<HTMLSpanElement>) => {
    gsap.to(event.currentTarget, {
      y: 0,
      scale: 1,
      duration: 0.35,
      ease: "power3.out",
    });
  };

  return (
    <section ref={rootRef} className="border-y border-line">
      <div className="mx-auto flex max-w-6xl flex-wrap gap-2 px-5 py-6 md:px-8">
        {skills.map((skill) => (
          <span
            key={skill}
            onMouseEnter={onEnter}
            onMouseLeave={onLeave}
            className="skill-chip cursor-default rounded-full border border-line bg-ink px-3 py-1.5 text-sm text-cream will-change-transform hover:border-acid hover:text-acid"
          >
            {skill}
          </span>
        ))}
      </div>
    </section>
  );
}
