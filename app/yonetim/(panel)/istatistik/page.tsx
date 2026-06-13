import { pool } from "@/lib/db";
import { REZERVASYON_DURUMLARI } from "@/lib/routes";

export const dynamic = "force-dynamic";

type GuzergahSatir = {
  binis_yeri: string;
  inis_yeri: string;
  adet: string;
  toplam: string;
};

type AylikSatir = {
  ay: string;
  adet: string;
  toplam: string;
};

type RezervasyonSatir = {
  durum: string;
  adet: string;
};

async function getIstatistikler() {
  const { rows: guzergahRows } = await pool.query<GuzergahSatir>(
    `SELECT binis_yeri, inis_yeri, COUNT(*) AS adet, COALESCE(SUM(ucret), 0) AS toplam
     FROM yolcular
     GROUP BY binis_yeri, inis_yeri
     ORDER BY COUNT(*) DESC
     LIMIT 10`
  );

  const { rows: aylikRows } = await pool.query<AylikSatir>(
    `SELECT to_char(tarih, 'YYYY-MM') AS ay, COUNT(*) AS adet, COALESCE(SUM(ucret), 0) AS toplam
     FROM yolcular
     GROUP BY ay
     ORDER BY ay DESC
     LIMIT 12`
  );

  const { rows: rezervasyonRows } = await pool.query<RezervasyonSatir>(
    `SELECT durum, COUNT(*) AS adet FROM rezervasyonlar GROUP BY durum`
  );

  const rezervasyonDurumlari = Object.fromEntries(
    REZERVASYON_DURUMLARI.map((durum) => [
      durum,
      Number(rezervasyonRows.find((r) => r.durum === durum)?.adet ?? 0),
    ])
  ) as Record<(typeof REZERVASYON_DURUMLARI)[number], number>;

  return { guzergahRows, aylikRows, rezervasyonDurumlari };
}

function formatPara(tutar: number) {
  return tutar.toLocaleString("tr-TR", {
    style: "currency",
    currency: "TRY",
  });
}

export default async function IstatistikSayfasi() {
  const { guzergahRows, aylikRows, rezervasyonDurumlari } = await getIstatistikler();

  const guzergahMax = Math.max(1, ...guzergahRows.map((r) => Number(r.adet)));
  const aylikMax = Math.max(1, ...aylikRows.map((r) => Number(r.adet)));
  const toplamRezervasyon = Object.values(rezervasyonDurumlari).reduce(
    (a, b) => a + b,
    0
  );

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
          İstatistikler
        </h1>
        <p className="mt-2 text-slate-600">
          Güzergah, gelir ve rezervasyon dağılımına genel bakış.
        </p>
      </div>

      <section className="rounded-xl bg-white p-6 shadow-sm">
        <h2 className="font-bold text-slate-900">En Çok Kullanılan Güzergahlar</h2>
        <p className="text-sm text-slate-500 mt-1">
          Biniş - iniş kombinasyonuna göre yolcu sayısı (en çok 10).
        </p>
        <div className="mt-4 flex flex-col gap-3">
          {guzergahRows.length === 0 && (
            <p className="text-sm text-slate-400">Henüz veri yok.</p>
          )}
          {guzergahRows.map((r) => (
            <div key={`${r.binis_yeri}-${r.inis_yeri}`}>
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium text-slate-700">
                  {r.binis_yeri} → {r.inis_yeri}
                </span>
                <span className="font-mono text-slate-500">
                  {r.adet} yolcu · {formatPara(Number(r.toplam))}
                </span>
              </div>
              <div className="mt-1 h-2 w-full rounded-full bg-slate-100">
                <div
                  className="h-2 rounded-full bg-sky-500"
                  style={{
                    width: `${(Number(r.adet) / guzergahMax) * 100}%`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-xl bg-white p-6 shadow-sm">
        <h2 className="font-bold text-slate-900">Aylık Yolcu ve Gelir</h2>
        <p className="text-sm text-slate-500 mt-1">Son 12 ay, en yeni üstte.</p>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-slate-500">
                <th className="py-2 pr-4">Ay</th>
                <th className="py-2 pr-4">Yolcu Sayısı</th>
                <th className="py-2 pr-4">Gelir</th>
                <th className="py-2">Dağılım</th>
              </tr>
            </thead>
            <tbody>
              {aylikRows.length === 0 && (
                <tr>
                  <td colSpan={4} className="py-2 text-slate-400">
                    Henüz veri yok.
                  </td>
                </tr>
              )}
              {aylikRows.map((r) => (
                <tr key={r.ay} className="border-t border-slate-100">
                  <td className="py-2 pr-4 font-medium text-slate-700">{r.ay}</td>
                  <td className="py-2 pr-4 font-mono text-slate-700">{r.adet}</td>
                  <td className="py-2 pr-4 font-mono text-slate-700">
                    {formatPara(Number(r.toplam))}
                  </td>
                  <td className="py-2 w-1/3">
                    <div className="h-2 w-full rounded-full bg-slate-100">
                      <div
                        className="h-2 rounded-full bg-emerald-500"
                        style={{
                          width: `${(Number(r.adet) / aylikMax) * 100}%`,
                        }}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="rounded-xl bg-white p-6 shadow-sm">
        <h2 className="font-bold text-slate-900">Rezervasyon Durumları</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          {REZERVASYON_DURUMLARI.map((durum) => (
            <div key={durum} className="rounded-lg bg-slate-50 p-4">
              <p className="text-sm text-slate-500">{durum}</p>
              <p className="mt-1 font-mono text-2xl font-bold text-slate-900">
                {rezervasyonDurumlari[durum]}
              </p>
              <p className="text-xs text-slate-400 mt-1">
                {toplamRezervasyon > 0
                  ? `${Math.round(
                      (rezervasyonDurumlari[durum] / toplamRezervasyon) * 100
                    )}%`
                  : "0%"}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
