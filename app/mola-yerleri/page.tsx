import { pool, type MolaYeri } from "@/lib/db";
import { addRestStop, deleteRestStop } from "./actions";

export const dynamic = "force-dynamic";

async function getMolaYerleri() {
  const { rows } = await pool.query<MolaYeri>(
    `SELECT * FROM mola_yerleri ORDER BY id DESC`
  );
  return rows;
}

export default async function MolaYerleriPage() {
  const molaYerleri = await getMolaYerleri();

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold">Mola Yerleri</h1>
        <p className="mt-2 text-zinc-600">
          Güzergah üzerindeki mola noktalarını ekle veya sil.
        </p>
      </div>

      <div className="rounded-lg border border-zinc-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Yeni Mola Yeri Ekle</h2>
        <form action={addRestStop} className="grid gap-4 sm:grid-cols-2">
          <label className="flex flex-col gap-1 text-sm">
            Ad
            <input
              type="text"
              name="ad"
              required
              className="rounded border border-zinc-300 px-3 py-2"
            />
          </label>
          <label className="flex flex-col gap-1 text-sm">
            Açıklama
            <input
              type="text"
              name="aciklama"
              className="rounded border border-zinc-300 px-3 py-2"
            />
          </label>
          <label className="flex flex-col gap-1 text-sm">
            Mola Süresi (dakika)
            <input
              type="number"
              name="mola_suresi"
              min="0"
              step="1"
              className="rounded border border-zinc-300 px-3 py-2"
            />
          </label>
          <div className="sm:col-span-2">
            <button
              type="submit"
              className="rounded bg-zinc-900 px-4 py-2 text-white font-medium hover:bg-zinc-700"
            >
              Ekle
            </button>
          </div>
        </form>
      </div>

      <div className="rounded-lg border border-zinc-200 bg-white p-6 shadow-sm overflow-x-auto">
        <h2 className="text-lg font-semibold mb-4">
          Mola Yerleri ({molaYerleri.length})
        </h2>
        {molaYerleri.length === 0 ? (
          <p className="text-zinc-500 text-sm">Henüz mola yeri eklenmedi.</p>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left border-b border-zinc-200">
                <th className="py-2 pr-4">Ad</th>
                <th className="py-2 pr-4">Açıklama</th>
                <th className="py-2 pr-4">Mola Süresi</th>
                <th className="py-2 pr-4"></th>
              </tr>
            </thead>
            <tbody>
              {molaYerleri.map((mola) => (
                <tr key={mola.id} className="border-b border-zinc-100">
                  <td className="py-2 pr-4">{mola.ad}</td>
                  <td className="py-2 pr-4">{mola.aciklama ?? "-"}</td>
                  <td className="py-2 pr-4">
                    {mola.mola_suresi != null ? `${mola.mola_suresi} dk` : "-"}
                  </td>
                  <td className="py-2 pr-4">
                    <form action={deleteRestStop}>
                      <input type="hidden" name="id" value={mola.id} />
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
