/**
 * Konfigurasi bisnis dan parameter toko LaundryCalc sesuai data PRD.
 */

export type ServiceCode = 'L01' | 'L02' | 'L03';

export type AddOnCode = 'T01' | 'T02';

export interface MainService {
  code: ServiceCode;
  name: string;
  price_per_kg: number;
  duration_days: number;
  description: string;
}

export interface AddOnItem {
  code: AddOnCode;
  name: string;
  price: number;
  calculation_type: 'flat' | 'per_billed_kg';
  notes: string;
}

export interface StoreInfo {
  name: string;
  brand_title: string;
  whatsapp_number: string;
  is_example_whatsapp: boolean;
  opening_hours: string;
  pickup_hours: string;
  pickup_radius_max_km: number;
  minimum_charge_kg: number;
}

export const STORE_INFO: StoreInfo = {
  name: 'Laundry UMKM',
  brand_title: 'LaundryCalc',
  whatsapp_number: '6281234567890',
  is_example_whatsapp: true,
  opening_hours: '08.00–20.00 WIB',
  pickup_hours: '09.00–17.00 WIB',
  pickup_radius_max_km: 5,
  minimum_charge_kg: 3.0,
};

export const MAIN_SERVICES: MainService[] = [
  {
    code: 'L01',
    name: 'Cuci Lipat',
    price_per_kg: 6000,
    duration_days: 3,
    description: 'Dicuci, dikeringkan, dilipat tanpa setrika (Min. charge 3 kg)',
  },
  {
    code: 'L02',
    name: 'Cuci Setrika',
    price_per_kg: 8000,
    duration_days: 3,
    description: 'Dicuci, disetrika, dilipat rapi (Min. charge 3 kg)',
  },
  {
    code: 'L03',
    name: 'Cuci Setrika Ekspres',
    price_per_kg: 15000,
    duration_days: 1,
    description: 'Sama dengan Cuci Setrika, selesai besok (Min. charge 3 kg)',
  },
];

export const DEFAULT_SERVICE_CODE: ServiceCode = 'L02';

export const ADD_ONS: AddOnItem[] = [
  {
    code: 'T01',
    name: 'Antar-Jemput',
    price: 10000,
    calculation_type: 'flat',
    notes: 'Area penjemputan radius max 5 km',
  },
  {
    code: 'T02',
    name: 'Pewangi Premium',
    price: 2000,
    calculation_type: 'per_billed_kg',
    notes: 'Aroma mewah pilihan tahan lama (Downy Passion / Mystique)',
  },
];

export const PICKUP_ADDON = ADD_ONS[0];
export const FRAGRANCE_ADDON = ADD_ONS[1];

export const ESTIMATE_DISCLAIMER =
  'Total di atas adalah estimasi awal. Berat pasti ditimbang ulang saat pakaian diterima kasir atau kurir.';
