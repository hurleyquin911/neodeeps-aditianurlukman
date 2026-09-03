"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { scrollToId } from "@/lib/motion";

export function HashScroll() {
  const pathname = usePathname();

  useEffect(() => {
    const hash = window.location.hash;
    if (!hash) return;
    const id = window.setTimeout(() => scrollToId(hash), 80);
    return () => window.clearTimeout(id);
  }, [pathname]);

  return null;
}
