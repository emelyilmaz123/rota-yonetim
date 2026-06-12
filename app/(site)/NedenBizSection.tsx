"use client";

import { useState, type ReactNode } from "react";

type NedenBizItem = {
  baslik: string;
  aciklama: string;
  detay: string;
  icon: ReactNode;
};

export default function NedenBizSection({
  items,
  firmaAdi,
}: {
  items: NedenBizItem[];
  firmaAdi: string;
}) {
  const [acik, setAcik] = useState<string | null>(null);

  return (
    <section>
      <div className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 text-center">
          Neden {firmaAdi}?
        </h2>
        <div className="mt-12 grid gap-8 sm:grid-cols-3">
          {items.map((ozellik) => {
            const buAcik = acik === ozellik.baslik;
            return (
              <div key={ozellik.baslik} className="text-center">
                <button
                  type="button"
                  onClick={() =>
                    setAcik(buAcik ? null : ozellik.baslik)
                  }
                  aria-expanded={buAcik}
                  className="w-full flex flex-col items-center rounded-xl px-4 py-4 transition-colors hover:bg-white cursor-pointer"
                >
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-sky-100 text-sky-600">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="h-7 w-7"
                    >
                      {ozellik.icon}
                    </svg>
                  </div>
                  <h3 className="mt-4 font-bold text-slate-900">
                    {ozellik.baslik}
                  </h3>
                  <p className="mt-2 text-sm text-slate-600">
                    {ozellik.aciklama}
                  </p>
                  <span className="mt-3 text-xs font-semibold text-sky-600">
                    {buAcik ? "Daha az göster ▲" : "Daha fazla bilgi ▼"}
                  </span>
                </button>
                {buAcik && (
                  <div className="mt-3 rounded-xl bg-white p-4 text-left text-sm text-slate-600 shadow-sm">
                    {ozellik.detay}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
