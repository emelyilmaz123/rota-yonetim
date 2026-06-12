import Link from "next/link";
import Image from "next/image";

const OZELLIKLER = [
  {
    baslik: "Göl Manzarası",
    aciklama:
      "Aksu Nehri üzerinde kurulu baraj gölü, çevresindeki yeşillikler ve dağlarla muhteşem bir manzara sunar.",
  },
  {
    baslik: "Tekne Turu",
    aciklama:
      "Göl üzerinde yapılan keyifli bir tekne turuyla, doğanın içinde huzurlu bir mola verirsiniz.",
  },
  {
    baslik: "Fotoğraf Molası",
    aciklama:
      "Gölün berrak suları ve etrafındaki doğal manzara, unutulmaz fotoğraf karelerine ev sahipliği yapar.",
  },
  {
    baslik: "Doğa ile Baş Başa",
    aciklama:
      "Şehir gürültüsünden uzakta, temiz hava ve sessizlikle kısa bir dinlenme imkanı bulursunuz.",
  },
];

const BILGILER = [
  { etiket: "Konum", deger: "Isparta - Karacaören" },
  { etiket: "Etkinlik Türü", deger: "Tekne Turu" },
  { etiket: "Süre", deger: "~30 dk" },
  { etiket: "Uygunluk", deger: "Tüm Yaşlar" },
];

export default function KaracaorenBarajiPage() {
  return (
    <div className="flex flex-col bg-sky-50">
      {/* Hero */}
      <section>
        <div className="mx-auto max-w-6xl px-4 py-16 grid gap-10 sm:grid-cols-2 items-center">
          <div>
            <p className="text-sm font-medium text-sky-600 tracking-wide">
              Isparta · Güzergah Etkinliği
            </p>
            <h1 className="mt-3 text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900">
              Karacaören Barajı Tekne Turu
            </h1>
            <p className="mt-5 text-slate-600">
              Isparta yolu üzerindeki Karacaören Barajı, yeşil tepeler
              arasında uzanan berrak suyuyla yolculuğunuza nefes alacağınız
              bir doğa molası ekler. Kısa bir tekne turuyla gölün eşsiz
              manzarasının tadını çıkarabilirsiniz.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/etkinlikler"
                className="rounded-lg bg-sky-600 px-5 py-3 text-sm font-semibold text-white hover:bg-sky-500 transition-colors"
              >
                Diğer Etkinlikler
              </Link>
              <Link
                href="/guzergah/isparta"
                className="rounded-lg border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 hover:border-slate-400 transition-colors"
              >
                Isparta Durağı
              </Link>
            </div>
          </div>
          <div className="relative aspect-square w-full max-w-sm mx-auto rounded-xl overflow-hidden shadow-sm">
            <Image
              src="/images/isparta.jpg"
              alt="Karacaören Barajı"
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
              Karacaören Barajı Hakkında
            </h2>
            <p className="mt-3 text-slate-600">
              Aksu Nehri üzerinde inşa edilen Karacaören Barajı, hem sulama
              ve enerji üretimi açısından bölgeye önemli katkılar sağlar
              hem de çevresindeki doğal güzellikleriyle ziyaretçilerin
              ilgisini çeker. Yeşil tepelerle çevrili geniş su yüzeyi,
              huzurlu bir atmosfer sunar.
            </p>
            <p className="mt-3 text-slate-600">
              Güzergahımız üzerinde bu noktada düzenlediğimiz kısa tekne
              turu, yolcularımıza hem dinlenme hem de doğayla iç içe
              keyifli bir an yaşatmayı amaçlar.
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

      {/* Özellikler */}
      <section>
        <div className="mx-auto max-w-6xl px-4 py-16">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">
              Bu Etkinlikte Sizi Bekleyenler
            </h2>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {OZELLIKLER.map((item) => (
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
