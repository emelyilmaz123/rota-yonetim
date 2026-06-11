import { FIRMA_ADI, GUZERGAH } from "@/lib/routes";

export default function Home() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold">{FIRMA_ADI}</h1>
        <p className="mt-2 text-zinc-600">
          Yolcu kayıtları, mola yerleri ve etkinlikler için yönetim sistemi.
        </p>
      </div>

      <div className="rounded-lg border border-zinc-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Güzergah</h2>
        <div className="flex flex-wrap items-center gap-2">
          {GUZERGAH.map((durak, i) => (
            <span key={durak} className="flex items-center gap-2">
              <span className="rounded-full bg-zinc-900 text-white px-3 py-1 text-sm font-medium">
                {durak}
              </span>
              {i < GUZERGAH.length - 1 && (
                <span className="text-zinc-400">→</span>
              )}
            </span>
          ))}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <a
          href="/yolcular"
          className="rounded-lg border border-zinc-200 bg-white p-6 shadow-sm hover:border-zinc-400 transition-colors"
        >
          <h3 className="font-semibold">Yolcular</h3>
          <p className="text-sm text-zinc-600 mt-1">
            Yolcu kaydı ekle, listele ve sil.
          </p>
        </a>
        <a
          href="/mola-yerleri"
          className="rounded-lg border border-zinc-200 bg-white p-6 shadow-sm hover:border-zinc-400 transition-colors"
        >
          <h3 className="font-semibold">Mola Yerleri</h3>
          <p className="text-sm text-zinc-600 mt-1">
            Güzergah üzerindeki mola noktalarını yönet.
          </p>
        </a>
        <a
          href="/etkinlikler"
          className="rounded-lg border border-zinc-200 bg-white p-6 shadow-sm hover:border-zinc-400 transition-colors"
        >
          <h3 className="font-semibold">Etkinlikler</h3>
          <p className="text-sm text-zinc-600 mt-1">
            Yolculuk boyunca sunulan etkinlik/imkanları yönet.
          </p>
        </a>
      </div>
    </div>
  );
}
