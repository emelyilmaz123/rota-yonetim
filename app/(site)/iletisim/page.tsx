import { FIRMA_ADI } from "@/lib/routes";
import { sendMessage } from "./actions";

const ILETISIM_BILGILERI = [
  {
    baslik: "Telefon",
    deger: "0541 898 18 65",
    aciklama: "Rezervasyon ve bilgi almak için bizi arayabilirsiniz.",
  },
  {
    baslik: "E-posta",
    deger: "emelyilmaz412@gmail.com",
    aciklama: "Sorularınızı ve taleplerinizi e-posta ile iletebilirsiniz.",
  },
  {
    baslik: "Adres",
    deger: "Antalya Otogarı",
    aciklama: "Antalya kalkış noktamız otogar içerisindedir.",
  },
];

export default async function IletisimPage({
  searchParams,
}: {
  searchParams: Promise<{ gonderildi?: string; hata?: string }>;
}) {
  const params = await searchParams;
  const gonderildi = params.gonderildi === "1";
  const hata = params.hata === "1";

  return (
    <div className="flex flex-col bg-sky-50">
      {/* Hero */}
      <section>
        <div className="mx-auto max-w-6xl px-4 py-16 text-center">
          <p className="text-sm font-medium text-sky-600 tracking-wide">
            Bize Ulaşın
          </p>
          <h1 className="mt-3 text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900">
            İletişim
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-slate-600">
            Sefer saatleri, rezervasyon ve diğer tüm sorularınız için bizimle
            iletişime geçebilirsiniz. {FIRMA_ADI} ekibi olarak size yardımcı
            olmaktan mutluluk duyarız.
          </p>
        </div>
      </section>

      {/* İletişim bilgileri & form */}
      <section>
        <div className="mx-auto max-w-6xl px-4 pb-16">
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="rounded-2xl bg-white shadow-sm p-8 flex flex-col gap-6">
              <h2 className="text-2xl font-extrabold tracking-tight text-slate-900">
                İletişim Bilgilerimiz
              </h2>
              {ILETISIM_BILGILERI.map((item) => (
                <div key={item.baslik}>
                  <p className="text-xs font-semibold uppercase tracking-wide text-sky-600">
                    {item.baslik}
                  </p>
                  <p className="mt-1 text-lg font-bold text-slate-900">
                    {item.deger}
                  </p>
                  <p className="mt-1 text-sm text-slate-600">
                    {item.aciklama}
                  </p>
                </div>
              ))}
              <div className="pt-2 border-t border-slate-100">
                <p className="text-sm text-slate-600">
                  <span className="font-semibold text-slate-900">
                    {FIRMA_ADI}
                  </span>{" "}
                  — Antalya - Isparta - Afyon - Konya - Ankara güzergahı
                </p>
              </div>
            </div>

            <div className="rounded-2xl bg-white shadow-sm p-8">
              <h2 className="text-2xl font-extrabold tracking-tight text-slate-900">
                Bize Mesaj Gönderin
              </h2>
              <p className="mt-2 text-sm text-slate-600">
                Formu doldurarak bize mesaj gönderebilirsiniz, en kısa
                sürede size dönüş yapacağız.
              </p>

              {gonderildi && (
                <p className="mt-4 rounded-lg bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
                  Mesajınız başarıyla gönderildi. Teşekkür ederiz!
                </p>
              )}
              {hata && (
                <p className="mt-4 rounded-lg bg-rose-50 px-4 py-3 text-sm font-medium text-rose-600">
                  Lütfen ad soyad ve mesaj alanlarını doldurun.
                </p>
              )}

              <form action={sendMessage} className="mt-6 grid gap-4">
                <label className="flex flex-col gap-1 text-sm text-slate-700">
                  Ad Soyad
                  <input
                    type="text"
                    name="ad_soyad"
                    required
                    className="rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                  />
                </label>
                <label className="flex flex-col gap-1 text-sm text-slate-700">
                  Telefon
                  <input
                    type="tel"
                    name="telefon"
                    className="rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                  />
                </label>
                <label className="flex flex-col gap-1 text-sm text-slate-700">
                  Mesaj
                  <textarea
                    name="mesaj"
                    rows={4}
                    required
                    className="rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                  />
                </label>
                <button
                  type="submit"
                  className="rounded-lg bg-sky-600 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-500 transition-colors"
                >
                  Gönder
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
