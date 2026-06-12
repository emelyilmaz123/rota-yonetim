"use client";

import { useState } from "react";

type Kriter = {
  baslik: string;
  aciklama: string;
  detay: string;
};

export default function SecimKriterleriSection({
  kriterler,
}: {
  kriterler: Kriter[];
}) {
  const [acik, setAcik] = useState<string | null>(null);

  return (
    <div className="mt-12 grid gap-6 sm:grid-cols-3">
      {kriterler.map((kriter, i) => {
        const buAcik = acik === kriter.baslik;
        return (
          <div key={kriter.baslik}>
            <button
              type="button"
              onClick={() => setAcik(buAcik ? null : kriter.baslik)}
              aria-expanded={buAcik}
              className="w-full text-left rounded-xl bg-white p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sky-600 text-white font-mono font-semibold">
                {i + 1}
              </div>
              <h3 className="mt-4 font-bold text-slate-900">
                {kriter.baslik}
              </h3>
              <p className="mt-2 text-sm text-slate-600">
                {kriter.aciklama}
              </p>
              <span className="mt-3 inline-block text-xs font-semibold text-sky-600">
                {buAcik ? "Daha az göster ▲" : "Daha fazla bilgi ▼"}
              </span>
            </button>
            {buAcik && (
              <div className="mt-3 rounded-xl bg-sky-50 p-4 text-sm text-slate-600 shadow-sm">
                {kriter.detay}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
