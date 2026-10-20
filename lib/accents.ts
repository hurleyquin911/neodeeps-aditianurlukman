import type { CSSProperties } from "react";

/** Palet netral — satu aksen gelap untuk kesan profesional. */
export const accents = [
  "#171717",
  "#404040",
  "#525252",
  "#57534e",
  "#737373",
  "#44403c",
] as const;

export function accentAt(index: number) {
  return accents[((index % accents.length) + accents.length) % accents.length];
}

export function accentStyle(indexOrColor: number | string): CSSProperties {
  const color =
    typeof indexOrColor === "number" ? accentAt(indexOrColor) : indexOrColor;
  return { "--accent": color } as CSSProperties;
}
