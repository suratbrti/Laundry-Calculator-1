/**
 * Komponen formulir data pemesan dengan validasi kondisional alamat penjemputan (FT-05).
 */

import {AlertCircle} from 'lucide-react';
import {RefObject} from 'react';

interface OrderFormProps {
  customerName: string;
  onChangeCustomerName: (value: string) => void;
  isPickupEnabled: boolean;
  pickupAddress: string;
  onChangePickupAddress: (value: string) => void;
  notes: string;
  onChangeNotes: (value: string) => void;
  errors: {
    customerName?: string;
    pickupAddress?: string;
  };
  nameInputRef: RefObject<HTMLInputElement | null>;
  addressInputRef: RefObject<HTMLTextAreaElement | null>;
}

export function OrderForm({
  customerName,
  onChangeCustomerName,
  isPickupEnabled,
  pickupAddress,
  onChangePickupAddress,
  notes,
  onChangeNotes,
  errors,
  nameInputRef,
  addressInputRef,
}: OrderFormProps) {
  return (
    <section
      aria-labelledby="order-form-heading"
      className="rounded-2xl bg-white p-4 sm:p-6"
    >
      <h2 id="order-form-heading" className="text-lg font-semibold text-neutral-900">
        Data Pemesan
      </h2>

      <div className="mt-4 space-y-4">
        <div>
          <label
            htmlFor="customer-name"
            className="block text-sm font-medium text-neutral-900"
          >
            Nama Anda
          </label>
          <input
            ref={nameInputRef}
            id="customer-name"
            name="customerName"
            type="text"
            autoComplete="name"
            value={customerName}
            onChange={(event) => onChangeCustomerName(event.target.value)}
            placeholder="Contoh: Budi Santoso"
            aria-invalid={errors.customerName ? 'true' : 'false'}
            aria-describedby={errors.customerName ? 'customer-name-error' : undefined}
            className={`mt-2 min-h-[44px] w-full rounded-xl border bg-white px-4 py-2.5 text-base text-neutral-900 placeholder:text-neutral-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 ${
              errors.customerName ? 'border-red-600' : 'border-neutral-200'
            }`}
          />
          {errors.customerName ? (
            <div
              id="customer-name-error"
              role="alert"
              className="mt-2 flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-800"
            >
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
              <span>{errors.customerName}</span>
            </div>
          ) : null}
        </div>

        {isPickupEnabled ? (
          <div className="transition-opacity duration-200 ease-out motion-reduce:transition-none">
            <label
              htmlFor="pickup-address"
              className="block text-sm font-medium text-neutral-900"
            >
              Alamat Penjemputan
            </label>
            <textarea
              ref={addressInputRef}
              id="pickup-address"
              name="pickupAddress"
              rows={2}
              autoComplete="street-address"
              value={pickupAddress}
              onChange={(event) => onChangePickupAddress(event.target.value)}
              placeholder="Contoh: Jl. Melati No. 12, Kost Putri"
              aria-invalid={errors.pickupAddress ? 'true' : 'false'}
              aria-describedby={
                errors.pickupAddress ? 'pickup-address-error' : 'pickup-address-help'
              }
              className={`mt-2 w-full rounded-xl border bg-white px-4 py-2.5 text-base text-neutral-900 placeholder:text-neutral-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 ${
                errors.pickupAddress ? 'border-red-600' : 'border-neutral-200'
              }`}
            />
            <p id="pickup-address-help" className="mt-1.5 text-sm text-neutral-600">
              Wajib diisi untuk penjemputan kurir.
            </p>
            {errors.pickupAddress ? (
              <div
                id="pickup-address-error"
                role="alert"
                className="mt-2 flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-800"
              >
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                <span>{errors.pickupAddress}</span>
              </div>
            ) : null}
          </div>
        ) : (
          <p className="border-t border-neutral-200 pt-3 text-sm text-neutral-600">
            Pengantaran mandiri: pakaian Anda antar sendiri ke toko.
          </p>
        )}

        <div>
          <label
            htmlFor="order-notes"
            className="block text-sm font-medium text-neutral-900"
          >
            Catatan Khusus (Opsional)
          </label>
          <textarea
            id="order-notes"
            name="notes"
            rows={2}
            value={notes}
            onChange={(event) => onChangeNotes(event.target.value)}
            placeholder="Contoh: Pisahkan pakaian putih dan baju kerja"
            aria-describedby="order-notes-help"
            className="mt-2 w-full rounded-xl border border-neutral-200 bg-white px-4 py-2.5 text-base text-neutral-900 placeholder:text-neutral-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
          />
          <p id="order-notes-help" className="mt-1.5 text-sm text-neutral-600">
            Tulis permintaan khusus pencucian bila ada.
          </p>
        </div>
      </div>
    </section>
  );
}
