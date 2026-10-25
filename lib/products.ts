export type ProductKind = "Website" | "Software" | "Platform";

export type DigitalProduct = {
  id: string;
  name: string;
  kind: ProductKind;
  /** Harga dalam rupiah. Null = custom / hubungi. */
  price: number | null;
  /** Keterangan singkat di bawah harga, mis. "lisensi sekali bayar". */
  priceNote: string;
  summary: string;
  cover?: string;
  tags: string[];
  demo?: string;
  detail: {
    pitch: string;
    includes: string[];
    suitableFor: string;
  };
};

export function formatPrice(price: number | null) {
  if (price === null) return "Custom";
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(price);
}

export const products: DigitalProduct[] = [
  {
    id: "aruna",
    name: "ARUNA",
    kind: "Website",
    price: 8_500_000,
    priceNote: "Website ecommerce siap pakai",
    summary:
      "Toko fashion kontemporer lengkap: beranda editorial, etalase, detail produk, tas, dan fondasi checkout.",
    cover: "/porto/aruna/1.png",
    tags: ["Ecommerce", "Next.js", "UI"],
    demo: "https://ecommerce.neodeeps.com/",
    detail: {
      pitch:
        "ARUNA adalah website ecommerce siap dipakai untuk merek fashion yang ingin terasa editorial — bukan katalog yang berisik. Hirarki musim, kategori, dan kartu produk sudah disusun; ongkir, retur, dan pembayaran masuk sebagai kelanjutan alami.",
      includes: [
        "Beranda hero + koleksi musim",
        "Belanja menurut bentuk (kategori)",
        "Kartu produk, status Baru/diskon, harga rupiah",
        "Tas belanja dengan ambang gratis ongkir",
        "Halaman pendukung: lookbook, jurnal, FAQ, retur",
        "Penyerahan kode dan panduan singkat",
      ],
      suitableFor:
        "Merek fashion, studio baju, atau toko yang butuh wajah digital tenang dengan alur belanja yang jelas.",
    },
  },
  {
    id: "studio-kaos",
    name: "Studio Kaos",
    kind: "Software",
    price: 3_500_000,
    priceNote: "Lisensi sekali bayar",
    summary:
      "Software mockup baju 2D ke 3D dengan skala centimeter — desain di kanvas, pratinjau di tubuh.",
    tags: ["3D", "Mockup", "Canvas"],
    demo: "https://mockup.neodeeps.com/",
    detail: {
      pitch:
        "Studio Kaos adalah software untuk merancang mockup baju dengan satuan yang jujur. Pilih produk dan ukuran, susun layer di bidang baju, lalu generate pratinjau 3D tanpa kehilangan skala sungguhan.",
      includes: [
        "Kanvas desain 2D berbasis cm",
        "Panel produk, size, dan sisi baju",
        "Layer teks/gambar di bidang kain",
        "Generate mockup 3D",
        "Akses demo live untuk evaluasi",
        "Serah terima lisensi + catatan pemakaian",
      ],
      suitableFor:
        "Brand apparel, konveksi, atau desainer yang butuh mockup akurat sebelum produksi.",
    },
  },
  {
    id: "neodeeps-platform",
    name: "NEODEEPS Platform",
    kind: "Platform",
    price: null,
    priceNote: "Harga menyesuaikan scope",
    summary:
      "Fondasi platform komunitas dan event: minat, komunitas, RSVP, sampai pertemuan di dunia nyata.",
    tags: ["Community", "TypeScript", "Beta"],
    detail: {
      pitch:
        "NEODEEPS Platform menghubungkan minat dengan pertemuan nyata. Produk ini masih berkembang — cocok jika Anda butuh fondasi komunitas + event yang dibangun sesuai kebutuhan, bukan template generik.",
      includes: [
        "Struktur minat → komunitas → event",
        "Alur RSVP dan penjadwalan",
        "Fondasi front-end TypeScript",
        "Identitas visual dasar",
        "Diskusi scope sebelum penawaran tetap",
      ],
      suitableFor:
        "Komunitas, studio, atau organisasi yang ingin platform sendiri — bukan hanya grup chat.",
    },
  },
];

export const productKinds = ["Semua", "Website", "Software", "Platform"] as const;

export function productsByKind(kind: (typeof productKinds)[number]) {
  if (kind === "Semua") return products;
  return products.filter((product) => product.kind === kind);
}
