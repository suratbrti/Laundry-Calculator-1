/**
 * Fungsi validasi formulir pemesanan dan pembentuk tautan WhatsApp (BL-03).
 */

import {MainService, STORE_INFO} from '../config';
import {EstimateResult} from './calculator';
import {formatThousands, formatWeight, parseWeightInput} from './format';

export type FormFieldKey = 'weight' | 'customerName' | 'pickupAddress';

export interface OrderValidationInput {
  weightRaw: string;
  customerName: string;
  isPickupEnabled: boolean;
  pickupAddress: string;
}

export interface OrderValidationResult {
  isValid: boolean;
  errors: Partial<Record<FormFieldKey, string>>;
  firstErrorField: FormFieldKey | null;
}

export interface WhatsAppMessageInput {
  service: MainService;
  estimate: EstimateResult;
  isPickupEnabled: boolean;
  isFragranceEnabled: boolean;
  customerName: string;
  pickupAddress: string;
  notes: string;
}

/**
 * Memeriksa kelengkapan kolom wajib dan kolom kondisional sebelum mengirim pesanan ke WhatsApp.
 */
export function validateOrderForm(
  input: OrderValidationInput,
): OrderValidationResult {
  const errors: Partial<Record<FormFieldKey, string>> = {};
  const parsedWeight = parseWeightInput(input.weightRaw);

  if (parsedWeight.status !== 'valid' || parsedWeight.value === null) {
    errors.weight = 'Masukkan berat cucian minimal 0,1 kg, contoh: 2,5.';
  }

  if (input.customerName.trim() === '') {
    errors.customerName =
      'Isi nama Anda agar admin mudah mencatat pesanan, contoh: Budi Santoso.';
  }

  if (input.isPickupEnabled && input.pickupAddress.trim() === '') {
    errors.pickupAddress =
      'Isi alamat penjemputan lengkap, contoh: Jl. Melati No. 12, Kost Putri.';
  }

  let firstErrorField: FormFieldKey | null = null;
  if (errors.weight) {
    firstErrorField = 'weight';
  } else if (errors.customerName) {
    firstErrorField = 'customerName';
  } else if (errors.pickupAddress) {
    firstErrorField = 'pickupAddress';
  }

  return {
    isValid: firstErrorField === null,
    errors,
    firstErrorField,
  };
}

/**
 * Menyusun pesan WhatsApp sesuai format baku pada PRD.
 */
export function buildWhatsAppMessage(input: WhatsAppMessageInput): string {
  const {
    service,
    estimate,
    isPickupEnabled,
    isFragranceEnabled,
    customerName,
    pickupAddress,
    notes,
  } = input;

  const cleanName = customerName.trim();
  const cleanAddress = isPickupEnabled
    ? pickupAddress.trim()
    : 'Antar Sendiri ke Toko';
  const cleanNotes = notes.trim() !== '' ? notes.trim() : '-';

  const pickupLine = isPickupEnabled
    ? `Ya (+Rp ${formatThousands(estimate.pickupCost)})`
    : 'Tidak';
  const fragranceLine = isFragranceEnabled
    ? `Ya (+Rp ${formatThousands(estimate.fragranceCost)})`
    : 'Tidak';

  const actualWeightText = formatWeight(estimate.actualWeight);
  const billedWeightText = formatWeight(estimate.billedWeight);
  const totalText = formatThousands(estimate.totalCost);

  return [
    'Halo Admin Laundry, saya ingin memesan layanan laundry dengan rincian berikut:',
    '',
    `*Nama:* ${cleanName}`,
    `*Layanan Utama:* ${service.name}`,
    `*Estimasi Berat:* ${actualWeightText} kg (Berat Ditagih: ${billedWeightText} kg)`,
    '*Layanan Tambahan:*',
    `- Antar-Jemput: ${pickupLine}`,
    `- Pewangi Premium: ${fragranceLine}`,
    '',
    `*Alamat Penjemputan:* ${cleanAddress}`,
    `*Catatan Khusus:* ${cleanNotes}`,
    '',
    `*Estimasi Total Biaya:* *Rp ${totalText}*`,
    '',
    '_(Catatan: Total di atas adalah estimasi awal. Berat pasti akan ditimbang kembali saat pakaian diterima oleh kasir/kurir laundry)._',
    '',
    'Mohon konfirmasi pesanan dan ketersediaan jadwalnya. Terima kasih!',
  ].join('\n');
}

/**
 * Membentuk URL deep-link WhatsApp dengan encoding aman untuk karakter khusus dan baris baru.
 */
export function buildWhatsAppUrl(
  message: string,
  phoneNumber: string = STORE_INFO.whatsapp_number,
): string {
  const digitsOnly = phoneNumber.replace(/\D/g, '');
  return `https://wa.me/${digitsOnly}?text=${encodeURIComponent(message)}`;
}
