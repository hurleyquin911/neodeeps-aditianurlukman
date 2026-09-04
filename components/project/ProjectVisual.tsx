import type { Project } from "@/lib/projects";

function DashboardMock() {
  return (
    <div className="grid gap-3 p-5 sm:grid-cols-3">
      {["Ringkasan", "Aktivitas", "Status"].map((label) => (
        <div key={label} className="rounded-xl bg-black/25 p-4">
          <p className="text-xs text-white/60">{label}</p>
          <p className="mt-2 h-2 w-2/3 rounded-full bg-white/30" />
          <p className="mt-2 h-2 w-1/2 rounded-full bg-white/15" />
        </div>
      ))}
      <div className="rounded-xl bg-black/20 p-4 sm:col-span-3">
        <p className="text-xs text-white/60">Tabel data</p>
        <div className="mt-3 space-y-2">
          {[1, 2, 3, 4].map((row) => (
            <div key={row} className="h-2 rounded-full bg-white/15" />
          ))}
        </div>
      </div>
    </div>
  );
}

function PhoneMock() {
  return (
    <div className="flex justify-center p-6">
      <div className="w-44 rounded-[1.6rem] border border-white/20 bg-black/30 p-3">
        <div className="mx-auto mb-3 h-1.5 w-12 rounded-full bg-white/25" />
        <div className="space-y-2">
          {[1, 2, 3].map((card) => (
            <div key={card} className="rounded-xl bg-white/10 p-3">
              <p className="h-2 w-3/4 rounded-full bg-white/40" />
              <p className="mt-2 h-2 w-1/2 rounded-full bg-white/20" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ChatMock() {
  return (
    <div className="space-y-3 p-6">
      <div className="max-w-[80%] rounded-2xl rounded-bl-md bg-black/25 px-4 py-3 text-sm text-white/90">
        Informasi perikanan apa yang bisa saya tanyakan?
      </div>
      <div className="ml-auto max-w-[80%] rounded-2xl rounded-br-md bg-white/15 px-4 py-3 text-sm text-white">
        Musim, lokasi, atau praktik di Danau Maninjau.
      </div>
      <div className="max-w-[80%] rounded-2xl rounded-bl-md bg-black/25 px-4 py-3 text-sm text-white/90">
        Berikut ringkasan yang relevan untuk pertanyaan Anda.
      </div>
    </div>
  );
}

function BannerMock() {
  return (
    <div className="flex flex-wrap items-end justify-center gap-4 p-6">
      <div className="h-28 w-28 rounded-lg bg-white/10" />
      <div className="h-36 w-56 rounded-lg bg-white/15" />
      <div className="h-20 w-72 rounded-lg bg-white/10" />
    </div>
  );
}

function ShopMock() {
  return (
    <div className="space-y-3 p-6">
      <div className="flex items-center justify-between">
        <div className="h-3 w-28 rounded-full bg-white/40" />
        <div className="h-3 w-12 rounded-full bg-white/20" />
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {["Senja", "Nara", "Pleat", "Slip", "Midi", "Pima"].map((label) => (
          <div key={label} className="rounded-xl bg-black/25 p-3">
            <div className="h-16 rounded-lg bg-white/12" />
            <p className="mt-2 text-[10px] tracking-wide text-white/55 uppercase">
              {label}
            </p>
            <div className="mt-1 h-2 w-2/3 rounded-full bg-white/25" />
          </div>
        ))}
      </div>
    </div>
  );
}

function SiteMock() {
  return (
    <div className="space-y-3 p-6">
      <div className="h-3 w-1/3 rounded-full bg-white/40" />
      <div className="h-2 w-2/3 rounded-full bg-white/20" />
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <div className="h-24 rounded-xl bg-black/20" />
        <div className="h-24 rounded-xl bg-black/20" />
      </div>
    </div>
  );
}

export function ProjectVisual({ project }: { project: Project }) {
  const kind = project.category;

  return (
    <div
      className="overflow-hidden rounded-3xl border border-line"
      style={{
        background: `linear-gradient(145deg, ${project.palette.from}, ${project.palette.via}, ${project.palette.to})`,
      }}
    >
      <div className="flex items-center justify-between px-5 py-4 text-sm text-white/80">
        <span>{project.title}</span>
        <span>{project.year}</span>
      </div>
      {kind === "Mobile Product" ? (
        <PhoneMock />
      ) : kind === "AI Chatbot" || kind === "AI Product" ? (
        <ChatMock />
      ) : kind === "Rich Media" ? (
        <BannerMock />
      ) : kind === "Product Dashboard" ? (
        <DashboardMock />
      ) : kind === "Ecommerce" ? (
        <ShopMock />
      ) : (
        <SiteMock />
      )}
    </div>
  );
}
