import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import { FIRMA_ADI } from "@/lib/routes";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: FIRMA_ADI,
  description: `${FIRMA_ADI} otobüs firması yönetim sistemi`,
};

const NAV_LINKS = [
  { href: "/", label: "Anasayfa" },
  { href: "/yolcular", label: "Yolcular" },
  { href: "/mola-yerleri", label: "Mola Yerleri" },
  { href: "/etkinlikler", label: "Etkinlikler" },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="tr"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-zinc-50 text-zinc-900">
        <header className="bg-zinc-900 text-white">
          <div className="mx-auto max-w-5xl px-4 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <span className="text-xl font-bold">{FIRMA_ADI}</span>
            <nav className="flex gap-4 text-sm">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="hover:text-zinc-300"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </header>
        <main className="flex-1 mx-auto w-full max-w-5xl px-4 py-8">
          {children}
        </main>
        <footer className="text-center text-xs text-zinc-400 py-4">
          {FIRMA_ADI} &copy; {new Date().getFullYear()}
        </footer>
      </body>
    </html>
  );
}
