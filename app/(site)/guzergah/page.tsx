import Link from "next/link";
import { pool, type MolaYeri, type Etkinlik } from "@/lib/db";
import { FIRMA_ADI, GUZERGAH } from "@/lib/routes";

export const dynamic = "force-dynamic";

const GUZERGAH_DETAY: Record<
  (typeof GUZERGAH)[number],
  { km: number; sure: string; tip: string; aciklama: string; link?: string }
> = {
  Antalya: {
    km: 0,
    sure: "00:00",
    tip: "Kalkış Noktası",
    aciklama:
      "Yolculuğumuz Antalya terminalinden başlar. Geniş bagaj alanı ve konforlu koltuklarla yola çıkıyoruz. Türkiye'nin turizm başkenti olan Antalya, masmavi denizi ve sıcak iklimiyle yolculuğumuza keyifli bir başlangıç yapar.",
  },
  Isparta: {
    km: 130,
    sure: "~2 sa",
    tip: "Ara Durak",
    aciklama:
      "Gül kokulu şehir Isparta'da kısa bir indirme-bindirme durağı. Yolcularımız burada kısa bir hava alma fırsatı bulur. Gül üretimi ve göllerle çevrili sakin doğasıyla bilinen Isparta, yolculuğa ferah bir mola katar.",
    link: "/guzergah/isparta",
  },
  Afyon: {
    km: 290,
    sure: "~4 sa 30 dk",
    tip: "Mola Noktası",
    aciklama:
      "Güzergahımızın orta noktası olan Afyon'da, termal sularıyla ünlü tesislerde dinlenme molası verilir. Yemek ve tuvalet ihtiyaçları için idealdir. Şifalı kaplıcaları ve meşhur sucuk-lokumuyla tanınan Afyon, yolculuğun tam ortasında enerji toplamak için ideal bir noktadır.",
    link: "/guzergah/afyon",
  },
  Konya: {
    km: 420,
    sure: "~6 sa 30 dk",
    tip: "Ara Durak",
    aciklama:
      "Mevlana'nın şehri Konya'dan geçiş yapılır. Şehir merkezine yakın bir noktada indirme-bindirme imkanı sunulur. Mevlana'nın huzur veren mirası ve geniş Anadolu ovalarıyla Konya, güzergahımızın manevi açıdan en zengin durağıdır.",
    link: "/guzergah/konya",
  },
  Ankara: {
    km: 540,
    sure: "~8 sa 30 dk",
    tip: "Varış Noktası",
    aciklama:
      "Yolculuğumuz başkent Ankara'da sona erer. İniş sonrası şehir içi bağlantılar terminalden kolayca sağlanabilir. Türkiye'nin başkenti olan Ankara, Anıtkabir'i ve canlı şehir hayatıyla yolculuğumuzun değerli varış noktasıdır.",
    link: "/etkinlikler/anitkabir",
  },
};

const SEFER_SAATLERI = [
  { yon: "Antalya → Ankara", saatler: ["09:00", "21:00"] },
  { yon: "Ankara → Antalya", saatler: ["10:00", "22:00"] },
];

const HIZMETLER = [
  {
    baslik: "Klimalı & Geniş Koltuklar",
    aciklama: "Yatırılabilir, bacak mesafesi geniş koltuklarla 8+ saatlik yolculuk yorucu olmaktan çıkar.",
  },
  {
    baslik: "Ücretsiz Wi-Fi",
    aciklama: "Yolculuk boyunca internet bağlantısı kesintisiz erişiminizde.",
  },
  {
    baslik: "USB Şarj Girişi",
    aciklama: "Her koltukta telefon ve tabletinizi şarj edebileceğiniz USB girişi bulunur.",
  },
  {
    baslik: "İkram Servisi",
    aciklama: "Mola noktaları arasında sıcak/soğuk içecek ve atıştırmalık ikramı sunulur.",
  },
];

const SSS = [
  {
    soru: "Bagaj limiti var mı?",
    cevap:
      "Her yolcu için standart olarak 1 büyük bagaj ve 1 el bagajı ücretsizdir. Ek bagaj için lütfen rezervasyon sırasında bizi bilgilendirin.",
  },
  {
    soru: "Güzergah üzerindeki tüm duraklardan biniş/iniş yapılabilir mi?",
    cevap:
      "Evet, Antalya, Isparta, Afyon, Konya ve Ankara duraklarının tamamında biniş ve iniş imkanı bulunmaktadır.",
  },
  {
    soru: "Mola noktalarında ne kadar süre kalıyoruz?",
    cevap:
      "Afyon'daki ana mola noktasında ortalama 20-30 dakika dinlenme süresi tanınır. Diğer duraklarda kısa indirme-bindirme molaları verilir.",
  },
  {
    soru: "Evcil hayvan kabul ediliyor mu?",
    cevap:
      "Kafeste taşınan küçük evcil hayvanlar için lütfen rezervasyon öncesinde bizimle iletişime geçin.",
  },
];

async function getOnePreview() {
  const [molaYerleri, etkinlikler] = await Promise.all([
    pool.query<MolaYeri>(`SELECT * FROM mola_yerleri ORDER BY id DESC LIMIT 3`),
    pool.query<Etkinlik>(`SELECT * FROM etkinlikler ORDER BY id DESC LIMIT 3`),
  ]);

  return { molaYerleri: molaYerleri.rows, etkinlikler: etkinlikler.rows };
}

export default async function GuzergahPage() {
  const { molaYerleri, etkinlikler } = await getOnePreview();
  const toplamKm = GUZERGAH_DETAY[GUZERGAH[GUZERGAH.length - 1]].km;

  return (
    <div className="flex flex-col bg-sky-50">
      {/* Hero */}
      <section>
        <div className="mx-auto max-w-6xl px-4 py-16 text-center">
          <p className="text-sm font-medium text-sky-600 tracking-wide">
            {GUZERGAH.join(" · ")}
          </p>
          <h1 className="mt-3 text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900">
            Güzergahımız
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-slate-600">
            {FIRMA_ADI}, Antalya ile Ankara arasında sabit bir hat üzerinde,
            yılların verdiği deneyimle güvenli ve konforlu yolculuklar sunar.
            Aşağıda güzergahımızın tüm detaylarını bulabilirsiniz.
          </p>
        </div>
      </section>

      {/* İstatistik şeridi */}
      <section>
        <div className="mx-auto max-w-6xl px-4 pb-16">
          <div className="rounded-2xl bg-white shadow-sm grid grid-cols-2 sm:grid-cols-4 gap-6 text-center px-6 py-8">
            <div>
              <p className="font-mono text-3xl sm:text-4xl font-bold text-sky-600">
                {toplamKm}
              </p>
              <p className="mt-1 text-xs sm:text-sm text-slate-500 uppercase tracking-wide">
                Kilometre
              </p>
            </div>
            <div>
              <p className="font-mono text-3xl sm:text-4xl font-bold text-sky-600">
                ~8,5 sa
              </p>
              <p className="mt-1 text-xs sm:text-sm text-slate-500 uppercase tracking-wide">
                Toplam Süre
              </p>
            </div>
            <div>
              <p className="font-mono text-3xl sm:text-4xl font-bold text-sky-600">
                {GUZERGAH.length}
              </p>
              <p className="mt-1 text-xs sm:text-sm text-slate-500 uppercase tracking-wide">
                Durak
              </p>
            </div>
            <div>
              <p className="font-mono text-3xl sm:text-4xl font-bold text-sky-600">
                2
              </p>
              <p className="mt-1 text-xs sm:text-sm text-slate-500 uppercase tracking-wide">
                Günlük Sefer
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Zaman çizelgesi */}
      <section>
        <div className="mx-auto max-w-6xl px-4 py-16">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">
              Durak Durak Yolculuğumuz
            </h2>
            <p className="mt-3 text-slate-600">
              Antalya&apos;dan başlayıp Ankara&apos;da sona eren hattımızdaki
              her durağı aşağıda bulabilirsiniz.
            </p>
          </div>

          <ol className="mt-12 relative flex flex-col gap-10 before:absolute before:left-6 before:top-2 before:bottom-2 before:w-px before:bg-sky-200">
            {GUZERGAH.map((durak, i) => {
              const detay = GUZERGAH_DETAY[durak];
              return (
                <li key={durak} className="relative flex gap-6">
                  <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-sky-600 text-white font-mono font-semibold shadow-sm">
                    {i + 1}
                  </div>
                  <div className="flex-1 rounded-xl bg-white p-5 shadow-sm">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h3 className="text-lg font-bold text-slate-900">
                        {durak}
                      </h3>
                      <span className="rounded-full bg-sky-100 px-3 py-1 text-xs font-medium text-sky-700">
                        {detay.tip}
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-slate-600">
                      {detay.aciklama}
                    </p>
                    <div className="mt-3 flex items-center justify-between gap-4">
                      <div className="flex gap-4 text-xs font-mono text-slate-500">
                        <span>{detay.km} km</span>
                        <span>{detay.sure}</span>
                      </div>
                      {detay.link && (
                        <Link
                          href={detay.link}
                          className="rounded-lg bg-sky-600 px-4 py-2 text-xs font-semibold text-white hover:bg-sky-500 transition-colors"
                        >
                          Detaylı Bilgi
                        </Link>
                      )}
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      {/* Sefer saatleri */}
      <section>
        <div className="mx-auto max-w-6xl px-4 py-16">
          <div className="rounded-2xl bg-white shadow-sm p-8">
            <h2 className="text-2xl font-extrabold tracking-tight text-slate-900">
              Sefer Saatleri
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Her gün düzenli olarak aşağıdaki saatlerde sefer
              düzenlenmektedir. Güncel saatler ve müsaitlik için bizimle
              iletişime geçebilirsiniz.
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {SEFER_SAATLERI.map((sefer) => (
                <div
                  key={sefer.yon}
                  className="rounded-xl border border-sky-100 bg-sky-50 p-4"
                >
                  <p className="font-semibold text-slate-900">{sefer.yon}</p>
                  <div className="mt-2 flex gap-2">
                    {sefer.saatler.map((saat) => (
                      <span
                        key={saat}
                        className="rounded-lg bg-white px-3 py-1 font-mono text-sm font-semibold text-sky-600 shadow-sm"
                      >
                        {saat}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mola Yerleri & Etkinlikler önizleme */}
      <section>
        <div className="mx-auto max-w-6xl px-4 py-16 flex flex-col gap-16">
          <div>
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
                Güzergah Üzerindeki Mola Yerleri
              </h2>
              <Link
                href="/mola-yerleri"
                className="text-sm font-semibold text-sky-600 hover:text-sky-500 shrink-0"
              >
                Tümünü gör →
              </Link>
            </div>
            {molaYerleri.length === 0 ? (
              <p className="mt-6 text-sm text-slate-500">
                Henüz mola yeri eklenmedi.
              </p>
            ) : (
              <div className="mt-6 grid gap-6 sm:grid-cols-3">
                {molaYerleri.map((mola) => (
                  <div
                    key={mola.id}
                    className="rounded-xl bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow p-4"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-semibold text-slate-900">
                        {mola.ad}
                      </h3>
                      {mola.mola_suresi != null && (
                        <span className="shrink-0 rounded-full bg-sky-100 px-3 py-1 text-xs font-medium text-sky-700">
                          {mola.mola_suresi} dk
                        </span>
                      )}
                    </div>
                    {mola.aciklama && (
                      <p className="mt-2 text-sm text-slate-600">
                        {mola.aciklama}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div>
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
                Güzergahta Etkinlikler
              </h2>
              <Link
                href="/etkinlikler"
                className="text-sm font-semibold text-sky-600 hover:text-sky-500 shrink-0"
              >
                Tümünü gör →
              </Link>
            </div>
            {etkinlikler.length === 0 ? (
              <p className="mt-6 text-sm text-slate-500">
                Henüz etkinlik eklenmedi.
              </p>
            ) : (
              <div className="mt-6 grid gap-6 sm:grid-cols-3">
                {etkinlikler.map((etkinlik) => (
                  <div
                    key={etkinlik.id}
                    className="rounded-xl bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow p-4"
                  >
                    <h3 className="font-semibold text-slate-900">
                      {etkinlik.ad}
                    </h3>
                    {etkinlik.aciklama && (
                      <p className="mt-2 text-sm text-slate-600">
                        {etkinlik.aciklama}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Hizmetler */}
      <section>
        <div className="mx-auto max-w-6xl px-4 py-16">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">
              Yolculuk Boyunca Sizinle
            </h2>
            <p className="mt-3 text-slate-600">
              Güzergahımız boyunca yolculuğunuzu kolaylaştıran hizmetlerden
              yararlanabilirsiniz.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {HIZMETLER.map((hizmet) => (
              <div
                key={hizmet.baslik}
                className="rounded-xl bg-white p-5 shadow-sm"
              >
                <h3 className="font-semibold text-slate-900">
                  {hizmet.baslik}
                </h3>
                <p className="mt-2 text-sm text-slate-600">
                  {hizmet.aciklama}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SSS */}
      <section>
        <div className="mx-auto max-w-6xl px-4 py-16">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">
              Sıkça Sorulan Sorular
            </h2>
          </div>

          <div className="mt-10 flex flex-col gap-3">
            {SSS.map((soru) => (
              <details
                key={soru.soru}
                className="group rounded-xl bg-white shadow-sm p-5"
              >
                <summary className="flex cursor-pointer items-center justify-between gap-4 font-semibold text-slate-900">
                  {soru.soru}
                  <span className="shrink-0 text-sky-600 transition-transform group-open:rotate-180">
                    ▼
                  </span>
                </summary>
                <p className="mt-3 text-sm text-slate-600">{soru.cevap}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section>
        <div className="mx-auto max-w-6xl px-4 pb-16">
          <div className="rounded-2xl bg-sky-600 px-6 py-12 text-center">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              Bilet ve Rezervasyon İçin Bizimle İletişime Geçin
            </h2>
            <p className="mt-3 text-sky-50">
              Sefer saatleri, müsaitlik ve fiyat bilgisi için hemen ulaşın.
            </p>
            <div className="mt-6">
              <Link
                href="/iletisim"
                className="inline-block rounded-lg bg-white px-6 py-3 text-sm font-semibold text-sky-600 hover:bg-sky-50 transition-colors"
              >
                İletişime Geç
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
