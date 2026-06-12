"use server";

import { redirect } from "next/navigation";
import { pool } from "@/lib/db";

export async function sendMessage(formData: FormData) {
  const ad_soyad = String(formData.get("ad_soyad") ?? "").trim();
  const telefon = String(formData.get("telefon") ?? "").trim();
  const mesaj = String(formData.get("mesaj") ?? "").trim();

  if (!ad_soyad || !mesaj) {
    redirect("/iletisim?hata=1");
  }

  await pool.query(
    `CREATE TABLE IF NOT EXISTS mesajlar (
      id SERIAL PRIMARY KEY,
      ad_soyad TEXT NOT NULL,
      telefon TEXT,
      mesaj TEXT NOT NULL,
      created_at TIMESTAMPTZ DEFAULT now()
    )`
  );

  await pool.query(
    `INSERT INTO mesajlar (ad_soyad, telefon, mesaj) VALUES ($1, $2, $3)`,
    [ad_soyad, telefon || null, mesaj]
  );

  redirect("/iletisim?gonderildi=1");
}
