import Link from "next/link";
import Image from "next/image";
import { pool, type MolaYeri, type Etkinlik } from "@/lib/db";
import { FIRMA_ADI, GUZERGAH } from "@/lib/routes";
import NedenBizSection from "./NedenBizSection";

export const dynamic = "force-dynamic";

const GUZERGAH_ACIKLAMA: Record<(typeof GUZERGAH)[number], string> = {
  Antalya: "Yolculuğunuzun başlangıç noktası, turizm kenti Antalya'dan kalkış.",
  Isparta: "Gül kokulu şehir Isparta'da kısa bir mola.",
  Afyon: "Termal sularıyla ünlü Afyon, güzergahımızın orta noktası.",
  Konya: "Mevlana'nın şehri Konya'dan geçiş.",
  Ankara: "Başkentimiz Ankara'da yolculuğunuz sona eriyor.",
};

const ISTATISTIKLER = [
  { deger: "5", etiket: "Şehir" },
  { deger: "1", etiket: "Sabit Güzergah" },
  { deger: "7/24", etiket: "Destek" },
  { deger: "100%", etiket: "Konfor" },
];

const NEDEN_BIZ = [
  {
    baslik: "Konfor",
    aciklama:
      "Geniş, klimalı ve temiz koltuklarla uzun yolculuklar yorucu olmaktan çıkar.",
    detay:
      "Otobüslerimizde geniş bacak mesafesi, yatırılabilir koltuklar ve klima sistemi bulunur. Yolculuk boyunca temizliğine özen gösterilen araçlarımızla, uzun yol yorgunluğunu en aza indirip seyahatinizi konforlu bir deneyime dönüştürüyoruz.",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M4 17h16M5 17v-3a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v3M7 12V8a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v4M5 17l-1 3M19 17l1 3"
      />
    ),
  },
  {
    baslik: "Güvenlik",
    aciklama:
      "Deneyimli şoförler ve düzenli araç bakımıyla güveniniz bizim önceliğimiz.",
    detay:
      "Şoförlerimiz uzun yıllara dayanan tecrübeye sahip, güzergahı en ince ayrıntısına kadar bilen profesyonellerdir. Araçlarımız düzenli periyodik bakımlardan geçer, fren, lastik ve motor kontrolleri her sefer öncesinde tekrar gözden geçirilir. Ayrıca tüm araçlarımız geçerli sigorta ve taşımacılık belgeleriyle yola çıkar, hız ve sürüş davranışları takip edilerek yolcu güvenliği her aşamada önceliklendirilir.",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3z"
      />
    ),
  },
  {
    baslik: "Dakiklik",
    aciklama:
      "Belirlenen saatlerde kalkış ve varış, planlarınızı bozmaz.",
    detay:
      "Kalkış ve varış saatlerimiz güzergah boyunca önceden planlanır ve mola süreleri buna göre ayarlanır. Trafik ve yol koşulları sürekli takip edilerek olası gecikmeler en aza indirilir, böylece randevu ve bağlantılarınızı güvenle planlayabilirsiniz.",
    icon: (
      <>
        <circle cx="12" cy="12" r="9" strokeWidth={1.5} />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 7v5l3 3" />
      </>
    ),
  },
];

async function getOnePreview() {
  const [molaYerleri, etkinlikler] = await Promise.all([
    pool.query<MolaYeri>(`SELECT * FROM mola_yerleri ORDER BY id DESC LIMIT 3`),
    pool.query<Etkinlik>(`SELECT * FROM etkinlikler ORDER BY id DESC`),
  ]);

  return { molaYerleri: molaYerleri.rows, etkinlikler: etkinlikler.rows };
}

export default async function Home() {
  const { molaYerleri, etkinlikler } = await getOnePreview();

  return (
    <div className="flex flex-col bg-sky-50">
      {/* Hero */}
      <section>
        <div className="mx-auto max-w-6xl px-4 py-16 sm:py-24 grid gap-10 sm:grid-cols-2 items-center">
          <div>
            <p className="text-sm font-medium text-sky-600 tracking-wide">
              Antalya · Isparta · Afyon · Konya · Ankara
            </p>
            <h1 className="mt-3 text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900">
              Antalya&apos;dan Ankara&apos;ya,{" "}
              <span className="text-sky-600">Konforun Adı</span>: {FIRMA_ADI}
            </h1>
            <p className="mt-5 text-slate-600 max-w-lg">
              Yıllardır aynı güzergahta, aynı güven ve konforla. Geniş
              koltuklar, klimalı araçlar ve düzenli mola noktalarıyla
              yolculuğunuz keyfe dönüşüyor.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/rezervasyon"
                className="rounded-lg bg-sky-600 px-5 py-3 text-sm font-semibold text-white hover:bg-sky-500 transition-colors"
              >
                Rezervasyon Yap
              </Link>
              <Link
                href="/guzergah"
                className="rounded-lg border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 hover:border-slate-400 transition-colors"
              >
                Güzergahımızı İncele
              </Link>
            </div>
          </div>
          <div className="relative aspect-square w-full max-w-sm mx-auto rounded-xl overflow-hidden shadow-sm">
            <Image
              src="/images/manzara.jpg"
              alt="Lüks Ereğli manzara"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </section>

      {/* İstatistik şeridi */}
      <section>
        <div className="mx-auto max-w-6xl px-4 pb-16">
          <div className="rounded-2xl bg-white shadow-sm grid grid-cols-2 sm:grid-cols-4 gap-6 text-center px-6 py-8">
            {ISTATISTIKLER.map((ist) => (
              <div key={ist.etiket}>
                <p className="font-mono text-3xl sm:text-4xl font-bold text-sky-600">
                  {ist.deger}
                </p>
                <p className="mt-1 text-xs sm:text-sm text-slate-500 uppercase tracking-wide">
                  {ist.etiket}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Güzergah */}
      <section>
        <div className="mx-auto max-w-6xl px-4 py-16">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">
              Güzergahımız
            </h2>
            <p className="mt-3 text-slate-600">
              Tek ve sabit hattımız boyunca beş şehri birbirine bağlıyoruz.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-5">
            {GUZERGAH.map((durak, i) => (
              <div key={durak} className="relative flex flex-col items-center text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-sky-600 text-white font-mono font-semibold">
                  {i + 1}
                </div>
                <h3 className="mt-4 font-bold text-slate-900">{durak}</h3>
                <p className="mt-2 text-sm text-slate-600">
                  {GUZERGAH_ACIKLAMA[durak]}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/guzergah"
              className="text-sm font-semibold text-sky-600 hover:text-sky-500"
            >
              Tüm güzergahı gör →
            </Link>
          </div>
        </div>
      </section>

      {/* Mola Yerleri & Etkinlikler önizleme */}
      <section>
        <div className="mx-auto max-w-6xl px-4 py-16 flex flex-col gap-16">
          <div>
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
                Mola Yerlerimiz
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
                {molaYerleri.map((mola) => {
                  const ad = mola.ad.toLowerCase();
                  let gorsel: string | undefined;
                  if (ad.includes("ısparta") || ad.includes("karacaören")) {
                    gorsel = "/images/isparta.jpg";
                  } else if (ad.includes("afyon")) {
                    gorsel = "/images/afyon.jpg";
                  } else if (ad.includes("konya")) {
                    gorsel = "/images/konya.jpg";
                  } else if (ad.includes("ankara") || ad.includes("ata")) {
                    gorsel = "/images/ata.jpg";
                  }

                  return (
                    <div
                      key={mola.id}
                      className="rounded-xl bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                    >
                      {gorsel ? (
                        <div className="relative aspect-video w-full">
                          <Image
                            src={gorsel}
                            alt={mola.ad}
                            fill
                            className="object-cover"
                            sizes="(max-width: 1024px) 100vw, 33vw"
                          />
                        </div>
                      ) : (
                        <div className="aspect-video w-full bg-slate-100 flex items-center justify-center text-xs text-slate-400">
                          Görsel eklenecek
                        </div>
                      )}
                      <div className="p-4">
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
                    </div>
                  );
                })}
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
              <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {etkinlikler.map((etkinlik) => {
                  const ad = etkinlik.ad.toLowerCase();
                  let gorsel: string | undefined;
                  if (ad.includes("anıtkabir")) {
                    gorsel = "/images/ata.jpg";
                  } else if (ad.includes("karacaören") || ad.includes("baraj")) {
                    gorsel = "/images/isparta.jpg";
                  } else if (ad.includes("afyon") || ad.includes("lezzet")) {
                    gorsel = "/images/afyon.jpg";
                  } else if (ad.includes("kelebek")) {
                    gorsel = "/images/konya.jpg";
                  }

                  return (
                    <div
                      key={etkinlik.id}
                      className="rounded-xl bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                    >
                      {gorsel ? (
                        <div className="relative aspect-video w-full">
                          <Image
                            src={gorsel}
                            alt={etkinlik.ad}
                            fill
                            className="object-cover"
                            sizes="(max-width: 1024px) 100vw, 33vw"
                          />
                        </div>
                      ) : (
                        <div className="aspect-video w-full bg-slate-100 flex items-center justify-center text-xs text-slate-400">
                          Görsel eklenecek
                        </div>
                      )}
                      <div className="p-4">
                        <h3 className="font-semibold text-slate-900">
                          {etkinlik.ad}
                        </h3>
                        {etkinlik.aciklama && (
                          <p className="mt-2 text-sm text-slate-600">
                            {etkinlik.aciklama}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Neden Lüks Ereğli */}
      <NedenBizSection items={NEDEN_BIZ} firmaAdi={FIRMA_ADI} />

      {/* CTA */}
      <section>
        <div className="mx-auto max-w-6xl px-4 pb-16">
          <div className="rounded-2xl bg-sky-600 px-6 py-12 text-center">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              Yolculuğunuza Başlamak İçin Hazır mısınız?
            </h2>
            <p className="mt-3 text-sky-50">
              Bilet ve sefer bilgileri için bizimle iletişime geçin.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link
                href="/rezervasyon"
                className="inline-block rounded-lg bg-white px-6 py-3 text-sm font-semibold text-sky-600 hover:bg-sky-50 transition-colors"
              >
                Rezervasyon Yap
              </Link>
              <Link
                href="/iletisim"
                className="inline-block rounded-lg border border-sky-300 px-6 py-3 text-sm font-semibold text-white hover:bg-sky-500 transition-colors"
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
