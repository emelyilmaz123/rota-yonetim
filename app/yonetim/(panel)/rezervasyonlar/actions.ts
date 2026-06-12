"use server";

import { revalidatePath } from "next/cache";
import { pool } from "@/lib/db";
import { REZERVASYON_DURUMLARI } from "@/lib/routes";

export async function updateReservationStatus(formData: FormData) {
  const id = Number(formData.get("id"));
  const durum = String(formData.get("durum") ?? "").trim();

  if (!id) return;
  if (!REZERVASYON_DURUMLARI.includes(durum as (typeof REZERVASYON_DURUMLARI)[number])) {
    return;
  }

  await pool.query(`UPDATE rezervasyonlar SET durum = $1 WHERE id = $2`, [
    durum,
    id,
  ]);

  revalidatePath("/yonetim/rezervasyonlar");
}

export async function deleteReservation(formData: FormData) {
  const id = Number(formData.get("id"));
  if (!id) return;

  await pool.query(`DELETE FROM rezervasyonlar WHERE id = $1`, [id]);

  revalidatePath("/yonetim/rezervasyonlar");
}
