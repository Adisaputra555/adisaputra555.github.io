# portfolio Web — [Bayu Adi Saputra / Adisaputra555]

Selamat datang di portfolio web pribadi saya! 🌐  
Dibuat dengan React + Vite, ini adalah showcase dari project, skill, dan karya yang ingin saya bagikan.

## Struktur Project

- `public/` — file statis (favicon, assets, dsb.)
- `src/` — code utama React (komponen, utilitas, dsb.)
- `index.html` — entry point halaman web
- `package.json` & `package-lock.json` — manajemen dependencies dan script
- `vite.config.js` — konfigurasi build dan dev server Vite
- `eslint.config.js` — aturan linting agar kodenya tetap bersih dan konsisten

## Fitur Utama

- Dibangun dengan **React + Vite** — ringan, cepat reload, dan performa build optimal
- **ESLint** telah terkonfigurasi agar coding style tetap rapi
- Struktur modular dan siap dikembangkan—bisa ditambahkan halaman “About”, “Projects”, dsb.

## Menambahkan Karya Editing

Bagian **Photo & Video Editing** berada terpisah di bawah daftar proyek web.
Simpan media di `public/assets/proyek/`, lalu tambahkan item ke `listEditing`
di `src/data.js`. Foto ditampilkan sebagai kartu; video memakai thumbnail dan
dapat diputar dari detail karya.

```js
media: [
  { type: "image", src: "/assets/proyek/editing/foto.jpg", alt: "Hasil editing" },
  {
    type: "video",
    src: "/assets/proyek/editing/video.mp4",
    thumbnail: "/assets/proyek/editing/thumbnail.jpg",
    alt: "Video hasil editing",
  },
],
```

Gunakan `image` sebagai sampul kartu. Untuk video, `thumbnail` menjadi preview
di kartu dan gambar sampul menjadi cadangan jika thumbnail tidak ditentukan.
Properti `media` dapat memuat satu atau beberapa foto dan video. Galeri saat ini
berisi dua placeholder foto dan satu video sampel; ganti item demo di
`listEditing` dengan karya Anda saat siap.

## Cara Jalankan

1. Clone repository ini:

```bash
git clone https://github.com/Adisaputra555/adisaputra555.github.io.git
cd portfolio
```

2. Install dependencies:

```bash
npm install
```

3. Jalankan server lokal dengan hot reload:

```bash
npm run dev
```

4. Buat versi production:

```bash
npm run build
```

## Live Chat & Contact Form Setup

Live chat uses Firebase Authentication (Google) and Cloud Firestore.

1. Create a Firebase project and register a Web app. Copy `.env.example` to
   `.env.local` and fill in the Web app's `apiKey`, `authDomain`, `projectId`,
   and `appId`.
2. In Firebase Console, enable **Google** under Authentication providers and
   add `localhost` plus your deployed domain to the authorized domains.
3. Create a Cloud Firestore database and publish the rules from `firestore.rules`.
   Chat messages are public to read; only signed-in users can send them.
4. Restart the Vite server after editing `.env.local`. Set the same variables
   when building the production site. For GitHub Pages, add them as repository
   Actions variables under **Settings → Secrets and variables → Actions →
   Variables**: `VITE_FIREBASE_API_KEY`, `VITE_FIREBASE_AUTH_DOMAIN`,
   `VITE_FIREBASE_PROJECT_ID`, and `VITE_FIREBASE_APP_ID`. The deployment
   workflow checks that all four are present before building. These Web app
   config values are included in the public frontend bundle; never use a
   Firebase service-account private key here.

The contact form sends submissions to `bayuadi00025@gmail.com` through
FormSubmit. The first submission may require confirming an activation email
from FormSubmit.

## &#x20;Quick Preview

Jika sudah di-deploy (contoh: GitHub Pages, Netlify, Vercel), kamu bisa tambahkan link deploy di sini, misalnya:
[🔗 Lihat versi live]( https://adisaputra555.github.io/)

## Tentang Saya

Hai, saya Bayu adi Saputra (username GitHub: `Adisaputra555`).
Saya seorang Developer yang suka bikin aplikasi web ringan dengan tampilan modern dan performa tinggi. Scroll aja di project saya, dan jangan sungkan untuk reach out kalau ada pertanyaan!

- **Email:** (bayuadi00025@gmail.com)
- **LinkedIn:** (https://www.linkedin.com/in/bayu-adi-saputra-aab385196?utm_source=share_via&utm_content=profile&utm_medium=member_android)
- **Instagram:** @adibayu025

---

[1]:  https://adisaputra555.github.io/ "GitHub - Adisaputra555/adisaputra555.github.io"
