# Lumina — AI Talent Matching & Social Impact Network

Prototipe website 3D interaktif untuk proposal **Lumina**: jaringan pencocokan kerja berbasis AI yang gratis bagi pencari kerja, dibiayai lisensi perusahaan, dan didukung Dana Abadi Sosial yang transparan lewat blockchain publik.

Konsep ini disiapkan untuk diajukan ke Instellar Impact.

> **Status:** prototipe konsep. Data pengangguran dan berita bersumber nyata (lihat [Sumber data](#sumber-data)). Lowongan, perusahaan, kandidat, donasi, transaksi blockchain, anggaran, dan target adalah **contoh atau proyeksi usulan**, dan sudah diberi label di halaman.

---

## Isi website

Satu layar tanpa scroll. Setiap bagian ("ruang") punya objek 3D sendiri. 7.240 titik cahaya (1 titik = 1.000 penganggur, BPS Februari 2026) berubah bentuk setiap kali pindah ruang.

| No | Ruang | Isi |
|----|-------|-----|
| 01 | Beranda | Inti cahaya Lumina, ringkasan masalah dan solusi |
| 02 | Data 2016–2026 | Grafik batang 3D pengangguran terbuka (BPS), jumlah orang atau TPT % |
| 03 | Suara Warga | Cincin 3D berisi 6 berita terverifikasi beserta sumbernya |
| 04 | Visi & Misi | Lima pilar misi, target 5 tahun (usulan) |
| 05 | Alur Bisnis | Flowchart 3D beranimasi 8 langkah: kerja → pendapatan → dampak |
| 06 | AI Matching | Demo pencocokan dari 6 sumber lowongan, profil perusahaan otomatis, mode perusahaan dengan kandidat anonim |
| 07 | Dana Abadi | Alokasi portofolio 3D, donasi opsional, Sahabat Lumina |
| 08 | Anggaran & Biaya | Diagram aliran dana (Sankey) 3D, proyeksi tahun pertama |
| 09 | Jejak Dana | Ledger blockchain 3D: blok, transaksi, 12 node pemantau, penyaluran ke 38 provinsi, lacak donasi |
| 10 | Keamanan Data | Brankas 5 lapis perlindungan data (UU PDP) |
| 11 | Tim | Partikel membentuk 7 sosok manusia per divisi, Fase 1 dan Fase 2 |
| 12 | Penasihat & Mitra | Tujuh kursi penasihat luar dan aturan mainnya |
| 13 | Lumina Ventures | Peta jalan 4 fase, jalur calon pebisnis, pohon usaha 3D |
| 14 | Lumina | Penutup: partikel membentuk tulisan LUMINA |

**Navigasi:** gulir mouse, tombol ← →, angka 1–9, atau menu di bawah. Seret latar untuk memutar objek 3D. Di HP, menu ada di bawah layar dan bisa digeser.

Coba kode `LMN-DEMO` di ruang Jejak Dana untuk melihat perjalanan donasi Rp 50.000.

---

## Struktur proyek

```
lumina-website/
├── index.html          # Struktur halaman dan semua panel
├── assets/
│   ├── css/style.css   # Tampilan (tema luxury dark)
│   └── js/app.js       # Adegan 3D, data, dan semua interaksi
├── .nojekyll           # Agar GitHub Pages menyajikan file apa adanya
└── README.md
```

Tidak ada proses build dan tidak ada `npm install`. Library eksternal dimuat dari CDN:

- [three.js r128](https://threejs.org/) dari cdnjs
- Google Fonts: Bodoni Moda, Manrope, JetBrains Mono

### Mengubah konten

Semua data ada di bagian atas `assets/js/app.js`:

| Yang ingin diubah | Cari konstanta |
|---|---|
| Data pengangguran | `YEARS`, `JML`, `TPT`, `NOTE` |
| Berita | `NEWS` |
| Lowongan, perusahaan, sumber portal | `JOBS`, `COS`, `SOURCES` |
| Alokasi Dana Abadi | `ALLOC` |
| Anggaran dan biaya | `BUD` |
| Tim dan penasihat | `DIVS`, `ADVS` |
| Visi, misi, alur bisnis | `MISI`, `STEPS` |
| Peta jalan Ventures | `PHASES` |

---

## Menjalankan di komputer sendiri

Buka folder ini lalu jalankan server lokal. Membuka `index.html` langsung dengan klik dua kali juga bisa, tapi server lokal lebih mirip kondisi online.

```bash
python -m http.server 8000
```

Lalu buka `http://localhost:8000` di browser.

---

## Deploy ke GitHub Pages

### Cara A: tanpa Git (lewat browser)

1. Masuk ke [github.com](https://github.com) dan buat repository baru, misalnya `lumina`. Pilih **Public**.
2. Di halaman repository, klik **Add file → Upload files**.
3. Seret **isi** folder `lumina-website` (bukan foldernya): `index.html`, folder `assets`, `README.md`, dan `.nojekyll`.
   File `.nojekyll` tersembunyi di Windows. Kalau tidak terlihat, file ini boleh dilewati.
4. Klik **Commit changes**.
5. Buka **Settings → Pages**. Di bagian **Build and deployment**, pilih **Deploy from a branch**, branch **main**, folder **/ (root)**, lalu **Save**.
6. Tunggu 1–2 menit. Website tayang di `https://NAMA-AKUN.github.io/lumina/`.

### Cara B: dengan Git

Pasang [Git for Windows](https://git-scm.com/download/win) dulu, lalu dari dalam folder `lumina-website`:

```bash
git init
git add .
git commit -m "Lumina: prototipe website 3D interaktif"
git branch -M main
git remote add origin https://github.com/NAMA-AKUN/lumina.git
git push -u origin main
```

Setelah itu aktifkan GitHub Pages seperti langkah 5 pada Cara A.

Untuk memperbarui website: ubah file, lalu jalankan `git add .`, `git commit -m "pesan perubahan"`, dan `git push`. GitHub Pages memperbarui situs otomatis dalam 1–2 menit.

---

## Sumber data

**Pengangguran terbuka (BPS, Sakernas).** Angka 2016–2025 adalah data Agustus. Angka 2026 adalah data Februari 2026 (rilis 5 Mei 2026).

- [BPS · Agustus 2016: TPT 5,61%](https://www.bps.go.id/en/pressrelease/2016/11/07/1230/august-2016---unemployment-rate-5-61-percent.html)
- [BPS · Agustus 2017: TPT 5,50%](https://www.bps.go.id/pressrelease/2017/11/06/1377/agustus-2017-tingkat-pengangguran-terbuka--tpt--sebesar-5-50-persen.html)
- [Warta Ekonomi · Agustus 2018](https://wartaekonomi.co.id/read202982/bps-catat-ada-tujuh-juta-pengangguran)
- [Okezone · Agustus 2019](https://economy.okezone.com/read/2019/11/05/20/2126021/pengangguran-naik-50-000-orang-di-agustus-2019)
- [Kontan Pusat Data · TPT 10 tahun](https://pusatdata.kontan.co.id/infografik/156/Tingkat-Pengangguran-TerbukaIndonesia-10-Tahun-Terakhir)
- [CNN Indonesia · Agustus 2025: 7,46 juta](https://www.cnnindonesia.com/ekonomi/20251105122204-532-1292137/data-bps-746-juta-warga-ri-menganggur-per-agustus-2025)
- [Bisnis.com · Februari 2026: TPT 4,68%](https://ekonomi.bisnis.com/read/20260505/12/1971417/bps-tingkat-pengangguran-terbuka-tpt-468-pada-februari-2026)
- [Kontan · pekerja formal 40,58%](https://nasional.kontan.co.id/news/bps-pengangguran-turun-jadi-724-juta-orang-proporsi-pekerja-formal-turun-4058)

**Berita dan regulasi**

- [detikFinance · job fair Bekasi](https://finance.detik.com/berita-ekonomi-bisnis/d-7936994/viral-lautan-manusia-berebut-cari-kerja-di-job-fair-bekasi) dan [Tirto](https://tirto.id/potret-pencari-kerja-di-indonesia-ikut-job-fair-hingga-pingsan-hcpN)
- [Bisnis.com · PHK Januari–November 2025](https://ekonomi.bisnis.com/read/20251222/12/1938900/jumlah-phk-nyaris-tembus-80000-orang-hingga-november-2025)
- [CNN Indonesia · #KaburAjaDulu](https://www.cnnindonesia.com/nasional/20250218192922-32-1199764/politikus-pdip-soal-kaburajadulu-anak-muda-tak-puas-kondisi-negeri)
- [CNBC Indonesia · 9,9 juta pemuda NEET](https://www.cnbcindonesia.com/research/20240515103217-128-538210/10-juta-gen-z-di-ri-nganggur-sekolah-kagak-kerja-kagak-maunya-apa)
- [Kontan · SE Menaker M/6/HK.04/V/2025](https://nasional.kontan.co.id/news/resmi-menaker-larang-pengusaha-lakukan-diskriminasi-rekruitmen-tenaga-kerja)
- [JawaPos · integrasi Karirhub dengan Glints, JobStreet, Kalibrr, KitaLulus](https://jawapos.com/nasional/2605230277/kemnaker-siapkan-estafet-karir-jembatani-alumni-maganghub-ke-dunia-kerja)
- [SEEK Developer · SEEK API untuk JobStreet](https://developer.seek.com/migration-guides/jobstreet-and-jobsdb-uplift)
- [detik · pencabutan izin PUB ACT dan batas 10% PP 29/1980](https://www.detik.com/sumut/berita/d-6164429/alasan-kemensos-cabut-izin-act)

---

## Catatan penting

- **Nama portal lowongan** (JobStreet, Glints, Kalibrr, KitaLulus, Karirhub) ditampilkan sebagai rencana integrasi. Belum ada kerja sama. Jangan menambahkan logo mereka tanpa izin resmi.
- **Nama perusahaan di demo AI Matching fiktif.**
- **Donasi, transaksi, blok, dan hash adalah simulasi.** Tidak ada pembayaran yang diproses dan tidak ada blockchain yang berjalan.
- **Angka anggaran, harga paket, jumlah tim, dan target adalah proyeksi usulan** yang perlu divalidasi.
- Penghimpunan donasi, Dana Abadi, aset kripto, dan Lumina Ventures masing-masing membutuhkan kajian hukum dan izin (Kemensos untuk PUB, OJK untuk modal ventura dan urun dana) sebelum dijalankan.
- Tidak ada data pengunjung yang dikirim ke server. Hitungan "cahaya" donasi hanya disimpan di `localStorage` browser masing-masing.
