"use server";

import { revalidatePath } from "next/cache";
import { pool } from "@/lib/db";
import { ODEME_DURUMLARI } from "@/lib/routes";

export async function addPassenger(formData: FormData) {
  const ad_soyad = String(formData.get("ad_soyad") ?? "").trim();
  const telefon = String(formData.get("telefon") ?? "").trim();
  const koltuk_no = String(formData.get("koltuk_no") ?? "").trim();
  const binis_yeri = String(formData.get("binis_yeri") ?? "").trim();
  const inis_yeri = String(formData.get("inis_yeri") ?? "").trim();
  const tarih = String(formData.get("tarih") ?? "").trim();
  const ucret = String(formData.get("ucret") ?? "0").trim();
  const odeme_durumu = String(formData.get("odeme_durumu") ?? "").trim();

  if (
    !ad_soyad ||
    !telefon ||
    !koltuk_no ||
    !binis_yeri ||
    !inis_yeri ||
    !tarih ||
    !ODEME_DURUMLARI.includes(odeme_durumu as (typeof ODEME_DURUMLARI)[number])
  ) {
    throw new Error("Lütfen tüm zorunlu alanları doldurun.");
  }

  await pool.query(
    `INSERT INTO yolcular (ad_soyad, telefon, koltuk_no, binis_yeri, inis_yeri, tarih, ucret, odeme_durumu)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
    [ad_soyad, telefon, koltuk_no, binis_yeri, inis_yeri, tarih, ucret || "0", odeme_durumu]
  );

  revalidatePath("/yolcular");
}

export async function updatePaymentStatus(formData: FormData) {
  const id = Number(formData.get("id"));
  const odeme_durumu = String(formData.get("odeme_durumu") ?? "").trim();

  if (!id || !ODEME_DURUMLARI.includes(odeme_durumu as (typeof ODEME_DURUMLARI)[number])) {
    return;
  }

  await pool.query(`UPDATE yolcular SET odeme_durumu = $1 WHERE id = $2`, [
    odeme_durumu,
    id,
  ]);

  revalidatePath("/yolcular");
}

export async function deletePassenger(formData: FormData) {
  const id = Number(formData.get("id"));
  if (!id) return;

  await pool.query(`DELETE FROM yolcular WHERE id = $1`, [id]);

  revalidatePath("/yolcular");
}
