export type DfdItem = [id: string, label: string];
export type DfdFlow = [from: string, to: string, label: string];

export type UmlClass = {
  id: string;
  name: string;
  stereotype?: string;
  attrs: string[];
  methods: string[];
};
export type UmlRelationKind = "assoc" | "compose" | "inherit";
export type UmlRelation = [from: string, to: string, kind: UmlRelationKind, label?: string];

export type UseCaseActor = [id: string, label: string, side: "left" | "right"];
export type UseCaseItem = [id: string, label: string];
export type UseCaseLink = [actor: string, useCase: string];
export type UseCaseRelation = [from: string, to: string, kind: "include" | "extend"];

export type SeqParticipant = [id: string, label: string, actor?: boolean];
export type SeqMessage = [from: string, to: string, label: string, reply?: boolean];

export type ProjectDiagrams = {
  dfd: {
    entities: DfdItem[];
    processes: DfdItem[];
    stores: DfdItem[];
    flows: DfdFlow[];
  };
  uml: { classes: UmlClass[]; relations: UmlRelation[] };
  useCase: {
    system: string;
    actors: UseCaseActor[];
    cases: UseCaseItem[];
    links: UseCaseLink[];
    relations: UseCaseRelation[];
  };
  sequence: {
    title: string;
    participants: SeqParticipant[];
    messages: SeqMessage[];
  };
};

export const diagrams: Record<string, ProjectDiagrams> = {
  aruna: {
    dfd: {
      entities: [
        ["pelanggan", "Pelanggan"],
        ["admin", "Admin Toko"],
        ["gateway", "Payment Gateway"],
        ["kurir", "Jasa Kirim"],
      ],
      processes: [
        ["katalog", "Kelola Katalog"],
        ["jelajah", "Jelajah & Cari"],
        ["tas", "Kelola Tas"],
        ["checkout", "Checkout"],
        ["kirim", "Kirim Pesanan"],
      ],
      stores: [
        ["produk", "Produk"],
        ["dtas", "Tas"],
        ["pesanan", "Pesanan"],
      ],
      flows: [
        ["admin", "katalog", "data produk"],
        ["katalog", "produk", "simpan produk"],
        ["produk", "jelajah", "katalog"],
        ["pelanggan", "jelajah", "kata kunci"],
        ["jelajah", "pelanggan", "etalase"],
        ["pelanggan", "tas", "pilih item"],
        ["tas", "dtas", "isi tas"],
        ["dtas", "checkout", "item tas"],
        ["pelanggan", "checkout", "alamat & metode"],
        ["checkout", "gateway", "tagihan"],
        ["gateway", "checkout", "status bayar"],
        ["checkout", "pesanan", "pesanan baru"],
        ["pesanan", "kirim", "pesanan lunas"],
        ["kirim", "kurir", "data kirim"],
        ["kirim", "pelanggan", "resi"],
      ],
    },
    uml: {
      classes: [
        { id: "customer", name: "Customer", attrs: ["+id: string", "+nama: string", "+email: string"], methods: ["+daftar()", "+login()"] },
        { id: "cart", name: "Cart", attrs: ["+id: string", "+items: CartItem[]"], methods: ["+tambah(p, qty)", "+subtotal(): number", "+sisaGratisOngkir()"] },
        { id: "item", name: "CartItem", attrs: ["+produk: Product", "+ukuran: string", "+qty: number"], methods: ["+total(): number"] },
        { id: "order", name: "Order", attrs: ["+id: string", "+status: OrderStatus", "+alamat: string", "+total: number"], methods: ["+bayar(metode)", "+kirim(resi)"] },
        { id: "payment", name: "Payment", attrs: ["+metode: QRIS | Transfer | Kartu", "+jumlah: number", "+status: string"], methods: ["+verifikasi(): boolean"] },
        { id: "product", name: "Product", attrs: ["+id: string", "+nama: string", "+harga: number", "+stok: number"], methods: ["+isBaru(): boolean", "+hargaDiskon(): number"] },
        { id: "category", name: "Category", attrs: ["+slug: string", "+nama: string"], methods: ["+produk(): Product[]"] },
      ],
      relations: [
        ["customer", "cart", "assoc", "1"],
        ["customer", "order", "assoc", "0..*"],
        ["cart", "item", "compose", "1..*"],
        ["order", "item", "compose", "1..*"],
        ["order", "payment", "assoc", "1"],
        ["item", "product", "assoc", "1"],
        ["product", "category", "assoc", "*..1"],
      ],
    },
    useCase: {
      system: "Toko ARUNA",
      actors: [
        ["pelanggan", "Pelanggan", "left"],
        ["admin", "Admin Toko", "right"],
        ["gateway", "Payment Gateway", "right"],
      ],
      cases: [
        ["jelajah", "Jelajah katalog"],
        ["cari", "Cari produk"],
        ["tas", "Kelola tas"],
        ["checkout", "Checkout"],
        ["lacak", "Lacak pesanan"],
        ["bayar", "Bayar pesanan"],
        ["produk", "Kelola produk"],
        ["pesanan", "Kelola pesanan"],
      ],
      links: [
        ["pelanggan", "jelajah"],
        ["pelanggan", "cari"],
        ["pelanggan", "tas"],
        ["pelanggan", "checkout"],
        ["pelanggan", "lacak"],
        ["gateway", "bayar"],
        ["admin", "produk"],
        ["admin", "pesanan"],
      ],
      relations: [
        ["checkout", "bayar", "include"],
        ["cari", "jelajah", "extend"],
      ],
    },
    sequence: {
      title: "Checkout sampai pesanan tercatat",
      participants: [
        ["pelanggan", "Pelanggan", true],
        ["web", "Web (Next.js)"],
        ["api", "API Toko"],
        ["gateway", "Payment Gateway"],
        ["db", "Database"],
      ],
      messages: [
        ["pelanggan", "web", "Klik Checkout"],
        ["web", "api", "POST /orders"],
        ["api", "db", "simpan pesanan (pending)"],
        ["db", "api", "order_id", true],
        ["api", "gateway", "buat tagihan"],
        ["gateway", "api", "url pembayaran", true],
        ["api", "web", "redirect ke pembayaran", true],
        ["pelanggan", "gateway", "bayar via QRIS"],
        ["gateway", "api", "webhook: lunas"],
        ["api", "db", "status = dibayar"],
        ["web", "pelanggan", "Pesanan tercatat", true],
      ],
    },
  },

  "studio-kaos": {
    dfd: {
      entities: [
        ["desainer", "Desainer"],
        ["admin", "Admin Produk"],
      ],
      processes: [
        ["pilih", "Pilih Produk"],
        ["kanvas", "Edit Kanvas"],
        ["ukur", "Konversi Ukuran"],
        ["render", "Generate 3D"],
      ],
      stores: [
        ["template", "Template Baju"],
        ["layer", "Aset Layer"],
        ["desain", "Desain"],
      ],
      flows: [
        ["admin", "pilih", "template baru"],
        ["pilih", "template", "simpan template"],
        ["template", "pilih", "siluet & ukuran"],
        ["desainer", "pilih", "jenis, warna, size"],
        ["pilih", "kanvas", "bidang kanvas"],
        ["desainer", "kanvas", "teks & gambar"],
        ["kanvas", "layer", "simpan layer"],
        ["kanvas", "ukur", "posisi px"],
        ["ukur", "desain", "desain dalam cm"],
        ["desain", "render", "desain final"],
        ["render", "desainer", "mockup 3D"],
      ],
    },
    uml: {
      classes: [
        { id: "design", name: "Design", attrs: ["+id: string", "+garment: Garment", "+layers: Layer[]"], methods: ["+export(): Blob", "+generate3D(): Mockup3D"] },
        { id: "garment", name: "Garment", attrs: ["+jenis: GarmentType", "+warna: string", "+ukuran: Size"], methods: ["+bidang(): Panel[]"] },
        { id: "panel", name: "Panel", attrs: ["+sisi: depan | belakang | lengan", "+lebarCm: number", "+tinggiCm: number"], methods: ["+muat(layer): boolean"] },
        { id: "layer", name: "Layer", stereotype: "abstract", attrs: ["+x: cm", "+y: cm", "+rotasi: number", "+opacity: number"], methods: ["+render(ctx)"] },
        { id: "mockup", name: "Mockup3D", attrs: ["+mesh: Mesh", "+tekstur: Texture"], methods: ["+putar(sudut)", "+tampilSisi(s)"] },
        { id: "text", name: "TextLayer", attrs: ["+teks: string", "+font: string", "+warna: string"], methods: ["+ukurTeks(): cm"] },
        { id: "image", name: "ImageLayer", attrs: ["+src: string", "+filter: Filter"], methods: ["+crop(area)"] },
      ],
      relations: [
        ["design", "garment", "assoc", "1"],
        ["garment", "panel", "compose", "3..*"],
        ["design", "layer", "compose", "1..*"],
        ["design", "mockup", "assoc", "menghasilkan"],
        ["text", "layer", "inherit"],
        ["image", "layer", "inherit"],
      ],
    },
    useCase: {
      system: "Studio Kaos",
      actors: [
        ["desainer", "Desainer", "left"],
        ["admin", "Admin Produk", "right"],
      ],
      cases: [
        ["jenis", "Pilih jenis baju"],
        ["warna", "Atur warna & size"],
        ["layer", "Tambah layer"],
        ["properti", "Atur properti (cm)"],
        ["generate", "Generate mockup 3D"],
        ["simpan", "Simpan desain"],
        ["template", "Kelola template"],
      ],
      links: [
        ["desainer", "jenis"],
        ["desainer", "warna"],
        ["desainer", "layer"],
        ["desainer", "properti"],
        ["desainer", "generate"],
        ["admin", "template"],
      ],
      relations: [
        ["generate", "simpan", "include"],
        ["properti", "layer", "extend"],
      ],
    },
    sequence: {
      title: "Dari kanvas 2D ke mockup 3D",
      participants: [
        ["desainer", "Desainer", true],
        ["editor", "Editor UI"],
        ["engine", "Layer Engine"],
        ["renderer", "Renderer 3D"],
        ["storage", "Storage"],
      ],
      messages: [
        ["desainer", "editor", "Pilih kaos, size M"],
        ["editor", "engine", "buat kanvas (cm)"],
        ["desainer", "editor", "Tambah teks"],
        ["editor", "engine", "addLayer(text)"],
        ["engine", "editor", "posisi dalam cm", true],
        ["desainer", "editor", "Generate 3D"],
        ["editor", "storage", "simpan desain"],
        ["editor", "renderer", "render(desain)"],
        ["renderer", "renderer", "petakan tekstur"],
        ["renderer", "editor", "mockup 3D", true],
        ["editor", "desainer", "tampilkan pratinjau", true],
      ],
    },
  },

  pulse: {
    dfd: {
      entities: [
        ["perawat", "Perawat"],
        ["dokter", "Dokter"],
        ["admin", "Admin RS"],
      ],
      processes: [
        ["antrian", "Kelola Antrian"],
        ["catat", "Catat Perawatan"],
        ["eskalasi", "Eskalasi Prioritas"],
        ["sinkron", "Sinkron Data"],
      ],
      stores: [
        ["jadwal", "Jadwal"],
        ["pasien", "Pasien"],
        ["catatan", "Catatan Medis"],
      ],
      flows: [
        ["admin", "antrian", "jadwal pasien"],
        ["antrian", "jadwal", "simpan jadwal"],
        ["jadwal", "antrian", "antrian hari ini"],
        ["antrian", "perawat", "daftar tugas"],
        ["perawat", "catat", "observasi"],
        ["pasien", "catat", "data pasien"],
        ["catat", "catatan", "catatan baru"],
        ["catat", "eskalasi", "tanda bahaya"],
        ["eskalasi", "dokter", "notifikasi"],
        ["dokter", "eskalasi", "instruksi"],
        ["eskalasi", "perawat", "tindakan"],
        ["catatan", "sinkron", "catatan offline"],
        ["sinkron", "pasien", "status terbaru"],
      ],
    },
    uml: {
      classes: [
        { id: "user", name: "User", stereotype: "abstract", attrs: ["+id: string", "+nama: string", "+peran: Role"], methods: ["+login()"] },
        { id: "perawat", name: "Perawat", attrs: ["+unit: string"], methods: ["+ambilTugas(): CareTask[]"] },
        { id: "dokter", name: "Dokter", attrs: ["+spesialis: string"], methods: ["+beriInstruksi(e)"] },
        { id: "task", name: "CareTask", attrs: ["+id: string", "+jadwal: Date", "+jenis: string", "+selesai: boolean"], methods: ["+tandaiSelesai()"] },
        { id: "patient", name: "Patient", attrs: ["+noRM: string", "+nama: string", "+ruang: string", "+status: Status"], methods: ["+prioritas(): Level"] },
        { id: "escalation", name: "Escalation", attrs: ["+level: Level", "+alasan: string", "+waktu: Date"], methods: ["+kirim()"] },
        { id: "note", name: "Note", attrs: ["+isi: string", "+waktu: Date", "+penulis: User"], methods: ["+sinkron()"] },
      ],
      relations: [
        ["perawat", "user", "inherit"],
        ["dokter", "user", "inherit"],
        ["perawat", "task", "assoc", "mengerjakan"],
        ["patient", "task", "compose", "0..*"],
        ["patient", "note", "compose", "0..*"],
        ["escalation", "patient", "assoc", "1"],
        ["dokter", "escalation", "assoc", "menerima"],
      ],
    },
    useCase: {
      system: "Aplikasi Pulse",
      actors: [
        ["perawat", "Perawat", "left"],
        ["dokter", "Dokter", "right"],
        ["admin", "Admin RS", "right"],
      ],
      cases: [
        ["antrian", "Lihat antrian"],
        ["detail", "Buka detail pasien"],
        ["catat", "Catat observasi"],
        ["eskalasi", "Eskalasi prioritas"],
        ["instruksi", "Beri instruksi"],
        ["jadwal", "Kelola jadwal"],
      ],
      links: [
        ["perawat", "antrian"],
        ["perawat", "detail"],
        ["perawat", "catat"],
        ["dokter", "instruksi"],
        ["dokter", "eskalasi"],
        ["admin", "jadwal"],
      ],
      relations: [
        ["catat", "detail", "include"],
        ["eskalasi", "catat", "extend"],
      ],
    },
    sequence: {
      title: "Catat observasi dan eskalasi",
      participants: [
        ["perawat", "Perawat", true],
        ["app", "App (Expo)"],
        ["api", "API"],
        ["db", "Database"],
        ["dokter", "Dokter", true],
      ],
      messages: [
        ["perawat", "app", "Buka antrian"],
        ["app", "api", "GET /tasks"],
        ["api", "db", "tugas hari ini"],
        ["db", "api", "daftar tugas", true],
        ["api", "app", "tugas + prioritas", true],
        ["perawat", "app", "Catat observasi"],
        ["app", "app", "simpan lokal"],
        ["app", "api", "POST /notes"],
        ["api", "db", "simpan catatan"],
        ["api", "dokter", "push eskalasi"],
        ["dokter", "api", "instruksi"],
        ["api", "app", "instruksi baru", true],
      ],
    },
  },

  maninjau: {
    dfd: {
      entities: [
        ["pengguna", "Pengguna"],
        ["admin", "Admin Konten"],
        ["llm", "LLM API"],
      ],
      processes: [
        ["terima", "Terima Pesan"],
        ["cek", "Cek Konteks"],
        ["susun", "Susun Jawaban"],
        ["kelola", "Kelola Pengetahuan"],
      ],
      stores: [
        ["riwayat", "Riwayat Chat"],
        ["kb", "Basis Pengetahuan"],
        ["prompt", "Prompt Sistem"],
      ],
      flows: [
        ["pengguna", "terima", "pertanyaan"],
        ["terima", "riwayat", "simpan pesan"],
        ["terima", "cek", "pesan"],
        ["riwayat", "cek", "riwayat"],
        ["cek", "pengguna", "klarifikasi"],
        ["cek", "susun", "konteks cukup"],
        ["kb", "susun", "fakta danau"],
        ["prompt", "susun", "aturan nada"],
        ["susun", "llm", "prompt"],
        ["llm", "susun", "teks jawaban"],
        ["susun", "pengguna", "jawaban"],
        ["admin", "kelola", "artikel"],
        ["kelola", "kb", "simpan dokumen"],
      ],
    },
    uml: {
      classes: [
        { id: "session", name: "ChatSession", attrs: ["+id: string", "+mulai: Date"], methods: ["+kirim(pesan)", "+riwayat(): Message[]"] },
        { id: "message", name: "Message", attrs: ["+peran: user | bot", "+isi: string", "+waktu: Date"], methods: ["+ringkas(): string"] },
        { id: "checker", name: "ContextChecker", attrs: ["+ambang: number"], methods: ["+cukup(pesan): boolean", "+klarifikasi(): string"] },
        { id: "responder", name: "Responder", attrs: ["+model: string", "+suhu: number"], methods: ["+jawab(konteks): string"] },
        { id: "prompt", name: "PromptTemplate", attrs: ["+sistem: string", "+nada: string"], methods: ["+render(data): string"] },
        { id: "doc", name: "KnowledgeDoc", attrs: ["+judul: string", "+isi: string", "+topik: string"], methods: ["+cocok(q): number"] },
      ],
      relations: [
        ["session", "message", "compose", "1..*"],
        ["checker", "session", "assoc", "membaca"],
        ["responder", "checker", "assoc", "dipanggil"],
        ["responder", "prompt", "assoc", "1"],
        ["responder", "doc", "assoc", "*"],
      ],
    },
    useCase: {
      system: "Chatbot Maninjau",
      actors: [
        ["pengguna", "Pengguna", "left"],
        ["admin", "Admin Konten", "right"],
        ["llm", "LLM API", "right"],
      ],
      cases: [
        ["mulai", "Mulai percakapan"],
        ["contoh", "Lihat contoh pertanyaan"],
        ["kirim", "Kirim pertanyaan"],
        ["klarifikasi", "Jawab klarifikasi"],
        ["hasil", "Hasilkan jawaban"],
        ["kelola", "Kelola pengetahuan"],
      ],
      links: [
        ["pengguna", "mulai"],
        ["pengguna", "kirim"],
        ["pengguna", "klarifikasi"],
        ["llm", "hasil"],
        ["admin", "kelola"],
      ],
      relations: [
        ["contoh", "mulai", "extend"],
        ["kirim", "hasil", "include"],
        ["klarifikasi", "kirim", "extend"],
      ],
    },
    sequence: {
      title: "Satu pertanyaan sampai jawaban",
      participants: [
        ["pengguna", "Pengguna", true],
        ["ui", "Chat UI"],
        ["backend", "Backend"],
        ["kb", "Knowledge Base"],
        ["llm", "LLM API"],
      ],
      messages: [
        ["pengguna", "ui", "kirim pertanyaan"],
        ["ui", "backend", "POST /chat"],
        ["backend", "backend", "cek konteks"],
        ["backend", "kb", "cari dokumen relevan"],
        ["kb", "backend", "3 potongan fakta", true],
        ["backend", "llm", "prompt + konteks"],
        ["llm", "backend", "jawaban", true],
        ["backend", "ui", "stream jawaban", true],
        ["ui", "pengguna", "tampilkan jawaban", true],
      ],
    },
  },

  "rmb-gallery": {
    dfd: {
      entities: [
        ["tim", "Tim Kreatif"],
        ["klien", "Klien"],
        ["penonton", "Penonton"],
      ],
      processes: [
        ["unggah", "Unggah Unit"],
        ["tinjau", "Tinjau Playback"],
        ["interaksi", "Jalankan Interaksi"],
        ["catat", "Catat Klik"],
      ],
      stores: [
        ["unit", "Unit Iklan"],
        ["aset", "Aset Media"],
        ["log", "Log Interaksi"],
      ],
      flows: [
        ["tim", "unggah", "HTML5 + aset"],
        ["unggah", "unit", "metadata unit"],
        ["unggah", "aset", "file media"],
        ["unit", "tinjau", "daftar unit"],
        ["aset", "tinjau", "aset"],
        ["klien", "tinjau", "pilih unit"],
        ["tinjau", "klien", "playback"],
        ["penonton", "interaksi", "sentuh / geser"],
        ["unit", "interaksi", "state puzzle"],
        ["interaksi", "penonton", "state berikutnya"],
        ["interaksi", "catat", "event CTA"],
        ["catat", "log", "simpan log"],
        ["catat", "klien", "laporan klik"],
      ],
    },
    uml: {
      classes: [
        { id: "gallery", name: "Gallery", attrs: ["+units: AdUnit[]"], methods: ["+filter(tipe): AdUnit[]"] },
        { id: "unit", name: "AdUnit", stereotype: "abstract", attrs: ["+id: string", "+judul: string", "+durasi: number", "+ukuran: string"], methods: ["+play()", "+reset()"] },
        { id: "interaction", name: "Interaction", attrs: ["+jenis: string", "+waktu: Date", "+unitId: string"], methods: ["+kirim()"] },
        { id: "puzzle", name: "PuzzleBanner", attrs: ["+kepingan: number", "+state: number"], methods: ["+geser(i)", "+selesai(): boolean"] },
        { id: "asset", name: "Asset", attrs: ["+tipe: string", "+url: string", "+bobotKb: number"], methods: ["+preload()"] },
        { id: "video", name: "VideoBanner", attrs: ["+src: string", "+loop: boolean"], methods: ["+mute()"] },
        { id: "timeline", name: "Timeline", attrs: ["+keyframes: Frame[]"], methods: ["+seek(t)"] },
      ],
      relations: [
        ["gallery", "unit", "assoc", "*"],
        ["interaction", "unit", "assoc", "1"],
        ["puzzle", "unit", "inherit"],
        ["video", "unit", "inherit"],
        ["unit", "asset", "compose", "1..*"],
        ["unit", "timeline", "compose", "1"],
      ],
    },
    useCase: {
      system: "RMB Gallery",
      actors: [
        ["klien", "Klien", "left"],
        ["penonton", "Penonton", "left"],
        ["tim", "Tim Kreatif", "right"],
      ],
      cases: [
        ["galeri", "Lihat galeri"],
        ["putar", "Putar ulang unit"],
        ["timing", "Atur timing"],
        ["puzzle", "Main puzzle"],
        ["cta", "Klik CTA"],
        ["unggah", "Unggah unit"],
        ["laporan", "Lihat laporan"],
      ],
      links: [
        ["klien", "galeri"],
        ["klien", "putar"],
        ["penonton", "puzzle"],
        ["penonton", "cta"],
        ["tim", "unggah"],
        ["tim", "laporan"],
      ],
      relations: [
        ["timing", "putar", "extend"],
        ["cta", "puzzle", "extend"],
      ],
    },
    sequence: {
      title: "Memainkan puzzle banner",
      participants: [
        ["klien", "Klien", true],
        ["ui", "Gallery UI"],
        ["runtime", "Ad Runtime"],
        ["cdn", "Asset CDN"],
        ["tracker", "Tracker"],
      ],
      messages: [
        ["klien", "ui", "pilih unit"],
        ["ui", "runtime", "load(unit)"],
        ["runtime", "cdn", "ambil aset"],
        ["cdn", "runtime", "sprite & video", true],
        ["runtime", "ui", "siap diputar", true],
        ["klien", "ui", "geser kepingan"],
        ["ui", "runtime", "geser(2)"],
        ["runtime", "runtime", "cek state"],
        ["runtime", "tracker", "event: puzzle_selesai"],
        ["runtime", "ui", "tampilkan CTA", true],
      ],
    },
  },

  "gdk-website": {
    dfd: {
      entities: [
        ["pengunjung", "Pengunjung"],
        ["admin", "Admin"],
      ],
      processes: [
        ["tampil", "Tampilkan Halaman"],
        ["konten", "Kelola Konten"],
        ["kontak", "Proses Kontak"],
      ],
      stores: [
        ["halaman", "Konten Halaman"],
        ["pesan", "Pesan Masuk"],
      ],
      flows: [
        ["pengunjung", "tampil", "buka halaman"],
        ["halaman", "tampil", "konten"],
        ["tampil", "pengunjung", "halaman"],
        ["admin", "konten", "teks & gambar"],
        ["konten", "halaman", "simpan konten"],
        ["pengunjung", "kontak", "form kontak"],
        ["kontak", "pesan", "simpan pesan"],
        ["kontak", "admin", "notifikasi email"],
        ["kontak", "pengunjung", "konfirmasi"],
      ],
    },
    uml: {
      classes: [
        { id: "admin", name: "Admin", attrs: ["+email: string"], methods: ["+ubahKonten()", "+bacaPesan()"] },
        { id: "page", name: "Page", attrs: ["+slug: string", "+judul: string", "+seo: Meta"], methods: ["+render(): HTML"] },
        { id: "section", name: "Section", attrs: ["+tipe: string", "+urutan: number", "+isi: string"], methods: ["+tampil()"] },
        { id: "message", name: "ContactMessage", attrs: ["+nama: string", "+email: string", "+isi: string", "+waktu: Date"], methods: ["+validasi(): boolean", "+kirimNotifikasi()"] },
        { id: "media", name: "Media", attrs: ["+url: string", "+alt: string"], methods: ["+optimasi()"] },
      ],
      relations: [
        ["admin", "page", "assoc", "mengelola"],
        ["page", "section", "compose", "1..*"],
        ["admin", "message", "assoc", "membaca"],
        ["section", "media", "assoc", "0..*"],
      ],
    },
    useCase: {
      system: "Website GDK",
      actors: [
        ["pengunjung", "Pengunjung", "left"],
        ["admin", "Admin", "right"],
      ],
      cases: [
        ["beranda", "Lihat beranda"],
        ["profil", "Baca profil"],
        ["kontak", "Kirim pesan kontak"],
        ["validasi", "Validasi form"],
        ["konten", "Kelola konten"],
        ["pesan", "Baca pesan masuk"],
      ],
      links: [
        ["pengunjung", "beranda"],
        ["pengunjung", "profil"],
        ["pengunjung", "kontak"],
        ["admin", "konten"],
        ["admin", "pesan"],
      ],
      relations: [["kontak", "validasi", "include"]],
    },
    sequence: {
      title: "Mengirim pesan kontak",
      participants: [
        ["pengunjung", "Pengunjung", true],
        ["browser", "Browser"],
        ["next", "Next.js"],
        ["form", "Form API"],
        ["email", "Email Service"],
      ],
      messages: [
        ["pengunjung", "browser", "buka /kontak"],
        ["browser", "next", "GET /kontak"],
        ["next", "browser", "HTML statis", true],
        ["pengunjung", "browser", "isi & kirim form"],
        ["browser", "browser", "validasi input"],
        ["browser", "form", "POST pesan"],
        ["form", "email", "kirim notifikasi"],
        ["form", "browser", "200 OK", true],
        ["browser", "pengunjung", "pesan terkirim", true],
      ],
    },
  },

  "codinganeh-gpt": {
    dfd: {
      entities: [
        ["pengguna", "Pengguna"],
        ["admin", "Admin Merek"],
        ["openai", "OpenAI API"],
      ],
      processes: [
        ["auth", "Autentikasi"],
        ["chat", "Kelola Percakapan"],
        ["prompt", "Bangun Prompt Merek"],
        ["persona", "Atur Persona"],
      ],
      stores: [
        ["akun", "Akun"],
        ["percakapan", "Percakapan"],
        ["merek", "Profil Merek"],
      ],
      flows: [
        ["pengguna", "auth", "login"],
        ["auth", "akun", "sesi"],
        ["auth", "pengguna", "token"],
        ["pengguna", "chat", "pesan"],
        ["chat", "percakapan", "simpan pesan"],
        ["chat", "prompt", "pesan + riwayat"],
        ["merek", "prompt", "nada & batas"],
        ["prompt", "openai", "prompt"],
        ["openai", "prompt", "respons"],
        ["prompt", "chat", "jawaban"],
        ["chat", "pengguna", "jawaban"],
        ["admin", "persona", "persona"],
        ["persona", "merek", "simpan profil"],
      ],
    },
    uml: {
      classes: [
        { id: "user", name: "User", attrs: ["+id: string", "+email: string"], methods: ["+login()"] },
        { id: "conversation", name: "Conversation", attrs: ["+id: string", "+judul: string", "+dibuat: Date"], methods: ["+tambah(msg)", "+ringkas()"] },
        { id: "message", name: "Message", attrs: ["+peran: string", "+isi: string", "+token: number"], methods: ["+hitungToken()"] },
        { id: "assistant", name: "Assistant", attrs: ["+model: string", "+suhu: number"], methods: ["+balas(conv): Message"] },
        { id: "brand", name: "BrandProfile", attrs: ["+nama: string", "+nada: string", "+larangan: string[]"], methods: ["+systemPrompt(): string"] },
        { id: "suggestion", name: "Suggestion", attrs: ["+teks: string", "+kategori: string"], methods: ["+pakai()"] },
      ],
      relations: [
        ["user", "conversation", "compose", "0..*"],
        ["conversation", "message", "compose", "1..*"],
        ["assistant", "conversation", "assoc", "membalas"],
        ["assistant", "brand", "assoc", "1"],
        ["brand", "suggestion", "compose", "0..*"],
      ],
    },
    useCase: {
      system: "CodingAneh GPT",
      actors: [
        ["pengguna", "Pengguna", "left"],
        ["admin", "Admin Merek", "right"],
        ["openai", "OpenAI API", "right"],
      ],
      cases: [
        ["masuk", "Masuk akun"],
        ["mulai", "Mulai chat baru"],
        ["saran", "Pilih saran pertanyaan"],
        ["kirim", "Kirim pesan"],
        ["riwayat", "Lihat riwayat"],
        ["jawab", "Hasilkan jawaban bermerek"],
        ["persona", "Atur persona merek"],
      ],
      links: [
        ["pengguna", "masuk"],
        ["pengguna", "mulai"],
        ["pengguna", "kirim"],
        ["pengguna", "riwayat"],
        ["openai", "jawab"],
        ["admin", "persona"],
      ],
      relations: [
        ["mulai", "masuk", "include"],
        ["saran", "mulai", "extend"],
        ["kirim", "jawab", "include"],
      ],
    },
    sequence: {
      title: "Satu pesan dengan nada merek",
      participants: [
        ["pengguna", "Pengguna", true],
        ["ui", "Chat UI"],
        ["api", "API Route"],
        ["store", "Brand Store"],
        ["openai", "OpenAI"],
      ],
      messages: [
        ["pengguna", "ui", "kirim pesan"],
        ["ui", "api", "POST /api/chat"],
        ["api", "store", "ambil profil merek"],
        ["store", "api", "nada + batas", true],
        ["api", "api", "susun system prompt"],
        ["api", "openai", "chat.completions"],
        ["openai", "api", "stream token", true],
        ["api", "ui", "stream jawaban", true],
        ["ui", "pengguna", "tampilkan jawaban", true],
      ],
    },
  },

  "mikrotik-panel": {
    dfd: {
      entities: [
        ["tamu", "Tamu"],
        ["admin", "Admin Jaringan"],
      ],
      processes: [
        ["login", "Tampilkan Login"],
        ["auth", "Autentikasi"],
        ["sesi", "Kelola Sesi"],
        ["voucher", "Kelola Voucher"],
      ],
      stores: [
        ["user", "User Hotspot"],
        ["profil", "Profil Bandwidth"],
        ["aktif", "Sesi Aktif"],
      ],
      flows: [
        ["tamu", "login", "buka browser"],
        ["login", "tamu", "halaman login"],
        ["tamu", "auth", "username & sandi"],
        ["user", "auth", "kredensial"],
        ["auth", "tamu", "pesan gagal"],
        ["auth", "sesi", "login sah"],
        ["profil", "sesi", "batas kecepatan"],
        ["sesi", "aktif", "sesi baru"],
        ["sesi", "tamu", "status terhubung"],
        ["admin", "voucher", "voucher & profil"],
        ["voucher", "user", "simpan user"],
        ["voucher", "profil", "simpan profil"],
      ],
    },
    uml: {
      classes: [
        { id: "page", name: "LoginPage", attrs: ["+branding: Brand", "+pesan: string"], methods: ["+tampilkanError(kode)"] },
        { id: "session", name: "Session", attrs: ["+mac: string", "+ip: string", "+mulai: Date", "+sisaWaktu: number"], methods: ["+putus()"] },
        { id: "user", name: "HotspotUser", attrs: ["+username: string", "+password: string"], methods: ["+cocok(pw): boolean"] },
        { id: "profile", name: "UserProfile", attrs: ["+nama: string", "+rateLimit: string", "+durasi: number"], methods: ["+terapkan(sesi)"] },
        { id: "voucher", name: "Voucher", attrs: ["+kode: string", "+kadaluarsa: Date"], methods: ["+aktifkan()"] },
      ],
      relations: [
        ["page", "session", "assoc", "membuat"],
        ["session", "user", "assoc", "0..* .. 1"],
        ["user", "profile", "assoc", "*..1"],
        ["voucher", "user", "inherit"],
      ],
    },
    useCase: {
      system: "Hotspot Login",
      actors: [
        ["tamu", "Tamu", "left"],
        ["admin", "Admin Jaringan", "right"],
      ],
      cases: [
        ["portal", "Buka portal"],
        ["masuk", "Masuk hotspot"],
        ["status", "Lihat status sesi"],
        ["keluar", "Keluar"],
        ["validasi", "Validasi kredensial"],
        ["voucher", "Buat voucher"],
        ["profil", "Atur profil bandwidth"],
      ],
      links: [
        ["tamu", "portal"],
        ["tamu", "masuk"],
        ["tamu", "status"],
        ["tamu", "keluar"],
        ["admin", "voucher"],
        ["admin", "profil"],
      ],
      relations: [["masuk", "validasi", "include"]],
    },
    sequence: {
      title: "Tamu masuk ke jaringan",
      participants: [
        ["tamu", "Tamu", true],
        ["browser", "Browser"],
        ["page", "Login Page"],
        ["router", "RouterOS"],
        ["db", "User DB"],
      ],
      messages: [
        ["tamu", "browser", "buka situs apa saja"],
        ["browser", "router", "HTTP request"],
        ["router", "browser", "redirect /login", true],
        ["browser", "page", "tampilkan form"],
        ["tamu", "page", "kirim user & sandi"],
        ["page", "router", "POST /login"],
        ["router", "db", "cek kredensial"],
        ["db", "router", "valid, profil 5M", true],
        ["router", "router", "buat sesi"],
        ["router", "browser", "redirect /status", true],
      ],
    },
  },

  "neodeeps-platform": {
    dfd: {
      entities: [
        ["anggota", "Anggota"],
        ["penyelenggara", "Penyelenggara"],
        ["moderator", "Moderator"],
      ],
      processes: [
        ["jelajah", "Jelajah Komunitas"],
        ["event", "Kelola Event"],
        ["gabung", "Gabung Event"],
        ["moderasi", "Moderasi"],
      ],
      stores: [
        ["komunitas", "Komunitas"],
        ["devent", "Event"],
        ["peserta", "Peserta"],
      ],
      flows: [
        ["anggota", "jelajah", "minat & kota"],
        ["komunitas", "jelajah", "daftar komunitas"],
        ["jelajah", "anggota", "rekomendasi"],
        ["penyelenggara", "event", "detail event"],
        ["event", "devent", "simpan event"],
        ["devent", "gabung", "kuota"],
        ["anggota", "gabung", "gabung"],
        ["gabung", "peserta", "data peserta"],
        ["gabung", "anggota", "tiket"],
        ["moderator", "moderasi", "laporan"],
        ["devent", "moderasi", "data event"],
        ["moderasi", "penyelenggara", "teguran"],
      ],
    },
    uml: {
      classes: [
        { id: "member", name: "Member", attrs: ["+id: string", "+nama: string", "+kota: string", "+minat: string[]"], methods: ["+gabung(event)"] },
        { id: "registration", name: "Registration", attrs: ["+status: string", "+waktu: Date"], methods: ["+batal()"] },
        { id: "event", name: "Event", attrs: ["+judul: string", "+tanggal: Date", "+lokasi: string", "+kuota: number"], methods: ["+sisaKursi(): number"] },
        { id: "organizer", name: "Organizer", attrs: ["+terverifikasi: boolean"], methods: ["+buatEvent(): Event"] },
        { id: "community", name: "Community", attrs: ["+nama: string", "+kota: string", "+topik: string"], methods: ["+anggota(): Member[]"] },
      ],
      relations: [
        ["member", "registration", "assoc", "0..*"],
        ["event", "registration", "compose", "0..*"],
        ["organizer", "member", "inherit"],
        ["community", "event", "compose", "0..*"],
        ["member", "community", "assoc", "* .. *"],
      ],
    },
    useCase: {
      system: "Platform NEODEEPS",
      actors: [
        ["anggota", "Anggota", "left"],
        ["penyelenggara", "Penyelenggara", "right"],
        ["moderator", "Moderator", "right"],
      ],
      cases: [
        ["jelajah", "Jelajah komunitas"],
        ["filter", "Filter minat & kota"],
        ["detail", "Lihat detail event"],
        ["gabung", "Gabung event"],
        ["status", "Lihat status aplikasi"],
        ["buat", "Buat event"],
        ["moderasi", "Moderasi konten"],
      ],
      links: [
        ["anggota", "jelajah"],
        ["anggota", "detail"],
        ["anggota", "gabung"],
        ["anggota", "status"],
        ["penyelenggara", "buat"],
        ["moderator", "moderasi"],
      ],
      relations: [
        ["filter", "jelajah", "extend"],
        ["gabung", "detail", "include"],
      ],
    },
    sequence: {
      title: "Anggota bergabung ke event",
      participants: [
        ["anggota", "Anggota", true],
        ["web", "Web App"],
        ["api", "API"],
        ["db", "Database"],
        ["penyelenggara", "Penyelenggara", true],
      ],
      messages: [
        ["anggota", "web", "Gabung event"],
        ["web", "api", "POST /events/:id/join"],
        ["api", "db", "cek kuota"],
        ["db", "api", "sisa 6 kursi", true],
        ["api", "db", "simpan peserta"],
        ["api", "penyelenggara", "notifikasi peserta baru"],
        ["api", "web", "tiket", true],
        ["web", "anggota", "kamu terdaftar", true],
      ],
    },
  },
};

export function diagramsFor(slug: string) {
  return diagrams[slug];
}
