"use server";

import { redirect } from "next/navigation";
import { createSessionCookie } from "@/lib/session";

export async function login(formData: FormData) {
  const sifre = String(formData.get("sifre") ?? "");

  if (!process.env.ADMIN_PASSWORD || sifre !== process.env.ADMIN_PASSWORD) {
    redirect("/yonetim/giris?hata=1");
  }

  await createSessionCookie();
  redirect("/yonetim");
}
