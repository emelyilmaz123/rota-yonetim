import Link from "next/link";
import { FIRMA_ADI } from "@/lib/routes";

const ZAMAN_TUNELI = [
  {
    yil: "1978",
    baslik: "Hikayemizin Başlangıcı",
    aciklama:
      "Aziz Yılmaz, Isparta'da küçük bir yolcu taşımacılığı işletmesi kurarak bugün hâlâ sürmekte olan yolculuğumuzun ilk adımını attı.",
  },
  {
    yil: "Sonraki Yıllar",
    baslik: "Antalya'ya Taşınma",
    aciklama:
      "Büyüyen talep ve turizm bölgesine olan yakınlığı nedeniyle işletme Antalya'ya taşındı; güzergahımızın temelleri burada şekillendi.",
  },
  {
    yil: "2023'e Kadar",
    baslik: "İkinci Nesil: Ali Yılmaz",
    aciklama:
      "Kurucumuz Aziz Yılmaz'ın oğlu Ali Yılmaz, yazıhanenin başına geçerek firmayı yıllarca titizlikle yönetti ve güvenilirliğini sürdürdü.",
  },
  {
    yil: "2023",
    baslik: "Yeni Bir Sayfa",
    aciklama:
      "Yazıhane 2023 yılında devredilerek yeni yönetimle birlikte aynı güven ve samimiyet anlayışıyla yolcularına hizmet vermeye devam ediyor.",
  },
];

const ISTATISTIKLER = [
  { deger: "1978", etiket: "Kuruluş Yılı" },
  { deger: "48+", etiket: "Yıllık Deneyim" },
  { deger: "1", etiket: "Araçlık Filo" },
  { deger: "D4", etiket: "Yetki Belgesi" },
];

const FILO_OZELLIKLERI = [
  {
    baslik: "Geniş & Konforlu Koltuklar",
    aciklama:
      "Uzun yolculuklarda dahi rahat edebileceğiniz, ferah ve dinlendirici koltuk düzeni.",
  },
  {
    baslik: "Klima",
    aciklama:
      "Mevsim şartlarına göre ayarlanan klima sistemi ile yolculuk boyunca ideal sıcaklık.",
  },
  {
    baslik: "Düzenli Bakım",
    aciklama:
      "Aracımız periyodik bakımlardan geçirilerek her sefer öncesi güvenlik kontrolünden geçer.",
  },
  {
    baslik: "Deneyimli Şoför",
    aciklama:
      "Güzergahı yıllardır bilen, tecrübeli ve dikkatli şoförümüzle güvenli bir yolculuk.",
  },
];

export default function HakkimizdaPage() {
  return (
    <div className="flex flex-col bg-sky-50">
      {/* Hero */}
      <section>
        <div className="mx-auto max-w-6xl px-4 py-16 text-center">
          <p className="text-sm font-medium text-sky-600 tracking-wide">
            1978&apos;den Beri
          </p>
          <h1 className="mt-3 text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900">
            Hakkımızda
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-slate-600">
            {FIRMA_ADI}, Isparta&apos;da küçük bir aile işletmesi olarak
            başlayan ve nesilden nesile aktarılan bir güven hikayesidir.
            Bugün Antalya&apos;dan Ankara&apos;ya uzanan güzergahımızda aynı
            samimiyetle yolcularımızı taşımaya devam ediyoruz.
          </p>
        </div>
      </section>

      {/* İstatistik şeridi */}
      <section>
        <div className="mx-auto max-w-6xl px-4 pb-16">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 rounded-2xl bg-white shadow-sm p-8 text-center">
            {ISTATISTIKLER.map((item) => (
              <div key={item.etiket}>
                <p className="font-mono text-2xl sm:text-3xl font-bold text-sky-600">
                  {item.deger}
                </p>
                <p className="mt-1 text-xs sm:text-sm text-slate-500 uppercase tracking-wide">
                  {item.etiket}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Firma Hikayesi */}
      <section>
        <div className="mx-auto max-w-6xl px-4 pb-16">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">
              Bizi Biz Yapan Hikaye
            </h2>
            <p className="mt-3 text-slate-600">
              Yarım asra yaklaşan yolculuğumuz, bir ailenin emeği ve
              kararlılığıyla şekillendi.
            </p>
          </div>

          <div className="mt-12 relative border-l-2 border-sky-200 ml-4 sm:ml-0">
            {ZAMAN_TUNELI.map((adim, index) => (
              <div key={adim.baslik} className="relative pl-8 pb-10 last:pb-0">
                <span className="absolute left-0 top-0 -translate-x-1/2 flex h-7 w-7 items-center justify-center rounded-full bg-sky-600 text-xs font-bold text-white">
                  {index + 1}
                </span>
                <p className="text-sm font-mono font-semibold text-sky-600">
                  {adim.yil}
                </p>
                <h3 className="mt-1 text-lg font-bold text-slate-900">
                  {adim.baslik}
                </h3>
                <p className="mt-2 text-sm text-slate-600">{adim.aciklama}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Misyon & Vizyon */}
      <section>
        <div className="mx-auto max-w-6xl px-4 pb-16">
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="rounded-2xl bg-white shadow-sm p-8">
              <h3 className="text-xl font-bold text-slate-900">Misyonumuz</h3>
              <p className="mt-3 text-sm text-slate-600">
                Yolcularımıza, ailemize gösterdiğimiz özeni göstererek;
                konforlu, güvenli ve dakik bir seyahat deneyimi sunmak.
                Kuruluşumuzdan bu yana değişmeyen ilkemiz, her yolcunun
                güvenle varış noktasına ulaşmasıdır.
              </p>
            </div>
            <div className="rounded-2xl bg-white shadow-sm p-8">
              <h3 className="text-xl font-bold text-slate-900">Vizyonumuz</h3>
              <p className="mt-3 text-sm text-slate-600">
                Aile işletmesi köklerimizden gelen samimiyeti koruyarak,
                Antalya–Ankara hattında yolcularımızın ilk tercihi olmaya
                devam etmek ve bu güveni gelecek nesillere de aktarmak.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Filomuz */}
      <section>
        <div className="mx-auto max-w-6xl px-4 pb-16">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">
              Filomuz
            </h2>
            <p className="mt-3 text-slate-600">
              Tek aracımızla, niceliğin değil niteliğin önemli olduğuna
              inanıyoruz. Aracımız her sefer öncesi titizlikle kontrol
              edilir.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {FILO_OZELLIKLERI.map((item) => (
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

      {/* Güvenlik & Lisans */}
      <section>
        <div className="mx-auto max-w-6xl px-4 pb-16">
          <div className="rounded-2xl bg-white shadow-sm p-8">
            <h2 className="text-2xl font-extrabold tracking-tight text-slate-900">
              Güvenliğiniz Bizim İçin Önemli
            </h2>
            <p className="mt-3 text-slate-600">
              {FIRMA_ADI}, Ulaştırma Bakanlığı tarafından verilen{" "}
              <strong>D4 yetki belgesi</strong> ile faaliyet göstermektedir.
              D4 belgesi, ticari amaçla yolcu taşımacılığı yapan işletmeler
              için gereken yasal yetkilendirmedir ve düzenli denetimlere
              tabidir.
            </p>
            <p className="mt-3 text-slate-600">
              48 yılı aşan tecrübemiz boyunca edindiğimiz bilgi birikimi,
              her yolculukta yolcularımızın güvenliğini ön planda tutmamızı
              sağlıyor. Aracımızın bakımları düzenli olarak yapılır ve
              güzergahımız, deneyimli şoförümüz tarafından titizlikle
              planlanır.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section>
        <div className="mx-auto max-w-6xl px-4 pb-16">
          <div className="rounded-2xl bg-sky-600 px-6 py-12 text-center">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              Bizimle Yolculuğa Çıkın
            </h2>
            <p className="mt-3 text-sky-50 max-w-xl mx-auto">
              48 yıllık tecrübemizle Antalya–Ankara hattında sizi de
              yolcularımız arasında görmekten mutluluk duyarız.
            </p>
            <div className="mt-6">
              <Link
                href="/iletisim"
                className="inline-block rounded-lg bg-white px-6 py-3 text-sm font-semibold text-sky-600 hover:bg-sky-50 transition-colors"
              >
                İletişime Geçin
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
