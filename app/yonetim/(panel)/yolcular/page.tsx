import { pool, type Yolcu } from "@/lib/db";
import { GUZERGAH, ODEME_DURUMLARI } from "@/lib/routes";
import { addPassenger } from "./actions";
import YolcuRow from "./YolcuRow";

export const dynamic = "force-dynamic";

async function getYolcular() {
  const { rows } = await pool.query<Yolcu>(
    `SELECT * FROM yolcular ORDER BY tarih DESC, id DESC`
  );
  return rows;
}

export default async function YolcularPage() {
  const yolcular = await getYolcular();

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
          Yolcular
        </h1>
        <p className="mt-2 text-slate-600">
          Yolcu ekle, mevcut yolcuları görüntüle veya sil.
        </p>
      </div>

      <div className="rounded-xl bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold mb-4 text-slate-900">
          Yeni Yolcu Ekle
        </h2>
        <form action={addPassenger} className="grid gap-4 sm:grid-cols-2">
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
          <label className="flex flex-col gap-1 text-sm text-slate-700">
            Koltuk No
            <input
              type="text"
              name="koltuk_no"
              required
              className="rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
            />
          </label>
          <label className="flex flex-col gap-1 text-sm text-slate-700">
            Tarih
            <input
              type="date"
              name="tarih"
              required
              className="rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
            />
          </label>
          <label className="flex flex-col gap-1 text-sm text-slate-700">
            Biniş Yeri
            <select
              name="binis_yeri"
              required
              defaultValue=""
              className="rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
            >
              <option value="" disabled>
                Seçiniz
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
                Seçiniz
              </option>
              {GUZERGAH.map((durak) => (
                <option key={durak} value={durak}>
                  {durak}
                </option>
              ))}
            </select>
          </label>
          <label className="flex flex-col gap-1 text-sm text-slate-700">
            Ücret (TL)
            <input
              type="number"
              name="ucret"
              min="0"
              step="0.01"
              defaultValue="0"
              className="rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
            />
          </label>
          <label className="flex flex-col gap-1 text-sm text-slate-700">
            Ödeme Durumu
            <select
              name="odeme_durumu"
              required
              defaultValue="Beklemede"
              className="rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
            >
              {ODEME_DURUMLARI.map((durum) => (
                <option key={durum} value={durum}>
                  {durum}
                </option>
              ))}
            </select>
          </label>
          <div className="sm:col-span-2">
            <button
              type="submit"
              className="rounded-lg bg-sky-600 px-4 py-2 text-white font-medium hover:bg-sky-500 transition-colors"
            >
              Yolcu Ekle
            </button>
          </div>
        </form>
      </div>

      <div className="rounded-xl bg-white p-6 shadow-sm overflow-x-auto">
        <h2 className="text-lg font-semibold mb-4 text-slate-900">
          Yolcu Listesi ({yolcular.length})
        </h2>
        {yolcular.length === 0 ? (
          <p className="text-slate-500 text-sm">Henüz yolcu kaydı yok.</p>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left border-b border-slate-200">
                <th className="py-2 pr-4">Ad Soyad</th>
                <th className="py-2 pr-4">Telefon</th>
                <th className="py-2 pr-4">Koltuk</th>
                <th className="py-2 pr-4">Biniş</th>
                <th className="py-2 pr-4">İniş</th>
                <th className="py-2 pr-4">Tarih</th>
                <th className="py-2 pr-4">Ücret</th>
                <th className="py-2 pr-4">Ödeme Durumu</th>
                <th className="py-2 pr-4"></th>
              </tr>
            </thead>
            <tbody>
              {yolcular.map((yolcu) => (
                <YolcuRow key={yolcu.id} yolcu={yolcu} />
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
