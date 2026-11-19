/**
 * Komponen opsi layanan tambahan Antar-Jemput dan Pewangi Premium (FT-03).
 */

import {FRAGRANCE_ADDON, PICKUP_ADDON} from '../config';
import {formatRupiah} from '../lib/format';

interface AddOnOptionsProps {
  isPickupEnabled: boolean;
  onTogglePickup: (enabled: boolean) => void;
  isFragranceEnabled: boolean;
  onToggleFragrance: (enabled: boolean) => void;
  hasValidWeight: boolean;
  fragranceCost: number;
}

export function AddOnOptions({
  isPickupEnabled,
  onTogglePickup,
  isFragranceEnabled,
  onToggleFragrance,
  hasValidWeight,
  fragranceCost,
}: AddOnOptionsProps) {
  return (
    <section
      aria-labelledby="addon-heading"
      className="rounded-2xl bg-white p-4 sm:p-6"
    >
      <h2 id="addon-heading" className="text-lg font-semibold text-neutral-900">
        Layanan Tambahan
      </h2>

      <div className="mt-3 divide-y divide-neutral-200">
        <label
          htmlFor="addon-pickup"
          className="flex min-h-[44px] cursor-pointer items-start gap-3 py-3 first:pt-1 last:pb-1"
        >
          <input
            id="addon-pickup"
            name="pickup"
            type="checkbox"
            checked={isPickupEnabled}
            onChange={(event) => onTogglePickup(event.target.checked)}
            className="mt-0.5 h-5 w-5 shrink-0 rounded border-neutral-300 accent-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
          />
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-baseline justify-between gap-x-2">
              <span className="text-base font-medium text-neutral-900">
                {PICKUP_ADDON.name}
              </span>
              <span className="text-sm font-semibold tabular-nums text-neutral-900">
                +{formatRupiah(PICKUP_ADDON.price)}
              </span>
            </div>
            <p className="mt-0.5 text-sm text-neutral-600">
              Flat per pesanan, radius maksimal 5 km.
            </p>
          </div>
        </label>

        <label
          htmlFor="addon-fragrance"
          className="flex min-h-[44px] cursor-pointer items-start gap-3 py-3 first:pt-1 last:pb-1"
        >
          <input
            id="addon-fragrance"
            name="fragrance"
            type="checkbox"
            checked={isFragranceEnabled}
            onChange={(event) => onToggleFragrance(event.target.checked)}
            className="mt-0.5 h-5 w-5 shrink-0 rounded border-neutral-300 accent-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
          />
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-baseline justify-between gap-x-2">
              <span className="text-base font-medium text-neutral-900">
                {FRAGRANCE_ADDON.name}
              </span>
              <span className="text-sm font-semibold tabular-nums text-neutral-900">
                +{formatRupiah(FRAGRANCE_ADDON.price)}/kg ditagih
              </span>
            </div>
            <p className="mt-0.5 text-sm text-neutral-600">
              {FRAGRANCE_ADDON.notes}.
            </p>
            {isFragranceEnabled && hasValidWeight ? (
              <p className="mt-1 text-sm font-medium tabular-nums text-blue-700">
                Tambahan pewangi: {formatRupiah(fragranceCost)}
              </p>
            ) : null}
          </div>
        </label>
      </div>
    </section>
  );
}
