import Link from "next/link";
import Image from "next/image";

const GORULECEKLER = [
  {
    baslik: "Aslanlı Yol",
    aciklama:
      "Hitit ve Anadolu medeniyetlerinden ilham alan 24 aslan heykeliyle çevrili, Tören Meydanı'na açılan tarihi yürüyüş yolu.",
  },
  {
    baslik: "Tören Meydanı",
    aciklama:
      "15.000 metrekarelik geniş meydan, resmi tören ve karşılama programlarına ev sahipliği yapar.",
  },
  {
    baslik: "Mozole (Anıt Bloku)",
    aciklama:
      "Mustafa Kemal Atatürk'ün kabrinin bulunduğu, sade ve etkileyici mimarisiyle dikkat çeken ana yapı.",
  },
  {
    baslik: "Atatürk ve Kurtuluş Savaşı Müzesi",
    aciklama:
      "Atatürk'ün kişisel eşyaları, hediyeler, savaş dönemine ait belgeler ve dioramaların sergilendiği geniş müze alanı.",
  },
];

const ZIYARET_BILGILERI = [
  { etiket: "Giriş", deger: "Ücretsiz" },
  { etiket: "Ziyaret Saatleri", deger: "09:00 - 17:00" },
  { etiket: "Konum", deger: "Anıttepe, Ankara" },
  { etiket: "Önerilen Süre", deger: "1 - 1,5 saat" },
];

export default function AnitkabirPage() {
  return (
    <div className="flex flex-col bg-sky-50">
      {/* Hero */}
      <section>
        <div className="mx-auto max-w-6xl px-4 py-16 grid gap-10 sm:grid-cols-2 items-center">
          <div>
            <p className="text-sm font-medium text-sky-600 tracking-wide">
              Ankara · Güzergah Etkinliği
            </p>
            <h1 className="mt-3 text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900">
              Anıtkabir Ziyareti
            </h1>
            <p className="mt-5 text-slate-600">
              Yolculuğumuzun varış noktası Ankara'da, Türkiye Cumhuriyeti'nin
              kurucusu Mustafa Kemal Atatürk'ün anıt mezarı Anıtkabir'i
              ziyaret etme imkanı sunuyoruz. Tarihi atmosferi ve etkileyici
              mimarisiyle Anıtkabir, yolculuğunuza anlamlı bir duraktır.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/guzergah"
                className="rounded-lg bg-sky-600 px-5 py-3 text-sm font-semibold text-white hover:bg-sky-500 transition-colors"
              >
                Güzergahımızı İncele
              </Link>
              <Link
                href="/etkinlikler"
                className="rounded-lg border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 hover:border-slate-400 transition-colors"
              >
                Diğer Etkinlikler
              </Link>
            </div>
          </div>
          <div className="relative aspect-square w-full max-w-sm mx-auto rounded-xl overflow-hidden shadow-sm">
            <Image
              src="/images/ata.jpg"
              alt="Anıtkabir"
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, 384px"
              priority
            />
          </div>
        </div>
      </section>

      {/* Anıtkabir Nedir */}
      <section>
        <div className="mx-auto max-w-6xl px-4 py-16">
          <div className="rounded-2xl bg-white shadow-sm p-8">
            <h2 className="text-2xl font-extrabold tracking-tight text-slate-900">
              Anıtkabir Nedir?
            </h2>
            <p className="mt-3 text-slate-600">
              Anıtkabir, Türkiye Cumhuriyeti'nin kurucusu Gazi Mustafa Kemal
              Atatürk'ün anıt mezarıdır. 1944-1953 yılları arasında Ankara'nın
              Anıttepe semtinde inşa edilen yapı, Türk mimarisinin modern
              dönemine ait en önemli eserlerinden biri olarak kabul edilir.
              Sade ve anıtsal tasarımıyla hem yerli hem yabancı ziyaretçilerin
              akın ettiği bir simge haline gelmiştir.
            </p>
            <p className="mt-3 text-slate-600">
              Geniş Aslanlı Yol, Tören Meydanı ve Mozole'den oluşan kompleks,
              aynı zamanda Atatürk'ün hayatını ve Kurtuluş Savaşı'nı anlatan
              kapsamlı bir müzeye de ev sahipliği yapar.
            </p>
          </div>
        </div>
      </section>

      {/* Tarihçe */}
      <section>
        <div className="mx-auto max-w-6xl px-4 pb-16">
          <div className="rounded-2xl bg-white shadow-sm p-8">
            <h2 className="text-2xl font-extrabold tracking-tight text-slate-900">
              Yapım Tarihçesi
            </h2>
            <p className="mt-3 text-slate-600">
              Anıtkabir'in yapımı için 1941 yılında uluslararası bir mimari
              proje yarışması açıldı. Yarışmaya 49 mimar katıldı ve birincilik
              ödülünü, Türk mimarlar <strong>Emin Onat</strong> ve{" "}
              <strong>Ahmet Orhan Arda</strong>'nın projesi kazandı.
            </p>
            <p className="mt-3 text-slate-600">
              İnşaata <strong>9 Ekim 1944</strong> tarihinde başlandı.
              Yaklaşık dokuz yıl süren çalışmalar sonucunda anıt
              tamamlandı ve Atatürk'ün naaşı{" "}
              <strong>10 Kasım 1953</strong>'te, ölümünün 15. yıl dönümünde,
              geçici kabrinden Anıtkabir'deki bugünkü yerine taşındı.
            </p>

            <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
              <div>
                <p className="font-mono text-lg sm:text-xl font-bold text-sky-600">
                  1941
                </p>
                <p className="mt-1 text-xs text-slate-500 uppercase tracking-wide">
                  Proje Yarışması
                </p>
              </div>
              <div>
                <p className="font-mono text-lg sm:text-xl font-bold text-sky-600">
                  1944
                </p>
                <p className="mt-1 text-xs text-slate-500 uppercase tracking-wide">
                  İnşaatın Başlangıcı
                </p>
              </div>
              <div>
                <p className="font-mono text-lg sm:text-xl font-bold text-sky-600">
                  1953
                </p>
                <p className="mt-1 text-xs text-slate-500 uppercase tracking-wide">
                  Tamamlanması
                </p>
              </div>
              <div>
                <p className="font-mono text-lg sm:text-xl font-bold text-sky-600">
                  Onat & Arda
                </p>
                <p className="mt-1 text-xs text-slate-500 uppercase tracking-wide">
                  Mimarlar
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Görülecekler */}
      <section>
        <div className="mx-auto max-w-6xl px-4 py-16">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">
              Ziyaret Sırasında Görebilecekleriniz
            </h2>
            <p className="mt-3 text-slate-600">
              Anıtkabir kompleksi içinde sizi bekleyen başlıca alanlar.
            </p>
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

      {/* Ziyaret bilgileri */}
      <section>
        <div className="mx-auto max-w-6xl px-4 py-16">
          <div className="rounded-2xl bg-white shadow-sm p-8">
            <h2 className="text-2xl font-extrabold tracking-tight text-slate-900">
              Ziyaret Bilgileri
            </h2>
            <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
              {ZIYARET_BILGILERI.map((bilgi) => (
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
            <p className="mt-6 text-sm text-slate-600">
              Anıtkabir saygı ve anma amacıyla ziyaret edilen bir alandır.
              Ziyaret sırasında sessiz olunması, uygun kıyafet tercih
              edilmesi ve görevlilerin yönlendirmelerine uyulması rica edilir.
            </p>
          </div>
        </div>
      </section>

      {/* Güzergah bağlantısı */}
      <section>
        <div className="mx-auto max-w-6xl px-4 pb-16">
          <div className="rounded-2xl bg-sky-600 px-6 py-12 text-center">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              Ankara Durağımızın Bir Parçası
            </h2>
            <p className="mt-3 text-sky-50 max-w-xl mx-auto">
              Anıtkabir ziyareti, Antalya–Ankara güzergahımızın varış
              noktasında yer alan etkinliklerimizden biridir. Güzergahımız
              hakkında daha fazla bilgi almak için aşağıdaki bağlantıyı
              kullanabilirsiniz.
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
