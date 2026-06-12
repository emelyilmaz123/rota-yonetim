"use client";

import { useState } from "react";
import { GUZERGAH, ODEME_DURUMLARI } from "@/lib/routes";
import type { Yolcu } from "@/lib/db";
import { updatePassenger, deletePassenger } from "./actions";

function formatTarih(tarih: string) {
  const d = new Date(tarih);
  return d.toLocaleDateString("tr-TR");
}

function formatTarihInput(tarih: string) {
  const d = new Date(tarih);
  return d.toISOString().slice(0, 10);
}

function formatUcret(ucret: string) {
  return Number(ucret).toLocaleString("tr-TR", {
    style: "currency",
    currency: "TRY",
  });
}

const inputClass =
  "w-full rounded-lg border border-slate-300 px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500";

export default function YolcuRow({ yolcu }: { yolcu: Yolcu }) {
  const [duzenleniyor, setDuzenleniyor] = useState(false);

  if (!duzenleniyor) {
    return (
      <tr className="border-b border-slate-100">
        <td className="py-2 pr-4">{yolcu.ad_soyad}</td>
        <td className="py-2 pr-4">{yolcu.telefon}</td>
        <td className="py-2 pr-4">{yolcu.koltuk_no}</td>
        <td className="py-2 pr-4">{yolcu.binis_yeri}</td>
        <td className="py-2 pr-4">{yolcu.inis_yeri}</td>
        <td className="py-2 pr-4">{formatTarih(yolcu.tarih)}</td>
        <td className="py-2 pr-4">{formatUcret(yolcu.ucret)}</td>
        <td className="py-2 pr-4">
          <span
            className={`rounded-lg border px-2 py-1 text-xs font-medium ${
              yolcu.odeme_durumu === "Ödendi"
                ? "border-emerald-300 bg-emerald-50 text-emerald-700"
                : yolcu.odeme_durumu === "Ödenmedi"
                ? "border-rose-300 bg-rose-50 text-rose-700"
                : "border-amber-300 bg-amber-50 text-amber-700"
            }`}
          >
            {yolcu.odeme_durumu}
          </span>
        </td>
        <td className="py-2 pr-4 whitespace-nowrap">
          <button
            type="button"
            onClick={() => setDuzenleniyor(true)}
            className="text-sky-600 hover:underline mr-3"
          >
            Güncelle
          </button>
          <form action={deletePassenger} className="inline">
            <input type="hidden" name="id" value={yolcu.id} />
            <button type="submit" className="text-rose-500 hover:underline">
              Sil
            </button>
          </form>
        </td>
      </tr>
    );
  }

  return (
    <tr className="border-b border-slate-100 bg-sky-50/50">
      <td className="py-2 pr-2" colSpan={9}>
        <form
          action={async (formData) => {
            await updatePassenger(formData);
            setDuzenleniyor(false);
          }}
          className="grid gap-2 sm:grid-cols-4 lg:grid-cols-8 items-end"
        >
          <input type="hidden" name="id" value={yolcu.id} />
          <label className="flex flex-col gap-1 text-xs text-slate-600">
            Ad Soyad
            <input
              type="text"
              name="ad_soyad"
              defaultValue={yolcu.ad_soyad}
              required
              className={inputClass}
            />
          </label>
          <label className="flex flex-col gap-1 text-xs text-slate-600">
            Telefon
            <input
              type="tel"
              name="telefon"
              defaultValue={yolcu.telefon}
              required
              className={inputClass}
            />
          </label>
          <label className="flex flex-col gap-1 text-xs text-slate-600">
            Koltuk No
            <input
              type="text"
              name="koltuk_no"
              defaultValue={yolcu.koltuk_no}
              required
              className={inputClass}
            />
          </label>
          <label className="flex flex-col gap-1 text-xs text-slate-600">
            Tarih
            <input
              type="date"
              name="tarih"
              defaultValue={formatTarihInput(yolcu.tarih)}
              required
              className={inputClass}
            />
          </label>
          <label className="flex flex-col gap-1 text-xs text-slate-600">
            Biniş Yeri
            <select
              name="binis_yeri"
              defaultValue={yolcu.binis_yeri}
              required
              className={inputClass}
            >
              {GUZERGAH.map((durak) => (
                <option key={durak} value={durak}>
                  {durak}
                </option>
              ))}
            </select>
          </label>
          <label className="flex flex-col gap-1 text-xs text-slate-600">
            İniş Yeri
            <select
              name="inis_yeri"
              defaultValue={yolcu.inis_yeri}
              required
              className={inputClass}
            >
              {GUZERGAH.map((durak) => (
                <option key={durak} value={durak}>
                  {durak}
                </option>
              ))}
            </select>
          </label>
          <label className="flex flex-col gap-1 text-xs text-slate-600">
            Ücret (TL)
            <input
              type="number"
              name="ucret"
              min="0"
              step="0.01"
              defaultValue={yolcu.ucret}
              className={inputClass}
            />
          </label>
          <label className="flex flex-col gap-1 text-xs text-slate-600">
            Ödeme Durumu
            <select
              name="odeme_durumu"
              defaultValue={yolcu.odeme_durumu}
              required
              className={inputClass}
            >
              {ODEME_DURUMLARI.map((durum) => (
                <option key={durum} value={durum}>
                  {durum}
                </option>
              ))}
            </select>
          </label>
          <div className="flex gap-3 sm:col-span-4 lg:col-span-8">
            <button
              type="submit"
              className="rounded-lg bg-sky-600 px-4 py-2 text-sm text-white font-medium hover:bg-sky-500 transition-colors"
            >
              Kaydet
            </button>
            <button
              type="button"
              onClick={() => setDuzenleniyor(false)}
              className="rounded-lg border border-slate-300 px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 transition-colors"
            >
              İptal
            </button>
          </div>
        </form>
      </td>
    </tr>
  );
}
