import Image from "next/image";

export function AppBadge({ logo, name }: { logo: string; name: string }) {
  return (
    <span className="relative block size-12 shrink-0 overflow-hidden rounded-2xl ring-1 ring-white/15 transition-transform duration-300 group-hover:scale-105 group-hover:-rotate-6 md:size-14">
      <Image
        src={logo}
        alt={`Logo ${name}`}
        fill
        sizes="56px"
        className="scale-[1.1] object-cover"
      />
    </span>
  );
}
