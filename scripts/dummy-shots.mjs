import { mkdirSync, writeFileSync } from "node:fs";

const out = new URL("../public/dummy/", import.meta.url);
mkdirSync(out, { recursive: true });

const font = "Segoe UI, system-ui, sans-serif";

function esc(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function t(x, y, value, size, fill, extra = "") {
  return `<text x="${x}" y="${y}" fill="${fill}" font-size="${size}" font-family="${font}" ${extra}>${esc(value)}</text>`;
}

function browser(host, body, page = "#f7f3ee") {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1280" height="800" viewBox="0 0 1280 800">
  <rect width="1280" height="800" fill="#121214"/>
  <rect width="1280" height="46" fill="#1c1c20"/>
  <circle cx="24" cy="23" r="6" fill="#fb7185"/>
  <circle cx="44" cy="23" r="6" fill="#fbbf24"/>
  <circle cx="64" cy="23" r="6" fill="#34d399"/>
  <rect x="96" y="12" width="420" height="22" rx="11" fill="#0e0e10"/>
  <text x="112" y="27" fill="#8d887f" font-size="12" font-family="${font}">${esc(host)}</text>
  <rect y="46" width="1280" height="754" fill="${page}"/>
  ${body}
</svg>`;
}

function phone(body, bezel = "#111318", screen = "#0c1214") {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="780" height="1500" viewBox="0 0 780 1500">
  <rect width="780" height="1500" fill="#0b0d10"/>
  <rect x="28" y="24" width="724" height="1452" rx="64" fill="${bezel}"/>
  <rect x="52" y="48" width="676" height="1404" rx="44" fill="${screen}"/>
  <rect x="290" y="64" width="200" height="26" rx="13" fill="#050607"/>
  ${body}
</svg>`;
}

function save(name, markup) {
  writeFileSync(new URL(name, out), markup);
}

function garment(x, y, w, h, fill) {
  return `<g>
    <ellipse cx="${x + w / 2}" cy="${y + h + 10}" rx="${w * 0.38}" ry="10" fill="#000" opacity="0.12"/>
    <path d="M${x + w * 0.28} ${y + 8} Q${x + w / 2} ${y + h * 0.08} ${x + w * 0.72} ${y + 8} L${x + w * 0.92} ${y + h * 0.28} L${x + w * 0.78} ${y + h * 0.34} L${x + w * 0.74} ${y + h} L${x + w * 0.26} ${y + h} L${x + w * 0.22} ${y + h * 0.34} L${x + w * 0.08} ${y + h * 0.28} Z" fill="${fill}"/>
    <path d="M${x + w * 0.4} ${y + 16} Q${x + w / 2} ${y + 34} ${x + w * 0.6} ${y + 16}" fill="none" stroke="#fff" stroke-opacity="0.35" stroke-width="3"/>
  </g>`;
}

const arunaNav = `
  <rect x="0" y="46" width="1280" height="64" fill="#f7f3ee"/>
  ${t(48, 86, "ARUNA", 22, "#1a1612", 'font-weight="700" letter-spacing="3"')}
  ${t(220, 84, "Musim", 14, "#6b6258")}
  ${t(290, 84, "Bentuk", 14, "#6b6258")}
  ${t(370, 84, "Jurnal", 14, "#6b6258")}
  ${t(1120, 84, "Tas  2", 14, "#1a1612", 'text-anchor="end"')}
  <line x1="0" y1="110" x2="1280" y2="110" stroke="#e4d9c8"/>
`;

save(
  "aruna-0.svg",
  browser(
    "ecommerce.neodeeps.com",
    `${arunaNav}
    <rect x="48" y="134" width="760" height="390" rx="28" fill="url(#hero)"/>
    <defs>
      <linearGradient id="hero" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#efe2cf"/>
        <stop offset="1" stop-color="#b08968"/>
      </linearGradient>
    </defs>
    ${t(84, 250, "MUSIM TRANSISI", 14, "#6b5344", 'letter-spacing="3"')}
    ${t(84, 300, "Tenang untuk", 42, "#1a1612", 'font-weight="700"')}
    ${t(84, 348, "iklim tropis.", 42, "#1a1612", 'font-weight="700"')}
    <rect x="84" y="380" width="180" height="44" rx="22" fill="#1a1612"/>
    ${t(174, 408, "Lihat etalase", 14, "#f7f3ee", 'text-anchor="middle"')}
    ${garment(560, 190, 180, 280, "#6b4f3a")}
    <rect x="836" y="134" width="396" height="186" rx="24" fill="#efe6da"/>
    ${garment(900, 160, 110, 140, "#c4a574")}
    ${t(980, 292, "Linen sore", 16, "#1a1612", 'font-weight="650"')}
    <rect x="836" y="338" width="396" height="186" rx="24" fill="#e7d3be"/>
    ${garment(900, 364, 110, 140, "#8d6e53")}
    ${t(980, 496, "Outer pasir", 16, "#1a1612", 'font-weight="650"')}`,
  ),
);

const shapes = [
  ["Atasan", "#c4a574"],
  ["Bawahan", "#8d6e53"],
  ["Outerwear", "#6b4f3a"],
  ["Dress", "#d7b899"],
  ["Aksesori", "#a68462"],
  ["Sepatu", "#4a3b2a"],
];

save(
  "aruna-1.svg",
  browser(
    "ecommerce.neodeeps.com/bentuk",
    `${arunaNav}
    ${t(48, 168, "Belanja menurut bentuk", 36, "#1a1612", 'font-weight="700"')}
    ${t(48, 202, "Enam jalur, satu etalase.", 16, "#6b6258")}
    ${shapes
      .map(([label, color], index) => {
        const col = index % 3;
        const row = Math.floor(index / 3);
        const x = 48 + col * 400;
        const y = 240 + row * 250;
        return `<rect x="${x}" y="${y}" width="376" height="230" rx="24" fill="#fff"/>
          ${garment(x + 128, y + 24, 120, 130, color)}
          ${t(x + 188, y + 200, label, 18, "#1a1612", 'text-anchor="middle" font-weight="650"')}`;
      })
      .join("")}`,
  ),
);

save(
  "aruna-2.svg",
  browser(
    "ecommerce.neodeeps.com/produk",
    `${arunaNav}
    ${[0, 1, 2].map((index) => {
      const x = 48 + index * 400;
      const prices = ["Rp 489.000", "Rp 329.000", "Rp 559.000"];
      const names = ["Kemeja linen", "Celana pasir", "Dress senja"];
      const colors = ["#b08968", "#6b4f3a", "#d7b899"];
      return `<rect x="${x}" y="150" width="376" height="520" rx="24" fill="#fff"/>
        <rect x="${x + 16}" y="${166}" width="344" height="340" rx="18" fill="#f3eadf"/>
        ${garment(x + 108, 210, 160, 240, colors[index])}
        <rect x="${x + 28}" y="430" width="72" height="26" rx="13" fill="#1a1612"/>
        ${t(x + 64, 448, "BARU", 11, "#f7f3ee", 'text-anchor="middle"')}
        ${t(x + 24, 540, names[index], 22, "#1a1612", 'font-weight="700"')}
        ${t(x + 24, 572, prices[index], 16, "#8d6e53")}`;
    }).join("")}`,
  ),
);

save(
  "aruna-3.svg",
  browser(
    "ecommerce.neodeeps.com/tas",
    `${arunaNav}
    ${t(48, 168, "Tas belanja", 36, "#1a1612", 'font-weight="700"')}
    <rect x="48" y="200" width="760" height="16" rx="8" fill="#eadfD0"/>
    <rect x="48" y="200" width="460" height="16" rx="8" fill="#c4a574"/>
    ${t(48, 244, "Rp 120.000 lagi untuk gratis ongkir", 15, "#6b6258")}
    ${[0, 1].map((index) => {
      const y = 280 + index * 140;
      return `<rect x="48" y="${y}" width="760" height="120" rx="20" fill="#fff"/>
        <rect x="68" y="${y + 16}" width="88" height="88" rx="14" fill="#f3eadf"/>
        ${garment(86, y + 28, 52, 64, index ? "#8d6e53" : "#c4a574")}
        ${t(180, y + 52, index ? "Outer pasir" : "Kemeja linen", 18, "#1a1612", 'font-weight="650"')}
        ${t(180, y + 80, "Ukuran M  ·  1", 14, "#6b6258")}
        ${t(760, y + 68, index ? "Rp 329.000" : "Rp 489.000", 16, "#1a1612", 'text-anchor="end"')}`;
    }).join("")}
    <rect x="860" y="200" width="372" height="360" rx="24" fill="#1a1612"/>
    ${t(888, 250, "Ringkasan", 14, "#c4a574", 'letter-spacing="2"')}
    ${t(888, 300, "Subtotal", 16, "#f7f3ee")}
    ${t(1200, 300, "Rp 818.000", 16, "#f7f3ee", 'text-anchor="end"')}
    ${t(888, 340, "Ongkir", 16, "#f7f3ee")}
    ${t(1200, 340, "Rp 25.000", 16, "#f7f3ee", 'text-anchor="end"')}
    <rect x="888" y="470" width="316" height="52" rx="26" fill="#c4a574"/>
    ${t(1046, 502, "Lanjut bayar", 16, "#1a1612", 'text-anchor="middle" font-weight="700"')}`,
  ),
);

save(
  "studio-kaos-0.svg",
  browser(
    "studio.neodeeps.com",
    `<rect y="46" width="1280" height="754" fill="#0e1626"/>
    <rect x="24" y="70" width="220" height="700" rx="16" fill="#152033"/>
    ${t(44, 108, "Jenis baju", 13, "#7dd3fc")}
    ${["Kaos", "Polo", "Hoodie", "Kemeja"].map((label, index) => `<rect x="40" y="${128 + index * 56}" width="188" height="44" rx="10" fill="${index === 0 ? "#1e3a5f" : "#0e1626"}"/>${t(134, 156 + index * 56, label, 15, "#e8f4ff", 'text-anchor="middle"')}`).join("")}
    <rect x="264" y="70" width="720" height="700" rx="16" fill="#10192b"/>
    <path d="M520 180 L470 230 L500 250 L500 520 L700 520 L700 250 L730 230 L680 180 Q620 210 520 180 Z" fill="#38bdf8" opacity="0.85"/>
    ${t(624, 640, "Depan  ·  1 unit = 1 cm", 14, "#93c5fd", 'text-anchor="middle"')}
    <rect x="1004" y="70" width="252" height="700" rx="16" fill="#152033"/>
    ${t(1024, 108, "Layer", 13, "#7dd3fc")}
    ${["Badan", "Teks", "Logo"].map((label, index) => `<rect x="1020" y="${128 + index * 52}" width="220" height="40" rx="8" fill="#0e1626"/>${t(1036, 154 + index * 52, label, 14, "#e8f4ff")}`).join("")}`,
    "#0e1626",
  ),
);

save(
  "studio-kaos-1.svg",
  browser(
    "studio.neodeeps.com/produk",
    `<rect y="46" width="1280" height="754" fill="#0e1626"/>
    ${t(48, 110, "Panel produk", 32, "#f0f9ff", 'font-weight="700"')}
    ${["Kaos oblong", "Polo", "Hoodie", "Oversize"].map((label, index) => {
      const x = 48 + (index % 4) * 300;
      return `<rect x="${x}" y="150" width="280" height="250" rx="18" fill="#152033"/>
        <path d="M${x + 110} 190 L${x + 80} 230 L${x + 100} 246 L${x + 100} 360 L${x + 180} 360 L${x + 180} 246 L${x + 200} 230 L${x + 170} 190 Q${x + 140} 210 ${x + 110} 190 Z" fill="${index % 2 ? "#7dd3fc" : "#38bdf8"}"/>
        ${t(x + 140, 378, label, 16, "#e8f4ff", 'text-anchor="middle"')}`;
    }).join("")}
    <rect x="48" y="430" width="1184" height="280" rx="18" fill="#152033"/>
    ${t(76, 478, "Ukuran  ·  lebar dada 52 cm  ·  panjang 70 cm", 18, "#e8f4ff")}
    ${["S", "M", "L", "XL"].map((size, index) => `<rect x="${76 + index * 90}" y="510" width="72" height="72" rx="12" fill="${index === 1 ? "#38bdf8" : "#0e1626"}"/>${t(112 + index * 90, 554, size, 20, index === 1 ? "#0b1220" : "#e8f4ff", 'text-anchor="middle" font-weight="700"')}`).join("")}`,
    "#0e1626",
  ),
);

save(
  "studio-kaos-2.svg",
  browser(
    "studio.neodeeps.com/layer",
    `<rect y="46" width="1280" height="754" fill="#0e1626"/>
    ${t(48, 110, "Layer & properti", 32, "#f0f9ff", 'font-weight="700"')}
    ${[
      ["Posisi X", "12,4 cm"],
      ["Posisi Y", "8,0 cm"],
      ["Lebar", "18 cm"],
      ["Warna", "#38bdf8"],
      ["Font", "Syne Bold"],
      ["Efek", "Bayangan halus"],
    ].map(([label, value], index) => {
      const col = index % 2;
      const row = Math.floor(index / 2);
      const x = 48 + col * 600;
      const y = 150 + row * 160;
      return `<rect x="${x}" y="${y}" width="560" height="140" rx="18" fill="#152033"/>
        ${t(x + 28, y + 52, label, 14, "#7dd3fc")}
        ${t(x + 28, y + 98, value, 28, "#f0f9ff", 'font-weight="700"')}`;
    }).join("")}`,
    "#0e1626",
  ),
);

save(
  "studio-kaos-3.svg",
  browser(
    "studio.neodeeps.com/3d",
    `<rect y="46" width="1280" height="754" fill="#0e1626"/>
    ${t(48, 110, "Generate 3D", 32, "#f0f9ff", 'font-weight="700"')}
    <rect x="48" y="140" width="760" height="580" rx="24" fill="#10192b"/>
    <ellipse cx="428" cy="250" rx="70" ry="78" fill="#1e3a5f"/>
    <path d="M300 340 Q428 300 556 340 L520 640 L336 640 Z" fill="#16324f"/>
    <path d="M336 360 L300 430 L360 450 L390 360 Z" fill="#38bdf8"/>
    <path d="M520 360 L556 430 L496 450 L466 360 Z" fill="#38bdf8"/>
    <path d="M360 360 L496 360 L480 620 L376 620 Z" fill="#7dd3fc"/>
    ${t(428, 690, "Pratinjau tubuh baju", 16, "#93c5fd", 'text-anchor="middle"')}
    <rect x="840" y="140" width="392" height="580" rx="24" fill="#152033"/>
    ${t(872, 196, "Siap digenerate", 20, "#f0f9ff", 'font-weight="700"')}
    ${t(872, 236, "Depan, belakang, lengan.", 15, "#93c5fd")}
    <rect x="872" y="600" width="328" height="56" rx="28" fill="#38bdf8"/>
    ${t(1036, 634, "Generate", 16, "#0b1220", 'text-anchor="middle" font-weight="700"')}`,
    "#0e1626",
  ),
);

function pulseList(items) {
  return phone(
    `${t(88, 150, "Pulse", 28, "#ecfeff", 'font-weight="700"')}
    ${t(88, 184, "Perawatan hari ini", 15, "#99f6e4")}
    ${items
      .map((item, index) => {
        const y = 220 + index * 150;
        return `<rect x="80" y="${y}" width="620" height="132" rx="22" fill="#14332e"/>
          <circle cx="132" cy="${y + 66}" r="28" fill="${item.urgent ? "#fb7185" : "#5eead4"}"/>
          ${t(190, y + 52, item.name, 22, "#ecfeff", 'font-weight="700"')}
          ${t(190, y + 86, item.note, 15, "#99f6e4")}`;
      })
      .join("")}`,
    "#06211c",
    "#0c2420",
  );
}

save(
  "pulse-0.svg",
  pulseList([
    { name: "Ayu Pratiwi", note: "Prioritas · ruang 2", urgent: true },
    { name: "Bima Saputra", note: "Observasi · 14.20", urgent: false },
    { name: "Citra Lestari", note: "Kontrol rutin", urgent: false },
    { name: "Dimas Putra", note: "Menunggu hasil", urgent: false },
    { name: "Eka Nirmala", note: "Jadwal sore", urgent: false },
  ]),
);

save(
  "pulse-1.svg",
  phone(
    `${t(88, 140, "Detail pasien", 14, "#5eead4")}
    ${t(88, 186, "Ayu Pratiwi", 34, "#ecfeff", 'font-weight="700"')}
    ${t(88, 222, "Ruang 2  ·  prioritas tinggi", 16, "#99f6e4")}
    ${["Tekanan", "Nadi", "Catatan"].map((label, index) => {
      const y = 270 + index * 150;
      return `<rect x="80" y="${y}" width="620" height="130" rx="22" fill="#14332e"/>
        ${t(108, y + 48, label, 14, "#5eead4")}
        ${t(108, y + 92, ["128/82", "88 bpm", "Cek ulang 30 menit"][index], 24, "#ecfeff", 'font-weight="700"')}`;
    }).join("")}`,
    "#06211c",
    "#0c2420",
  ),
);

save(
  "pulse-2.svg",
  phone(
    `${t(88, 150, "Aksi cepat", 32, "#ecfeff", 'font-weight="700"')}
    ${t(88, 190, "Tanpa masuk menu dalam.", 16, "#99f6e4")}
    ${["Catat", "Eskalasi", "Selesai", "Jadwal"].map((label, index) => {
      const col = index % 2;
      const row = Math.floor(index / 2);
      const x = 80 + col * 320;
      const y = 240 + row * 280;
      return `<rect x="${x}" y="${y}" width="300" height="250" rx="28" fill="${index === 1 ? "#5eead4" : "#14332e"}"/>
        ${t(x + 150, y + 140, label, 26, index === 1 ? "#06211c" : "#ecfeff", 'text-anchor="middle" font-weight="700"')}`;
    }).join("")}`,
    "#06211c",
    "#0c2420",
  ),
);

function chat(messages, title) {
  return browser(
    "maninjau.neodeeps.com",
    `<rect y="46" width="1280" height="754" fill="#0f2418"/>
    <rect x="280" y="70" width="720" height="700" rx="24" fill="#143022"/>
    ${t(320, 120, title, 22, "#ecfdf5", 'font-weight="700"')}
    ${t(320, 150, "Danau Maninjau", 14, "#86efac")}
    ${messages
      .map((message, index) => {
        const mine = message.side === "user";
        const x = mine ? 560 : 310;
        const y = 190 + index * 110;
        return `<rect x="${x}" y="${y}" width="400" height="86" rx="20" fill="${mine ? "#86efac" : "#0f2418"}"/>
          ${t(x + 24, y + 50, message.text, 16, mine ? "#052e16" : "#ecfdf5")}`;
      })
      .join("")}`,
    "#0f2418",
  );
}

save(
  "maninjau-0.svg",
  chat(
    [
      { side: "bot", text: "Mau tanya apa soal danau?" },
      { side: "bot", text: "Coba: musim ikan, atau cuaca." },
    ],
    "Pembuka",
  ),
);
save(
  "maninjau-1.svg",
  chat(
    [
      { side: "user", text: "Ikan apa yang lagi banyak?" },
      { side: "bot", text: "Minggu ini nila dan bada." },
      { side: "user", text: "Di sisi mana biasanya?" },
    ],
    "Percakapan",
  ),
);
save(
  "maninjau-2.svg",
  chat(
    [
      { side: "user", text: "Bagaimana cuacanya?" },
      { side: "bot", text: "Pagi atau sore yang kamu maksud?" },
    ],
    "Klarifikasi",
  ),
);

save(
  "rmb-gallery-0.svg",
  browser(
    "gallery.neodeeps.com",
    `<rect y="46" width="1280" height="754" fill="#1a0d12"/>
    ${t(48, 110, "Galeri mockup", 32, "#fff7ed", 'font-weight="700"')}
    ${[0, 1, 2, 3, 4, 5].map((index) => {
      const x = 48 + (index % 3) * 400;
      const y = 150 + Math.floor(index / 3) * 280;
      return `<rect x="${x}" y="${y}" width="376" height="250" rx="18" fill="#3b1a14"/>
        <rect x="${x + 24}" y="${y + 24}" width="328" height="150" rx="12" fill="${index % 2 ? "#fb923c" : "#fdba74"}"/>
        ${t(x + 24, y + 214, "Unit 0" + (index + 1), 16, "#fff7ed")}`;
    }).join("")}`,
    "#1a0d12",
  ),
);

save(
  "rmb-gallery-1.svg",
  browser(
    "gallery.neodeeps.com/puzzle",
    `<rect y="46" width="1280" height="754" fill="#1a0d12"/>
    ${t(48, 110, "Puzzle banner", 32, "#fff7ed", 'font-weight="700"')}
    ${[0, 1, 2, 3].map((index) => {
      const x = 80 + (index % 2) * 560;
      const y = 180 + Math.floor(index / 2) * 260;
      return `<rect x="${x}" y="${y}" width="520" height="220" rx="20" fill="${["#fb923c", "#fdba74", "#9a3412", "#fed7aa"][index]}"/>
        ${t(x + 260, y + 124, "Potongan " + (index + 1), 28, index === 2 ? "#fff7ed" : "#431407", 'text-anchor="middle" font-weight="700"')}`;
    }).join("")}`,
    "#1a0d12",
  ),
);

save(
  "rmb-gallery-2.svg",
  browser(
    "gallery.neodeeps.com/playback",
    `<rect y="46" width="1280" height="754" fill="#1a0d12"/>
    <rect x="80" y="90" width="1120" height="520" rx="24" fill="#3b1a14"/>
    <rect x="120" y="130" width="1040" height="360" rx="16" fill="#fb923c"/>
    ${t(640, 320, "00:04  /  00:12", 28, "#431407", 'text-anchor="middle" font-weight="700"')}
    <rect x="120" y="640" width="1040" height="10" rx="5" fill="#3b1a14"/>
    <rect x="120" y="640" width="360" height="10" rx="5" fill="#fdba74"/>
    <circle cx="480" cy="645" r="12" fill="#fff7ed"/>
    ${t(120, 700, "Playback  ·  nilai timing, bukan hanya hasil akhir", 16, "#fed7aa")}`,
    "#1a0d12",
  ),
);

function company(path, blocks) {
  return browser(
    `gdk.example${path}`,
    `<rect y="46" width="1280" height="64" fill="#1a1520"/>
    ${t(48, 86, "GDK", 20, "#ddd6fe", 'font-weight="700" letter-spacing="2"')}
    ${t(1040, 84, "Profil", 14, "#c4b5fd")}
    ${t(1120, 84, "Kontak", 14, "#c4b5fd")}
    ${blocks}`,
    "#f5f3ff",
  );
}

save(
  "gdk-website-0.svg",
  company(
    "",
    `<rect x="48" y="150" width="1184" height="360" rx="28" fill="#2e1064"/>
    ${t(88, 280, "Kerja yang jelas,", 44, "#f5f3ff", 'font-weight="700"')}
    ${t(88, 336, "arah yang mudah diikuti.", 44, "#ddd6fe", 'font-weight="700"')}
    <rect x="88" y="380" width="180" height="48" rx="24" fill="#ddd6fe"/>
    ${t(178, 410, "Lihat profil", 15, "#2e1064", 'text-anchor="middle" font-weight="700"')}
    ${["Tentang", "Layanan", "Kontak"].map((label, index) => `<rect x="${48 + index * 400}" y="540" width="376" height="180" rx="20" fill="#fff"/>${t(72 + index * 400, 630, label, 24, "#1a1520", 'font-weight="700"')}`).join("")}`,
  ),
);

save(
  "gdk-website-1.svg",
  company(
    "/profil",
    `${t(48, 180, "Siapa kami", 40, "#1a1520", 'font-weight="700"')}
    ${t(48, 230, "Organisasi, fokus, dan cara kerja dalam satu halaman.", 18, "#6b6280")}
    <rect x="48" y="280" width="520" height="400" rx="24" fill="#ddd6fe"/>
    <circle cx="308" cy="430" r="70" fill="#2e1064"/>
    ${t(308, 438, "GDK", 22, "#f5f3ff", 'text-anchor="middle" font-weight="700"')}
    <rect x="600" y="280" width="632" height="400" rx="24" fill="#fff"/>
    ${t(632, 360, "Fokus", 14, "#7c3aed")}
    ${t(632, 410, "Program yang bisa", 32, "#1a1520", 'font-weight="700"')}
    ${t(632, 454, "dijelaskan singkat.", 32, "#1a1520", 'font-weight="700"')}`,
  ),
);

save(
  "gdk-website-2.svg",
  company(
    "/kontak",
    `${t(48, 180, "Kontak", 40, "#1a1520", 'font-weight="700"')}
    ${["Nama", "Email", "Pesan"].map((label, index) => `<rect x="48" y="${230 + index * 110}" width="700" height="90" rx="16" fill="#fff"/>${t(72, 282 + index * 110, label, 16, "#6b6280")}`).join("")}
    <rect x="790" y="230" width="442" height="420" rx="24" fill="#2e1064"/>
    ${t(822, 300, "Mudah ditemukan,", 26, "#f5f3ff", 'font-weight="700"')}
    ${t(822, 340, "bukan di footer saja.", 26, "#ddd6fe", 'font-weight="700"')}
    ${t(822, 420, "halo@gdk.example", 16, "#c4b5fd")}`,
  ),
);

function gpt(title, lines) {
  return browser(
    "gpt.codinganeh.com",
    `<rect y="46" width="1280" height="754" fill="#1c1408"/>
    <rect x="240" y="80" width="800" height="680" rx="28" fill="#2a1d0c"/>
    ${t(280, 140, "CodingAneh GPT", 14, "#facc15")}
    ${t(280, 186, title, 32, "#fefce8", 'font-weight="700"')}
    ${lines
      .map((line, index) => {
        const y = 240 + index * 100;
        return `<rect x="280" y="${y}" width="720" height="80" rx="16" fill="${index % 2 ? "#1c1408" : "#3f2e12"}"/>
          ${t(304, y + 48, line, 16, "#fefce8")}`;
      })
      .join("")}`,
    "#1c1408",
  );
}

save("codinganeh-gpt-0.svg", gpt("Asisten untuk apa", ["Menjawab dalam batas merek.", "Tidak mengarang di luar konteks.", "Mulai dari contoh, bukan halaman kosong."]));
save("codinganeh-gpt-1.svg", gpt("Ruang chat", ["Bagaimana nada mereknya?", "Tenang, jelas, dan singkat.", "Bisa lebih formal?"]));
save("codinganeh-gpt-2.svg", gpt("Saran pertanyaan", ["Apa yang bisa kamu bantu?", "Ringkas profil produk ini.", "Buat sapaan pertama."]));

save(
  "mikrotik-panel-0.svg",
  browser(
    "hotspot.local/login",
    `<rect y="46" width="1280" height="754" fill="#0b1220"/>
    <rect x="390" y="140" width="500" height="520" rx="24" fill="#132033"/>
    ${t(640, 210, "Jaringan Tamu", 14, "#93c5fd", 'text-anchor="middle"')}
    ${t(640, 258, "Masuk", 36, "#eff6ff", 'text-anchor="middle" font-weight="700"')}
    <rect x="440" y="310" width="400" height="56" rx="12" fill="#0b1220"/>
    ${t(460, 344, "Username", 16, "#93c5fd")}
    <rect x="440" y="386" width="400" height="56" rx="12" fill="#0b1220"/>
    ${t(460, 420, "Kata sandi", 16, "#93c5fd")}
    <rect x="440" y="480" width="400" height="56" rx="28" fill="#60a5fa"/>
    ${t(640, 514, "Masuk", 16, "#0b1220", 'text-anchor="middle" font-weight="700"')}
    ${t(640, 600, "Wi-Fi lobby  ·  2 jam", 14, "#93c5fd", 'text-anchor="middle"')}`,
    "#0b1220",
  ),
);

save(
  "mikrotik-panel-1.svg",
  browser(
    "hotspot.local/status",
    `<rect y="46" width="1280" height="754" fill="#0b1220"/>
    <rect x="340" y="180" width="600" height="420" rx="28" fill="#132033"/>
    <circle cx="640" cy="330" r="54" fill="#34d399"/>
    ${t(640, 338, "OK", 22, "#052e16", 'text-anchor="middle" font-weight="700"')}
    ${t(640, 430, "Kamu sudah terhubung", 28, "#eff6ff", 'text-anchor="middle" font-weight="700"')}
    ${t(640, 470, "Sesi aktif sampai 16.40", 16, "#93c5fd", 'text-anchor="middle"')}`,
    "#0b1220",
  ),
);

save(
  "mikrotik-panel-2.svg",
  browser(
    "hotspot.local",
    `<rect y="46" width="1280" height="754" fill="#0b1220"/>
    <rect x="0" y="46" width="420" height="754" fill="#132033"/>
    ${t(48, 140, "NEODEEPS", 14, "#60a5fa", 'letter-spacing="3"')}
    ${t(48, 210, "Internet", 40, "#eff6ff", 'font-weight="700"')}
    ${t(48, 260, "tamu.", 40, "#93c5fd", 'font-weight="700"')}
    <rect x="500" y="160" width="700" height="480" rx="24" fill="#132033"/>
    ${t(540, 230, "Nama jaringan", 14, "#93c5fd")}
    ${t(540, 280, "Lobby-Tamu", 32, "#eff6ff", 'font-weight="700"')}`,
    "#0b1220",
  ),
);

save(
  "neodeeps-platform-0.svg",
  browser(
    "neodeeps.com/komunitas",
    `<rect y="46" width="1280" height="754" fill="#10140a"/>
    ${t(48, 110, "Jelajah komunitas", 32, "#f7fee7", 'font-weight="700"')}
    ${["Jakarta · desain", "Bandung · android", "Surabaya · web", "Yogya · motion", "Medan · produk", "Bali · komunitas"].map((label, index) => {
      const x = 48 + (index % 3) * 400;
      const y = 160 + Math.floor(index / 3) * 260;
      return `<rect x="${x}" y="${y}" width="376" height="230" rx="20" fill="#1a240f"/>
        <circle cx="${x + 48}" cy="${y + 56}" r="16" fill="#d4ff3f"/>
        ${t(x + 28, y + 140, label.split(" · ")[0], 24, "#f7fee7", 'font-weight="700"')}
        ${t(x + 28, y + 176, label.split(" · ")[1], 16, "#d4ff3f")}`;
    }).join("")}`,
    "#10140a",
  ),
);

save(
  "neodeeps-platform-1.svg",
  browser(
    "neodeeps.com/event",
    `<rect y="46" width="1280" height="754" fill="#10140a"/>
    <rect x="48" y="80" width="760" height="640" rx="24" fill="#1a240f"/>
    ${t(80, 150, "Sabtu, 18 Okt", 14, "#d4ff3f")}
    ${t(80, 210, "Review UI", 44, "#f7fee7", 'font-weight="700"')}
    ${t(80, 262, "bareng komunitas.", 44, "#d4ff3f", 'font-weight="700"')}
    ${t(80, 340, "Jakarta  ·  19.00  ·  24 kursi", 18, "#ecfccb")}
    <rect x="80" y="620" width="220" height="52" rx="26" fill="#d4ff3f"/>
    ${t(190, 652, "Bergabung", 16, "#10140a", 'text-anchor="middle" font-weight="700"')}
    <rect x="840" y="80" width="392" height="640" rx="24" fill="#1a240f"/>
    ${t(872, 150, "Untuk siapa", 14, "#d4ff3f")}
    ${t(872, 200, "Yang sedang", 28, "#f7fee7", 'font-weight="700"')}
    ${t(872, 240, "merapikan UI.", 28, "#f7fee7", 'font-weight="700"')}`,
    "#10140a",
  ),
);

save(
  "neodeeps-platform-2.svg",
  browser(
    "neodeeps.com/aplikasi",
    `<rect y="46" width="1280" height="754" fill="#10140a"/>
    ${t(80, 180, "Aplikasi sedang", 48, "#f7fee7", 'font-weight="700"')}
    ${t(80, 244, "dibangun.", 48, "#d4ff3f", 'font-weight="700"')}
    ${t(80, 310, "Belum tayang. Ini statusnya, bukan janji palsu.", 18, "#ecfccb")}
    <rect x="760" y="140" width="360" height="560" rx="36" fill="#1a240f"/>
    <rect x="788" y="168" width="304" height="500" rx="24" fill="#10140a"/>
    ${t(940, 400, "Segera", 22, "#d4ff3f", 'text-anchor="middle" font-weight="700"')}`,
    "#10140a",
  ),
);

console.log("dummy shots written");
