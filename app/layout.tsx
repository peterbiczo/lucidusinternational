import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://lucidusinternational.com"),
  title: "Lucidus International L.L.C-FZ | Clarity Across Borders",
  description:
    "Management, accounting, tax, and technology advisory for businesses operating across jurisdictions.",
  icons: {
    icon: [{ url: "/favicon.svg?v=2", type: "image/svg+xml" }],
    shortcut: "/favicon.svg?v=2",
    apple: "/favicon.svg?v=2",
  },
  openGraph: {
    title: "Lucidus International L.L.C-FZ | Clarity Across Borders",
    description:
      "Management, accounting, tax, and technology advisory for businesses operating across jurisdictions.",
    type: "website",
    images: [{ url: "/og.png", width: 1733, height: 908, alt: "Lucidus International L.L.C-FZ — Clarity across borders. Confidence at every turn." }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lucidus International L.L.C-FZ | Clarity Across Borders",
    description:
      "Management, accounting, tax, and technology advisory for businesses operating across jurisdictions.",
    images: ["/og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
