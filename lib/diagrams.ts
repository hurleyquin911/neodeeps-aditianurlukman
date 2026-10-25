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
  }
};

export function diagramsFor(slug: string) {
  return diagrams[slug];
}
