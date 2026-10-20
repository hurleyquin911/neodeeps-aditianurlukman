import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Instrument_Serif, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const instrument = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://neodeeps.com"),
  title: {
    default: "NEODEEPS - Aditia Nur Lukman",
    template: "%s - NEODEEPS",
  },
  description:
    "Portofolio Aditia Nur Lukman. Creative developer & UI designer di Jakarta. Make better than Visual.",
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
    icon: [{ url: "/logo.png", type: "image/png" }],
    apple: "/logo.png",
    shortcut: "/logo.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#f7f7f5",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="id"
      className={`${geistSans.variable} ${geistMono.variable} ${jakarta.variable} ${instrument.variable} h-full antialiased`}
    >
      <body className="min-h-full text-cream">{children}</body>
    </html>
  );
}
