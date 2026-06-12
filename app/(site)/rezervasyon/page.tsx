import { FIRMA_ADI, GUZERGAH } from "@/lib/routes";
import { createReservation } from "./actions";

const SEFER_SAATLERI = [
  { yon: "Antalya → Ankara", saatler: ["09:00", "21:00"] },
  { yon: "Ankara → Antalya", saatler: ["10:00", "22:00"] },
];

export default async function RezervasyonPage({
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
            Bilet & Rezervasyon
          </p>
          <h1 className="mt-3 text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900">
            Rezervasyon Yap
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-slate-600">
            Aşağıdaki formu doldurarak {FIRMA_ADI} için rezervasyon talebinde
            bulunabilirsiniz. Talebinizi aldıktan sonra en kısa sürede sizinle
            iletişime geçerek koltuk ve ödeme bilgilerinizi netleştireceğiz.
          </p>
        </div>
      </section>

      {/* Form & bilgi */}
      <section>
        <div className="mx-auto max-w-6xl px-4 pb-16">
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="rounded-2xl bg-white shadow-sm p-8">
              <h2 className="text-2xl font-extrabold tracking-tight text-slate-900">
                Rezervasyon Bilgileri
              </h2>
              <p className="mt-2 text-sm text-slate-600">
                Lütfen yolculuk bilgilerinizi girin, size dönüş yapalım.
              </p>

              {gonderildi && (
                <p className="mt-4 rounded-lg bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
                  Rezervasyon talebiniz alındı. En kısa sürede sizinle
                  iletişime geçeceğiz.
                </p>
              )}
              {hata && (
                <p className="mt-4 rounded-lg bg-rose-50 px-4 py-3 text-sm font-medium text-rose-600">
                  Lütfen tüm zorunlu alanları doldurun.
                </p>
              )}

              <form action={createReservation} className="mt-6 grid gap-4">
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
                    required
                    className="rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                  />
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <label className="flex flex-col gap-1 text-sm text-slate-700">
                    Biniş Yeri
                    <select
                      name="binis_yeri"
                      required
                      defaultValue=""
                      className="rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                    >
                      <option value="" disabled>
                        Seçin
                      </option>
                      {GUZERGAH.map((durak) => (
                        <option key={durak} value={durak}>
                          {durak}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label className="flex flex-col gap-1 text-sm text-slate-700">
                    İniş Yeri
                    <select
                      name="inis_yeri"
                      required
                      defaultValue=""
                      className="rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                    >
                      <option value="" disabled>
                        Seçin
                      </option>
                      {GUZERGAH.map((durak) => (
                        <option key={durak} value={durak}>
                          {durak}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <label className="flex flex-col gap-1 text-sm text-slate-700">
                    Sefer Tarihi
                    <input
                      type="date"
                      name="tarih"
                      required
                      className="rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                    />
                  </label>
                  <label className="flex flex-col gap-1 text-sm text-slate-700">
                    Yolcu Sayısı
                    <input
                      type="number"
                      name="yolcu_sayisi"
                      min={1}
                      defaultValue={1}
                      required
                      className="rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                    />
                  </label>
                </div>
                <label className="flex flex-col gap-1 text-sm text-slate-700">
                  Notunuz (opsiyonel)
                  <textarea
                    name="notlar"
                    rows={3}
                    className="rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                  />
                </label>
                <button
                  type="submit"
                  className="rounded-lg bg-sky-600 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-500 transition-colors"
                >
                  Rezervasyon Talebi Gönder
                </button>
              </form>
            </div>

            <div className="flex flex-col gap-6">
              <div className="rounded-2xl bg-white shadow-sm p-8">
                <h2 className="text-xl font-bold text-slate-900">
                  Sefer Saatleri
                </h2>
                <p className="mt-2 text-sm text-slate-600">
                  Güncel sefer saatlerimiz aşağıdaki gibidir. Rezervasyon
                  talebiniz onaylandığında size en uygun seferi bildireceğiz.
                </p>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  {SEFER_SAATLERI.map((sefer) => (
                    <div
                      key={sefer.yon}
                      className="rounded-xl border border-sky-100 bg-sky-50 p-4"
                    >
                      <p className="font-semibold text-slate-900">
                        {sefer.yon}
                      </p>
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

              <div className="rounded-2xl bg-sky-600 p-8 text-center flex flex-col items-center justify-center">
                <h2 className="text-xl font-bold text-white">
                  Hemen Ulaşmak İster misiniz?
                </h2>
                <p className="mt-2 text-sm text-sky-50">
                  Rezervasyon talebinizi bırakmak yerine bizi doğrudan
                  arayarak da bilet işleminizi yapabilirsiniz.
                </p>
                <p className="mt-4 font-mono text-lg font-bold text-white">
                  0541 898 18 65
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
