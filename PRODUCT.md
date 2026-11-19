# Daftar Fitur Produk - LaundryCalc

Dokumen ini mencatat seluruh fitur dari PRD v1.1 (3 November 2026), urutan pengerjaan, ketergantungan antarfitur, serta status pengerjaannya.

## Daftar Fitur

| Kode | Nama Fitur | Prioritas | Ketergantungan | Status |
| :--- | :--- | :--- | :--- | :--- |
| FT-01 | Tampilan Katalog & Durasi | Must Have | - | Selesai |
| FT-02 | Input Berat & Notifikasi Min. Charge | Must Have | FT-01 | Selesai |
| FT-03 | Opsi Add-on Terintegrasi | Must Have | FT-02 | Selesai |
| FT-04 | Floating Price Summary | Must Have | FT-01, FT-02, FT-03 | Selesai |
| FT-05 | Form Data Pemesan | Must Have | FT-03 | Selesai |
| FT-06 | WhatsApp Deep Link Button | Must Have | FT-02, FT-04, FT-05 | Selesai |
| FT-07 | Info Jam Operasional Toko | Should Have | - | Selesai |

## Keputusan Atas Hal Terbuka dari PRD

1. **Nomor WhatsApp Toko**: Memakai nomor contoh `6281234567890` di `src/config.ts` dan dapat diganti oleh tim toko sebelum rilis.
2. **Nilai Awal Kolom Berat**: Dimulai kosong agar pelanggan mengisi perkiraan berat secara sadar; validasi menolak kirim jika berat kosong atau `0`.
3. **Opsi Pewangi Premium (T02)**: Diterapkan sebagai satu pilihan add-on aktif/nonaktif (+Rp2.000/kg ditagih) sesuai rumus `BL-02` di PRD.
4. **Cakupan Fitur**: Fitur `FT-01` sampai `FT-06` dikerjakan lengkap bersama `FT-07` (info jam operasional) sesuai persetujuan pengguna.
