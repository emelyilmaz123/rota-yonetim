import { pool } from "@/lib/db";
import { ODEME_DURUMLARI } from "@/lib/routes";

export const dynamic = "force-dynamic";

async function getStats() {
  const { rows } = await pool.query<{
    odeme_durumu: string;
    adet: string;
    toplam: string;
  }>(
    `SELECT odeme_durumu, COUNT(*) AS adet, COALESCE(SUM(ucret), 0) AS toplam
     FROM yolcular GROUP BY odeme_durumu`
  );

  const toplamYolcu = rows.reduce((acc, r) => acc + Number(r.adet), 0);
  const toplamGelir = rows.reduce((acc, r) => acc + Number(r.toplam), 0);

  const durumlar = Object.fromEntries(
    ODEME_DURUMLARI.map((durum) => [
      durum,
      Number(rows.find((r) => r.odeme_durumu === durum)?.adet ?? 0),
    ])
  ) as Record<(typeof ODEME_DURUMLARI)[number], number>;

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
  const { rows: rezRows } = await pool.query<{ adet: string }>(
    `SELECT COUNT(*) AS adet FROM rezervasyonlar WHERE durum = 'Beklemede'`
  );
  const bekleyenRezervasyon = Number(rezRows[0]?.adet ?? 0);

  return { toplamYolcu, toplamGelir, durumlar, bekleyenRezervasyon };
}

function formatPara(tutar: number) {
  return tutar.toLocaleString("tr-TR", {
    style: "currency",
    currency: "TRY",
  });
}

const HIZLI_ERISIM = [
  {
    href: "/yonetim/yolcular",
    baslik: "Yolcular",
    aciklama: "Yolcu kaydı ekle, listele ve sil.",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M17 20h5v-1a4 4 0 0 0-4-4h-1m-5 5H2v-1a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v1zM15 7a3 3 0 1 1-6 0 3 3 0 0 1 6 0zm6 3a2.5 2.5 0 1 1-3.5-2.29M3 10a2.5 2.5 0 1 0 3.5-2.29"
      />
    ),
  },
  {
    href: "/yonetim/mola-yerleri",
    baslik: "Mola Yerleri",
    aciklama: "Güzergah üzerindeki mola noktalarını yönet.",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M12 21c-4-4-7-7.5-7-11a7 7 0 1 1 14 0c0 3.5-3 7-7 11zM12 13a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"
      />
    ),
  },
  {
    href: "/yonetim/etkinlikler",
    baslik: "Etkinlikler",
    aciklama: "Yolculuk boyunca sunulan etkinlik/imkanları yönet.",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M8 7V3m8 4V3M4 11h16M5 5h14a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1z"
      />
    ),
  },
  {
    href: "/yonetim/rezervasyonlar",
    baslik: "Rezervasyonlar",
    aciklama: "Web sitesinden gelen rezervasyon taleplerini yönet.",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M8 7V3m8 4V3M4 11h16M5 5h14a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1zM9 16h6M9 13h3"
      />
    ),
  },
];

export default async function YonetimPanel() {
  const { toplamYolcu, toplamGelir, durumlar, bekleyenRezervasyon } = await getStats();

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
          Panel
        </h1>
        <p className="mt-2 text-slate-600">Genel özet ve hızlı erişim.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <div className="rounded-xl bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-500">Toplam Yolcu</p>
          <p className="mt-1 font-mono text-3xl font-bold text-slate-900">
            {toplamYolcu}
          </p>
        </div>
        <div className="rounded-xl bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-500">Toplam Gelir</p>
          <p className="mt-1 font-mono text-3xl font-bold text-sky-600">
            {formatPara(toplamGelir)}
          </p>
        </div>
        <div className="rounded-xl bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-500">Ödendi</p>
          <p className="mt-1 font-mono text-3xl font-bold text-emerald-600">
            {durumlar["Ödendi"]}
          </p>
        </div>
        <div className="rounded-xl bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-500">Beklemede / Ödenmedi</p>
          <p className="mt-1 font-mono text-3xl font-bold text-rose-500">
            {durumlar["Beklemede"] + durumlar["Ödenmedi"]}
          </p>
        </div>
        <a
          href="/yonetim/rezervasyonlar"
          className="rounded-xl bg-white p-6 shadow-sm hover:shadow-md transition-shadow"
        >
          <p className="text-sm text-slate-500">Bekleyen Rezervasyon</p>
          <p className="mt-1 font-mono text-3xl font-bold text-amber-500">
            {bekleyenRezervasyon}
          </p>
        </a>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {HIZLI_ERISIM.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className="rounded-xl bg-white p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sky-100 text-sky-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-5 w-5"
              >
                {item.icon}
              </svg>
            </div>
            <h3 className="mt-3 font-bold text-slate-900">{item.baslik}</h3>
            <p className="text-sm text-slate-600 mt-1">{item.aciklama}</p>
          </a>
        ))}
      </div>
    </div>
  );
}
