"use server";

import { redirect } from "next/navigation";
import { pool } from "@/lib/db";
import { GUZERGAH } from "@/lib/routes";

export async function createReservation(formData: FormData) {
  const ad_soyad = String(formData.get("ad_soyad") ?? "").trim();
  const telefon = String(formData.get("telefon") ?? "").trim();
  const binis_yeri = String(formData.get("binis_yeri") ?? "").trim();
  const inis_yeri = String(formData.get("inis_yeri") ?? "").trim();
  const tarih = String(formData.get("tarih") ?? "").trim();
  const yolcu_sayisi = String(formData.get("yolcu_sayisi") ?? "1").trim();
  const notlar = String(formData.get("notlar") ?? "").trim();

  if (
    !ad_soyad ||
    !telefon ||
    !tarih ||
    !GUZERGAH.includes(binis_yeri as (typeof GUZERGAH)[number]) ||
    !GUZERGAH.includes(inis_yeri as (typeof GUZERGAH)[number])
  ) {
    redirect("/rezervasyon?hata=1");
  }

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

  await pool.query(
    `INSERT INTO rezervasyonlar
      (ad_soyad, telefon, binis_yeri, inis_yeri, tarih, yolcu_sayisi, notlar)
     VALUES ($1, $2, $3, $4, $5, $6, $7)`,
    [
      ad_soyad,
      telefon,
      binis_yeri,
      inis_yeri,
      tarih,
      Number(yolcu_sayisi) || 1,
      notlar || null,
    ]
  );

  redirect("/rezervasyon?gonderildi=1");
}
