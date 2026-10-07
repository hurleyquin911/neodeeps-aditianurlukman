import type { CSSProperties } from "react";

export const accents = [
  "#d4ff3f",
  "#38bdf8",
  "#a78bfa",
  "#fb7185",
  "#fbbf24",
  "#34d399",
] as const;

export function accentAt(index: number) {
  return accents[((index % accents.length) + accents.length) % accents.length];
}

export function accentStyle(indexOrColor: number | string): CSSProperties {
  const color =
    typeof indexOrColor === "number" ? accentAt(indexOrColor) : indexOrColor;
  return { "--accent": color } as CSSProperties;
}
