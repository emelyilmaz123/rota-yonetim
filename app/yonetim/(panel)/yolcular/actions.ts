"use server";

import { revalidatePath } from "next/cache";
import { pool } from "@/lib/db";
import { GUZERGAH, ODEME_DURUMLARI } from "@/lib/routes";

export async function addPassenger(formData: FormData) {
  const ad_soyad = String(formData.get("ad_soyad") ?? "").trim();
  const telefon = String(formData.get("telefon") ?? "").trim();
  const koltuk_no = String(formData.get("koltuk_no") ?? "").trim();
  const tarih = String(formData.get("tarih") ?? "").trim();
  const binis_yeri = String(formData.get("binis_yeri") ?? "").trim();
  const inis_yeri = String(formData.get("inis_yeri") ?? "").trim();
  const ucret = String(formData.get("ucret") ?? "0").trim();
  const odeme_durumu = String(formData.get("odeme_durumu") ?? "Beklemede").trim();

  if (!ad_soyad || !telefon || !koltuk_no || !tarih) {
    throw new Error("Lütfen zorunlu alanları doldurun.");
  }

  if (!GUZERGAH.includes(binis_yeri as (typeof GUZERGAH)[number])) {
    throw new Error("Geçersiz biniş yeri.");
  }

  if (!GUZERGAH.includes(inis_yeri as (typeof GUZERGAH)[number])) {
    throw new Error("Geçersiz iniş yeri.");
  }

  if (!ODEME_DURUMLARI.includes(odeme_durumu as (typeof ODEME_DURUMLARI)[number])) {
    throw new Error("Geçersiz ödeme durumu.");
  }

  await pool.query(
    `INSERT INTO yolcular
      (ad_soyad, telefon, koltuk_no, binis_yeri, inis_yeri, tarih, ucret, odeme_durumu)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
    [ad_soyad, telefon, koltuk_no, binis_yeri, inis_yeri, tarih, Number(ucret), odeme_durumu]
  );

  revalidatePath("/yonetim/yolcular");
}

export async function updatePassenger(formData: FormData) {
  const id = Number(formData.get("id"));
  const ad_soyad = String(formData.get("ad_soyad") ?? "").trim();
  const telefon = String(formData.get("telefon") ?? "").trim();
  const koltuk_no = String(formData.get("koltuk_no") ?? "").trim();
  const tarih = String(formData.get("tarih") ?? "").trim();
  const binis_yeri = String(formData.get("binis_yeri") ?? "").trim();
  const inis_yeri = String(formData.get("inis_yeri") ?? "").trim();
  const ucret = String(formData.get("ucret") ?? "0").trim();
  const odeme_durumu = String(formData.get("odeme_durumu") ?? "Beklemede").trim();

  if (!id) return;

  if (!ad_soyad || !telefon || !koltuk_no || !tarih) {
    throw new Error("Lütfen zorunlu alanları doldurun.");
  }

  if (!GUZERGAH.includes(binis_yeri as (typeof GUZERGAH)[number])) {
    throw new Error("Geçersiz biniş yeri.");
  }

  if (!GUZERGAH.includes(inis_yeri as (typeof GUZERGAH)[number])) {
    throw new Error("Geçersiz iniş yeri.");
  }

  if (!ODEME_DURUMLARI.includes(odeme_durumu as (typeof ODEME_DURUMLARI)[number])) {
    throw new Error("Geçersiz ödeme durumu.");
  }

  await pool.query(
    `UPDATE yolcular
     SET ad_soyad = $1, telefon = $2, koltuk_no = $3, binis_yeri = $4,
         inis_yeri = $5, tarih = $6, ucret = $7, odeme_durumu = $8
     WHERE id = $9`,
    [ad_soyad, telefon, koltuk_no, binis_yeri, inis_yeri, tarih, Number(ucret), odeme_durumu, id]
  );

  revalidatePath("/yonetim/yolcular");
}

export async function deletePassenger(formData: FormData) {
  const id = Number(formData.get("id"));
  if (!id) return;

  await pool.query(`DELETE FROM yolcular WHERE id = $1`, [id]);

  revalidatePath("/yonetim/yolcular");
}
