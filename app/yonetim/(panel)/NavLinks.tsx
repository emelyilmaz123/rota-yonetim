"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { href: "/yonetim", label: "Panel" },
  { href: "/yonetim/rezervasyonlar", label: "Rezervasyonlar" },
  { href: "/yonetim/yolcular", label: "Yolcular" },
  { href: "/yonetim/mola-yerleri", label: "Mola Yerleri" },
  { href: "/yonetim/etkinlikler", label: "Etkinlikler" },
  { href: "/yonetim/istatistik", label: "İstatistikler" },
  { href: "/yonetim/mesajlar", label: "Mesajlar" },
];

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <>
      {NAV_LINKS.map((link) => {
        const aktif =
          link.href === "/yonetim"
            ? pathname === "/yonetim"
            : pathname.startsWith(link.href);

        return (
          <Link
            key={link.href}
            href={link.href}
            className={
              aktif
                ? "rounded-md bg-sky-600/10 px-3 py-1.5 text-sky-400 font-medium"
                : "px-3 py-1.5 text-slate-300 hover:text-white transition-colors"
            }
          >
            {link.label}
          </Link>
        );
      })}
    </>
  );
}
