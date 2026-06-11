CREATE TABLE IF NOT EXISTS yolcular (
  id SERIAL PRIMARY KEY,
  ad_soyad TEXT NOT NULL,
  telefon TEXT NOT NULL,
  koltuk_no TEXT NOT NULL,
  binis_yeri TEXT NOT NULL,
  inis_yeri TEXT NOT NULL,
  tarih DATE NOT NULL,
  ucret NUMERIC(10, 2) NOT NULL DEFAULT 0,
  odeme_durumu TEXT NOT NULL DEFAULT 'Beklemede'
    CHECK (odeme_durumu IN ('Ödendi', 'Ödenmedi', 'Beklemede')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS mola_yerleri (
  id SERIAL PRIMARY KEY,
  ad TEXT NOT NULL,
  aciklama TEXT,
  mola_suresi INTEGER,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS etkinlikler (
  id SERIAL PRIMARY KEY,
  ad TEXT NOT NULL,
  aciklama TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
