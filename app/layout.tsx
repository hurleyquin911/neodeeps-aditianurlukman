import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Syne } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://neodeeps.com"),
  title: {
    default: "NEODEEPS - Aditia Nur Lukman",
    template: "%s - NEODEEPS",
  },
  description:
    "Portofolio Aditia Nur Lukman. Creative developer & UI designer di Jakarta. Make Better than Visual.",
  keywords: [
    "NEODEEPS",
    "Aditia Nur Lukman",
    "Fullstack Developer",
    "UI Designer",
    "Android",
    "Jakarta",
    "Next.js",
    "React Native",
  ],
  authors: [{ name: "Aditia Nur Lukman" }],
  openGraph: {
    title: "NEODEEPS - Aditia Nur Lukman",
    description:
      "Creative developer & UI designer. Portofolio digital experiences, motion, dan product UI.",
    url: "https://neodeeps.com",
    siteName: "NEODEEPS",
    locale: "id_ID",
    type: "website",
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export const viewport: Viewport = {
  themeColor: "#070708",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="id"
      className={`${geistSans.variable} ${geistMono.variable} ${syne.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-void text-cream">{children}</body>
    </html>
  );
}
