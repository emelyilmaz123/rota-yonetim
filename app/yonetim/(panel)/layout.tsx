import Link from "next/link";
import Image from "next/image";
import { redirect } from "next/navigation";
import { FIRMA_ADI } from "@/lib/routes";
import { verifySession } from "@/lib/session";
import { logout } from "./actions";
import NavLinks from "./NavLinks";

export default async function YonetimLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isValid = await verifySession();
  if (!isValid) {
    redirect("/yonetim/giris");
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <header className="bg-slate-900 text-white">
        <div className="mx-auto max-w-5xl px-4 py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg">
              <Image
                src="/images/logo.jpg"
                alt={`${FIRMA_ADI} logo`}
                fill
                className="object-cover"
              />
            </span>
            <span className="text-lg font-bold tracking-tight">
              {FIRMA_ADI} <span className="text-slate-400">· Yönetim</span>
            </span>
          </div>
          <nav className="flex flex-wrap items-center gap-1 text-sm">
            <NavLinks />
            <Link
              href="/"
              className="px-3 py-1.5 text-slate-300 hover:text-white transition-colors"
            >
              Siteyi Görüntüle
            </Link>
            <form action={logout}>
              <button
                type="submit"
                className="px-3 py-1.5 text-slate-300 hover:text-white transition-colors"
              >
                Çıkış Yap
              </button>
            </form>
          </nav>
        </div>
      </header>
      <main className="flex-1 mx-auto w-full max-w-5xl px-4 py-8">
        {children}
      </main>
      <footer className="text-center text-xs text-slate-400 py-4">
        {FIRMA_ADI} &copy; {new Date().getFullYear()}
      </footer>
    </div>
  );
}
