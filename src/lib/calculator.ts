/**
 * Fungsi perhitungan murni untuk berat ditagih (BL-01) dan total estimasi biaya (BL-02).
 */

import {
  FRAGRANCE_ADDON,
  MainService,
  PICKUP_ADDON,
  STORE_INFO,
} from '../config';

export interface EstimateInput {
  service: MainService;
  actualWeight: number | null;
  isPickupEnabled: boolean;
  isFragranceEnabled: boolean;
}

export interface EstimateResult {
  hasValidWeight: boolean;
  actualWeight: number;
  billedWeight: number;
  isMinChargeApplied: boolean;
  mainServiceCost: number;
  pickupCost: number;
  fragranceCost: number;
  totalAddOnCost: number;
  totalCost: number;
}

/**
 * Menghitung berat ditagih dengan aturan batas minimal 3 kg (BL-01).
 */
export function calculateBilledWeight(
  actualWeight: number,
  minChargeKg: number = STORE_INFO.minimum_charge_kg,
): number {
  if (!Number.isFinite(actualWeight) || actualWeight <= 0) {
    return 0;
  }
  return Math.max(minChargeKg, actualWeight);
}

/**
 * Menghitung rincian biaya layanan utama, add-on, dan total estimasi dalam bilangan bulat Rupiah (BL-02).
 */
export function calculateEstimate(input: EstimateInput): EstimateResult {
  const {service, actualWeight, isPickupEnabled, isFragranceEnabled} = input;

  const pickupCost = isPickupEnabled ? PICKUP_ADDON.price : 0;

  if (actualWeight === null || !Number.isFinite(actualWeight) || actualWeight <= 0) {
    return {
      hasValidWeight: false,
      actualWeight: 0,
      billedWeight: 0,
      isMinChargeApplied: false,
      mainServiceCost: 0,
      pickupCost,
      fragranceCost: 0,
      totalAddOnCost: pickupCost,
      totalCost: pickupCost,
    };
  }

  const minChargeKg = STORE_INFO.minimum_charge_kg;
  const billedWeight = calculateBilledWeight(actualWeight, minChargeKg);
  const isMinChargeApplied = actualWeight < minChargeKg;

  const mainServiceCost = Math.round(billedWeight * service.price_per_kg);
  const fragranceCost = isFragranceEnabled
    ? Math.round(billedWeight * FRAGRANCE_ADDON.price)
    : 0;
  const totalAddOnCost = pickupCost + fragranceCost;
  const totalCost = mainServiceCost + totalAddOnCost;

  return {
    hasValidWeight: true,
    actualWeight,
    billedWeight,
    isMinChargeApplied,
    mainServiceCost,
    pickupCost,
    fragranceCost,
    totalAddOnCost,
    totalCost,
  };
}
