import { pool, type Rezervasyon } from "@/lib/db";
import { updateReservationStatus, deleteReservation } from "./actions";

export const dynamic = "force-dynamic";

const DURUM_RENK: Record<string, string> = {
  Beklemede: "bg-amber-100 text-amber-700",
  Onaylandı: "bg-emerald-100 text-emerald-700",
  "İptal Edildi": "bg-rose-100 text-rose-700",
};

async function getRezervasyonlar() {
  await pool.query(
    `CREATE TABLE IF NOT EXISTS rezervasyonlar (
      id SERIAL PRIMARY KEY,
      ad_soyad TEXT NOT NULL,
      telefon TEXT NOT NULL,
      binis_yeri TEXT NOT NULL,
      inis_yeri TEXT NOT NULL,
      tarih TEXT NOT NULL,
      yolcu_sayisi INTEGER NOT NULL DEFAULT 1,
      notlar TEXT,
      durum TEXT NOT NULL DEFAULT 'Beklemede',
      created_at TIMESTAMPTZ DEFAULT now()
    )`
  );

  const { rows } = await pool.query<Rezervasyon>(
    `SELECT * FROM rezervasyonlar ORDER BY tarih DESC, id DESC`
  );
  return rows;
}

function RezervasyonTable({
  rezervasyonlar,
  bos,
  islemler,
}: {
  rezervasyonlar: Rezervasyon[];
  bos: string;
  islemler: (rez: Rezervasyon) => React.ReactNode;
}) {
  if (rezervasyonlar.length === 0) {
    return <p className="text-slate-500 text-sm">{bos}</p>;
  }

  return (
    <table className="w-full text-sm">
      <thead>
        <tr className="text-left border-b border-slate-200">
          <th className="py-2 pr-4">Ad Soyad</th>
          <th className="py-2 pr-4">Telefon</th>
          <th className="py-2 pr-4">Güzergah</th>
          <th className="py-2 pr-4">Tarih</th>
          <th className="py-2 pr-4">Yolcu</th>
          <th className="py-2 pr-4">Not</th>
          <th className="py-2 pr-4">Durum</th>
          <th className="py-2 pr-4"></th>
        </tr>
      </thead>
      <tbody>
        {rezervasyonlar.map((rez) => (
          <tr key={rez.id} className="border-b border-slate-100 align-top">
            <td className="py-2 pr-4 font-medium text-slate-900">
              {rez.ad_soyad}
            </td>
            <td className="py-2 pr-4">{rez.telefon}</td>
            <td className="py-2 pr-4">
              {rez.binis_yeri} → {rez.inis_yeri}
            </td>
            <td className="py-2 pr-4">{rez.tarih}</td>
            <td className="py-2 pr-4">{rez.yolcu_sayisi}</td>
            <td className="py-2 pr-4 max-w-xs">{rez.notlar ?? "-"}</td>
            <td className="py-2 pr-4">
              <span
                className={`inline-block w-fit rounded-full px-2 py-1 text-xs font-medium ${
                  DURUM_RENK[rez.durum] ?? "bg-slate-100 text-slate-700"
                }`}
              >
                {rez.durum}
              </span>
            </td>
            <td className="py-2 pr-4">
              <div className="flex items-center gap-3">{islemler(rez)}</div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default async function RezervasyonlarPage() {
  const rezervasyonlar = await getRezervasyonlar();
  const talepler = rezervasyonlar.filter((rez) => rez.durum !== "Onaylandı");
  const onaylananlar = rezervasyonlar.filter((rez) => rez.durum === "Onaylandı");

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
          Rezervasyonlar
        </h1>
        <p className="mt-2 text-slate-600">
          Web sitesi üzerinden gelen rezervasyon talepleri.
        </p>
      </div>

      <div className="rounded-xl bg-white p-6 shadow-sm overflow-x-auto">
        <h2 className="text-lg font-semibold mb-4 text-slate-900">
          Talepler ({talepler.length})
        </h2>
        <RezervasyonTable
          rezervasyonlar={talepler}
          bos="Bekleyen talep yok."
          islemler={(rez) => (
            <>
              {rez.durum === "Beklemede" && (
                <form action={updateReservationStatus}>
                  <input type="hidden" name="id" value={rez.id} />
                  <input type="hidden" name="durum" value="Onaylandı" />
                  <button
                    type="submit"
                    className="rounded-lg bg-emerald-600 px-3 py-1 text-xs font-medium text-white hover:bg-emerald-500 transition-colors"
                  >
                    Onayla
                  </button>
                </form>
              )}
              {rez.durum === "Beklemede" && (
                <form action={updateReservationStatus}>
                  <input type="hidden" name="id" value={rez.id} />
                  <input type="hidden" name="durum" value="İptal Edildi" />
                  <button
                    type="submit"
                    className="rounded-lg border border-rose-300 px-3 py-1 text-xs font-medium text-rose-600 hover:bg-rose-50 transition-colors"
                  >
                    İptal Et
                  </button>
                </form>
              )}
              <form action={deleteReservation}>
                <input type="hidden" name="id" value={rez.id} />
                <button
                  type="submit"
                  className="text-rose-500 hover:underline text-xs"
                >
                  Sil
                </button>
              </form>
            </>
          )}
        />
      </div>

      <div className="rounded-xl bg-white p-6 shadow-sm overflow-x-auto">
        <h2 className="text-lg font-semibold mb-4 text-slate-900">
          Rezervasyonlar ({onaylananlar.length})
        </h2>
        <RezervasyonTable
          rezervasyonlar={onaylananlar}
          bos="Henüz onaylanmış rezervasyon yok."
          islemler={(rez) => (
            <>
              <form action={updateReservationStatus}>
                <input type="hidden" name="id" value={rez.id} />
                <input type="hidden" name="durum" value="İptal Edildi" />
                <button
                  type="submit"
                  className="rounded-lg border border-rose-300 px-3 py-1 text-xs font-medium text-rose-600 hover:bg-rose-50 transition-colors"
                >
                  İptal Et
                </button>
              </form>
              <form action={deleteReservation}>
                <input type="hidden" name="id" value={rez.id} />
                <button
                  type="submit"
                  className="text-rose-500 hover:underline text-xs"
                >
                  Sil
                </button>
              </form>
            </>
          )}
        />
      </div>
    </div>
  );
}
