"use client";

import { useRef } from "react";
import { usePathname } from "next/navigation";
import { gsap, useGSAP } from "@/lib/gsap";
import { reducedMotion } from "@/lib/motion";

export function PageEnter({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useGSAP(
    () => {
      if (reducedMotion() || !ref.current) return;
      gsap.fromTo(
        ref.current,
        { y: 18, opacity: 0.88 },
        { y: 0, opacity: 1, duration: 0.55, ease: "power3.out" },
      );
    },
    { dependencies: [pathname] },
  );

  return <div ref={ref}>{children}</div>;
}
