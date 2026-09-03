"use client";

import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import { finePointer, reducedMotion } from "@/lib/motion";

type MagneticProps = {
  children: React.ReactNode;
  className?: string;
  strength?: number;
};

export function Magnetic({
  children,
  className,
  strength = 0.28,
}: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el || reducedMotion() || !finePointer()) return;
    const rect = el.getBoundingClientRect();
    gsap.to(el, {
      x: (event.clientX - rect.left - rect.width / 2) * strength,
      y: (event.clientY - rect.top - rect.height / 2) * strength,
      duration: 0.35,
      ease: "power3.out",
    });
  };

  const onLeave = () => {
    gsap.to(ref.current, {
      x: 0,
      y: 0,
      duration: 0.7,
      ease: "elastic.out(1, 0.45)",
    });
  };

  return (
    <div
      ref={ref}
      className={className ?? "inline-block"}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {children}
    </div>
  );
}
