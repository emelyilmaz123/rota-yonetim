"use server";

import { revalidatePath } from "next/cache";
import { pool } from "@/lib/db";

export async function addActivity(formData: FormData) {
  const ad = String(formData.get("ad") ?? "").trim();
  const aciklama = String(formData.get("aciklama") ?? "").trim();

  if (!ad) {
    throw new Error("Lütfen etkinlik adını girin.");
  }

  await pool.query(
    `INSERT INTO etkinlikler (ad, aciklama) VALUES ($1, $2)`,
    [ad, aciklama || null]
  );

  revalidatePath("/etkinlikler");
}

export async function deleteActivity(formData: FormData) {
  const id = Number(formData.get("id"));
  if (!id) return;

  await pool.query(`DELETE FROM etkinlikler WHERE id = $1`, [id]);

  revalidatePath("/etkinlikler");
}
