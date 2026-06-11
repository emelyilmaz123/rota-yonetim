# Lüks Ereğli - Otobüs Firması Yönetim Sistemi

Antalya - Isparta - Afyon - Konya - Ankara güzergahında çalışan Lüks Ereğli
firması için yolcu kayıtları, mola yerleri ve etkinlik yönetimi.

## Özellikler

- **Yolcular**: Ad soyad, telefon, koltuk no, biniş/iniş yeri, tarih ve ücret
  bilgisiyle yolcu ekleme, listeleme ve silme.
- **Mola Yerleri**: Güzergah üzerindeki mola noktalarını ekleme, listeleme ve
  silme.
- **Etkinlikler**: Yolculuk boyunca sunulan etkinlik/imkanları ekleme,
  listeleme ve silme.

## Yerel Geliştirme

```bash
npm install
npm run dev
```

[http://localhost:3000](http://localhost:3000) adresinden açılır.

Veritabanına bağlanabilmek için `.env.local` dosyası gerekir (aşağıdaki
"Veritabanı Kurulumu" bölümüne bakın).

## Veritabanı Kurulumu (Vercel Postgres - Ücretsiz)

1. [vercel.com](https://vercel.com) üzerinde ücretsiz bir hesap oluşturun
   (GitHub ile giriş yapabilirsiniz).
2. Terminalde proje klasöründeyken Vercel CLI'yi kurun ve giriş yapın:
   ```bash
   npm install -g vercel
   vercel login
   ```
3. Projeyi Vercel hesabınıza bağlayın:
   ```bash
   vercel link
   ```
4. Vercel paneline girin (vercel.com/dashboard) → projenizi seçin →
   **Storage** sekmesi → **Create Database** → **Postgres** (Neon, ücretsiz
   plan) seçin ve projeye bağlayın.
5. Bağlantı bilgilerini yerel projeye çekin:
   ```bash
   vercel env pull .env.local
   ```
   Bu komut `.env.local` dosyasını oluşturup `POSTGRES_URL` ve benzeri
   değişkenleri otomatik dolduracaktır.
6. Veritabanı tablolarını oluşturun. `schema.sql` dosyasındaki SQL'i Vercel
   panelindeki **Storage → (veritabanınız) → Query** sekmesinden çalıştırın
   (kopyala-yapıştır yeterli).
7. `npm run dev` ile yerelde test edin, çalışıyorsa:
   ```bash
   vercel deploy --prod
   ```
   ile yayına alın.

## Manuel Test Adımları

Veritabanı bağlantısı kurulduktan sonra:

1. **Yolcular** sayfasından bir yolcu ekleyin (tüm alanları doldurun) →
   listede görünmeli.
2. Aynı yolcuyu "Sil" ile silin → listeden kalkmalı.
3. **Mola Yerleri** sayfasından bir mola yeri ekleyin → listede görünmeli,
   "Sil" ile kaldırılabilmeli.
4. **Etkinlikler** sayfasından bir etkinlik ekleyin → listede görünmeli,
   "Sil" ile kaldırılabilmeli.

## Güzergah

Antalya → Isparta → Afyon → Konya → Ankara

Bu liste `lib/routes.ts` içinde sabit olarak tanımlıdır; biniş/iniş
seçeneklerinde kullanılır.
