import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

const description =
  "Portofolio Eka Rezky Setiawarno, mahasiswa Informatika yang mengolah data lewat SQL, dashboard, dan machine learning. Terbuka untuk magang data analytics.";

export const metadata: Metadata = {
  title: "Eka Rezky Setiawarno | Portofolio Data Analytics",
  description,
  openGraph: {
    title: "Eka Rezky Setiawarno | Portofolio Data Analytics",
    description,
    type: "website",
    locale: "id_ID",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="id" className={`${inter.variable} ${jakarta.variable}`}>
      <body>{children}</body>
    </html>
  );
}
