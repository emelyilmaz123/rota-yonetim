import Link from "next/link";

const GORULECEKLER = [
  {
    baslik: "Mevlana Müzesi",
    aciklama:
      "Mevlana Celaleddin-i Rumi'nin türbesinin bulunduğu, yeşil kubbesiyle Konya'nın simgesi haline gelen müze.",
  },
  {
    baslik: "Alaaddin Tepesi",
    aciklama:
      "Şehrin merkezinde yer alan, Selçuklu sultanlarının türbelerini barındıran tarihi tepe ve park alanı.",
  },
  {
    baslik: "İnce Minareli Medrese",
    aciklama:
      "Selçuklu dönemi taş işçiliğinin en güzel örneklerinden biri olan, günümüzde taş ve ahşap eserler müzesi olarak kullanılan yapı.",
  },
  {
    baslik: "Karatay Medresesi",
    aciklama:
      "Çini sanatının önemli örneklerini barındıran, 13. yüzyıldan kalma tarihi medrese.",
  },
];

const YORESEL_TATLAR = [
  { ad: "Etli Ekmek", aciklama: "İnce hamur üzerine kıyma ile hazırlanan, Konya'ya özgü meşhur lezzet." },
  { ad: "Fırın Kebabı", aciklama: "Taş fırında pişirilen, yumuşacık etiyle bilinen geleneksel kebap." },
  { ad: "Bamya Çorbası", aciklama: "Konya mutfağının vazgeçilmez, doyurucu çorbalarından biri." },
];

const BILGILER = [
  { etiket: "Konum", deger: "Orta Anadolu" },
  { etiket: "Bilinen Adı", deger: "Mevlana'nın Şehri" },
  { etiket: "Durak Türü", deger: "Ara Durak" },
  { etiket: "Antalya'ya Mesafe", deger: "~420 km" },
];

export default function KonyaPage() {
  return (
    <div className="flex flex-col bg-sky-50">
      {/* Hero */}
      <section>
        <div className="mx-auto max-w-6xl px-4 py-16 text-center">
          <p className="text-sm font-medium text-sky-600 tracking-wide">
            Güzergah Durağı · Ara Durak
          </p>
          <h1 className="mt-3 text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900">
            Konya
          </h1>
          <p className="mt-5 max-w-2xl mx-auto text-slate-600">
            Selçuklu İmparatorluğu'na başkentlik yapmış Konya, Mevlana
            Celaleddin-i Rumi'nin huzur veren mirasını taşır. Geniş
            Anadolu ovalarının ortasındaki bu tarihi şehir, güzergahımızın
            en köklü duraklarından biridir.
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
              Konya Hakkında
            </h2>
            <p className="mt-3 text-slate-600">
              13. yüzyılda Anadolu Selçuklu Devleti'ne başkentlik yapan
              Konya, dönemin en önemli kültür ve sanat merkezlerinden
              biriydi. Bu dönemden kalan medreseler, camiler ve türbeler
              günümüzde de şehrin dokusunu süslemektedir.
            </p>
            <p className="mt-3 text-slate-600">
              Şehir, aynı zamanda büyük mutasavvıf Mevlana Celaleddin-i
              Rumi'nin yaşadığı ve Mevlevi tarikatının kurulduğu yer olarak
              dünya çapında tanınır. Geniş ovaları ve tarımsal üretimiyle de
              Türkiye'nin önemli merkezlerinden biridir.
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
