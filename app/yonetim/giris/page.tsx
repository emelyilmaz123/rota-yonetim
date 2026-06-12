import Image from "next/image";
import { FIRMA_ADI } from "@/lib/routes";
import { login } from "./actions";

export default async function GirisPage({
  searchParams,
}: {
  searchParams: Promise<{ hata?: string }>;
}) {
  const params = await searchParams;
  const hata = params.hata === "1";

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 px-4">
      <div className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-lg">
        <div className="flex flex-col items-center">
          <div className="relative h-14 w-14 overflow-hidden rounded-lg">
            <Image
              src="/images/logo.jpg"
              alt={`${FIRMA_ADI} logo`}
              fill
              className="object-cover"
            />
          </div>
          <h1 className="mt-3 text-2xl font-bold text-slate-900">
            {FIRMA_ADI}
          </h1>
          <p className="mt-1 text-sm font-medium text-sky-600">
            Yönetici Paneli
          </p>
        </div>

        <form action={login} className="mt-6 flex flex-col gap-4">
          <label className="flex flex-col gap-1 text-sm text-slate-700">
            Şifre
            <input
              type="password"
              name="sifre"
              required
              autoFocus
              className="rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
            />
          </label>
          {hata && (
            <p className="text-sm text-rose-500">
              Girdiğiniz şifre hatalı. Lütfen tekrar deneyin.
            </p>
          )}
          <button
            type="submit"
            className="rounded-lg bg-sky-600 px-4 py-2 text-white font-medium hover:bg-sky-500 transition-colors"
          >
            Giriş Yap
          </button>
        </form>

        <a
          href="/"
          className="mt-6 block text-center text-sm text-slate-400 hover:text-slate-600 transition-colors"
        >
          ← Siteye dön
        </a>
      </div>
    </div>
  );
}
