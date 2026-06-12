import Link from "next/link";

const GORULECEKLER = [
  {
    baslik: "Afyonkarahisar Kalesi",
    aciklama:
      "Şehrin tam ortasında, yaklaşık 226 metre yükseklikteki kayalık tepe üzerinde yer alan, Frigler döneminden kalma tarihi kale.",
  },
  {
    baslik: "Ulu Cami",
    aciklama:
      "13. yüzyılda Selçuklular tarafından yaptırılan, ahşap direkleriyle dikkat çeken tarihi cami.",
  },
  {
    baslik: "Termal Tesisler",
    aciklama:
      "Afyon'un şifalı termal sularıyla bilinen kaplıca tesisleri, uzun yolculuğun ardından dinlenmek için idealdir.",
  },
  {
    baslik: "Hocabey Mahallesi",
    aciklama:
      "Geleneksel Afyon evlerini barındıran, şehrin tarihi dokusunu yansıtan sokaklar.",
  },
];

const YORESEL_TATLAR = [
  { ad: "Afyon Sucuğu", aciklama: "Baharat oranı ve kalitesiyle Türkiye'nin en tanınmış sucuklarından." },
  { ad: "Afyon Lokumu", aciklama: "Yumuşak dokusu ve zengin çeşitleriyle ünlü geleneksel lokum." },
  { ad: "Afyon Kaymağı", aciklama: "Manda sütünden yapılan, yoğun ve kremsi geleneksel kaymak." },
];

const BILGILER = [
  { etiket: "Konum", deger: "İç Batı Anadolu" },
  { etiket: "Bilinen Adı", deger: "Termal Şehir" },
  { etiket: "Durak Türü", deger: "Mola Noktası" },
  { etiket: "Antalya'ya Mesafe", deger: "~290 km" },
];

export default function AfyonPage() {
  return (
    <div className="flex flex-col bg-sky-50">
      {/* Hero */}
      <section>
        <div className="mx-auto max-w-6xl px-4 py-16 text-center">
          <p className="text-sm font-medium text-sky-600 tracking-wide">
            Güzergah Durağı · Mola Noktası
          </p>
          <h1 className="mt-3 text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900">
            Afyonkarahisar
          </h1>
          <p className="mt-5 max-w-2xl mx-auto text-slate-600">
            Güzergahımızın orta noktası olan Afyonkarahisar, şifalı termal
            sularıyla, tarihi kalesi ve eşsiz lezzetleriyle yolculuğunuza
            enerji katar. Burada verilen mola, uzun yolculuğun tam ortasında
            dinlenmek için ideal bir fırsattır.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/guzergah"
              className="rounded-lg bg-sky-600 px-5 py-3 text-sm font-semibold text-white hover:bg-sky-500 transition-colors"
            >
              Güzergahımızı İncele
            </Link>
          </div>
        </div>
      </section>

      {/* Şehir hakkında */}
      <section>
        <div className="mx-auto max-w-6xl px-4 pb-16">
          <div className="rounded-2xl bg-white shadow-sm p-8">
            <h2 className="text-2xl font-extrabold tracking-tight text-slate-900">
              Afyonkarahisar Hakkında
            </h2>
            <p className="mt-3 text-slate-600">
              Tarihi, Frigler dönemine kadar uzanan Afyonkarahisar, adını
              şehrin ortasında yükselen kayalık kaleden alır. Bölge, hem
              tarihi dokusu hem de Türkiye'nin önemli termal turizm
              merkezlerinden biri olmasıyla tanınır. Şifalı sularıyla bilinen
              kaplıcalar, yüzyıllardır ziyaretçilerin uğrak noktasıdır.
            </p>
            <p className="mt-3 text-slate-600">
              Aynı zamanda mermer üretimi ve zengin mutfağıyla da öne çıkan
              Afyon, güzergahımızdaki en lezzetli duraklardan biridir.
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

      {/* Görülecekler */}
      <section>
        <div className="mx-auto max-w-6xl px-4 py-16">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">
              Görülecek Yerler
            </h2>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {GORULECEKLER.map((item) => (
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

      {/* Yöresel tatlar */}
      <section>
        <div className="mx-auto max-w-6xl px-4 py-16">
          <div className="rounded-2xl bg-white shadow-sm p-8">
            <h2 className="text-2xl font-extrabold tracking-tight text-slate-900">
              Yöresel Tatlar
            </h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {YORESEL_TATLAR.map((tat) => (
                <div key={tat.ad} className="rounded-xl bg-sky-50 p-4">
                  <p className="font-semibold text-slate-900">{tat.ad}</p>
                  <p className="mt-1 text-sm text-slate-600">
                    {tat.aciklama}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section>
        <div className="mx-auto max-w-6xl px-4 pb-16">
          <div className="rounded-2xl bg-sky-600 px-6 py-12 text-center">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              Güzergahımızdaki Diğer Duraklara Göz Atın
            </h2>
            <p className="mt-3 text-sky-50 max-w-xl mx-auto">
              Antalya–Ankara hattımızdaki tüm duraklar hakkında bilgi
              almak için güzergah sayfamızı ziyaret edin.
            </p>
            <div className="mt-6">
              <Link
                href="/guzergah"
                className="inline-block rounded-lg bg-white px-6 py-3 text-sm font-semibold text-sky-600 hover:bg-sky-50 transition-colors"
              >
                Güzergahımızı İncele
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
