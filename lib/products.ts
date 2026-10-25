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

export const products: DigitalProduct[] = [
  {
    id: "aruna",
    name: "ARUNA",
    kind: "Website",
    price: 2_500_000,
    priceNote: "Website ecommerce siap pakai",
    summary:
      "Toko fashion kontemporer lengkap: beranda editorial, etalase, detail produk, tas, dan fondasi checkout.",
    cover: "/porto/aruna/1.png",
    gallery: [
      "/porto/aruna/1.png",
      "/porto/aruna/2.png",
      "/porto/aruna/3.png",
      "/porto/aruna/4.png",
    ],
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
    full: {
      overview:
        "ARUNA dirancang sebagai lookbook yang bisa dibeli. Pengunjung membaca janji merek dulu, baru masuk ke kategori, kurasi editor, dan produk. Ongkir, retur, dan metode bayar ditulis jelas sebelum checkout, supaya keputusan beli tidak dibebani tebakan.",
      features: [
        {
          title: "Hero musim & janji merek",
          body: "Beranda membuka koleksi musim dengan CTA ke koleksi dan lookbook, ditambah bar info gratis ongkir, retur 30 hari, dan kode promo.",
        },
        {
          title: "Belanja menurut bentuk",
          body: "Enam kategori: atasan, bawahan, outerwear, dress, aksesori, dan sepatu — plus empat dunia koleksi (Musim Baru, Essentials, Evening, Workwear).",
        },
        {
          title: "Kartu produk yang tenang",
          body: "Harga rupiah, harga coret, label Baru/diskon, dan kategori terbaca sekilas tanpa banner yang berteriak.",
        },
        {
          title: "Tas belanja",
          body: "Panel tas menampilkan sisa belanja menuju gratis ongkir dan ajakan yang jelas saat tas masih kosong.",
        },
        {
          title: "Kurasi editorial",
          body: "Pilihan editor, Baru tiba, Terlaris, dan blok Workwear — konten bisa diganti tanpa merombak layout.",
        },
        {
          title: "Jurnal & kepercayaan",
          body: "Bagian jurnal, testimoni pelanggan, newsletter, FAQ, dan halaman pengiriman/retur untuk membangun kepercayaan.",
        },
      ],
      stack: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
      delivery: [
        {
          title: "Brief & penyesuaian merek",
          body: "Nama, nada, palet, dan struktur kategori disesuaikan dengan merek Anda.",
        },
        {
          title: "Isi katalog",
          body: "Produk, harga, foto, dan kebijakan toko dimasukkan atau disiapkan strukturnya.",
        },
        {
          title: "Uji & rilis",
          body: "Pengecekan tampilan di ponsel dan desktop, lalu deploy ke domain Anda.",
        },
        {
          title: "Serah terima",
          body: "Kode, panduan singkat mengelola konten, dan catatan keputusan ikut diserahkan.",
        },
      ],
      faq: [
        {
          q: "Apakah harga sudah termasuk domain dan hosting?",
          a: "Belum. Harga mencakup website dan serah terima. Domain dan hosting bisa saya bantu siapkan terpisah sesuai kebutuhan.",
        },
        {
          q: "Apakah checkout dan pembayaran sudah terhubung?",
          a: "Paket dasar menyiapkan fondasi alur belanja dan checkout. Integrasi payment gateway dibahas dulu sesuai provider yang Anda pakai.",
        },
        {
          q: "Bisa diganti ke merek saya sendiri?",
          a: "Bisa. Identitas, copy, kategori, dan palet disesuaikan; struktur toko tetap dipertahankan.",
        },
      ],
    },
  },
  {
    id: "studio-kaos",
    name: "Studio Kaos",
    kind: "Software",
    price: 1_500_000,
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
    full: {
      overview:
        "Banyak generator mockup memakai gambar baju jadi, sehingga desain tidak terikat ukuran fisik. Studio Kaos membalik urutannya: pilih produk dan size dulu, desain di bidang baju dengan satuan cm, baru generate 3D. Yang Anda lihat di layar mengikuti skala di kain.",
      features: [
        {
          title: "Kanvas 2D berbasis cm",
          body: "Satu unit sama dengan satu centimeter, 1:1 dengan model. Posisi dan ukuran objek tidak lagi berupa angka piksel yang menyesatkan.",
        },
        {
          title: "Produk, size, dan sisi",
          body: "Pilih jenis baju dan ukuran, lalu rancang per sisi (depan, belakang, dan seterusnya) di bidangnya masing-masing.",
        },
        {
          title: "Layer & properti",
          body: "Teks dan gambar sebagai layer, dengan panel properti untuk posisi, ukuran, dan rotasi dalam satuan cm.",
        },
        {
          title: "Generate mockup 3D",
          body: "Desain dipetakan ke model 3D sehingga Anda bisa memutar dan meninjau hasil di tubuh sebelum produksi.",
        },
        {
          title: "Tinjau sisi lain",
          body: "Setelah 3D jadi, kembali ke kanvas untuk merapikan sisi lain tanpa memulai dari nol.",
        },
      ],
      stack: ["Next.js", "TypeScript", "Canvas 2D", "WebGL / 3D"],
      delivery: [
        {
          title: "Demo & evaluasi",
          body: "Coba versi live untuk memastikan alurnya cocok dengan kebutuhan produksi Anda.",
        },
        {
          title: "Lisensi & penyiapan",
          body: "Lisensi sekali bayar disiapkan beserta panduan instal/akses.",
        },
        {
          title: "Pendampingan awal",
          body: "Dampingan singkat di awal pemakaian, lalu opsi perawatan lanjutan jika dibutuhkan.",
        },
      ],
      faq: [
        {
          q: "Apakah ada biaya bulanan?",
          a: "Paket yang tertera adalah lisensi sekali bayar. Perawatan atau pembaruan lanjutan dibahas terpisah bila diperlukan.",
        },
        {
          q: "Bisa menambah jenis baju lain?",
          a: "Bisa, selama modelnya tersedia. Penambahan produk baru dibahas sebagai pekerjaan terpisah.",
        },
        {
          q: "Apakah bisa dicoba dulu?",
          a: "Bisa. Kamu dapat mencoba versi live di mockup.neodeeps.com sebelum memutuskan.",
        },
      ],
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
    full: {
      overview:
        "Komunitas online sering ramai di layar tetapi sepi di lapangan. NEODEEPS Platform dirancang dari alur minat → komunitas → event → RSVP, supaya orang yang sejalan benar-benar bertemu. Produk ini masih dalam pengembangan dan ditulis jujur sebagai beta.",
      features: [
        {
          title: "Pilih minat",
          body: "Filter awal agar pengunjung langsung diarahkan ke komunitas yang relevan.",
        },
        {
          title: "Jelajah komunitas",
          body: "Halaman komunitas dengan arah yang jelas, bukan daftar panjang tanpa konteks.",
        },
        {
          title: "Event & RSVP",
          body: "Lihat kapan dan di mana, lalu kunci kursi lewat RSVP sederhana.",
        },
        {
          title: "Fondasi front-end",
          body: "Dibangun dengan TypeScript sebagai wajah publik yang bisa dikembangkan bertahap.",
        },
      ],
      stack: ["Next.js", "TypeScript", "React"],
      delivery: [
        {
          title: "Diskusi scope",
          body: "Kita petakan komunitas, jenis event, dan fitur yang benar-benar dibutuhkan.",
        },
        {
          title: "Penawaran tetap",
          body: "Setelah scope jelas, harga disepakati sebelum pengerjaan.",
        },
        {
          title: "Bangun bertahap",
          body: "Rilis bertahap dengan status fitur yang jujur: prototipe tetap ditulis prototipe.",
        },
      ],
      faq: [
        {
          q: "Kenapa harganya custom?",
          a: "Karena produk ini dibangun sesuai kebutuhan komunitas Anda. Scope menentukan harga, jadi dibahas dulu.",
        },
        {
          q: "Apakah aplikasi mobilenya sudah ada?",
          a: "Belum. Aplikasi mobile masih dalam pengembangan dan tidak dijanjikan sebagai bagian dari paket awal.",
        },
      ],
    },
  },
];

export function getProductById(id: string) {
  return products.find((product) => product.id === id);
}

export const productKinds = ["Semua", "Website", "Software", "Platform"] as const;

export function productsByKind(kind: (typeof productKinds)[number]) {
  if (kind === "Semua") return products;
  return products.filter((product) => product.kind === kind);
}
