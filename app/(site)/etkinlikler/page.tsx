import Link from "next/link";
import Image from "next/image";
import { pool, type Etkinlik } from "@/lib/db";

export const dynamic = "force-dynamic";

async function getEtkinlikler() {
  const { rows } = await pool.query<Etkinlik>(
    `SELECT * FROM etkinlikler ORDER BY id DESC`
  );
  return rows;
}

export default async function EtkinliklerPage() {
  const etkinlikler = await getEtkinlikler();

  return (
    <div className="flex flex-col bg-sky-50">
      {/* Hero */}
      <section>
        <div className="mx-auto max-w-6xl px-4 py-16 text-center">
          <p className="text-sm font-medium text-sky-600 tracking-wide">
            Güzergah Boyunca
          </p>
          <h1 className="mt-3 text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900">
            Etkinlikler
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-slate-600">
            Yolculuğunuz boyunca güzergahımız üzerinde deneyimleyebileceğiniz
            etkinlik ve imkanlar.
          </p>
        </div>
      </section>

      {/* Etkinlikler */}
      <section>
        <div className="mx-auto max-w-6xl px-4 pb-16">
          {etkinlikler.length === 0 ? (
            <p className="text-center text-sm text-slate-500">
              Henüz etkinlik eklenmedi. Lütfen daha sonra tekrar kontrol
              edin.
            </p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {etkinlikler.map((etkinlik) => {
                const ad = etkinlik.ad.toLowerCase();
                const isAnitkabir = ad.includes("anıtkabir");

                let detayLink: string | undefined;
                let gorsel: string | undefined;
                if (isAnitkabir) {
                  detayLink = "/etkinlikler/anitkabir";
                  gorsel = "/images/ata.jpg";
                } else if (ad.includes("karacaören") || ad.includes("baraj")) {
                  detayLink = "/etkinlikler/karacaoren-baraji";
                  gorsel = "/images/isparta.jpg";
                } else if (ad.includes("afyon") || ad.includes("lezzet")) {
                  detayLink = "/etkinlikler/afyon-lezzetler";
                  gorsel = "/images/afyon.jpg";
                } else if (ad.includes("kelebek")) {
                  detayLink = "/etkinlikler/kelebek-bahcesi";
                  gorsel = "/images/konya.jpg";
                }

                return (
                  <div
                    key={etkinlik.id}
                    className="rounded-xl bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                  >
                    {gorsel ? (
                      <div className="relative aspect-video w-full">
                        <Image
                          src={gorsel}
                          alt={etkinlik.ad}
                          fill
                          className="object-cover"
                          sizes="(max-width: 1024px) 100vw, 33vw"
                        />
                      </div>
                    ) : (
                      <div className="aspect-video w-full bg-slate-100 flex items-center justify-center text-xs text-slate-400">
                        Görsel eklenecek
                      </div>
                    )}
                    <div className="p-4">
                      <h2 className="font-semibold text-slate-900">
                        {etkinlik.ad}
                      </h2>
                      {etkinlik.aciklama && (
                        <p className="mt-2 text-sm text-slate-600">
                          {etkinlik.aciklama}
                        </p>
                      )}
                      {detayLink && (
                        <Link
                          href={detayLink}
                          className="mt-4 inline-block rounded-lg bg-sky-600 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-500 transition-colors"
                        >
                          Detaylı Bilgi
                        </Link>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
