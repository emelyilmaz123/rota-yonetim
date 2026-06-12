import Link from "next/link";
import { pool, type MolaYeri } from "@/lib/db";
import SecimKriterleriSection from "./SecimKriterleriSection";

export const dynamic = "force-dynamic";

const GENEL_IMKANLAR = [
  {
    baslik: "Temiz Tuvaletler",
    aciklama: "Düzenli olarak temizlenen, hijyenik tuvalet ve lavabo alanları.",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M7 21V9a4 4 0 0 1 8 0v12M5 21h14M9 21v-4a2 2 0 1 1 4 0v4"
      />
    ),
  },
  {
    baslik: "Sıcak Yemek & Restoran",
    aciklama: "Geniş menü seçenekleriyle sıcak yemek ve atıştırmalık imkanı.",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M4 3v8a4 4 0 0 0 4 4v6M8 3v8M12 3v8M16 3v18a4 4 0 0 0 4-4V3a4 4 0 0 0-4 4v4"
      />
    ),
  },
  {
    baslik: "Market & Büfe",
    aciklama: "Yol için su, içecek ve atıştırmalık alabileceğiniz market alanları.",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M3 7h18l-1.5 11.25A2 2 0 0 1 17.52 20H6.48a2 2 0 0 1-1.98-1.75L3 7zM8 7V5a4 4 0 0 1 8 0v2"
      />
    ),
  },
  {
    baslik: "Çay & Kahve Köşesi",
    aciklama: "Yorgunluğunuzu atmak için sıcak çay ve kahve seçenekleri.",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M3 9h14v4a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5V9zM17 9h1a3 3 0 0 1 0 6h-1M6 3v2M9 3v2M12 3v2"
      />
    ),
  },
  {
    baslik: "Namaz & Dinlenme Alanı",
    aciklama: "Sessiz ve ayrılmış namaz kılma ve dinlenme bölümleri.",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M12 3v6m0 0 3 3m-3-3-3 3M5 21h14M7 21v-4a5 5 0 0 1 10 0v4"
      />
    ),
  },
  {
    baslik: "Bebek Bakım Odası",
    aciklama: "Aileler için temiz ve özel bebek bakım ve emzirme odaları.",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM4 21v-2a6 6 0 0 1 6-6h4a6 6 0 0 1 6 6v2"
      />
    ),
  },
];

const SECIM_KRITERLERI = [
  {
    baslik: "Hijyen Denetimi",
    aciklama:
      "Anlaşmalı olduğumuz tesisler düzenli olarak denetlenir; temizlik ve hijyen standartlarımızı karşılamayan noktalarla çalışmayız.",
    detay:
      "Mola noktalarımızla çalışmaya başlamadan önce tuvalet, lavabo, yemek alanları ve genel temizlik standartlarını yerinde inceliyoruz. Anlaşma sonrasında da bu denetimleri düzenli aralıklarla tekrarlıyoruz; standartların altına düşen tesislerle iş birliğimizi sonlandırıyoruz. Amacımız, her molada yolcularımızın kendini evindeki gibi güvende ve temiz bir ortamda hissetmesini sağlamak.",
  },
  {
    baslik: "Stratejik Konum",
    aciklama:
      "Mola noktalarımız, güzergahımızın doğal duraklarına denk gelecek şekilde, yolculuğu uzatmadan dinlenme imkanı sunar.",
    detay:
      "Mola yerlerini seçerken güzergahımız üzerindeki mesafeleri ve sürüş sürelerini dikkatlice planlıyoruz. Böylece molalar, yolculuğa gereksiz bir uzama eklemeden, yolcularımızın ihtiyaç duyduğu anda karşılarına çıkıyor. Ayrıca her durağın kendi şehrinin meşhur bir noktasına yakın olmasına özen göstererek, kısa molaları bile keyifli bir deneyime dönüştürüyoruz.",
  },
  {
    baslik: "Çeşitli Hizmet Seçenekleri",
    aciklama:
      "Yemek, market, çay bahçesi gibi farklı ihtiyaçlara hitap eden, geniş seçenekli tesisleri tercih ederiz.",
    detay:
      "Her yolcunun mola sırasındaki ihtiyacı farklıdır; bazıları sıcak bir yemek, bazıları sadece bir çay veya kahve, bazıları ise market alışverişi yapmak ister. Bu nedenle anlaşmalı olduğumuz tesislerde restoran, büfe, market, çay bahçesi, namaz alanı ve bebek bakım odası gibi çok yönlü hizmetlerin bir arada bulunmasına dikkat ediyoruz; böylece kısa süre içinde herkes ihtiyacını karşılayabiliyor.",
  },
];

const ONERILER = [
  {
    baslik: "Biraz Esneyin",
    aciklama:
      "Uzun süre oturmanın ardından kısa bir yürüyüş ve esneme hareketleri kan dolaşımınızı canlandırır.",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M12 4v4m0 0-3 2m3-2 3 2M7 20l2.5-6L12 16l2.5-2L17 20"
      />
    ),
  },
  {
    baslik: "Yöresel Tatları Deneyin",
    aciklama:
      "Her mola noktası, bulunduğu bölgenin yöresel lezzetlerini tatma fırsatı sunar — fırsatı kaçırmayın.",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M4 3v8a4 4 0 0 0 4 4v6M8 3v8M12 3v8M16 3v18a4 4 0 0 0 4-4V3a4 4 0 0 0-4 4v4"
      />
    ),
  },
  {
    baslik: "Taze Hava Alın",
    aciklama:
      "Aracı terk etmeden önce kısa bir süre açık havada bulunmak, yolculuğun kalan kısmı için sizi tazeler.",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M12 3v3m6.36.64-2.12 2.12M21 12h-3M6.76 5.76 4.64 3.64M6 12H3m3.76 6.24-2.12 2.12M12 18v3m5.24-2.76 2.12 2.12M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z"
      />
    ),
  },
  {
    baslik: "Saatinize Dikkat Edin",
    aciklama:
      "Mola süreleri sınırlıdır; aracın kalkış saatini kaçırmamak için görevlilerin uyarılarını takip edin.",
    icon: (
      <>
        <circle cx="12" cy="12" r="9" strokeWidth={1.5} />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 7v5l3 3" />
      </>
    ),
  },
];

const YORESEL_TATLAR = [
  {
    sehir: "Antalya",
    tat: "Taze Narenciye & Deniz Ürünleri",
    aciklama:
      "Yolculuğunuza başlarken Antalya'nın bereketli topraklarından taze portakal ve mandalina suyuyla güne enerjik başlayabilirsiniz.",
  },
  {
    sehir: "Isparta",
    tat: "Gül Reçeli & Gül Şerbeti",
    aciklama:
      "Türkiye'nin gül bahçeleri Isparta'dan geçerken, bölgenin meşhur gül reçeli ve gül şerbetini tatmayı ihmal etmeyin.",
  },
  {
    sehir: "Afyon",
    tat: "Afyon Sucuğu & Lokumu",
    aciklama:
      "Mola noktamız Afyon, hem tuzlu hem tatlı damak zevkine hitap eden meşhur sucuğu ve lokumuyla bilinir.",
  },
  {
    sehir: "Konya",
    tat: "Etli Ekmek & Fırın Kebabı",
    aciklama:
      "Konya'dan geçerken, ince hamur üzerine kıyma ile hazırlanan etli ekmeğin eşsiz tadını deneyebilirsiniz.",
  },
  {
    sehir: "Ankara",
    tat: "Ankara Tava & Pidesi",
    aciklama:
      "Yolculuğun sonunda başkentin meşhur Ankara tavası ve pidesiyle yolculuğunuzu güzel bir lezzetle taçlandırabilirsiniz.",
  },
];

const YORUMLAR = [
  {
    isim: "M. Yılmaz",
    yorum:
      "Afyon'daki mola noktası gerçekten çok temizdi, kısa sürede hem yemek yiyip hem de dinlenebildik.",
  },
  {
    isim: "A. Demir",
    yorum:
      "Mola sürelerinin yeterli olması ve şoförlerin zamana özen göstermesi yolculuğu çok daha keyifli kılıyor.",
  },
  {
    isim: "S. Kaya",
    yorum:
      "Isparta'daki durakta gül şerbeti içmek, yolculuğun en güzel anılarından biri oldu.",
  },
];

async function getMolaYerleri() {
  const { rows } = await pool.query<MolaYeri>(
    `SELECT * FROM mola_yerleri ORDER BY id DESC`
  );
  return rows;
}

export default async function MolaYerleriPage() {
  const molaYerleri = await getMolaYerleri();
  const ortalamaSure =
    molaYerleri.length > 0
      ? Math.round(
          molaYerleri.reduce((acc, m) => acc + (m.mola_suresi ?? 0), 0) /
            molaYerleri.filter((m) => m.mola_suresi != null).length || 0
        )
      : 0;

  return (
    <div className="flex flex-col bg-sky-50">
      {/* Hero */}
      <section>
        <div className="mx-auto max-w-6xl px-4 py-16 text-center">
          <p className="text-sm font-medium text-sky-600 tracking-wide">
            Konfor · Hijyen · Güven
          </p>
          <h1 className="mt-3 text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900">
            Mola Yerlerimiz
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-slate-600">
            Uzun yolculuklarda dinlenmenin önemini biliyoruz. Güzergahımız
            üzerinde, temizliğine ve hizmet kalitesine güvendiğimiz mola
            noktalarında kısa bir nefes alma fırsatı sunuyoruz.
          </p>
        </div>
      </section>

      {/* İstatistik şeridi */}
      <section>
        <div className="mx-auto max-w-6xl px-4 pb-16">
          <div className="rounded-2xl bg-white shadow-sm grid grid-cols-2 sm:grid-cols-3 gap-6 text-center px-6 py-8">
            <div>
              <p className="font-mono text-3xl sm:text-4xl font-bold text-sky-600">
                {molaYerleri.length}
              </p>
              <p className="mt-1 text-xs sm:text-sm text-slate-500 uppercase tracking-wide">
                Mola Noktası
              </p>
            </div>
            <div>
              <p className="font-mono text-3xl sm:text-4xl font-bold text-sky-600">
                {ortalamaSure > 0 ? `~${ortalamaSure} dk` : "-"}
              </p>
              <p className="mt-1 text-xs sm:text-sm text-slate-500 uppercase tracking-wide">
                Ortalama Süre
              </p>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <p className="font-mono text-3xl sm:text-4xl font-bold text-sky-600">
                7/24
              </p>
              <p className="mt-1 text-xs sm:text-sm text-slate-500 uppercase tracking-wide">
                Temiz & Güvenilir
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Seçim kriterleri */}
      <section>
        <div className="mx-auto max-w-6xl px-4 pb-16">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">
              Mola Noktalarımızı Nasıl Seçiyoruz?
            </h2>
            <p className="mt-3 text-slate-600">
              Her mola noktası, yolcularımızın güveni için belirli
              kriterlerden geçer.
            </p>
          </div>

          <SecimKriterleriSection kriterler={SECIM_KRITERLERI} />
        </div>
      </section>

      {/* Mola noktaları */}
      <section>
        <div className="mx-auto max-w-6xl px-4 py-16">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">
              Güzergah Üzerindeki Mola Noktaları
            </h2>
            <p className="mt-3 text-slate-600">
              Yolculuğunuz sırasında durabileceğiniz, güvenilir tesislerle
              anlaşmalı mola noktalarımız.
            </p>
          </div>

          {molaYerleri.length === 0 ? (
            <p className="mt-10 text-center text-sm text-slate-500">
              Henüz mola yeri eklenmedi. Lütfen daha sonra tekrar kontrol
              edin.
            </p>
          ) : (
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {molaYerleri.map((mola) => (
                <div
                  key={mola.id}
                  className="rounded-xl bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow p-6"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-sky-100 text-sky-600">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="h-5 w-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M12 21c4-4 7-7.5 7-11a7 7 0 1 0-14 0c0 3.5 3 7 7 11zM12 11a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"
                        />
                      </svg>
                    </div>
                    {mola.mola_suresi != null && (
                      <span className="shrink-0 rounded-full bg-sky-100 px-3 py-1 text-xs font-medium text-sky-700">
                        {mola.mola_suresi} dk
                      </span>
                    )}
                  </div>
                  <h3 className="mt-4 font-bold text-slate-900">
                    {mola.ad}
                  </h3>
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
      </section>

      {/* Mola sırasında öneriler */}
      <section>
        <div className="mx-auto max-w-6xl px-4 py-16">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">
              Mola Sırasında Önerilerimiz
            </h2>
            <p className="mt-3 text-slate-600">
              Kısa molanızdan en iyi şekilde yararlanmak için küçük
              ipuçlarımız.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {ONERILER.map((oneri) => (
              <div
                key={oneri.baslik}
                className="rounded-xl bg-white p-5 shadow-sm"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sky-100 text-sky-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="h-5 w-5"
                  >
                    {oneri.icon}
                  </svg>
                </div>
                <h3 className="mt-4 font-semibold text-slate-900">
                  {oneri.baslik}
                </h3>
                <p className="mt-2 text-sm text-slate-600">
                  {oneri.aciklama}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Genel imkanlar */}
      <section>
        <div className="mx-auto max-w-6xl px-4 py-16">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">
              Mola Noktalarımızda Neler Sunuyoruz?
            </h2>
            <p className="mt-3 text-slate-600">
              Anlaşmalı olduğumuz tüm mola noktalarında aşağıdaki temel
              imkanları bulabilirsiniz.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {GENEL_IMKANLAR.map((imkan) => (
              <div
                key={imkan.baslik}
                className="rounded-xl bg-white p-5 shadow-sm"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sky-100 text-sky-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="h-5 w-5"
                  >
                    {imkan.icon}
                  </svg>
                </div>
                <h3 className="mt-4 font-semibold text-slate-900">
                  {imkan.baslik}
                </h3>
                <p className="mt-2 text-sm text-slate-600">
                  {imkan.aciklama}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Yöresel tatlar */}
      <section>
        <div className="mx-auto max-w-6xl px-4 py-16">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">
              Güzergahın Tatlarını Keşfedin
            </h2>
            <p className="mt-3 text-slate-600">
              Her mola noktası, bulunduğu şehrin yöresel lezzetlerini tanıma
              fırsatı sunar.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {YORESEL_TATLAR.map((tat) => (
              <div
                key={tat.sehir}
                className="rounded-xl bg-white p-5 shadow-sm"
              >
                <span className="rounded-full bg-sky-100 px-3 py-1 text-xs font-medium text-sky-700">
                  {tat.sehir}
                </span>
                <h3 className="mt-3 font-semibold text-slate-900">
                  {tat.tat}
                </h3>
                <p className="mt-2 text-sm text-slate-600">
                  {tat.aciklama}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Yolcu yorumları */}
      <section>
        <div className="mx-auto max-w-6xl px-4 py-16">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">
              Yolcularımız Ne Diyor?
            </h2>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {YORUMLAR.map((yorum) => (
              <div
                key={yorum.isim}
                className="rounded-xl bg-white p-6 shadow-sm"
              >
                <p className="text-sm text-slate-600 italic">
                  &ldquo;{yorum.yorum}&rdquo;
                </p>
                <p className="mt-4 text-sm font-semibold text-slate-900">
                  — {yorum.isim}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Güzergah bağlantısı + CTA */}
      <section>
        <div className="mx-auto max-w-6xl px-4 pb-16 grid gap-6 sm:grid-cols-2">
          <div className="rounded-2xl bg-white shadow-sm p-8">
            <h2 className="text-xl font-bold text-slate-900">
              Bu Mola Noktaları Nerede?
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Mola noktalarımız, Antalya–Ankara hattımız boyunca durak
              durak yer alır. Tüm güzergahı ve durak sırasını detaylı
              olarak inceleyebilirsiniz.
            </p>
            <Link
              href="/guzergah"
              className="mt-4 inline-block text-sm font-semibold text-sky-600 hover:text-sky-500"
            >
              Güzergahımızı incele →
            </Link>
          </div>

          <div className="rounded-2xl bg-sky-600 p-8 text-center flex flex-col items-center justify-center">
            <h2 className="text-xl font-bold text-white">
              Sorularınız mı var?
            </h2>
            <p className="mt-2 text-sm text-sky-50">
              Mola noktaları veya yolculuğunuz hakkında merak ettiklerinizi
              bize sorabilirsiniz.
            </p>
            <Link
              href="/iletisim"
              className="mt-4 inline-block rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-sky-600 hover:bg-sky-50 transition-colors"
            >
              İletişime Geç
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
