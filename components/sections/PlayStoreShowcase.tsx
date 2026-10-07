import { playStoreApps } from "@/lib/data";
import { accentStyle } from "@/lib/accents";
import { AppBadge } from "@/components/sections/AppBadge";

const BRAND: Record<(typeof playStoreApps)[number]["id"], string> = {
  finote: "#4ade80",
  muslim: "#2dd4bf",
  arisan: "#fb7185",
  libur: "#38bdf8",
  pay: "#a3e635",
};

function GooglePlayIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-5" aria-hidden>
      <path fill="#34d399" d="M3.6 1.8 13.8 12 3.6 22.2c-.4-.2-.6-.6-.6-1.1V2.9c0-.5.2-.9.6-1.1Z" />
      <path fill="#fbbf24" d="m17.2 8.6-3.4 3.4 3.4 3.4 3.9-2.2c.9-.5.9-1.9 0-2.4l-3.9-2.2Z" />
      <path fill="#38bdf8" d="M3.6 1.8c.4-.2.8-.2 1.2 0l12.4 6.8-3.4 3.4L3.6 1.8Z" />
      <path fill="#fb7185" d="m13.8 12 3.4 3.4-12.4 6.8c-.4.2-.8.2-1.2 0L13.8 12Z" />
    </svg>
  );
}

export function PlayStoreShowcase() {
  return (
    <article className="reveal tint tint-static relative overflow-hidden rounded-2xl p-5 md:p-6" style={accentStyle(5)}>
      <span className="pointer-events-none absolute -top-24 -right-20 size-64 rounded-full bg-mint/15 blur-3xl" />
      <span className="pointer-events-none absolute -bottom-28 -left-16 size-64 rounded-full bg-aqua/10 blur-3xl" />

      <header className="relative flex flex-wrap items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="grid size-11 place-items-center rounded-xl border border-white/10 bg-white/[0.04]">
            <GooglePlayIcon />
          </span>
          <div>
            <p className="font-display text-lg font-bold">Play Store</p>
            <p className="text-sm text-stone">Aplikasi yang pernah tayang di Google Play.</p>
          </div>
        </div>
        <span className="chip flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold">
          <span className="accent-bg size-1.5 animate-pulse rounded-full" />
          {String(playStoreApps.length).padStart(2, "0")} aplikasi live
        </span>
      </header>

      <ul className="relative mt-6 space-y-2.5">
        {playStoreApps.map((app, index) => (
          <li key={app.packageId} className="play-app" style={accentStyle(BRAND[app.id])}>
            <a
              href={`https://play.google.com/store/apps/details?id=${app.packageId}`}
              target="_blank"
              rel="noreferrer"
              className="group relative grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-4 overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] p-3 pr-4 transition-[border-color,transform] duration-300 hover:-translate-y-0.5 hover:border-[color-mix(in_oklab,var(--accent)_45%,transparent)]"
            >
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{
                  background:
                    "linear-gradient(90deg, color-mix(in oklab, var(--accent) 16%, transparent), transparent 75%)",
                }}
              />
              <span
                aria-hidden
                className="accent-bg absolute inset-y-3 left-0 w-1 origin-center scale-y-0 rounded-r-full transition-transform duration-300 group-hover:scale-y-100"
              />

              <span className="relative">
                <span className="accent-bg absolute inset-1 rounded-2xl opacity-40 blur-lg transition-opacity duration-300 group-hover:opacity-80" />
                <AppBadge logo={app.logo} name={app.name} />
              </span>

              <span className="relative min-w-0">
                <span className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
                  <span className="font-display text-base font-bold text-cream md:text-lg">
                    {app.name}
                  </span>
                  <span className="accent-text font-mono text-[11px] font-semibold opacity-80">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </span>
                <span className="mt-0.5 block truncate font-mono text-[11px] text-stone/70">
                  {app.packageId}
                </span>
                <span className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-stone">
                  {app.blurb}
                </span>
              </span>

              <span className="relative grid size-9 shrink-0 place-items-center rounded-full border border-white/10 text-cream transition-all duration-300 group-hover:rotate-45 group-hover:border-transparent group-hover:bg-[var(--accent)] group-hover:text-void">
                <svg viewBox="0 0 16 16" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
                  <path d="M4 12 12 4M5.5 4H12v6.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </a>
          </li>
        ))}
      </ul>

      <footer className="relative mt-5 flex flex-wrap items-center justify-end gap-3 border-t border-line pt-4">
        <ul className="flex flex-wrap gap-1.5">
          {["Android", "React Native", "Expo"].map((tag, index) => (
            <li
              key={tag}
              style={accentStyle(index + 1)}
              className="chip rounded-full px-2.5 py-1 text-[11px] font-medium"
            >
              {tag}
            </li>
          ))}
        </ul>
      </footer>
    </article>
  );
}
