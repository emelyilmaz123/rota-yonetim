export const FIRMA_ADI = "Lüks Ereğli";

export const GUZERGAH = ["Antalya", "Isparta", "Afyon", "Konya", "Ankara"] as const;

export type Durak = (typeof GUZERGAH)[number];

export const ODEME_DURUMLARI = ["Ödendi", "Ödenmedi", "Beklemede"] as const;

export type OdemeDurumu = (typeof ODEME_DURUMLARI)[number];
