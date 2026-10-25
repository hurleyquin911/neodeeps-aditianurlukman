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
  /** Cover kartu produk. */
  cover?: string;
  /** Gambar carousel di popup dan halaman detail. */
  gallery?: string[];
  tags: string[];
  /** Tautan demo live (tampil di halaman Full Detail). */
  demo?: string;
  /** Ringkasan untuk popup. */
  detail: {
    pitch: string;
    includes: string[];
    suitableFor: string;
  };
  /** Konten lengkap untuk halaman /products/[id]. */
  full: {
    overview: string;
    features: { title: string; body: string }[];
    stack: string[];
    delivery: { title: string; body: string }[];
    faq: { q: string; a: string }[];
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

export function productImages(product: DigitalProduct) {
  if (product.gallery?.length) return product.gallery;
  if (product.cover) return [product.cover];
  return [];
}

/**
 * Daftar produk. Saat ini kosong — halaman /products menampilkan
 * keadaan "segera hadir". Tambahkan objek DigitalProduct di sini
 * (lihat tipe di atas) dan kartu, popup, serta halaman detail
 * /products/[id] otomatis muncul.
 */
export const products: DigitalProduct[] = [];

export function getProductById(id: string) {
  return products.find((product) => product.id === id);
}

export const productKinds = ["Semua", "Website", "Software", "Platform"] as const;

export function productsByKind(kind: (typeof productKinds)[number]) {
  if (kind === "Semua") return products;
  return products.filter((product) => product.kind === kind);
}
