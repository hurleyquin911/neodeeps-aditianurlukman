"use client";

import { IntroProvider } from "@/lib/intro-context";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { Preloader } from "@/components/ui/Preloader";
import { SmoothScroll } from "@/components/providers/SmoothScroll";

export function ClientShell({ children }: { children: React.ReactNode }) {
  return (
    <IntroProvider>
      <SmoothScroll />
      <Preloader />
      <CustomCursor />
      <div className="grain" aria-hidden />
      {children}
    </IntroProvider>
  );
}
