"use client";

import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { HashScroll } from "@/components/providers/HashScroll";
import { CursorGlow } from "@/components/ui/CursorGlow";
import { ScrollProgress } from "@/components/ui/ScrollProgress";

export function ClientShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SmoothScroll />
      <HashScroll />
      <ScrollProgress />
      <CursorGlow />
      {children}
    </>
  );
}
