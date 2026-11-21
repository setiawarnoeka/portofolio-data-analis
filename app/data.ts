// ============================================================
// SEMUA ISI WEBSITE ADA DI FILE INI. Ubah teks di sini, bukan di page.tsx.
// Kolom yang dikosongkan ("") otomatis disembunyikan dari halaman.
// ============================================================

export const profile = {
  name: "Eka Rezky Setiawarno",
  campus: "Universitas Gunadarma",
  gradYear: "2027",
  email: "ekarezkyst@gmail.com",
  linkedin: "https://www.linkedin.com/in/setiawarno-eka/",
  github: "https://github.com/setiawarnoeka",
  cv: "cv-eka-rezky.pdf", // setelah ada: taruh file di folder public, lalu isi "/cv-eka-rezky.pdf"
  photo: "fotoprofessional.jpeg", // setelah ada: taruh di folder public, lalu isi "/foto.jpg"
};

export type ThemeKey = "blue" | "teal" | "amber" | "coral" | "violet";

export const themes: Record<
  ThemeKey,
  { ring: [string, string]; chipBg: string; chipFg: string; link: string; shot: string }
> = {
  blue: { ring: ["#2447C9", "#7C3AED"], chipBg: "#E8EEFD", chipFg: "#243A8A", link: "#2447C9", shot: "linear-gradient(180deg,#DCE6FF 0%,#F6F8FF 100%)" },
  teal: { ring: ["#0E8F9B", "#2447C9"], chipBg: "#E3F4F6", chipFg: "#0B5E66", link: "#0B7480", shot: "linear-gradient(180deg,#D3F0F3 0%,#F4FBFC 100%)" },
  amber: { ring: ["#F2A900", "#E4572E"], chipBg: "#FFF1CC", chipFg: "#6B4700", link: "#8A5A00", shot: "linear-gradient(180deg,#FFE7AE 0%,#FFFBF0 100%)" },
  coral: { ring: ["#E4572E", "#7C3AED"], chipBg: "#FDE9E2", chipFg: "#9C2F10", link: "#B4381A", shot: "linear-gradient(180deg,#FAD6CB 0%,#FFF7F4 100%)" },
  violet: { ring: ["#7C3AED", "#2447C9"], chipBg: "#EFE7FF", chipFg: "#4C1D95", link: "#6D28D9", shot: "linear-gradient(180deg,#E4D9FF 0%,#F8F5FF 100%)" },
};

export type Category = "data" | "ml" | "web" | "desain";

export type Project = {
  badge: string;
  title: string;
  cats: Category[];
  theme: ThemeKey;
  stack: string[];
  masalah: string;
  solusi: string;
  hasil: string;
  image?: string;
  stats?: { value: number; decimals?: number; prefix?: string; suffix?: string; label: string }[]; // contoh: "/proyek-olist.png" (taruh file di folder public)
  links: { label: string; href: string }[]; // href kosong = tombol disembunyikan
  hidden?: boolean; // true = belum ditampilkan (materinya belum siap)
};

export const categoryLabels: Record<Category, string> = {
  data: "Data",
  ml: "Machine learning",
  web: "Web",
  desain: "Desain",
};

export const projects: Project[] = [
  {
    badge: "Proyek 1",
    title: "Analisis Risiko Gagal Bayar Kartu Kredit",
    cats: ["data", "ml"],
    theme: "coral",
    stack: ["Python", "SQL", "DuckDB", "scikit-learn", "Streamlit"],
    image: "/risikokredit.png",
    masalah:
      "Nasabah seperti apa yang paling berisiko gagal bayar bulan depan, dan seberapa akurat risikonya bisa diprediksi?",
    solusi:
      "Segmentasi 29.965 nasabah dengan SQL, membandingkan Logistic Regression dan Gradient Boosting, menentukan ambang keputusan berbasis biaya, lalu membuat dashboard Streamlit dengan simulator risiko.",
    hasil:
      "Segmen risiko Tinggi hanya 16,4% nasabah tetapi menyumbang 45,1% kasus gagal bayar. Nasabah yang telat 1 bulan gagal bayar 34,0%, dan yang telat 2 bulan 69,1%. Gradient Boosting mencapai ROC-AUC 0,778 dan recall 64,2% pada data uji. Ambang berbasis biaya (asumsi 5:1) menurunkan biaya 49,8%, tetapi ambang dipilih di data uji sehingga cenderung optimistis.",
    stats: [
      { value: 45.1, decimals: 1, suffix: "%", label: "kasus gagal bayar berasal dari segmen risiko Tinggi" },
      { value: 69.1, decimals: 1, suffix: "%", label: "gagal bayar pada nasabah yang telat 2 bulan" },
      { value: 0.778, decimals: 3, label: "ROC-AUC model terbaik (data uji)" },
    ],
      links: [
      { label: "Dashboard langsung", href: "https://risiko-kredit-setiawarnoeka.streamlit.app/" },
      { label: "GitHub", href: "https://github.com/setiawarnoeka/risiko-kredit" },
    ],
  },
  {
    badge: "Proyek 2",
    title: "Deteksi Kantuk dengan CNN",
    cats: ["ml"],
    theme: "blue",
    stack: ["Python", "CNN", "Computer vision", "TensorFlow", "OpenCV"],
    image: "/deteksikantuk.png",
    masalah: "Mengenali kantuk pengemudi lebih awal lewat kondisi mata.",
    solusi:
      "Model CNN yang mengklasifikasikan citra area mata sebagai terjaga atau mengantuk, dijalankan real-time lewat webcam dengan alarm saat mengantuk lebih dari 3 detik.",
    hasil:
      "Akurasi 99,26% pada 269 citra uji (f1-score 0,99 untuk kedua kelas). Dataset 1.446 citra dari satu kamera laptop, belum diuji pada orang lain di luar data training.",
    stats: [
      { value: 99.26, decimals: 2, suffix: "%", label: "akurasi pada 269 citra uji" },
      { value: 1446, label: "citra dalam dataset" },
    ],
      links: [
      { label: "Video demo", href: "https://youtu.be/3GSKgxiO_bY" },
      { label: "GitHub", href: "https://github.com/setiawarnoeka/drowsiness-detection-cnn" },
    ],
  },
  {
    badge: "Proyek 3",
    title: "Analisis Data E-Commerce (Olist)",
    cats: ["data"],
    theme: "amber",
    stack: ["Python", "Google Colab", "Streamlit"],
    image: "/analisisolist.png",
    masalah:
      "Kategori produk dan state mana yang menghasilkan revenue terbesar selama 2017–2018, dan bagaimana perilaku belanja ulang pelanggan?",
    solusi:
      "Analisis eksplorasi di Google Colab, lalu ditampilkan lewat dashboard Streamlit yang interaktif.",
    hasil:
      "health_beauty jadi kategori teratas (9,45% revenue). SP, RJ, dan MG menyumbang sekitar 63% revenue. Sebanyak 97% pelanggan hanya berbelanja sekali.",
    stats: [
      { value: 97.03, decimals: 2, suffix: "%", label: "pelanggan hanya berbelanja sekali" },
      { value: 63, prefix: "±", suffix: "%", label: "revenue dari SP, RJ, dan MG" },
    ],
      links: [
      { label: "Dashboard langsung", href: "https://8cdyy4kjgowgs7cvsvhimk.streamlit.app/" },
      { label: "GitHub", href: "https://github.com/setiawarnoeka/submission-proyek-analisis-data" },
    ],
  },
  {
    badge: "Proyek 3",
    title: "Proyek Capstone UMKM",
    cats: ["web", "ml"],
    theme: "teal",
    stack: ["[Tech stack]"],
    masalah: "[Masalah bisnis apa yang tim selesaikan untuk UMKM makanan dan minuman?]",
    solusi: "[Peran kamu dan apa yang kamu kerjakan]",
    hasil: "[Isi hasilnya setelah proyek selesai]",
    links: [],
    hidden: true, // ubah ke false kalau sudah diisi
  },
  {
    badge: "Proyek 4",
    title: "Website Resep",
    cats: ["web"],
    theme: "coral",
    stack: ["[Tech stack]"],
    masalah: "[Masalah apa yang mau diselesaikan website ini?]",
    solusi: "Website untuk menjelajahi dataset resep, dibuat dan dijalankan di komputer sendiri (lokal).",
    hasil: "[Isi fitur utama atau hal yang kamu pelajari]",
    links: [],
    hidden: true,
  },
  {
    badge: "Desain",
    title: "Prototype [Nama aplikasi]",
    cats: ["desain"],
    theme: "violet",
    stack: ["Figma", "UI/UX"],
    masalah: "[Aplikasinya untuk siapa dan menyelesaikan apa]",
    solusi: "[Peran dan apa yang kamu rancang]",
    hasil: "[Hasil atau hal yang dipelajari]",
    links: [{ label: "Buka prototype", href: "" }],
    hidden: true,
  },
    {
    badge: "Desain",
    title: "Animasi Layanan Masyarakat: Peduli Kebersihan Lingkungan",
    cats: ["desain"],
    theme: "coral",
    stack: ["Blender", "Animasi 3D"],
    image: "/gambaranimasi.png",
    masalah:
      "Sampah yang dibuang sembarangan di lingkungan permukiman terlihat sepele, padahal bisa mencelakai orang lain.",
    solusi:
      "Animasi 3D pendek tentang seorang warga yang membuang kulit pisang di gang, lalu tetangganya tersandung sisa apel. Warga kemudian berdiskusi dan bergotong royong membersihkan lingkungan, ditutup dengan pesan layanan masyarakat. Saya merancang cerita dan menyusun adegannya, lalu mengerjakan animasi, texturing, dan rendering sendiri di Blender. Model karakter dan kedai bakso memakai aset 3D dari internet.",
    hasil:
      "Animasi berdurasi 1 menit 34 detik dengan alur cerita utuh, dari masalah sampah di gang sampai lingkungan bersih setelah warga bekerja sama. Proses rendering memakan waktu sekitar satu setengah hari.",
    links: [{ label: "Tonton video", href: "https://youtu.be/jmQmaXAmEQI" }],
    hidden: false,
  },
];

export const skills: { title: string; theme: ThemeKey; items: string[] }[] = [
  { title: "Data", theme: "blue", items: ["SQL", "BigQuery", "Python", "Google Sheets"] },
  { title: "Visualisasi", theme: "teal", items: ["Streamlit", "Data Studio"] },
  { title: "Machine learning", theme: "amber", items: ["CNN", "Clustering", "Klasifikasi"] },
  { title: "Web", theme: "coral", items: ["Next.js", "Tailwind CSS", "Vercel"] },
  { title: "Desain", theme: "violet", items: ["Figma", "Blender"] },
];

export const certificates: { name: string; issuer: string; year?: string; verifyUrl?: string; theme: ThemeKey }[] = [
  { name: "Belajar Machine Learning untuk Pemula", issuer: "Dicoding Academy", year: "2026", verifyUrl: "https://www.dicoding.com/certificates/GRX502KG2Z0M", theme: "blue" },
  { name: "Belajar Analisis Data untuk Pemula", issuer: "Dicoding Academy", year: "2026", verifyUrl: "https://www.dicoding.com/certificates/EYX4OY6MWXDL", theme: "teal" },
  { name: "Belajar Matematika untuk Data Science", issuer: "Dicoding Academy", year: "2026", verifyUrl: "https://www.dicoding.com/certificates/1OP874611ZQK", theme: "amber" },
  { name: "Belajar Dasar Structured Query Language (SQL)", issuer: "Dicoding Academy", year: "2026", verifyUrl: "https://www.dicoding.com/certificates/MEPJME92WP3V", theme: "coral" },
  { name: "Belajar Dasar Visualisasi Data", issuer: "Dicoding Academy", year: "2026", verifyUrl: "https://www.dicoding.com/certificates/MEPJML4MLP3V", theme: "violet" },
  { name: "Memulai Pemrograman dengan Python", issuer: "Dicoding Academy", year: "2026", verifyUrl: "https://www.dicoding.com/certificates/NVP7W9694ZR0", theme: "blue" },
  { name: "Belajar Dasar Data Science", issuer: "Dicoding Academy", year: "2026", verifyUrl: "https://www.dicoding.com/certificates/JMZVL2O2NXN9", theme: "teal" },
  { name: "Introduction to Financial Literacy", issuer: "Dicoding Academy", year: "2026", verifyUrl: "https://www.dicoding.com/certificates/L4PQWGL77PO1", theme: "amber" },
  { name: "Pengumpulan dan Persiapan Data", issuer: "Universitas Gunadarma", year: "2026", verifyUrl: "/sertifikat/pengumpulan-persiapan-data.pdf", theme: "coral" },
  { name: "Basis Data untuk Tingkat Pemula", issuer: "Universitas Gunadarma", year: "2025", verifyUrl: "/sertifikat/basis-data-pemula.pdf", theme: "violet" },
];

export const story = {
  question:
    "Kategori produk apa yang menghasilkan revenue tertinggi dan terendah, dan state mana yang punya pelanggan serta revenue terbesar? Dari situ, bagaimana perilaku belanja ulang pelanggan?",
  findings: [
    "Lima kategori teratas menyumbang sekitar 40% revenue.",
    "SP unggul jauh: BRL 4,99 juta, sekitar 2,9 kali RJ. SP, RJ, dan MG sekitar 63% revenue.",
    "97,03% pelanggan hanya berbelanja satu kali.",
  ],
  chartTitle: "Tiga kategori dengan revenue tertinggi (% dari total revenue)",
  chartSource: "Sumber: analisis Olist 2017–2018, pesanan berstatus delivered.",
  bars: [
    { label: "health_beauty", value: 9.45, display: "9,45%", color: "#2447C9" },
    { label: "watches_gifts", value: 8.95, display: "8,95%", color: "#0E8F9B" },
    { label: "bed_bath_table", value: 7.87, display: "7,87%", color: "#F2A900" },
  ],
  recommendations: [
    "Prioritaskan stok dan promosi di lima kategori teratas, dan evaluasi kategori dengan revenue sangat kecil.",
    "Fokuskan pemasaran dan logistik di SP, RJ, dan MG, sambil menguji perluasan bertahap ke state lain.",
    "Buat program retensi: voucher pembelian kedua untuk pelanggan baru bernilai besar, dan kampanye win-back untuk pelanggan lama bernilai besar.",
  ],
};
