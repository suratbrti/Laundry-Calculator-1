# Keputusan Desain - LaundryCalc

Dokumen ini mencatat seluruh pilihan desain yang disetujui pengguna beserta token visual yang dipakai di aplikasi.

## Keputusan Pengguna

| Keputusan | Pilihan Dipakai |
| :--- | :--- |
| Nama aplikasi | LaundryCalc |
| Kesan visual | Ramah dan hangat (Plus Jakarta Sans) |
| Warna aksen | Biru (`blue`) |
| Sapaan pengguna | Anda |
| Susunan halaman | Satu halaman bergulir |
| Posisi aksi utama | Bilah menempel di bawah layar ponsel; panel samping di layar desktop |
| Gambar layanan | Kotak placeholder (ikon dan nama paket, rasio tetap) |
| Nilai awal berat | Kosong (wajib diisi sebelum kirim) |

## Token Visual

### Permukaan dan Garis
- Latar halaman: `bg-neutral-50`
- Kartu dan panel: `bg-white`
- Pemisah, input, dan tabel: `border-neutral-200`
- Sudut kartu/panel: `rounded-2xl`
- Sudut tombol dan input: `rounded-xl`
- Bayangan elemen melayang (sticky bar): `shadow-[0_1px_2px_rgba(0,0,0,0.06),0_8px_24px_rgba(0,0,0,0.08)]`

### Warna
- Teks utama: `text-neutral-900`
- Teks pendukung: `text-neutral-600`
- Teks placeholder: `text-neutral-500`
- Tombol utama: `bg-blue-700 hover:bg-blue-800 text-white`
- Teks aksen: `text-blue-700`
- Elemen terpilih: `border-blue-700 bg-blue-50`
- Cincin fokus: `focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700`
- Status informasi / peringatan minimum charge: `bg-amber-50 text-amber-800 border-amber-200` (disertai ikon dan teks)
- Status error validasi: `bg-red-50 text-red-800 border-red-200` (disertai ikon dan teks)
- Status berhasil kirim tautan: `bg-emerald-50 text-emerald-800 border-emerald-200` (disertai ikon dan teks)

### Tipografi
- Font lokal: `@fontsource/plus-jakarta-sans` (ketebalan 400, 500, 600)
- Judul halaman: `text-2xl font-semibold`
- Judul bagian: `text-lg font-semibold`
- Isi dan teks input: `text-base` (minimal 16 px pada input)
- Label: `text-sm font-medium`
- Angka utama: `text-3xl font-semibold tabular-nums`
- Semua nominal dan berat memakai `tabular-nums`

### Aksesibilitas dan Gerak
- Area sentuh tombol, pilihan kartu, dan checkbox minimal `44 x 44 px`.
- Kontras teks minimal 4,5:1.
- Tinggi bilah menempel di layar ponsel dijaga ringkas (maksimal 15% tinggi layar 740 px) agar aksi utama tetap terlihat tanpa menggulir di layar 360 x 740 px.
- Transisi memakai `transform` dan `opacity` berdurasi 150-200 ms `ease-out` dengan dukungan `motion-reduce:transition-none`.
