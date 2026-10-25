# Zihin Kalkanı — Kurs Sitesi (İlk Sürüm)

Manipülasyona karşı eleştirel düşünme kursunun web sitesi. Türkçe-only,
Next.js App Router + TypeScript + Tailwind CSS.

## Durum

- Ana sayfa (`/`) ve Yetişkin Ders 1
  (`/dersler/yetiskin-1-zihin-nasil-kandirilir`) hazırdır.
- Ders metinleri, `ders-1-icerik-paketi.md` içerik paketinden alınmıştır.
- İlerleme ve karar günlüğü yalnızca tarayıcıda (localStorage) saklanır,
  hiçbir sunucuya gönderilmez.
- Henüz yoktur: kayıt, giriş, ödeme, İngilizce versiyon, Ders 2–8, ergen
  versiyonu, e-posta gönderimi. Ana sayfada diğer dersler açıkça “Yakında”
  olarak işaretlidir ve sahte ders sayfalarına bağlanmaz.

## Yerel çalıştırma (ayrı komutlar)

Önce proje klasörüne gir:

```
cd ~/workspace/zihin-kalkani-kursu
```

Bağımlılıklar (ilk kurulumda zaten yapıldı):

```
npm install
```

Geliştirme sunucusu:

```
npm run dev
```

Sonra tarayıcıda http://localhost:3000 adresini aç.

Üretim derlemesi:

```
npm run build
```

Üretim sunucusu (derlemeden sonra):

```
npm run start
```
