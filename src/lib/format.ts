/**
 * Fungsi pemformatan angka Rupiah, desimal berat, dan penguraian input angka.
 */

export interface ParsedWeightResult {
  status: 'empty' | 'invalid' | 'valid';
  value: number | null;
}

const integerFormatter = new Intl.NumberFormat('id-ID', {
  maximumFractionDigits: 0,
});

/**
 * Memformat angka bulat ke format Rupiah tanpa spasi dan tanpa desimal (contoh: Rp50.000).
 */
export function formatRupiah(amount: number): string {
  const safeAmount = Number.isFinite(amount) ? Math.round(amount) : 0;
  return `Rp${integerFormatter.format(safeAmount)}`;
}

/**
 * Memformat angka ribuan tanpa awalan Rp untuk kebutuhan template pesan WhatsApp (contoh: 55.000).
 */
export function formatThousands(amount: number): string {
  const safeAmount = Number.isFinite(amount) ? Math.round(amount) : 0;
  return integerFormatter.format(safeAmount);
}

/**
 * Memformat berat dengan pemisah koma dan tanpa nol di belakang (contoh: 4,5 dan 3).
 */
export function formatWeight(weight: number): string {
  if (!Number.isFinite(weight) || weight <= 0) {
    return '0';
  }
  const rounded = Math.round(weight * 100) / 100;
  return String(rounded).replace('.', ',');
}

/**
 * Mengurai string input berat yang mendukung pemisah desimal koma dan titik.
 */
export function parseWeightInput(raw: string): ParsedWeightResult {
  const trimmed = raw.trim();
  if (trimmed === '') {
    return {status: 'empty', value: null};
  }

  const normalized = trimmed.replace(',', '.');
  if (!/^\d+(\.\d+)?$/.test(normalized)) {
    return {status: 'invalid', value: null};
  }

  const parsed = Number.parseFloat(normalized);
  if (!Number.isFinite(parsed) || parsed < 0.1) {
    return {status: 'invalid', value: null};
  }

  return {status: 'valid', value: parsed};
}
