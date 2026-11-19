/**
 * Komponen input estimasi berat cucian dan notifikasi aturan minimum charge 3 kg (FT-02).
 */

import {AlertCircle, Info} from 'lucide-react';
import {RefObject} from 'react';
import {STORE_INFO} from '../config';
import {formatWeight} from '../lib/format';

interface WeightCalculatorProps {
  weightRaw: string;
  onChangeWeight: (value: string) => void;
  isMinChargeApplied: boolean;
  billedWeight: number;
  hasValidWeight: boolean;
  error?: string;
  inputRef: RefObject<HTMLInputElement | null>;
}

export function WeightCalculator({
  weightRaw,
  onChangeWeight,
  isMinChargeApplied,
  billedWeight,
  hasValidWeight,
  error,
  inputRef,
}: WeightCalculatorProps) {
  const minChargeText = formatWeight(STORE_INFO.minimum_charge_kg);

  return (
    <section
      aria-labelledby="weight-heading"
      className="rounded-2xl bg-white p-4 sm:p-6"
    >
      <h2 id="weight-heading" className="text-lg font-semibold text-neutral-900">
        Perkiraan Berat Cucian
      </h2>

      <div className="mt-3">
        <label
          htmlFor="weight-input"
          className="block text-sm font-medium text-neutral-900"
        >
          Estimasi Berat Cucian (kg)
        </label>
        <div className="mt-2 flex items-center gap-3">
          <input
            ref={inputRef}
            id="weight-input"
            name="weight"
            type="text"
            inputMode="decimal"
            autoComplete="off"
            value={weightRaw}
            onChange={(event) => onChangeWeight(event.target.value)}
            placeholder="Contoh: 3,5"
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby={error ? 'weight-error weight-help' : 'weight-help'}
            className={`min-h-[44px] w-full rounded-xl border bg-white px-4 py-2.5 text-base tabular-nums text-neutral-900 placeholder:text-neutral-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 ${
              error ? 'border-red-600' : 'border-neutral-200'
            }`}
          />
          <span className="shrink-0 text-base font-medium text-neutral-600">kg</span>
        </div>

        <p id="weight-help" className="mt-2 text-sm text-neutral-600">
          Minimal tagihan {minChargeText} kg per pesanan.
        </p>

        {error ? (
          <div
            id="weight-error"
            role="alert"
            className="mt-3 flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-800"
          >
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
            <span>{error}</span>
          </div>
        ) : null}

        {isMinChargeApplied && hasValidWeight ? (
          <div
            role="status"
            className="mt-3 flex items-start gap-2 rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800"
          >
            <Info className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
            <span>
              Berat di bawah {minChargeText} kg tetap dihitung{' '}
              <strong className="font-semibold tabular-nums">{formatWeight(billedWeight)} kg</strong>{' '}
              (ketentuan minimal toko).
            </span>
          </div>
        ) : null}
      </div>
    </section>
  );
}
