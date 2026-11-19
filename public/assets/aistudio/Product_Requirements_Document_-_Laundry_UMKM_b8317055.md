# **Product Requirements Document — LaundryCalc & Catalog**

**Document Version:** 1.1 (Data-Aligned)

**Application Version:** MVP (v0.1)

**Status:** Ready for Implementation

**Last Updated:** 3 November 2026

## **1\. Document Information**

| Attribute | Details |
| :---- | :---- |
| **Product Name** | LaundryCalc (Katalog & Kalkulator Estimasi Laundry) |
| **Product Type** | Mobile-First Responsive Web Application (Tanpa Login / Akun) |
| **Primary Platform** | Modern Mobile Browser (Chrome, Safari) & Desktop |
| **Target MVP Version** | v0.1 (Katalog resmi, kalkulator otomatis dengan validasi min. charge, template generator WhatsApp) |
| **PRD Status** | Final Draft (Sesuai Dataset Penjualan & Katalog) |

## **2\. Problem Background**

* **Core Problem:** Calon pelanggan sering ragu atau menunda pemesanan karena tidak mengetahui estimasi total biaya cucian (termasuk aturan *minimum charge* dan biaya tambahan). Di sisi operasional, admin laundry disibukkan membalas chat repetitif yang menanyakan daftar harga, lama pengerjaan, dan biaya jemput.  
* **Affected Persona:** Pelanggan laundry rumahan/kost dan Admin Operasional Toko Laundry.  
* **Current Manual Workarounds:** Calon pelanggan menanyakan daftar harga lewat chat WA, menghitung manual, lalu mengirim format pesan yang tidak standar.  
* **Consequences of Inaction:** Waktu respon admin lambat, potensi konversi terhambat, dan timbul selisih paham tarif ketika pakaian ditimbang di bawah batas minimum (3 kg).

## **3\. Product Goals & Success Indicators**

| Goal ID | Objective | Success Indicator | Target | Measurement Method |
| :---- | :---- | :---- | :---- | :---- |
| **GL-01** | Mengurangi beban chat tanya-jawab tarif dasar | Penurunan pesan masuk kategori *price inquiry* dasar | Turun \$\\ge 40\\%\$ | Log chat admin WA mingguan |
| **GL-02** | Mempercepat konversi pemesanan | Pesanan masuk menggunakan template ringkas terstruktur | \$\\ge 75\\%\$ total lead masuk | Audit log chat pesanan |
| **GL-03** | Transparansi aturan minimum charge | Menghilangkan friksi komplain terkait berat minimal 3 kg | Komplain tarif \$\< 2\\%\$ | Rekap komplain bulanan |

## **4\. Target Users & Roles**

* **Pelanggan (Customer):** Mengakses tautan web melalui bio media sosial atau profil Google Bisnis. Ingin melihat transparansi harga, durasi pengerjaan, menghitung estimasi biaya berdasarkan berat & add-on, lalu mengirim order ke WhatsApp dengan 1 kali klik.  
* **Admin Laundry:** Menerima pesan WhatsApp berformat baku yang sudah memuat paket layanan, estimasi berat, berat ditagih, add-on yang dipilih, alamat penjemputan, dan estimasi total tagihan awal.

## **5\. Business Logic & Rules (Sesuai Data Katalog Aktual)**

### **BL-01: Perhitungan Berat Ditagih (Minimum Charge Rule)**

* **Trigger:** Pengguna memasukkan estimasi berat cucian (${W}_{aktual}$ dalam satuan kg).  
* **Input:** ${W}_{aktual}$ (Float $\geq 0.1$).  
* **Formula:**

* ${W}_{ditagih}=\max\limits_{}(3.0,{W}_{aktual})$  
*   
* **Expected Output:** Nilai berat yang digunakan sebagai dasar perkalian biaya layanan utama dan add-on pewangi premium.  
* **Constraint:** Nilai input berat tidak boleh 0 atau minus.

### **BL-02: Kalkulasi Layanan Utama & Layanan Tambahan**

* **Trigger:** Pengguna memilih 1 layanan utama dan menentukan opsi tambahan (*Antar-Jemput* / *Pewangi Premium*).  
* **Daftar Tarif Katalog Resmi:**  
  * L01 **Cuci Lipat:** Rp 6.000 / kg (Estimasi pengerjaan 3 hari)  
  * L02 **Cuci Setrika:** Rp 8.000 / kg (Estimasi pengerjaan 3 hari)  
  * L03 **Cuci Setrika Ekspres:** Rp 15.000 / kg (Estimasi pengerjaan 1 hari)  
  * T01 **Antar-Jemput:** Rp 10.000 (flat per pesanan, radius maks 5 km)  
  * T02 **Pewangi Premium:** Rp 2.000 / kg (dikalikan ${W}_{ditagih}$)  
* **Formula Total Estimasi:**  
  $BiayaUtama={W}_{ditagih}\times TarifLayanan$  
  $BiayaPewangi=pewangi\_aktif\ ?\ ({W}_{ditagih}\times 2000):0$  
  $BiayaAntar-Jemput=delivery\_aktif\ ?\ 10000:0$  
  $TotalEstimasi=BiayaUtama+BiayaPewangi+BiayaAntar-Jemput$  
* **Verifikasi Kasus Uji Perhitungan (Sesuai Log Penjualan):**  
  * *Kasus A (Order \#ORD-2026-006):* Berat 1,8 kg, Cuci Setrika Ekspres, Antar-Jemput \+ Pewangi.  
    * ${W}_{ditagih}=\max\limits_{}(3.0,1.8)=3.0kg$.  
    * Biaya Utama: $3.0\times 15.000=Rp45.000$.  
    * Tambahan: Antar-Jemput ($Rp10.000$) \+ Pewangi ($3.0\times 2.000=Rp6.000$) \= $Rp16.000$.  
    * **Total:** $Rp61.000$.  
  * *Kasus B (Order \#ORD-2026-001):* Berat 4,5 kg, Cuci Setrika, Antar-Jemput \+ Pewangi.  
    * ${W}_{ditagih}=4,5kg$.  
    * Biaya Utama: $4,5\times 8.000=Rp36.000$.  
    * Tambahan: Antar-Jemput ($Rp10.000$) \+ Pewangi ($4,5\times 2.000=Rp9.000$) \= $Rp19.000$.  
    * **Total:** $Rp55.000$.

### **BL-03: Generator Teks Template WhatsApp**

* **Trigger:** Pengguna menekan tombol "Kirim Pesanan ke WhatsApp".  
* **Validasi:**  
  1. Nama Pelanggan wajib diisi (string tidak kosong).  
  2. Alamat wajib diisi bila opsi Antar-Jemput aktif.  
  3. Estimasi berat harus $>0$.  
* **Processing:** Melakukan URL-encoding (encodeURIComponent) pada struktur string teks yang telah disusun, lalu membuka tautan deep-link browser: https\://wa.me/\<STORE\_WA\_NUMBER\>?text=\<ENCODED\_MESSAGE\>  
* **Expected Output:** Aplikasi WhatsApp terbuka langsung pada ruang obrolan toko laundry dengan pesan yang siap dikirimkan.

## **6\. Feature Requirements**

| Feature Code | Feature Name | Requirement Description | Related Business Logic | Priority | Target Version |
| :---- | :---- | :---- | :---- | :---- | :---- |
| **FT-01** | Tampilan Katalog & Durasi | Menampilkan kartu paket layanan utama (L01, L02, L03) lengkap dengan tarif per kg, lama pengerjaan (1 hari / 3 hari), dan deskripsi ringkas. | \- | Must Have | v0.1 |
| **FT-02** | Input Berat & Notifikasi Min. Charge | Field input berat cucian (kg) dengan step 0,1. Menampilkan notifikasi visual otomatis jika berat $<3kg$ bahwa ketentuan minimum charge 3 kg diberlakukan. | BL-01 | Must Have | v0.1 |
| **FT-03** | Opsi Add-on Terintegrasi | Checkbox interaktif untuk "Antar-Jemput (+Rp 10.000)" dan "Pewangi Premium Downy (+Rp 2.000/kg ditagih)". | BL-02 | Must Have | v0.1 |
| **FT-04** | Floating Price Summary | Sticky bottom bar responsif yang merinci: Biaya Layanan Utama, Biaya Tambahan, dan Total Estimasi Biaya secara live. | BL-01, BL-02 | Must Have | v0.1 |
| **FT-05** | Form Data Pemesan | Input field untuk Nama Pemesan, Alamat Jemput (kondisional aktif jika antar-jemput dipilih), serta Catatan Khusus. | BL-03 | Must Have | v0.1 |
| **FT-06** | WhatsApp Deep Link Button | Tombol submit yang mengecek kelengkapan form dan membuka WhatsApp dengan pesan terformat otomatis. | BL-03 | Must Have | v0.1 |
| **FT-07** | Info Jam Operasional Toko | Header/footer berisi jadwal operasional: *Buka setiap hari 08:00 – 20:00 WIB* & *Jadwal jemput 09:00 – 17:00 WIB*. | \- | Should Have | v0.1 |

## **7\. Main User Flow & Chat Format**

```
flowchart TD
    A[Buka Halaman Web] --> B[Pilih Layanan: Cuci Lipat / Cuci Setrika / Setrika Ekspres]
    B --> C[Masukkan Estimasi Berat kg]
    C --> D{Berat < 3 kg?}
    D -- Ya --> E[Set Berat Ditagih = 3 kg & Tampilkan Label Info]
    D -- Tidak --> F[Set Berat Ditagih = Berat Aktual]
    E --> G[Pilih Add-on: Antar-Jemput & Pewangi Premium]
    F --> G
    G --> H[Lihat Rincian Biaya Realtime di Sticky Bar]
    H --> I[Lengkapi Form: Nama, Alamat, Catatan]
    I --> J{Validasi Form Lolos?}
    J -- Tidak --> K[Tampilkan Highlight Error Isian Wajib]
    K --> I
    J -- Ya --> L[Buka WhatsApp dengan Teks Pesanan Terformat]

```

### **Format Template WhatsApp:**

```
Halo Admin Laundry, saya ingin memesan layanan laundry dengan rincian berikut:

*Nama:* [Nama Pelanggan]
*Layanan Utama:* [Cuci Lipat / Cuci Setrika / Cuci Setrika Ekspres]
*Estimasi Berat:* [X] kg (Berat Ditagih: [Y] kg)
*Layanan Tambahan:*
- Antar-Jemput: [Ya (+Rp 10.000) / Tidak]
- Pewangi Premium: [Ya (+Rp Z.000) / Tidak]

*Alamat Penjemputan:* [Alamat Lengkap / "Antar Sendiri ke Toko"]
*Catatan Khusus:* [Catatan khusus atau "-"]

*Estimasi Total Biaya:* *Rp [Total]*

_(Catatan: Total di atas adalah estimasi awal. Berat pasti akan ditimbang kembali saat pakaian diterima oleh kasir/kurir laundry)._

Mohon konfirmasi pesanan dan ketersediaan jadwalnya. Terima kasih!

```

## **8\. Acceptance Criteria**

| AC ID | Related Feature | Condition | Expected Behavior | Pass Criteria |
| :---- | :---- | :---- | :---- | :---- |
| **AC-01** | FT-02 | Pengguna menginput berat 2.0 kg pada paket Cuci Lipat (Rp 6.000/kg) | Sistem menghitung berat ditagih sebagai 3 kg dan menampilkan subtotal Rp 18.000. | Muncul label penjelas minimum charge 3 kg dan nominal pas Rp 18.000. |
| **AC-02** | FT-03 | Pengguna memilih berat 4 kg dan mencentang Pewangi Premium | Tambahan pewangi terhitung $4\times Rp2.000=Rp8.000$. | Breakdown add-on menampilkan tepat nominal Rp 8.000. |
| **AC-03** | FT-03, FT-05 | Pengguna mengaktifkan toggle Antar-Jemput | Input alamat wajib muncul dan total tagihan bertambah Rp 10.000. | Validasi memblokir checkout jika kolom alamat belum diisi. |
| **AC-04** | FT-06 | Form lengkap dan tombol "Kirim ke WhatsApp" diklik | Browser membuka URL https\://wa.me/... dengan parameter text ter-encode rapi. | WhatsApp terbuka dengan rincian paket, berat ditagih, add-on, dan nominal total yang sama dengan web. |

## **9\. Validation Test Scenarios**

| Test ID | Related Req | Skenario Uji | Input Uji | Hasil yang Diharapkan | Tipe Uji |
| :---- | :---- | :---- | :---- | :---- | :---- |
| **TC-01** | FT-02, FT-03 | Order standar di bawah minimum charge | 2 kg Cuci Lipat, tanpa add-on | Total: Rp 18.000 (berat ditagih 3 kg) | Happy Path |
| **TC-02** | FT-02, FT-03 | Order ekspres dengan seluruh add-on | 5 kg Cuci Setrika Ekspres \+ Antar-Jemput \+ Pewangi Premium | Biaya Utama: Rp 75.000, Add-on: Rp 20.000, Total: Rp 95.000 | Happy Path |
| **TC-03** | FT-02 | Input berat kosong atau 0 | Berat: 0 kg | Form tidak mengizinkan kalkulasi submit | Error Handling |
| **TC-04** | FT-05 | Checkbox delivery On, tetapi alamat kosong | Delivery dicentang, Nama: "Budi", Alamat: "" | Tombol submit memicu notifikasi error pada field alamat | Boundary Path |
| **TC-05** | FT-06 | Karakter khusus pada kolom Catatan | Catatan: Baju dinas & sutra, jangan dicampur\! | URL encoding aman, tidak memutus format link WhatsApp | Boundary Path |

## **10\. Constraints & Out of Scope**

### **Constraints**

* **Platform:** Responsif mobile-first (optimal pada viewport $\geq 360px$).  
* **Ketergantungan:** Membutuhkan browser yang mendukung deep-linking WhatsApp (wa.me).  
* **Klausul Estimasi:** Wajib menyertakan teks penjelas bahwa nominal merupakan estimasi awal sebelum penimbangan fisik oleh toko.

### **Explicit Out of Scope (MVP v0.1)**

* Integrasi pembayaran daring langsung / Payment Gateway.  
* Fitur lacak progres cucian berbasis status database (*Order Tracking*).  
* Sistem akun pengguna (registrasi/login member).  
* Integrasi Google Maps API untuk perhitungan ongkir dinamis (tetap menggunakan tarif flat pada v0.1).

## **11\. Configuration Data Reference (JSON)**

```
{
  "store_info": {
    "name": "Laundry UMKM",
    "whatsapp_number": "628xxxxxxxxxx",
    "opening_hours": "08:00 - 20:00 WIB",
    "pickup_hours": "09:00 - 17:00 WIB",
    "pickup_radius_max_km": 5,
    "minimum_charge_kg": 3.0
  },
  "main_services": [
    {
      "code": "L01",
      "name": "Cuci Lipat",
      "price_per_kg": 6000,
      "duration_days": 3,
      "description": "Dicuci, dikeringkan, dilipat tanpa setrika (Min. charge 3 kg)"
    },
    {
      "code": "L02",
      "name": "Cuci Setrika",
      "price_per_kg": 8000,
      "duration_days": 3,
      "description": "Dicuci, disetrika, dilipat rapi (Min. charge 3 kg)"
    },
    {
      "code": "L03",
      "name": "Cuci Setrika Ekspres",
      "price_per_kg": 15000,
      "duration_days": 1,
      "description": "Sama dengan Cuci Setrika, selesai besok (Min. charge 3 kg)"
    }
  ],
  "add_ons": [
    {
      "code": "T01",
      "name": "Antar-Jemput",
      "price": 10000,
      "calculation_type": "flat",
      "notes": "Area penjemputan radius max 5 km"
    },
    {
      "code": "T02",
      "name": "Pewangi Premium",
      "price": 2000,
      "calculation_type": "per_billed_kg",
      "notes": "Aroma mewah pilihan tahan lama (Downy Passion / Mystique)"
    }
  ]
}

```

## **12\. Requirement Traceability Matrix**

| Business Logic (BL) | Feature Code (FT) | Acceptance Criteria (AC) | Test Case (TC) |
| :---- | :---- | :---- | :---- |
| **BL-01** (Aturan Minimum Charge 3 kg) | FT-02 | AC-01 | TC-01, TC-03 |
| **BL-02** (Kalkulasi Tarif Katalog & Add-on) | FT-01, FT-03, FT-04 | AC-02, AC-03 | TC-01, TC-02 |
| **BL-03** (Generator WhatsApp & Form Validasi) | FT-05, FT-06 | AC-03, AC-04 | TC-04, TC-05 |

