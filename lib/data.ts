export const site = {
  name: "Aditia Nur Lukman",
  brand: "NEODEEPS",
  role: "Creative Developer & UI Designer",
  tagline: "Make Better than Visual",
  location: "Jakarta, Indonesia",
  timezone: "Asia/Jakarta",
  email: "hurleyquin9111@gmail.com",
  availability: "Tersedia untuk proyek terpilih",
  bio: "Saya merancang dan membangun pengalaman digital yang terasa hidup — dari konsep, UI, motion, hingga kode. Visual yang kuat harus terasa, bukan hanya terlihat.",
  about: [
    "NEODEEPS adalah ruang kerja Aditia Nur Lukman: creative developer dan UI designer berbasis di Jakarta. Saya menggabungkan desain, interaksi, dan engineering dalam satu alur — supaya setiap layar punya ritme, dan setiap transisi punya alasan.",
    "Dari dashboard produk, aplikasi mobile, hingga eksperimen rich media, saya membangun end-to-end. Bukan hanya tampilan yang rapi, tapi sistem yang jujur, cepat, dan enak dipakai.",
  ],
  socials: [
    { label: "GitHub", href: "https://github.com/hurleyquin911" },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/aditia-nur-lukman-49a16327a",
    },
    { label: "Email", href: "mailto:hurleyquin9111@gmail.com" },
  ],
} as const;

export const nav = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
] as const;

export const skills = [
  "Next.js",
  "React",
  "TypeScript",
  "React Native",
  "Expo",
  "Node.js",
  "GSAP",
  "Tailwind CSS",
  "UI Design",
  "Figma",
  "REST API",
  "Motion",
] as const;

export const stats = [
  { value: "04+", label: "Tahun bereksplorasi" },
  { value: "30+", label: "Proyek & eksperimen" },
  { value: "02", label: "Studio & klien" },
] as const;

export const projects = [
  {
    id: "01",
    title: "Digineos",
    year: "2025",
    category: "Product Dashboard",
    description:
      "Web app dashboard untuk Digineos — sisi klien, sisi admin, dan API Node.js. Antarmuka data yang rapat, jelas, dan siap dipakai tim operasional.",
    tags: ["Next.js", "TypeScript", "Node.js"],
    href: "https://github.com/hurleyquin911/digineos-client-side-frontend",
    palette: {
      from: "#0b1f33",
      via: "#164e78",
      to: "#5eead4",
      accent: "#7dd3fc",
    },
  },
  {
    id: "02",
    title: "Pulse",
    year: "2025",
    category: "Mobile Product",
    description:
      "Aplikasi rumah sakit yang dibangun dengan React Native dan Expo. Alur perawatan, data pasien, dan interaksi yang tetap tenang di layar kecil.",
    tags: ["React Native", "Expo", "UI"],
    href: "https://github.com/hurleyquin911",
    palette: {
      from: "#10211c",
      via: "#1d4e4a",
      to: "#99f6e4",
      accent: "#5eead4",
    },
  },
  {
    id: "03",
    title: "Maninjau",
    year: "2025",
    category: "AI Chatbot",
    description:
      "Chatbot informasi perikanan Danau Maninjau. Prototipe AI lokal yang membantu akses informasi lebih cepat untuk sektor yang jarang tersentuh produk digital.",
    tags: ["AI", "Chatbot", "Product"],
    href: "https://github.com/hurleyquin911",
    palette: {
      from: "#0f2418",
      via: "#14532d",
      to: "#bbf7d0",
      accent: "#86efac",
    },
  },
  {
    id: "04",
    title: "RMB Gallery",
    year: "2025",
    category: "Rich Media",
    description:
      "Eksperimen rich media banner dan puzzle interaktif. Motion, timing, dan craft visual untuk iklan yang tidak diam di tempat.",
    tags: ["HTML", "Motion", "Banner"],
    href: "https://github.com/hurleyquin911/RMB-MOCKUP-GALLERY",
    palette: {
      from: "#2a1020",
      via: "#9a3412",
      to: "#fdba74",
      accent: "#fb923c",
    },
  },
] as const;

export const services = [
  {
    id: "01",
    title: "Creative Development",
    body: "Front-end yang rapat dengan desain. Next.js, React, dan TypeScript untuk situs serta produk yang cepat, aksesibel, dan mudah dirawat.",
  },
  {
    id: "02",
    title: "Interaction & Motion",
    body: "Animasi yang punya fungsi: transisi halaman, micro-interaction, dan storytelling on-scroll. GSAP sebagai alat, rasa sebagai tujuan.",
  },
  {
    id: "03",
    title: "Product & UI Design",
    body: "Dari wireframe sampai sistem visual. Dashboard, aplikasi mobile, dan pengalaman web yang jernih — dibuat untuk dipakai, bukan hanya dilihat.",
  },
] as const;

export const experience = [
  {
    role: "Creative Developer",
    place: "NEODEEPS",
    period: "2024 — Sekarang",
    detail: "Membangun produk digital, eksperimen interaksi, dan identitas visual mandiri.",
  },
  {
    role: "UI Designer",
    place: "CodingAneh",
    period: "Studio",
    detail: "Merancang antarmuka dan sistem visual untuk produk dan website.",
  },
  {
    role: "Website Developer",
    place: "jouClouth",
    period: "2019",
    detail: "Membangun website untuk klien yang butuh kehadiran digital yang rapi dan fungsional.",
  },
] as const;
