import { pool, type Etkinlik } from "@/lib/db";
import { addActivity, deleteActivity } from "./actions";

export const dynamic = "force-dynamic";

async function getEtkinlikler() {
  const { rows } = await pool.query<Etkinlik>(
    `SELECT * FROM etkinlikler ORDER BY id DESC`
  );
  return rows;
}

export default async function EtkinliklerPage() {
  const etkinlikler = await getEtkinlikler();

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
          Etkinlikler
        </h1>
        <p className="mt-2 text-slate-600">
          Yolculuk boyunca sunulan etkinlik ve imkanları ekle veya sil.
        </p>
      </div>

      <div className="rounded-xl bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold mb-4 text-slate-900">
          Yeni Etkinlik Ekle
        </h2>
        <form action={addActivity} className="grid gap-4 sm:grid-cols-2">
          <label className="flex flex-col gap-1 text-sm text-slate-700">
            Ad
            <input
              type="text"
              name="ad"
              required
              className="rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
            />
          </label>
          <label className="flex flex-col gap-1 text-sm text-slate-700">
            Açıklama
            <input
              type="text"
              name="aciklama"
              className="rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
            />
          </label>
          <div className="sm:col-span-2">
            <button
              type="submit"
              className="rounded-lg bg-sky-600 px-4 py-2 text-white font-medium hover:bg-sky-500 transition-colors"
            >
              Ekle
            </button>
          </div>
        </form>
      </div>

      <div className="rounded-xl bg-white p-6 shadow-sm overflow-x-auto">
        <h2 className="text-lg font-semibold mb-4 text-slate-900">
          Etkinlikler ({etkinlikler.length})
        </h2>
        {etkinlikler.length === 0 ? (
          <p className="text-slate-500 text-sm">Henüz etkinlik eklenmedi.</p>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left border-b border-slate-200">
                <th className="py-2 pr-4">Ad</th>
                <th className="py-2 pr-4">Açıklama</th>
                <th className="py-2 pr-4"></th>
              </tr>
            </thead>
            <tbody>
              {etkinlikler.map((etkinlik) => (
                <tr key={etkinlik.id} className="border-b border-slate-100">
                  <td className="py-2 pr-4">{etkinlik.ad}</td>
                  <td className="py-2 pr-4">{etkinlik.aciklama ?? "-"}</td>
                  <td className="py-2 pr-4">
                    <form action={deleteActivity}>
                      <input type="hidden" name="id" value={etkinlik.id} />
                      <button
                        type="submit"
                        className="text-rose-500 hover:underline"
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
