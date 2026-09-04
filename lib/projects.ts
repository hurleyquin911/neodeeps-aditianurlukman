export type ProjectPalette = {
  from: string;
  via: string;
  to: string;
  accent: string;
};

export type FlowKind = "process" | "decision" | "end";

export type FlowLink = {
  id: string;
  label?: string;
};

export type FlowStep = {
  step: string;
  title: string;
  body: string;
  kind?: FlowKind;
  lane?: number;
  column?: number;
  from?: FlowLink[];
  inner?: { title: string; note?: string }[];
};

export type Project = {
  slug: string;
  id: string;
  title: string;
  year: string;
  category: string;
  featured: boolean;
  description: string;
  tags: string[];
  href: string;
  palette: ProjectPalette;
  tampilan: {
    headline: string;
    points: string[];
    screens: { name: string; note: string }[];
  };
  flow: FlowStep[];
  deskripsi: {
    pitch: string;
    masalah: string;
    solusi: string;
    peran: string;
    hasil: string;
  };
};

export const projects: Project[] = [
  {
    slug: "aruna",
    id: "08",
    title: "ARUNA",
    year: "2026",
    category: "Ecommerce",
    featured: true,
    description:
      "Toko fashion kontemporer untuk iklim tropis: koleksi, etalase, tas, dan checkout yang tetap tenang dari beranda sampai bayar.",
    tags: ["Next.js", "Ecommerce", "UI"],
    href: "https://ecommerce.neodeeps.com/",
    palette: {
      from: "#1a1612",
      via: "#4a3b2a",
      to: "#e8d5b5",
      accent: "#c4a574",
    },
    tampilan: {
      headline:
        "Etalase yang editorial: tipografi besar, kartu produk yang mudah dipindai, dan ruang napas seperti lookbook - bukan katalog yang berisik.",
      points: [
        "Beranda membuka janji merek dulu, baru kategori dan pilihan editor.",
        "Kartu produk menampilkan diskon, status baru, dan harga tanpa teka-teki.",
        "Tas, ongkir, dan retur dijelaskan dengan bahasa toko, bukan bahasa sistem.",
      ],
      screens: [
        { name: "Beranda musim", note: "Koleksi transisi, janji merek, dan jalur ke etalase." },
        { name: "Belanja menurut bentuk", note: "Atasan, bawahan, outerwear, dress, aksesori, sepatu." },
        { name: "Kartu produk", note: "Harga, diskon, dan status baru dalam satu pandangan." },
        { name: "Tas belanja", note: "Ambang gratis ongkir dan ajakan jika tas masih kosong." },
      ],
    },
    flow: [
      {
        step: "01",
        title: "Datang ke beranda",
        body: "Pengunjung melihat janji merek dan koleksi musim. Arahnya jelas: belanja, lookbook, atau kategori.",
        column: 1,
        lane: 1,
        from: [{ id: "start" }],
        inner: [{ title: "Beranda", note: "Janji + musim" }],
      },
      {
        step: "02",
        title: "Sudah tahu barangnya?",
        body: "Sebagian datang untuk potongan tertentu. Sebagian masih melihat-lihat. Toko menampung keduanya tanpa memaksa.",
        kind: "decision",
        column: 2,
        lane: 1,
        from: [{ id: "01" }],
      },
      {
        step: "03",
        title: "Buka kategori",
        body: "Belanja menurut bentuk: atasan, bawahan, outer, dress, aksesori, atau sepatu.",
        column: 3,
        lane: 0,
        from: [{ id: "02", label: "Ya" }],
        inner: [{ title: "Kategori", note: "Enam bentuk" }],
      },
      {
        step: "04",
        title: "Jelajah etalase",
        body: "Pilihan editor, baru tiba, atau workwear. Kartu produk yang tenang, bukan banner yang berteriak.",
        column: 3,
        lane: 2,
        from: [{ id: "02", label: "Belum" }],
        inner: [{ title: "Etalase", note: "Kurasi" }],
      },
      {
        step: "05",
        title: "Lihat produk",
        body: "Harga, bahan, dan status (baru atau diskon) terbaca sebelum masuk ke detail yang lebih dalam.",
        column: 4,
        lane: 1,
        from: [{ id: "03" }, { id: "04" }],
        inner: [{ title: "Produk", note: "Harga + status" }],
      },
      {
        step: "06",
        title: "Masuk tas?",
        body: "Keputusan belanja. Tas menampilkan ambang gratis ongkir. Yang belum siap bisa kembali ke etalase.",
        kind: "decision",
        column: 5,
        lane: 1,
        from: [{ id: "05" }],
      },
      {
        step: "07",
        title: "Checkout",
        body: "Bayar lewat QRIS, transfer, kartu, atau cicilan. Pengiriman dalam dan luar negeri dijelaskan sebelum konfirmasi.",
        column: 6,
        lane: 0,
        from: [{ id: "06", label: "Ya" }],
        inner: [{ title: "Bayar", note: "Metode aman" }],
      },
      {
        step: "08",
        title: "Lanjut melihat",
        body: "Tidak ada hukuman untuk belum membeli. Etalase tetap terbuka.",
        kind: "end",
        column: 6,
        lane: 2,
        from: [{ id: "06", label: "Tidak" }],
      },
      {
        step: "09",
        title: "Pesanan tercatat",
        body: "Siklus toko tertutup: dari musim di beranda sampai barang yang siap dikirim.",
        kind: "end",
        column: 7,
        lane: 0,
        from: [{ id: "07" }],
      },
    ],
    deskripsi: {
      pitch:
        "ARUNA adalah toko fashion kontemporer: pakaian untuk iklim tropis, etalase yang tenang, dan alur belanja yang tidak membuat orang merasa sedang mengisi formulir.",
      masalah:
        "Banyak toko daring menumpuk diskon, banner, dan popup sampai produknya sendiri sulit dilihat. Untuk merek yang ingin terasa editorial, itu merusak kepercayaan sebelum harga sempat dibaca.",
      solusi:
        "Saya merancang toko sebagai lookbook yang bisa dibeli. Hierarki musim, kategori, dan kartu produk disusun dulu. Tas, ongkir, retur, dan pembayaran masuk sebagai kelanjutan - bukan gangguan.",
      peran:
        "Saya merancang dan membangun pengalaman fullstack: beranda, etalase, detail produk, tas, dan fondasi checkout sampai situs bisa dipakai di ecommerce.neodeeps.com.",
      hasil:
        "Sebuah toko hidup yang bisa dibuka publik: koleksi transisi 2026, belanja menurut bentuk, dan jalur dari lihat ke bayar tanpa kehilangan nada merek.",
    },
  },
  {
    slug: "studio-kaos",
    id: "09",
    title: "Studio Kaos",
    year: "2026",
    category: "3D Studio",
    featured: true,
    description:
      "Editor desain kaos dari kanvas 2D ke mockup 3D: jenis baju, ukuran fisik, layer, dan pratinjau sisi depan sampai lengan.",
    tags: ["3D", "Editor", "Product"],
    href: "https://mockup.neodeeps.com/",
    palette: {
      from: "#0b1220",
      via: "#1e3a5f",
      to: "#7dd3fc",
      accent: "#38bdf8",
    },
    tampilan: {
      headline:
        "Studio kerja, bukan landing page: kanvas di tengah, produk dan layer di sisi, ukuran dalam centimeter yang sama dengan baju sungguhan.",
      points: [
        "Jenis baju, warna kain, dan size S sampai 3XL diatur sebelum desain diisi.",
        "Desain bisa teks, unggahan, bentuk, gambar, atau template - lalu diedit per layer.",
        "Generate 3D memakai ukuran fisik 1:1, jadi grafis terasa lebih kecil di size yang lebih besar.",
      ],
      screens: [
        { name: "Kanvas 2D", note: "Bidang baju dengan sisi depan, belakang, dan lengan." },
        { name: "Panel produk", note: "Jenis baju, warna kain, size, dan tabel ukuran." },
        { name: "Layer & properti", note: "Posisi, tipografi, warna, filter, dan efek dalam cm." },
        { name: "Generate 3D", note: "Dari tata letak datar ke mockup tubuh baju." },
      ],
    },
    flow: [
      {
        step: "01",
        title: "Pilih jenis baju",
        body: "Kaos pendek, lengan panjang, hoodie, atau tank top. Bentuk bidang mengikuti produk.",
        column: 1,
        lane: 1,
        from: [{ id: "start" }],
        inner: [{ title: "Produk", note: "Siluet" }],
      },
      {
        step: "02",
        title: "Atur kain & size",
        body: "Warna kain dan ukuran S-3XL. Tabel dada, bahu, lengan, dan bidang baju dalam cm atau inci.",
        column: 2,
        lane: 1,
        from: [{ id: "01" }],
        inner: [{ title: "Ukuran", note: "1 unit = 1 cm" }],
      },
      {
        step: "03",
        title: "Desain di kanvas",
        body: "Tambah teks, unggah, bentuk, gambar, atau template. Sisi bisa depan, belakang, atau lengan.",
        column: 3,
        lane: 1,
        from: [{ id: "02" }],
        inner: [{ title: "Layer", note: "Objek di bidang" }],
      },
      {
        step: "04",
        title: "Siap lihat 3D?",
        body: "Sebagian orang merapikan layer dulu. Sebagian ingin segera melihat di badan baju.",
        kind: "decision",
        column: 4,
        lane: 1,
        from: [{ id: "03" }],
      },
      {
        step: "05",
        title: "Rapikan properti",
        body: "Posisi, tipografi, warna, dan efek masih dalam satuan fisik. Grafis tidak 'loncat' saat size berubah.",
        column: 5,
        lane: 2,
        from: [{ id: "04", label: "Belum" }],
        inner: [{ title: "Properti", note: "cm, bukan px" }],
      },
      {
        step: "06",
        title: "Generate 3D",
        body: "Tata letak 2D diangkat ke mockup. Size lebih besar membuat grafis terasa lebih kecil di kain, sesuai dunia nyata.",
        column: 5,
        lane: 0,
        from: [{ id: "04", label: "Ya" }, { id: "05" }],
        inner: [{ title: "Mockup", note: "Pratinjau tubuh" }],
      },
      {
        step: "07",
        title: "Tinjau sisi lain",
        body: "Depan, belakang, lengan kiri, lengan kanan. Desain dicek di tempat yang akan dicetak.",
        kind: "end",
        column: 6,
        lane: 1,
        from: [{ id: "06" }],
      },
    ],
    deskripsi: {
      pitch:
        "Studio Kaos adalah editor mockup baju: merancang di kanvas 2D dengan ukuran fisik, lalu melihat hasilnya di 3D tanpa kehilangan skala sungguhan.",
      masalah:
        "Banyak generator mockup memakai gambar baju yang sudah jadi. Desain tidak terikat size, sisi, atau centimeter. Yang terlihat bagus di layar sering tidak masuk akal di kain.",
      solusi:
        "Saya merancang alur kerja studio: produk dan ukuran dulu, layer di bidang baju, baru generate 3D. Satuan tetap cm, 1:1 ke model.",
      peran:
        "Saya merancang dan membangun pengalaman produk: kanvas, panel produk, layer, dan jembatan 2D ke 3D sampai bisa dipakai di mockup.neodeeps.com.",
      hasil:
        "Sebuah studio hidup yang bisa dibuka publik: pilih baju, desain di sisi yang benar, lalu lihat mockup 3D dengan skala yang jujur.",
    },
  },
  {
    slug: "pulse",
    id: "01",
    title: "Pulse",
    year: "2025",
    category: "Mobile Product",
    featured: true,
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
    tampilan: {
      headline:
        "Antarmuka mobile yang tenang: tipografi terbaca, tombol besar, dan ruang napas yang cukup untuk situasi klinis.",
      points: [
        "Kartu pasien dan status perawatan jadi titik fokus, bukan ornamen.",
        "Palet teal-hijau meredam ketegangan visual di layar kecil.",
        "Komponen disusun untuk ibu jari: aksi utama selalu dalam jangkauan.",
      ],
      screens: [
        { name: "Daftar perawatan", note: "Prioritas pasien dan status terkini dalam satu guliran." },
        { name: "Detail pasien", note: "Informasi penting, catatan, dan langkah berikutnya." },
        { name: "Aksi cepat", note: "Tombol yang jarang tersembunyi di menu dalam." },
      ],
    },
    flow: [
      {
        step: "01",
        title: "Buka aplikasi",
        body: "Petugas masuk dan langsung melihat antrian atau daftar yang menjadi tanggung jawabnya.",
        column: 1,
        lane: 1,
        from: [{ id: "start" }],
        inner: [{ title: "Antrian", note: "Daftar tugas" }],
      },
      {
        step: "02",
        title: "Pilih pasien",
        body: "Kartu menampilkan identitas, status, dan urgensi. Tidak perlu membuka tiga layar untuk memahami konteks.",
        column: 2,
        lane: 1,
        from: [{ id: "01" }],
        inner: [{ title: "Kartu pasien", note: "Status + urgensi" }],
      },
      {
        step: "03",
        title: "Perlu segera?",
        body: "Dari kartu, petugas memilah kasus kritis dan yang bisa mengantri. Cabang ini yang menentukan urutan kerja, bukan menu tersembunyi.",
        kind: "decision",
        column: 3,
        lane: 1,
        from: [{ id: "02" }],
      },
      {
        step: "04",
        title: "Jalur prioritas",
        body: "Kasus mendesak naik ke depan. Petugas masuk ke pencatatan tanpa menunggu giliran rutin.",
        column: 4,
        lane: 0,
        from: [{ id: "03", label: "Ya" }],
        inner: [{ title: "Eskalasi", note: "Dikerjakan dulu" }],
      },
      {
        step: "05",
        title: "Antrian biasa",
        body: "Kasus tetap terurut. Konteks pasien sudah terlihat sebelum tindakan, jadi antrian tidak berarti bingung.",
        column: 4,
        lane: 2,
        from: [{ id: "03", label: "Tidak" }],
        inner: [{ title: "Urutan", note: "Giliran berikutnya" }],
      },
      {
        step: "06",
        title: "Catat & tindak",
        body: "Perawatan dicatat di tempat. Dua jalur sebelumnya bertemu di sini supaya jejak kerja tetap satu.",
        column: 5,
        lane: 1,
        from: [{ id: "04" }, { id: "05" }],
        inner: [{ title: "Catatan", note: "Aksi di lapangan" }],
      },
      {
        step: "07",
        title: "Kembali ke daftar",
        body: "Setelah aksi selesai, daftar diperbarui. Siklus kerja tertutup tanpa kehilangan jejak.",
        kind: "end",
        column: 6,
        lane: 1,
        from: [{ id: "06" }],
      },
    ],
    deskripsi: {
      pitch:
        "Pulse adalah aplikasi mobile untuk lingkungan rumah sakit: cepat dibaca, tenang dipakai, dan tidak memaksa petugas belajar ulang setiap kali membuka layar.",
      masalah:
        "Aplikasi kesehatan sering meniru kompleksitas desktop. Di gawai, itu berarti tombol kecil, hierarki kabur, dan waktu yang terbuang saat pasien menunggu.",
      solusi:
        "Saya merancang alur di React Native dan Expo, termasuk cabang prioritas. Setiap layar menjawab satu pertanyaan: siapa yang perlu ditangani, apa statusnya, dan apa langkah berikutnya.",
      peran:
        "Saya merancang UI, menyusun navigasi, dan membangun prototipe fungsional yang meniru ritme kerja di lapangan - bukan ritme desainer di meja.",
      hasil:
        "Sebuah produk mobile yang menekankan kejelasan: perawatan bisa dilanjutkan tanpa harus menerjemahkan antarmuka terlebih dahulu.",
    },
  },
  {
    slug: "maninjau",
    id: "02",
    title: "Maninjau",
    year: "2025",
    category: "AI Chatbot",
    featured: true,
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
    tampilan: {
      headline:
        "Percakapan sebagai antarmuka: gelembung pesan, jawaban singkat, dan konteks danau yang terasa dekat - bukan dashboard yang dingin.",
      points: [
        "Layar chat sederhana: pertanyaan di kanan, jawaban di kiri, tanpa menu berlapis.",
        "Warna hijau danau menandai identitas lokal, bukan tema generik AI.",
        "Jawaban ditata paragraf pendek agar bisa dibaca di lapangan.",
      ],
      screens: [
        { name: "Pembuka", note: "Sambutan dan contoh pertanyaan supaya pengguna tahu bisa bertanya apa." },
        { name: "Percakapan", note: "Tanya-jawab seputar perikanan Maninjau dalam bahasa yang biasa dipakai." },
        { name: "Klarifikasi", note: "Jika pertanyaan kabur, bot meminta rincian sebelum menjawab panjang." },
      ],
    },
    flow: [
      {
        step: "01",
        title: "Buka chat",
        body: "Pengguna membuka percakapan. Tidak perlu akun rumit; yang dibutuhkan adalah pertanyaan yang jelas.",
        column: 1,
        lane: 1,
        from: [{ id: "start" }],
        inner: [{ title: "Pembuka", note: "Contoh pertanyaan" }],
      },
      {
        step: "02",
        title: "Kirim konteks",
        body: "Topik perikanan - musim, lokasi, atau praktik - ditulis apa adanya.",
        column: 2,
        lane: 1,
        from: [{ id: "01" }, { id: "04", label: "Kirim ulang" }],
        inner: [{ title: "Pesan", note: "Bahasa sehari-hari" }],
      },
      {
        step: "03",
        title: "Konteks cukup?",
        body: "Sistem menimbang apakah pertanyaan bisa dijawab atau masih kabur sebelum menulis panjang.",
        kind: "decision",
        column: 3,
        lane: 1,
        from: [{ id: "02" }],
      },
      {
        step: "04",
        title: "Minta rincian",
        body: "Jika kabur, bot meminta musim, lokasi, atau praktik yang dimaksud. Pengguna kembali ke pengiriman pesan.",
        column: 4,
        lane: 0,
        from: [{ id: "03", label: "Belum" }],
        inner: [{ title: "Klarifikasi", note: "Satu pertanyaan" }],
      },
      {
        step: "05",
        title: "Bot merespons",
        body: "Jawaban terfokus, paragraf pendek, siap dibaca di lapangan.",
        column: 4,
        lane: 2,
        from: [{ id: "03", label: "Cukup" }],
        inner: [{ title: "Jawaban", note: "Konteks danau" }],
      },
      {
        step: "06",
        title: "Selesai atau lanjut",
        body: "Percakapan bisa berlanjut di utas yang sama. Tujuannya informasi sampai, bukan sesi yang berlama-lama.",
        kind: "end",
        column: 5,
        lane: 1,
        from: [{ id: "05" }],
      },
    ],
    deskripsi: {
      pitch:
        "Maninjau adalah prototipe chatbot untuk informasi perikanan Danau Maninjau - upaya kecil agar pengetahuan lokal tidak tertinggal di balik produk digital yang hanya bicara ke kota besar.",
      masalah:
        "Informasi sektor perikanan sering tersebar di orang, grup, atau dokumen yang sulit dicari saat dibutuhkan. Produk AI nasional jarang menyentuh konteks danau dan praktik setempat.",
      solusi:
        "Saya merancang percakapan sebagai pintu masuk: pengguna bertanya dalam bahasa sehari-hari, sistem menjawab terfokus. Antarmukanya disengaja sederhana agar tidak menghalangi isi.",
      peran:
        "Saya merancang alur percakapan, tampilan chat, dan prototipe awal sebagai landasan sistem yang masih bisa dikembangkan.",
      hasil:
        "Sebuah fondasi yang bisa diuji di lapangan: bukan produk selesai, melainkan bukti bahwa AI lokal bisa relevan jika konteksnya jujur.",
    },
  },
  {
    slug: "rmb-gallery",
    id: "03",
    title: "RMB Gallery",
    year: "2025",
    category: "Rich Media",
    featured: true,
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
    tampilan: {
      headline:
        "Galeri banner yang hidup: frame iklan, puzzle, dan transisi yang dihitung - bukan slide yang hanya berganti gambar.",
      points: [
        "Setiap unit punya panggung sendiri: ukuran banner, timing, dan titik klik.",
        "Warna hangat (oranye-magenta) menandai sifat eksperimen dan attention.",
        "Gerakan mengikuti aturan iklan: singkat, jelas, berhenti pada pesan.",
      ],
      screens: [
        { name: "Galeri mockup", note: "Kumpulan unit rich media dalam satu ruang tinjau." },
        { name: "Puzzle banner", note: "Interaksi kecil yang menahan mata lebih lama dari banner statis." },
        { name: "Playback", note: "Ulang gerakan untuk menilai timing, bukan hanya hasil akhir." },
      ],
    },
    flow: [
      {
        step: "01",
        title: "Pilih unit",
        body: "Pengunjung memilih banner atau eksperimen dari galeri.",
        column: 1,
        lane: 1,
        from: [{ id: "start" }],
        inner: [{ title: "Galeri", note: "Pilih mockup" }],
      },
      {
        step: "02",
        title: "Lihat gerakan",
        body: "Animasi berjalan sesuai durasi iklan. Pesan visual harus sampai sebelum loop.",
        column: 2,
        lane: 1,
        from: [{ id: "01" }],
        inner: [{ title: "Playback", note: "Timing iklan" }],
      },
      {
        step: "03",
        title: "Ada interaksi?",
        body: "Sebagian unit hanya diputar. Yang lain meminta sentuhan: puzzle, state, atau klik di tengah loop.",
        kind: "decision",
        column: 3,
        lane: 1,
        from: [{ id: "02" }],
      },
      {
        step: "04",
        title: "Main puzzle",
        body: "Pengguna menyusun atau memicu state berikutnya. Tujuannya menahan mata lebih lama dari banner diam.",
        column: 4,
        lane: 0,
        from: [{ id: "03", label: "Ya" }],
        inner: [{ title: "Puzzle", note: "State berikutnya" }],
      },
      {
        step: "05",
        title: "Tonton sampai CTA",
        body: "Unit non-interaktif tetap diputar sampai pesan terakhir. Tidak ada klik palsu di tengah jalan.",
        column: 4,
        lane: 2,
        from: [{ id: "03", label: "Tidak" }],
        inner: [{ title: "Loop", note: "Pesan dulu" }],
      },
      {
        step: "06",
        title: "Klik tujuan",
        body: "Gerakan berhenti pada ajakan yang bisa diklik. Dua jalur bertemu di sini.",
        kind: "end",
        column: 5,
        lane: 1,
        from: [{ id: "04" }, { id: "05" }],
      },
    ],
    deskripsi: {
      pitch:
        "RMB Gallery adalah laboratorium rich media: tempat menguji apakah gerakan, timing, dan interaksi mampu membawa pesan iklan tanpa membuat orang lelah.",
      masalah:
        "Banner statis mudah diabaikan. Banner yang terlalu ramai juga ditolak. Yang sulit adalah gerakan yang punya alasan - cukup hidup, tetap terbaca.",
      solusi:
        "Saya merakit unit HTML yang bisa diputar ulang, dibandingkan, dan diutak-atik. Puzzle dan transisi dipakai sebagai alat, bukan gimmick.",
      peran:
        "Saya merancang motion, menyusun galeri mockup, dan menulis interaksi banner agar bisa ditunjukkan ke tim atau klien sebagai bukti craft.",
      hasil:
        "Kumpulan eksperimen yang bisa dilihat, diulang, dan dibahas - dasar untuk iklan yang tidak diam di tempat.",
    },
  },
  {
    slug: "gdk-website",
    id: "04",
    title: "GDK Website",
    year: "2024",
    category: "Company Website",
    featured: false,
    description:
      "Situs web kehadiran digital: struktur halaman yang rapi, hierarki informasi yang jelas, dan tampilan yang siap diperkenalkan ke publik.",
    tags: ["HTML", "CSS", "Website"],
    href: "https://github.com/hurleyquin911/gdk_website",
    palette: {
      from: "#1a1520",
      via: "#3b2d4a",
      to: "#c4b5fd",
      accent: "#ddd6fe",
    },
    tampilan: {
      headline:
        "Situs perusahaan yang tenang: judul besar, blok konten terukur, dan navigasi yang tidak bersembunyi.",
      points: [
        "Halaman disusun seperti dokumen publik: siapa, apa, dan cara menghubungi.",
        "Tipografi dan spasi lebih diutamakan daripada efek.",
        "Warna ungu-gelap memberi identitas tanpa mengalahkan isi.",
      ],
      screens: [
        { name: "Beranda", note: "Kalimat pembuka dan arah ke bagian penting." },
        { name: "Profil", note: "Siapa organisasi ini dan apa yang dikerjakan." },
        { name: "Kontak", note: "Jalur yang mudah ditemukan, bukan yang dikubur di footer saja." },
      ],
    },
    flow: [
      {
        step: "01",
        title: "Datang ke beranda",
        body: "Pengunjung memahami dalam beberapa detik: ini situs siapa, dan untuk apa.",
        column: 1,
        lane: 1,
        from: [{ id: "start" }],
        inner: [{ title: "Beranda", note: "Janji dalam satu layar" }],
      },
      {
        step: "02",
        title: "Tahu tujuannya?",
        body: "Sebagian orang sudah datang untuk menghubungi. Sebagian masih perlu membaca dulu. Situs menampung keduanya.",
        kind: "decision",
        column: 2,
        lane: 1,
        from: [{ id: "01" }],
      },
      {
        step: "03",
        title: "Langsung kontak",
        body: "Jalur cepat: formulir atau tautan kontak dari beranda, tanpa memaksa tur halaman.",
        column: 3,
        lane: 0,
        from: [{ id: "02", label: "Ya" }],
        inner: [{ title: "Kontak", note: "Aksi utama" }],
      },
      {
        step: "04",
        title: "Baca profil",
        body: "Bagian profil dan layanan disusun berurutan. Tidak ada labirin menu.",
        column: 3,
        lane: 2,
        from: [{ id: "02", label: "Belum" }],
        inner: [{ title: "Isi", note: "Siapa dan apa" }],
      },
      {
        step: "05",
        title: "Cari bukti",
        body: "Karya atau informasi pendukung diletakkan dekat klaim - bukan di halaman yang sulit ditebak.",
        column: 4,
        lane: 2,
        from: [{ id: "04" }],
        inner: [{ title: "Bukti", note: "Dekat klaim" }],
      },
      {
        step: "06",
        title: "Hubungi",
        body: "Kontak selalu tersedia. Situs selesai jika orang tahu langkah berikutnya.",
        kind: "end",
        column: 5,
        lane: 1,
        from: [{ id: "03" }, { id: "05" }],
      },
    ],
    deskripsi: {
      pitch:
        "GDK Website adalah kehadiran digital yang rapi: orang datang, mengerti, dan tahu harus ke mana - tanpa teater visual yang menghalangi pesan.",
      masalah:
        "Banyak situs organisasi menumpuk halaman tanpa urutan. Pengunjung gagal menjawab pertanyaan dasar: ini siapa, dan apa yang bisa dilakukan di sini.",
      solusi:
        "Saya merapikan struktur informasi. Setiap bagian punya tugas. Desain mendukung bacaan, bukan menggantikannya.",
      peran:
        "Saya merancang susunan halaman, hierarki visual, dan implementasi front-end agar situs bisa langsung dipakai sebagai wajah publik.",
      hasil:
        "Sebuah website yang bisa diperkenalkan dengan tenang: jelas, terarah, dan tidak memaksa pengunjung menebak navigasi.",
    },
  },
  {
    slug: "codinganeh-gpt",
    id: "05",
    title: "CodingAneh GPT",
    year: "2024",
    category: "AI Product",
    featured: false,
    description:
      "Asisten GPT untuk kebutuhan situs dan konten. Percakapan yang diarahkan, bukan kotak chat generik tanpa konteks merek.",
    tags: ["AI", "GPT", "Product"],
    href: "https://github.com/hurleyquin911/codinganeh_Gpt",
    palette: {
      from: "#1c1408",
      via: "#854d0e",
      to: "#fde047",
      accent: "#facc15",
    },
    tampilan: {
      headline:
        "Chat yang terikat merek: identitas CodingAneh terlihat, percakapan tetap ringan, jawaban tetap pada rel.",
      points: [
        "Header dan nada visual mengikuti situs, bukan template OpenAI.",
        "Prompt pembuka menuntun pengguna ke jenis pertanyaan yang berguna.",
        "Area chat lebar, tipografi nyaman untuk sesi yang lebih dari tiga pesan.",
      ],
      screens: [
        { name: "Landing asisten", note: "Penjelasan singkat: asisten ini untuk apa, dan apa batasnya." },
        { name: "Ruang chat", note: "Percakapan utama dengan konteks merek yang konsisten." },
        { name: "Saran pertanyaan", note: "Contoh prompt agar pengguna tidak mulai dari kosong." },
      ],
    },
    flow: [
      {
        step: "01",
        title: "Pahami peran asisten",
        body: "Pengguna membaca untuk apa GPT ini disiapkan, supaya ekspektasi tidak liar.",
        column: 1,
        lane: 1,
        from: [{ id: "start" }],
        inner: [{ title: "Landing", note: "Batas dan tujuan" }],
      },
      {
        step: "02",
        title: "Sudah punya pertanyaan?",
        body: "Bisa langsung mengetik, atau menekan contoh jika masih kosong. Dua pintu masuk, satu ruang chat.",
        kind: "decision",
        column: 2,
        lane: 1,
        from: [{ id: "01" }],
      },
      {
        step: "03",
        title: "Ketik bebas",
        body: "Pertanyaan ditulis apa adanya. Konteks merek sudah menahan jawaban agar tidak liar.",
        column: 3,
        lane: 0,
        from: [{ id: "02", label: "Ya" }],
        inner: [{ title: "Prompt", note: "Ketik langsung" }],
      },
      {
        step: "04",
        title: "Pilih saran",
        body: "Contoh pertanyaan menuntun ke jenis kerja yang berguna: copy, struktur, atau ide halaman.",
        column: 3,
        lane: 2,
        from: [{ id: "02", label: "Belum" }],
        inner: [{ title: "Saran", note: "Mulai dari contoh" }],
      },
      {
        step: "05",
        title: "Iterasi jawaban",
        body: "Hasil bisa diperhalus. Konteks percakapan tetap di dalam sesi.",
        column: 4,
        lane: 1,
        from: [{ id: "03" }, { id: "04" }],
        inner: [{ title: "Chat", note: "Perhalus di tempat" }],
      },
      {
        step: "06",
        title: "Pakai di situs",
        body: "Teks atau ide yang dihasilkan dibawa ke kebutuhan website, bukan dibiarkan di chat saja.",
        kind: "end",
        column: 5,
        lane: 1,
        from: [{ id: "05" }],
      },
    ],
    deskripsi: {
      pitch:
        "CodingAneh GPT adalah asisten percakapan yang dibuat untuk kerja situs - dengan konteks merek, bukan chatbot serba bisa yang jawabannya sering kehilangan arah.",
      masalah:
        "GPT umum pintar, tetapi tidak tahu nada, batas, dan tujuan sebuah merek. Hasilnya sering harus diedit ulang dari nol.",
      solusi:
        "Saya merancang lapisan percakapan di atas model: sapaan, contoh pertanyaan, dan ruang chat yang terasa bagian dari situs - bukan jendela asing.",
      peran:
        "Saya merancang pengalaman chat, mengikatnya ke kebutuhan website, dan menyusun prototipe yang bisa diuji sebagai fitur, bukan demo terpisah.",
      hasil:
        "Asisten yang lebih mudah diarahkan: orang bertanya dengan konteks, dan jawaban lebih dekat ke kerja sehari-hari tim.",
    },
  },
  {
    slug: "mikrotik-panel",
    id: "06",
    title: "MikroTik Login Panel",
    year: "2024",
    category: "Interface Design",
    featured: false,
    description:
      "Halaman login hotspot yang dirancang ulang: jelas, cepat dibaca, dan tidak terasa seperti form bawaan perangkat.",
    tags: ["CSS", "UI", "Hotspot"],
    href: "https://github.com/hurleyquin911/mikrotik_panel-login.v12",
    palette: {
      from: "#0b1220",
      via: "#1e3a5f",
      to: "#93c5fd",
      accent: "#60a5fa",
    },
    tampilan: {
      headline:
        "Satu layar, satu tugas: masuk ke jaringan. Form besar, instruksi singkat, status yang tidak tersembunyi.",
      points: [
        "Fokus pada field login - bukan wallpaper yang menelan tombol.",
        "Tipografi dan kontras disetel untuk dibaca cepat di ruang publik.",
        "Identitas visual menggantikan tampilan default yang terasa teknis dan dingin.",
      ],
      screens: [
        { name: "Login", note: "Username, kata sandi, dan tombol masuk dalam satu kolom." },
        { name: "Status", note: "Pesan gagal atau berhasil yang langsung terbaca." },
        { name: "Branding", note: "Nama jaringan atau tempat tampil tanpa mengganggu form." },
      ],
    },
    flow: [
      {
        step: "01",
        title: "Tersambung ke hotspot",
        body: "Perangkat membuka portal. Pengguna tidak boleh bingung ini halaman apa.",
        column: 1,
        lane: 1,
        from: [{ id: "start" }],
        inner: [{ title: "Portal", note: "Satu tugas" }],
      },
      {
        step: "02",
        title: "Isi kredensial",
        body: "Field sedikit, label jelas. Tidak ada opsi yang tidak relevan di layar pertama.",
        column: 2,
        lane: 1,
        from: [{ id: "01" }, { id: "06", label: "Coba lagi" }],
        inner: [{ title: "Form", note: "Sedikit field" }],
      },
      {
        step: "03",
        title: "Kirim",
        body: "Tombol utama mencolok. Setelah dikirim, umpan balik muncul tanpa reload yang terasa putus.",
        column: 3,
        lane: 1,
        from: [{ id: "02" }],
        inner: [{ title: "Masuk", note: "Aksi utama" }],
      },
      {
        step: "04",
        title: "Berhasil?",
        body: "Portal membedakan sukses dan gagal dengan bahasa manusia, bukan kode perangkat.",
        kind: "decision",
        column: 4,
        lane: 1,
        from: [{ id: "03" }],
      },
      {
        step: "05",
        title: "Masuk jaringan",
        body: "Jika berhasil, pengguna lanjut ke internet. Layar login selesai.",
        kind: "end",
        column: 5,
        lane: 2,
        from: [{ id: "04", label: "Ya" }],
      },
      {
        step: "06",
        title: "Pesan error",
        body: "Kesalahan disebutkan dengan jelas, lalu pengguna kembali mengisi. Tidak ada jalan buntu.",
        column: 5,
        lane: 0,
        from: [{ id: "04", label: "Tidak" }],
        inner: [{ title: "Status", note: "Bahasa manusia" }],
      },
    ],
    deskripsi: {
      pitch:
        "MikroTik Login Panel adalah wajah pertama sebuah jaringan: layar yang harus selesai dalam hitungan detik, tanpa membuat orang merasa sedang mengisi formulir teknis.",
      masalah:
        "Portal hotspot bawaan sering kaku, sulit dibaca, dan terasa seperti halaman administrator. Tamu ragu menekan tombol yang salah.",
      solusi:
        "Saya merancang ulang fokus ke satu aksi. Visual, spasi, dan pesan error disusun agar orang awam bisa masuk tanpa bantuan.",
      peran:
        "Saya merancang antarmuka login, menyesuaikan hierarki visual, dan merapikan CSS agar panel terasa seperti produk, bukan template perangkat.",
      hasil:
        "Halaman masuk yang lebih ramah: cepat dipahami, mudah diisi, dan layak dipakai di ruang tamu maupun ruang publik.",
    },
  },
  {
    slug: "neodeeps-platform",
    id: "07",
    title: "NEODEEPS Platform",
    year: "2025",
    category: "Community Product",
    featured: true,
    description:
      "Platform komunitas dan event: menemukan orang dengan minat yang sama, lalu bertemu di dunia nyata.",
    tags: ["Next.js", "TypeScript", "Product"],
    href: "https://github.com/hurleyquin911/neodeeps-frontend",
    palette: {
      from: "#111806",
      via: "#3f6212",
      to: "#d4ff3f",
      accent: "#d4ff3f",
    },
    tampilan: {
      headline:
        "Produk komunitas dengan identitas NEODEEPS: gelap, aksen lime, dan kartu event yang mudah dipindai.",
      points: [
        "Beranda menjelaskan janji produk dalam satu layar: komunitas, minat, pertemuan.",
        "Kartu event menampilkan waktu, tempat, dan siapa yang cocok datang.",
        "Aksen acid dipakai hemat: untuk aksi, bukan untuk seluruh halaman.",
      ],
      screens: [
        { name: "Jelajah komunitas", note: "Daftar minat dan kota, bukan feed yang tidak ada ujungnya." },
        { name: "Detail event", note: "Kapan, di mana, untuk siapa - lalu tombol bergabung." },
        { name: "Ajakan aplikasi", note: "Status mobile yang sedang dibangun, tanpa menipu bahwa aplikasi sudah ada." },
      ],
    },
    flow: [
      {
        step: "01",
        title: "Pilih minat",
        body: "Pengguna menandai apa yang dicari: hobi, karier, atau pertemuan di kotanya.",
        column: 1,
        lane: 1,
        from: [{ id: "start" }],
        inner: [{ title: "Minat", note: "Filter awal" }],
      },
      {
        step: "02",
        title: "Temukan komunitas",
        body: "Hasil disaring agar orang bertemu yang satu arah, bukan kerumunan generik.",
        column: 2,
        lane: 1,
        from: [{ id: "01" }],
        inner: [{ title: "Komunitas", note: "Satu arah" }],
      },
      {
        step: "03",
        title: "Lihat event",
        body: "Tanggal dan tempat jelas. Keputusan datang atau tidak bisa dibuat cepat.",
        column: 3,
        lane: 1,
        from: [{ id: "02" }],
        inner: [{ title: "Event", note: "Kapan dan di mana" }],
      },
      {
        step: "04",
        title: "Datang?",
        body: "Produk tidak memaksa. Yang siap bertemu lanjut bergabung; yang belum bisa menyimpan atau melewati.",
        kind: "decision",
        column: 4,
        lane: 1,
        from: [{ id: "03" }],
      },
      {
        step: "05",
        title: "Gabung",
        body: "Aksi bergabung atau menunggu undangan. Dari sini siklus menuju pertemuan nyata.",
        column: 5,
        lane: 0,
        from: [{ id: "04", label: "Ya" }],
        inner: [{ title: "RSVP", note: "Kunci kursi" }],
      },
      {
        step: "06",
        title: "Simpan / lewati",
        body: "Event tetap bisa ditemukan lagi. Tidak ada hukuman untuk belum siap datang.",
        kind: "end",
        column: 5,
        lane: 2,
        from: [{ id: "04", label: "Tidak" }],
      },
      {
        step: "07",
        title: "Bertemu di kota",
        body: "Produk menutup siklus dari layar ke pertemuan nyata.",
        kind: "end",
        column: 6,
        lane: 0,
        from: [{ id: "05" }],
      },
    ],
    deskripsi: {
      pitch:
        "NEODEEPS Platform adalah produk komunitas: menghubungkan minat dengan pertemuan nyata di kota - bukan jejaring yang berhenti di likes.",
      masalah:
        "Komunitas online sering ramai di layar dan sepi di lapangan. Event ada, tetapi sulit ditemukan orang yang benar-benar satu tujuan.",
      solusi:
        "Saya merancang alur dari minat ke komunitas ke event. Janji produk ditulis jujur, termasuk status aplikasi mobile yang masih dalam pengembangan.",
      peran:
        "Saya merancang identitas, struktur informasi, dan fondasi front-end TypeScript sebagai wajah publik NEODEEPS.",
      hasil:
        "Sebuah landasan produk yang bisa dijelaskan dalam satu napas: temukan orang yang sejalan, lalu bertemu.",
    },
  },
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export function featuredProjects() {
  return projects.filter((project) => project.featured);
}

export function adjacentProjects(slug: string) {
  const index = projects.findIndex((project) => project.slug === slug);
  if (index < 0) return { prev: undefined, next: undefined };
  return {
    prev: index > 0 ? projects[index - 1] : undefined,
    next: index < projects.length - 1 ? projects[index + 1] : undefined,
  };
}
