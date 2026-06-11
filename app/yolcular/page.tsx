import { pool, type Yolcu } from "@/lib/db";
import { GUZERGAH, ODEME_DURUMLARI } from "@/lib/routes";
import { addPassenger, deletePassenger, updatePaymentStatus } from "./actions";

export const dynamic = "force-dynamic";

async function getYolcular() {
  const { rows } = await pool.query<Yolcu>(
    `SELECT * FROM yolcular ORDER BY tarih DESC, id DESC`
  );
  return rows;
}

function formatTarih(tarih: string) {
  const d = new Date(tarih);
  return d.toLocaleDateString("tr-TR");
}

function formatUcret(ucret: string) {
  return Number(ucret).toLocaleString("tr-TR", {
    style: "currency",
    currency: "TRY",
  });
}

export default async function YolcularPage() {
  const yolcular = await getYolcular();

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold">Yolcular</h1>
        <p className="mt-2 text-zinc-600">
          Yolcu ekle, mevcut yolcuları görüntüle veya sil.
        </p>
      </div>

      <div className="rounded-lg border border-zinc-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Yeni Yolcu Ekle</h2>
        <form action={addPassenger} className="grid gap-4 sm:grid-cols-2">
          <label className="flex flex-col gap-1 text-sm">
            Ad Soyad
            <input
              type="text"
              name="ad_soyad"
              required
              className="rounded border border-zinc-300 px-3 py-2"
            />
          </label>
          <label className="flex flex-col gap-1 text-sm">
            Telefon
            <input
              type="tel"
              name="telefon"
              required
              className="rounded border border-zinc-300 px-3 py-2"
            />
          </label>
          <label className="flex flex-col gap-1 text-sm">
            Koltuk No
            <input
              type="text"
              name="koltuk_no"
              required
              className="rounded border border-zinc-300 px-3 py-2"
            />
          </label>
          <label className="flex flex-col gap-1 text-sm">
            Tarih
            <input
              type="date"
              name="tarih"
              required
              className="rounded border border-zinc-300 px-3 py-2"
            />
          </label>
          <label className="flex flex-col gap-1 text-sm">
            Biniş Yeri
            <select
              name="binis_yeri"
              required
              defaultValue=""
              className="rounded border border-zinc-300 px-3 py-2"
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
          <label className="flex flex-col gap-1 text-sm">
            İniş Yeri
            <select
              name="inis_yeri"
              required
              defaultValue=""
              className="rounded border border-zinc-300 px-3 py-2"
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
          <label className="flex flex-col gap-1 text-sm">
            Ücret (TL)
            <input
              type="number"
              name="ucret"
              min="0"
              step="0.01"
              defaultValue="0"
              className="rounded border border-zinc-300 px-3 py-2"
            />
          </label>
          <label className="flex flex-col gap-1 text-sm">
            Ödeme Durumu
            <select
              name="odeme_durumu"
              required
              defaultValue="Beklemede"
              className="rounded border border-zinc-300 px-3 py-2"
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
              className="rounded bg-zinc-900 px-4 py-2 text-white font-medium hover:bg-zinc-700"
            >
              Yolcu Ekle
            </button>
          </div>
        </form>
      </div>

      <div className="rounded-lg border border-zinc-200 bg-white p-6 shadow-sm overflow-x-auto">
        <h2 className="text-lg font-semibold mb-4">
          Yolcu Listesi ({yolcular.length})
        </h2>
        {yolcular.length === 0 ? (
          <p className="text-zinc-500 text-sm">Henüz yolcu kaydı yok.</p>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left border-b border-zinc-200">
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
                <tr key={yolcu.id} className="border-b border-zinc-100">
                  <td className="py-2 pr-4">{yolcu.ad_soyad}</td>
                  <td className="py-2 pr-4">{yolcu.telefon}</td>
                  <td className="py-2 pr-4">{yolcu.koltuk_no}</td>
                  <td className="py-2 pr-4">{yolcu.binis_yeri}</td>
                  <td className="py-2 pr-4">{yolcu.inis_yeri}</td>
                  <td className="py-2 pr-4">{formatTarih(yolcu.tarih)}</td>
                  <td className="py-2 pr-4">{formatUcret(yolcu.ucret)}</td>
                  <td className="py-2 pr-4">
                    <form action={updatePaymentStatus} className="flex items-center gap-2">
                      <input type="hidden" name="id" value={yolcu.id} />
                      <select
                        name="odeme_durumu"
                        defaultValue={yolcu.odeme_durumu}
                        className={`rounded border px-2 py-1 text-xs font-medium ${
                          yolcu.odeme_durumu === "Ödendi"
                            ? "border-green-300 bg-green-50 text-green-700"
                            : yolcu.odeme_durumu === "Ödenmedi"
                            ? "border-red-300 bg-red-50 text-red-700"
                            : "border-amber-300 bg-amber-50 text-amber-700"
                        }`}
                      >
                        {ODEME_DURUMLARI.map((durum) => (
                          <option key={durum} value={durum}>
                            {durum}
                          </option>
                        ))}
                      </select>
                      <button
                        type="submit"
                        className="text-xs text-zinc-500 hover:underline"
                      >
                        Güncelle
                      </button>
                    </form>
                  </td>
                  <td className="py-2 pr-4">
                    <form action={deletePassenger}>
                      <input type="hidden" name="id" value={yolcu.id} />
                      <button
                        type="submit"
                        className="text-red-600 hover:underline"
                      >
                        Sil
                      </button>
                    </form>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
