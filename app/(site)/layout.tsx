import Link from "next/link";
import Image from "next/image";
import { FIRMA_ADI } from "@/lib/routes";

const NAV_LINKS = [
  { href: "/", label: "Anasayfa" },
  { href: "/guzergah", label: "Güzergahımız" },
  { href: "/mola-yerleri", label: "Mola Yerleri" },
  { href: "/etkinlikler", label: "Etkinlikler" },
  { href: "/hakkimizda", label: "Hakkımızda" },
  { href: "/iletisim", label: "İletişim" },
  { href: "/rezervasyon", label: "Rezervasyon Yap" },
];

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-slate-900 text-white sticky top-0 z-20 shadow-sm">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-3">
            <span className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg">
              <Image
                src="/images/logo.jpg"
                alt={`${FIRMA_ADI} logo`}
                fill
                className="object-cover"
              />
            </span>
            <span className="text-2xl font-bold tracking-tight">
              {FIRMA_ADI}
            </span>
          </Link>
          <nav className="flex flex-wrap gap-5 text-sm items-center">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-slate-300 hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/rezervasyon"
              className="rounded-lg bg-sky-600 px-3 py-1.5 text-white font-semibold hover:bg-sky-500 transition-colors"
            >
              Rezervasyon Yap
            </Link>
            <Link
              href="/yonetim/giris"
              className="text-slate-400 hover:text-white text-xs border border-slate-700 rounded px-2 py-1 transition-colors"
            >
              Yönetici Girişi
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1">{children}</main>
      <footer className="bg-slate-900 text-slate-400">
        <div className="mx-auto max-w-6xl px-4 py-12 grid gap-10 sm:grid-cols-3">
          <div>
            <div className="flex items-center gap-3">
              <span className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg">
                <Image
                  src="/images/logo.jpg"
                  alt={`${FIRMA_ADI} logo`}
                  fill
                  className="object-cover"
                />
              </span>
              <span className="text-xl font-bold tracking-tight text-white">
                {FIRMA_ADI}
              </span>
            </div>
            <p className="mt-4 text-sm">
              1978&apos;den beri Antalya–Ankara hattında, aynı güven ve
              samimiyetle yolcularımızı taşıyoruz.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-white">
              Hızlı Linkler
            </h3>
            <ul className="mt-4 flex flex-col gap-2 text-sm">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-white">
              İletişim
            </h3>
            <ul className="mt-4 flex flex-col gap-2 text-sm">
              <li>0541 898 18 65</li>
              <li>emelyilmaz412@gmail.com</li>
              <li>Antalya Otogarı</li>
              <li>Antalya - Isparta - Afyon - Konya - Ankara güzergahı</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-slate-800 py-6 text-center text-xs">
          {FIRMA_ADI} &copy; {new Date().getFullYear()} — Tüm hakları
          saklıdır.
        </div>
      </footer>
    </div>
  );
}
