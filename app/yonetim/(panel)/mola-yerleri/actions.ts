"use server";

import { revalidatePath } from "next/cache";
import { pool } from "@/lib/db";

export async function addRestStop(formData: FormData) {
  const ad = String(formData.get("ad") ?? "").trim();
  const aciklama = String(formData.get("aciklama") ?? "").trim();
  const mola_suresi = String(formData.get("mola_suresi") ?? "").trim();

  if (!ad) {
    throw new Error("Lütfen mola yeri adını girin.");
  }

  await pool.query(
    `INSERT INTO mola_yerleri (ad, aciklama, mola_suresi) VALUES ($1, $2, $3)`,
    [ad, aciklama || null, mola_suresi ? Number(mola_suresi) : null]
  );

  revalidatePath("/yonetim/mola-yerleri");
  revalidatePath("/mola-yerleri");
}

export async function deleteRestStop(formData: FormData) {
  const id = Number(formData.get("id"));
  if (!id) return;

  await pool.query(`DELETE FROM mola_yerleri WHERE id = $1`, [id]);

  revalidatePath("/yonetim/mola-yerleri");
  revalidatePath("/mola-yerleri");
}
