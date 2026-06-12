import { pool, type Mesaj } from "@/lib/db";
import { deleteMessage } from "./actions";

export const dynamic = "force-dynamic";

async function getMesajlar() {
  await pool.query(
    `CREATE TABLE IF NOT EXISTS mesajlar (
      id SERIAL PRIMARY KEY,
      ad_soyad TEXT NOT NULL,
      telefon TEXT,
      mesaj TEXT NOT NULL,
      created_at TIMESTAMPTZ DEFAULT now()
    )`
  );

  const { rows } = await pool.query<Mesaj>(
    `SELECT * FROM mesajlar ORDER BY created_at DESC`
  );
  return rows;
}

export default async function MesajlarPage() {
  const mesajlar = await getMesajlar();

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
          Mesajlar
        </h1>
        <p className="mt-2 text-slate-600">
          İletişim formu üzerinden gelen mesajlar.
        </p>
      </div>

      <div className="rounded-xl bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold mb-4 text-slate-900">
          Gelen Mesajlar ({mesajlar.length})
        </h2>
        {mesajlar.length === 0 ? (
          <p className="text-slate-500 text-sm">Henüz mesaj gelmedi.</p>
        ) : (
          <div className="flex flex-col gap-4">
            {mesajlar.map((mesaj) => (
              <div
                key={mesaj.id}
                className="rounded-lg border border-slate-200 p-4"
              >
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <p className="font-semibold text-slate-900">
                      {mesaj.ad_soyad}
                    </p>
                    {mesaj.telefon && (
                      <p className="text-sm text-slate-500">
                        {mesaj.telefon}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-3">
                    <p className="text-xs text-slate-400">
                      {new Date(mesaj.created_at).toLocaleString("tr-TR")}
                    </p>
                    <form action={deleteMessage}>
                      <input type="hidden" name="id" value={mesaj.id} />
                      <button
                        type="submit"
                        className="text-rose-500 hover:underline text-sm"
                      >
                        Sil
                      </button>
                    </form>
                  </div>
                </div>
                <p className="mt-3 text-sm text-slate-600 whitespace-pre-wrap">
                  {mesaj.mesaj}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
