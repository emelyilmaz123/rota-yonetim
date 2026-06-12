import Link from "next/link";
import Image from "next/image";

const LEZZETLER = [
  {
    baslik: "Afyon Sucuğu",
    aciklama:
      "Yüksek et oranı ve özel baharat karışımıyla ızgarada pişirilen, Türkiye'nin en tanınmış sucuklarından biri.",
  },
  {
    baslik: "Taze Pide & Ekmek",
    aciklama:
      "Sucukla birlikte servis edilen sıcak yöresel ekmek ve pide çeşitleri.",
  },
  {
    baslik: "Afyon Lokumu",
    aciklama:
      "Yemeğin ardından tatlı bir final için, yumuşacık dokusuyla ünlü Afyon lokumu ikramı.",
  },
  {
    baslik: "Afyon Kaymağı",
    aciklama:
      "Manda sütünden yapılan geleneksel kaymak, isteyen yolcularımız için ek bir lezzet seçeneği.",
  },
];

const BILGILER = [
  { etiket: "Konum", deger: "Afyonkarahisar" },
  { etiket: "Etkinlik Türü", deger: "Yöresel Lezzet Durağı" },
  { etiket: "Süre", deger: "~20-30 dk" },
  { etiket: "Uygunluk", deger: "Tüm Yolcular" },
];

export default function AfyonLezzetlerPage() {
  return (
    <div className="flex flex-col bg-sky-50">
      {/* Hero */}
      <section>
        <div className="mx-auto max-w-6xl px-4 py-16 grid gap-10 sm:grid-cols-2 items-center">
          <div>
            <p className="text-sm font-medium text-sky-600 tracking-wide">
              Afyon · Güzergah Etkinliği
            </p>
            <h1 className="mt-3 text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900">
              Afyon Yöresel Lezzetler
            </h1>
            <p className="mt-5 text-slate-600">
              Güzergahımızın orta noktası Afyon'da, şehrin meşhur sucuğunu
              ızgarada tadabileceğiniz keyifli bir lezzet durağı sizi
              bekliyor. Yolculuğun tam ortasında damak çatlatan bir mola.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/etkinlikler"
                className="rounded-lg bg-sky-600 px-5 py-3 text-sm font-semibold text-white hover:bg-sky-500 transition-colors"
              >
                Diğer Etkinlikler
              </Link>
              <Link
                href="/guzergah/afyon"
                className="rounded-lg border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 hover:border-slate-400 transition-colors"
              >
                Afyon Durağı
              </Link>
            </div>
          </div>
          <div className="relative aspect-square w-full max-w-sm mx-auto rounded-xl overflow-hidden shadow-sm">
            <Image
              src="/images/afyon.jpg"
              alt="Afyon Yöresel Lezzetler"
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, 384px"
              priority
            />
          </div>
        </div>
      </section>

      {/* Hakkında */}
      <section>
        <div className="mx-auto max-w-6xl px-4 pb-16">
          <div className="rounded-2xl bg-white shadow-sm p-8">
            <h2 className="text-2xl font-extrabold tracking-tight text-slate-900">
              Sucuk Partisi Hakkında
            </h2>
            <p className="mt-3 text-slate-600">
              Afyon, Türkiye'nin en kaliteli sucuklarının üretildiği
              şehirlerden biridir. Yüksek et oranı ve özel baharat
              karışımıyla hazırlanan Afyon sucuğu, ızgarada pişirildiğinde
              eşsiz bir koku ve tat sunar.
            </p>
            <p className="mt-3 text-slate-600">
              Güzergahımız üzerindeki bu durakta, yolcularımıza taze
              pişirilmiş sucuk ikramı yapılır. Yemeğin ardından isteyen
              yolcularımız, Afyon'un meşhur lokum ve kaymağını da
              tadabilir.
            </p>

            <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
              {BILGILER.map((bilgi) => (
                <div key={bilgi.etiket}>
                  <p className="font-mono text-lg sm:text-xl font-bold text-sky-600">
                    {bilgi.deger}
                  </p>
                  <p className="mt-1 text-xs text-slate-500 uppercase tracking-wide">
                    {bilgi.etiket}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Lezzetler */}
      <section>
        <div className="mx-auto max-w-6xl px-4 py-16">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">
              Sizi Bekleyen Lezzetler
            </h2>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {LEZZETLER.map((item) => (
              <div
                key={item.baslik}
                className="rounded-xl bg-white p-6 shadow-sm"
              >
                <h3 className="font-bold text-slate-900">{item.baslik}</h3>
                <p className="mt-2 text-sm text-slate-600">
                  {item.aciklama}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section>
        <div className="mx-auto max-w-6xl px-4 pb-16">
          <div className="rounded-2xl bg-sky-600 px-6 py-12 text-center">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              Güzergahımızdaki Diğer Etkinliklere Göz Atın
            </h2>
            <p className="mt-3 text-sky-50 max-w-xl mx-auto">
              Antalya–Ankara hattımız boyunca sizi bekleyen diğer
              etkinlikleri keşfedin.
            </p>
            <div className="mt-6">
              <Link
                href="/etkinlikler"
                className="inline-block rounded-lg bg-white px-6 py-3 text-sm font-semibold text-sky-600 hover:bg-sky-50 transition-colors"
              >
                Tüm Etkinlikler
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
