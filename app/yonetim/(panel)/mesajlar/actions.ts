"use server";

import { revalidatePath } from "next/cache";
import { pool } from "@/lib/db";

export async function deleteMessage(formData: FormData) {
  const id = Number(formData.get("id"));
  if (!id) return;

  await pool.query(`DELETE FROM mesajlar WHERE id = $1`, [id]);

  revalidatePath("/yonetim/mesajlar");
}
