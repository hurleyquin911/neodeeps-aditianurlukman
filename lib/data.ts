export const site = {
  name: "Aditia Nur Lukman",
  brand: "NEODEEPS",
  role: "Fullstack Developer & Creative UI Designer",
  tagline: "Make better than Visual",
  location: "Jakarta, Indonesia",
  timezone: "Asia/Jakarta",
  email: "hurleyquin890@gmail.com",
  bio: "Membangun produk digital yang intuitif dan scalable dari desain UI/UX hingga arsitektur sistem backend.",
  about: [
    "NEODEEPS adalah ruang kerja Aditia Nur Lukman: creative developer dan UI designer berbasis di Jakarta. Saya menggabungkan desain, interaksi, dan engineering dalam satu alur - supaya setiap layar punya ritme, dan setiap transisi punya alasan.",
    "Dari dashboard produk, aplikasi mobile, hingga eksperimen rich media, saya membangun end-to-end. Bukan hanya tampilan yang rapi, tapi sistem yang jujur, cepat, dan enak dipakai.",
    "Saya lebih nyaman di persimpangan: wireframe yang langsung jadi komponen, motion yang menjelaskan hierarki, dan kode yang masih bisa dibaca enam bulan kemudian. Yang saya hindari adalah dekorasi yang tidak punya tugas.",
    "Proyek yang cocok biasanya punya masalah yang jelas - orang bingung, alur terputus, atau produk terasa dingin - dan butuh seseorang yang mau memegang desain sampai ke implementasi, bukan menyerahkannya di tengah jalan.",
  ],
  socials: [
    { label: "GitHub", href: "https://github.com/hurleyquin911" },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/aditia-lukman-49a16327a",
    },
    {
      label: "Upwork",
      href: "https://www.upwork.com/freelancers/~01b532aa21fbc0a3eb?mp_source=share",
    },
    { label: "YouTube", href: "https://www.youtube.com/@WakeUpDev_091" },
    { label: "Email", href: "mailto:hurleyquin890@gmail.com" },
  ],
} as const;

export const nav = [
  { label: "Beranda", href: "/" },
  { label: "Portofolio", href: "/portofolio" },
  { label: "Products", href: "/products" },
  { label: "Tentang", href: "/tentang" },
  { label: "Layanan", href: "/layanan" },
  { label: "Kontak", href: "/kontak" },
] as const;

export const skills = [
  "Next.js",
  "React",
  "TypeScript",
  "React Native",
  "Expo",
  "Java",
  "Electron",
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

export const playStoreApps = [
  {
    id: "finote",
    logo: "/img/finote.png",
    name: "FiNote",
    packageId: "com.guru1.catatan_keuangan",
    blurb:
      "Catatan keuangan pribadi: pemasukan, anggaran, dan grafik yang mudah dibaca.",
  },
  {
    id: "muslim",
    logo: "/img/muslim%2B.png",
    name: "Muslim+",
    packageId: "com.guru1.pengingatsholat",
    blurb:
      "Utilitas harian: jadwal sholat, arah kiblat, dan pengingat yang bisa diatur sendiri.",
  },
  {
    id: "arisan",
    logo: "/img/arisankuy.png",
    name: "Arisan Kuy",
    packageId: "com.guru1.arisankuy",
    blurb:
      "Kelola arisan digital: putaran, iuran, dan jejak pembayaran yang transparan.",
  },
  {
    id: "libur",
    logo: "/img/liburcheck.png",
    name: "Libur Check",
    packageId: "com.travelchecklist.app",
    blurb:
      "Checklist packing dan persiapan perjalanan, dikelompokkan per kategori.",
  },
  {
    id: "pay",
    logo: "/img/payontime.png",
    name: "Pay On Time",
    packageId: "com.guru1.catatutang",
    blurb:
      "Catat utang-piutang untuk pribadi atau usaha kecil, plus log transaksi dan ringkasan.",
  },
] as const;

export const serviceCycle = [
  {
    id: "01",
    title: "Pahami",
    body: "Tujuan, pengguna, dan batasan ditulis dulu. Tanpa ini, kode hanya menebak.",
    detail:
      "Sebelum desain atau repo dibuka, saya merapikan masalahnya. Siapa yang memakai, di situasi apa, apa yang sudah ada, dan apa yang memang tidak dikerjakan. Kalau ini kabur, fullstack dan Android hanya menebak.",
    points: [
      "Tujuan produk ditulis dalam bahasa orang yang memakainya",
      "Batasan waktu, platform, dan data disepakati di awal",
      "Aset lama (desain, API, akun toko) diinventaris, bukan diabaikan",
      "Yang di luar lingkup dicatat supaya tidak merambat diam-diam",
    ],
    output: "Brief singkat yang bisa dipakai merancang tanpa bolak-balik menebak.",
  },
  {
    id: "02",
    title: "Rancang",
    body: "Alur, arsitektur, dan UI disusun supaya frontend, backend, dan mobile saling nyambung.",
    detail:
      "Di sini alur, kontrak data, dan hierarki layar disusun bersamaan. Frontend tidak menunggu spek yang belum ada, backend tidak merancang API yang tidak terpakai, dan Android tidak dapat alur yang hanya nyaman di desktop.",
    points: [
      "Peta alur: masuk, keputusan, error, dan titik selesai",
      "Arsitektur: pecahan UI, API, auth, dan penyimpanan",
      "Sistem visual ringan yang bisa diwariskan ke web dan app",
      "Prototype atau wireframe yang bisa dikritik sebelum dikode",
    ],
    output: "Rencana bangun yang sudah nyambung antarlapis, bukan tiga dokumen terpisah.",
  },
  {
    id: "03",
    title: "Bangun",
    body: "Implementasi end-to-end: antarmuka, API, data, dan uji di perangkat nyata.",
    detail:
      "Implementasi dipegang ujung ke ujung. Yang dijanjikan di rancangan dibangun, diuji di browser dan perangkat Android, lalu yang belum selesai tidak disamarkan seolah sudah produksi.",
    points: [
      "Fondasi dulu: routing, environment, kontrak API",
      "UI dan data diisi mengikuti alur, bukan halaman acak",
      "Uji alur utama, kasus error, dan perangkat sungguhan",
      "Catatan keputusan ikut di repo, bukan hanya di kepala",
    ],
    output: "Versi yang bisa dipakai dan dikritik, siap masuk persiapan rilis.",
  },
  {
    id: "04",
    title: "Rilis",
    body: "Deploy, listing toko jika perlu, lalu serah terima yang bisa dilanjutkan orang lain.",
    detail:
      "Rilis adalah serah terima, bukan sekadar tombol deploy. Web naik ke produksi, aplikasi Android masuk Play Store jika itu bagian kerja, dan akses serta catatan cukup agar orang lain bisa melanjutkan.",
    points: [
      "Deploy web dan cek alur di lingkungan produksi",
      "Listing, aset, dan persyaratan toko jika ada aplikasi",
      "Akses repo, environment, dan akun yang relevan diserahkan",
      "Catatan rilis: apa yang sudah, apa yang sengaja ditunda",
    ],
    output: "Produk yang sudah di tangan pengguna, plus bekal untuk merawatnya.",
  },
  {
    id: "05",
    title: "Renewal",
    body: "Perawatan, perbaikan, dan pembaruan sistem. Produk tidak berhenti di hari peluncuran.",
    detail:
      "Setelah dipakai orang lain, yang muncul adalah bug sungguhan, permintaan baru, dan utang teknis. Renewal memutar kembali ke pemahaman: apa yang berubah, apa yang harus tetap, lalu merancang dan membangun lagi dalam ritme yang disepakati.",
    points: [
      "Pantau yang rusak, lambat, atau berisiko",
      "Rilis kecil yang rutin lebih aman daripada overhaul mendadak",
      "Pembaruan dependensi, kompatibilitas, dan keamanan",
      "Fitur baru hanya jika arsitektur masih menampung",
    ],
    output: "Sistem yang tetap hidup: diperbaiki, diperbarui, lalu dipahami ulang.",
  },
] as const;

export const services = [
  {
    id: "01",
    title: "Fullstack Development",
    body: "Produk web dari UI sampai arsitektur backend. Next.js, React, TypeScript, Node.js, dan REST API dikerjakan dalam satu alur - bukan frontend yang menunggu spek, atau backend yang tidak tahu cara dipakai.",
    deliverables: [
      "Situs atau produk web siap produksi",
      "API, autentikasi, dan model data yang jelas kontraknya",
      "Komponen dan struktur kode yang bisa dirawat",
      "Deploy, catatan keputusan, dan akses yang diserahkan utuh",
    ],
    process: [
      "Klarifikasi tujuan, pengguna, dan batasan teknis",
      "Audit aset yang sudah ada: desain, repo, API, atau data",
      "Susun arsitektur: alur, data, auth, dan pecahan frontend/backend",
      "Fondasi proyek: routing, desain sistem ringan, environment",
      "Bangun API dan kontrak data sebelum layar diisi penuh",
      "Implementasi UI, state, integrasi, dan umpan balik yang perlu",
      "Uji alur utama, performa, dan aksesibilitas",
      "Rilis ke lingkungan produksi",
      "Serah terima: repo, dokumentasi singkat, dan akses",
      "Masuk siklus perawatan: pantau, perbaiki, perbarui",
    ],
  },
  {
    id: "02",
    title: "Android App Development",
    body: "Aplikasi Android yang dibuat untuk dipakai sehari-hari, bukan hanya demo. React Native dan Expo, dari alur layar sampai rilis Play Store, plus pembaruan versi setelah aplikasi sudah di tangan pengguna.",
    deliverables: [
      "Aplikasi Android yang bisa dipasang dan diuji di perangkat",
      "Alur inti: navigasi, data, dan aksi yang jelas di layar kecil",
      "Persiapan listing dan rilis Play Store",
      "Paket pembaruan: perbaikan, versi baru, dan catatan rilis",
    ],
    process: [
      "Petakan kebutuhan dan siapa yang memakai di lapangan",
      "Susun alur layar dan prioritas ibu jari",
      "Rancang UI yang tenang di perangkat Android",
      "Bangun fondasi app: navigasi, state, dan penyimpanan",
      "Integrasi API atau data lokal",
      "Uji di perangkat nyata, bukan hanya emulator",
      "Siapkan ikon, listing, dan persyaratan Play Store",
      "Rilis versi awal dan pantau umpan balik",
      "Perbaikan cepat jika ada yang patah di produksi",
      "Pembaruan berkelanjutan: fitur, kompatibilitas, dan rilis berikutnya",
    ],
  },
  {
    id: "03",
    title: "Product & UI Design",
    body: "Dari masalah pengguna sampai sistem visual yang siap diimplementasi. Web, dashboard, dan aplikasi Android dirancang supaya hierarkinya jernih dan tidak retak saat masuk ke kode.",
    deliverables: [
      "Struktur informasi, alur, dan hierarki layar",
      "UI kit atau fondasi visual yang bisa diwariskan",
      "Prototype yang bisa diuji, bukan hanya slide",
      "Dampingan saat desain masuk development dan setelah rilis",
    ],
    process: [
      "Tulis masalah dalam bahasa pengguna",
      "Pahami konteks: siapa, di situasi apa, di perangkat apa",
      "Susun alur sebelum mempercantik",
      "Wireframe yang bisa dikritik lebih awal",
      "Sistem visual dan komponen yang konsisten",
      "Prototype interaktif untuk diuji",
      "Serah ke development tanpa putus konteks",
      "Tinjau implementasi dan rapikan yang menyimpang",
      "Iterasi setelah produk dipakai orang sungguhan",
    ],
  },
  {
    id: "04",
    title: "Renewal & Maintenance",
    body: "Sistem yang sudah jalan tetap perlu dijaga. Bug, dependensi, keamanan, fitur baru, dan pembaruan arsitektur dikerjakan dalam ritme yang disepakati - supaya produk tidak mengering setelah rilis pertama.",
    deliverables: [
      "Audit kondisi: yang rusak, yang lambat, yang berisiko",
      "Rencana rilis kecil yang rutin, bukan overhaul mendadak",
      "Patch, pembaruan dependensi, dan perbaikan regresi",
      "Fitur baru yang masuk ke sistem yang sudah ada, tanpa merusak inti",
    ],
    process: [
      "Audit kode, performa, keamanan, dan utang teknis",
      "Prioritas: yang membahayakan, yang rusak, lalu yang memperlambat",
      "Sepakati ritme rilis (mingguan, dua mingguan, atau bulanan)",
      "Kerjakan perbaikan dan patch di cabang yang terkendali",
      "Pembaruan dependensi dan kompatibilitas platform",
      "Tambah fitur hanya jika arsitektur masih menampung",
      "Uji regresi sebelum rilis",
      "Catat perubahan, pantau setelah naik",
      "Ulangi siklus. Renewal adalah kerja rutin, bukan proyek sekali jadi",
    ],
  },
  {
    id: "05",
    title: "Software Developer",
    body: "Pengembangan perangkat lunak dengan Java dan Electron: aplikasi desktop, alat internal, serta solusi kustom yang bisa dijalankan di mesin pengguna. Fokusnya ke perangkat lunak yang dipakai sehari-hari - bukan sekadar skrip sekali pakai.",
    deliverables: [
      "Aplikasi desktop berbasis Electron yang siap dipasang dan dipakai",
      "Modul atau logika bisnis dengan Java sesuai kebutuhan sistem",
      "Integrasi data, API, atau alur kerja yang sudah ada",
      "Dokumentasi singkat dan serah terima yang bisa dilanjutkan",
    ],
    process: [
      "Klarifikasi masalah teknis dan hasil yang diharapkan di desktop",
      "Petakan data, sistem terkait, dan batasan lingkungan (OS, Java, runtime)",
      "Susun pendekatan: UI Electron, logika Java, dan titik integrasinya",
      "Bangun dan uji di kondisi yang mendekati pemakaian nyata",
      "Rapikan kode, error handling, packaging, dan catatan keputusan",
      "Serah terima: cara instal, cara jalan, cara rawat",
      "Dampingan awal setelah dipakai, lalu opsi perawatan lanjutan",
    ],
  },
] as const;

export const experience = [
  {
    role: "Creative Developer",
    place: "NEODEEPS",
    period: "2024 - Sekarang",
    detail:
      "Membangun produk digital, eksperimen interaksi, dan identitas visual mandiri. Di sini saya memegang ujung ke ujung: konsep, UI, motion, dan kode.",
  },
  {
    role: "UI Designer",
    place: "CodingAneh",
    period: "Studio",
    detail:
      "Merancang antarmuka dan sistem visual untuk produk dan website. Fokusnya kejelasan: orang tahu harus ke mana, tanpa belajar ulang setiap halaman.",
  },
  {
    role: "Website Developer",
    place: "jouClouth",
    period: "2019",
    detail:
      "Membangun website untuk klien yang butuh kehadiran digital yang rapi dan fungsional - fondasi kerja yang masih saya pakai: selesai, terbaca, bisa dioperasikan.",
  },
] as const;

export const principles = [
  {
    title: "Teks selalu terbaca",
    body: "Animasi tidak boleh menyembunyikan isi. Jika orang harus menunggu huruf muncul, itu bukan craft - itu hambatan.",
  },
  {
    title: "Gerak punya alasan",
    body: "Hover, transisi, dan scroll dipakai untuk menjelaskan hierarki atau memberi umpan balik. Bukan untuk mengisi kesunyian.",
  },
  {
    title: "Satu alur, dua keahlian",
    body: "Desain yang berhenti di Figma mudah retak di kode. Saya merancang dengan implementasi di kepala, dan sebaliknya.",
  },
  {
    title: "Jujur soal status",
    body: "Jika fitur masih prototipe, ditulis sebagai prototipe. Produk yang dibesar-besarkan cepat kehilangan kepercayaan.",
  },
] as const;

export const toolGroups = [
  {
    group: "Produk web",
    items: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
  },
  {
    group: "Gerak & rasa",
    items: ["GSAP", "Lenis", "Motion design"],
  },
  {
    group: "Mobile",
    items: ["React Native", "Expo"],
  },
  {
    group: "Desktop & software",
    items: ["Java", "Electron"],
  },
  {
    group: "Desain",
    items: ["Figma", "UI systems", "Wireframe"],
  },
] as const;

export const workingNotes = [
  {
    title: "Bedah masalah dulu",
    body: "Siapa yang bingung, di mana alur putus, apa yang harus selesai minggu ini. Palet dan tipografi menunggu sampai itu jelas — bukan sebaliknya.",
  },
  {
    title: "Desain sambil dibangun",
    body: "Wireframe langsung jadi komponen. Motion hanya untuk hierarki. Setiap iterasi punya catatan: apa yang berubah, apa yang masih prototipe.",
  },
  {
    title: "Serah terima yang bisa dilanjut",
    body: "Yang ikut: kode, struktur halaman, environment, dan keputusan yang sudah diambil. Bukan file Figma yang ditinggal sendirian di meja.",
  },
  {
    title: "Jaga setelah dipakai",
    body: "Bug, pembaruan, renewal. Kalau orang sudah bergantung pada sistemnya, rilis bukan titik selesai — itu titik mulai merawat.",
  },
] as const;

export const contactTopics = [
  "Website atau landasan merek",
  "Dashboard dan produk internal",
  "Aplikasi Android",
  "Dashboard dan API yang sudah perlu dirapikan",
  "Perawatan atau pembaruan sistem yang sudah jalan",
  "Audit UI: apa yang membingungkan, apa yang bisa dirapikan",
] as const;

export const briefPoints = [
  "Siapa yang akan memakai ini, dan di situasi apa",
  "Apa yang sudah ada (desain, repo, referensi) dan apa yang belum",
  "Tenggat yang nyata, bukan yang hanya terdengar bagus",
  "Apakah yang dibutuhkan desain, development, rilis toko, atau perawatan berkelanjutan",
] as const;

export const contactFaq = [
  {
    q: "Bisa remote?",
    a: "Ya. Saya di Jakarta, tetapi kerja biasanya lewat dokumen, repo, dan percakapan yang tertulis jelas.",
  },
  {
    q: "Mulai dari mana?",
    a: "Kirim konteks singkat lewat formulir atau email. Saya membalas apakah ini cocok, apa yang masih kabur, dan usulan langkah pertama.",
  },
  {
    q: "Apakah menerima semua proyek?",
    a: "Tidak. Saya memilih yang bisa saya pegang dengan serius - biasanya produk digital yang butuh kejelasan, bukan hanya template cepat.",
  },
] as const;
