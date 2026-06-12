import { Pool } from "pg";

declare global {
  var pgPool: Pool | undefined;
}

const connectionString =
  process.env.POSTGRES_URL || process.env.DATABASE_URL;

export const pool =
  global.pgPool ??
  new Pool({
    connectionString,
    ssl: connectionString?.includes("localhost")
      ? undefined
      : { rejectUnauthorized: false },
  });

if (process.env.NODE_ENV !== "production") {
  global.pgPool = pool;
}

export type Yolcu = {
  id: number;
  ad_soyad: string;
  telefon: string;
  koltuk_no: string;
  binis_yeri: string;
  inis_yeri: string;
  tarih: string;
  ucret: string;
  odeme_durumu: string;
  created_at: string;
};

export type MolaYeri = {
  id: number;
  ad: string;
  aciklama: string | null;
  mola_suresi: number | null;
  created_at: string;
};

export type Etkinlik = {
  id: number;
  ad: string;
  aciklama: string | null;
  created_at: string;
};

export type Mesaj = {
  id: number;
  ad_soyad: string;
  telefon: string | null;
  mesaj: string;
  created_at: string;
};

export type Rezervasyon = {
  id: number;
  ad_soyad: string;
  telefon: string;
  binis_yeri: string;
  inis_yeri: string;
  tarih: string;
  yolcu_sayisi: number;
  notlar: string | null;
  durum: string;
  created_at: string;
};
