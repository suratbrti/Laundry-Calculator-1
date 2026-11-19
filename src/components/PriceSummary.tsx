/**
 * Komponen ringkasan estimasi biaya mengambang dan tombol kirim ke WhatsApp (FT-04 & FT-06).
 */

import {Check, ChevronDown, ChevronUp, Copy, ExternalLink} from 'lucide-react';
import {useState} from 'react';
import {ESTIMATE_DISCLAIMER, MainService, STORE_INFO} from '../config';
import {EstimateResult} from '../lib/calculator';
import {formatRupiah, formatWeight} from '../lib/format';

interface PriceSummaryProps {
  service: MainService;
  estimate: EstimateResult;
  isPickupEnabled: boolean;
  isFragranceEnabled: boolean;
  onSubmitOrder: () => void;
  lastWhatsAppUrl: string | null;
  lastWhatsAppMessage: string | null;
}

export function PriceSummary({
  service,
  estimate,
  isPickupEnabled,
  isFragranceEnabled,
  onSubmitOrder,
  lastWhatsAppUrl,
  lastWhatsAppMessage,
}: PriceSummaryProps) {
  const [isMobileDetailsOpen, setIsMobileDetailsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopyMessage = async () => {
    if (!lastWhatsAppMessage) {
      return;
    }
    try {
      await navigator.clipboard.writeText(lastWhatsAppMessage);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  const breakdownRows = (
    <dl className="space-y-2 text-sm">
      <div className="flex items-baseline justify-between gap-3">
        <dt className="text-neutral-600">Paket dipilih</dt>
        <dd className="font-medium text-neutral-900">{service.name}</dd>
      </div>

      <div className="flex items-baseline justify-between gap-3">
        <dt className="text-neutral-600">Berat ditagih</dt>
        <dd className="font-medium tabular-nums text-neutral-900">
          {estimate.hasValidWeight
            ? `${formatWeight(estimate.billedWeight)} kg${
                estimate.isMinChargeApplied ? ' (min. 3 kg)' : ''
              }`
            : '-'}
        </dd>
      </div>

      <div className="flex items-baseline justify-between gap-3">
        <dt className="text-neutral-600">Biaya layanan utama</dt>
        <dd className="font-medium tabular-nums text-neutral-900">
          {estimate.hasValidWeight ? formatRupiah(estimate.mainServiceCost) : '-'}
        </dd>
      </div>

      {isPickupEnabled || isFragranceEnabled ? (
        <div className="border-t border-neutral-200 pt-2">
          {isPickupEnabled ? (
            <div className="flex items-baseline justify-between gap-3">
              <dt className="text-neutral-600">Antar-Jemput</dt>
              <dd className="font-medium tabular-nums text-neutral-900">
                {formatRupiah(estimate.pickupCost)}
              </dd>
            </div>
          ) : null}
          {isFragranceEnabled ? (
            <div className="mt-1 flex items-baseline justify-between gap-3">
              <dt className="text-neutral-600">Pewangi Premium</dt>
              <dd className="font-medium tabular-nums text-neutral-900">
                {estimate.hasValidWeight
                  ? formatRupiah(estimate.fragranceCost)
                  : `+${formatRupiah(2000)}/kg`}
              </dd>
            </div>
          ) : null}
        </div>
      ) : null}
    </dl>
  );

  const feedbackBanner =
    lastWhatsAppUrl && lastWhatsAppMessage ? (
      <div
        role="status"
        className="mt-3 rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-800"
      >
        <p className="font-medium">Tautan WhatsApp siap dikirim.</p>
        <div className="mt-2 flex flex-wrap items-center gap-2">
          <a
            href={lastWhatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[44px] items-center gap-1.5 rounded-xl bg-emerald-800 px-3 py-2 text-xs font-medium text-white hover:bg-emerald-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
          >
            <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Buka WhatsApp</span>
          </a>
          <button
            type="button"
            onClick={handleCopyMessage}
            className="inline-flex min-h-[44px] items-center gap-1.5 rounded-xl border border-emerald-300 bg-white px-3 py-2 text-xs font-medium text-emerald-800 hover:bg-emerald-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Tersalin</span>
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Salin Pesan</span>
              </>
            )}
          </button>
        </div>
        {STORE_INFO.is_example_whatsapp ? (
          <p className="mt-2 text-xs text-emerald-800">
            Catatan: nomor toko saat ini memakai nomor contoh.
          </p>
        ) : null}
      </div>
    ) : null;

  return (
    <>
      <aside aria-labelledby="summary-desktop-heading" className="hidden lg:block">
        <div className="sticky top-6 rounded-2xl bg-white p-6 shadow-[0_1px_2px_rgba(0,0,0,0.06),0_8px_24px_rgba(0,0,0,0.08)]">
          <h2
            id="summary-desktop-heading"
            className="text-lg font-semibold text-neutral-900"
          >
            Ringkasan Biaya
          </h2>

          <div className="mt-4">{breakdownRows}</div>

          <div className="mt-4 border-t border-neutral-200 pt-4">
            <div className="flex items-baseline justify-between gap-2">
              <span className="text-sm font-medium text-neutral-600">
                Estimasi Total
              </span>
              <span className="text-3xl font-semibold tabular-nums text-neutral-900">
                {estimate.hasValidWeight ? formatRupiah(estimate.totalCost) : '-'}
              </span>
            </div>
            {!estimate.hasValidWeight ? (
              <p className="mt-1 text-sm text-neutral-600">
                Isi berat cucian untuk melihat total biaya.
              </p>
            ) : null}
          </div>

          <button
            type="button"
            onClick={onSubmitOrder}
            className="mt-6 min-h-[48px] w-full rounded-xl bg-blue-700 px-4 py-3 text-base font-medium text-white transition-colors duration-150 ease-out hover:bg-blue-800 motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
          >
            Kirim Pesanan ke WhatsApp
          </button>

          {feedbackBanner}

          <p className="mt-4 text-xs leading-relaxed text-neutral-600">
            {ESTIMATE_DISCLAIMER}
          </p>
        </div>
      </aside>

      <div
        aria-label="Ringkasan biaya mengambang"
        className="fixed right-0 bottom-0 left-0 z-40 border-t border-neutral-200 bg-white shadow-[0_1px_2px_rgba(0,0,0,0.06),0_8px_24px_rgba(0,0,0,0.08)] lg:hidden"
      >
        {isMobileDetailsOpen ? (
          <div className="max-h-[60vh] overflow-y-auto border-b border-neutral-200 px-4 py-4">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-sm font-semibold text-neutral-900">
                Rincian Estimasi Biaya
              </span>
              <button
                type="button"
                onClick={() => setIsMobileDetailsOpen(false)}
                className="min-h-[44px] px-2 text-sm font-medium text-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
              >
                Tutup
              </button>
            </div>
            {breakdownRows}
            {feedbackBanner}
            <p className="mt-3 text-xs leading-relaxed text-neutral-600">
              {ESTIMATE_DISCLAIMER}
            </p>
          </div>
        ) : null}

        <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-2.5">
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="text-xs text-neutral-600">Estimasi Total</span>
              <button
                type="button"
                aria-expanded={isMobileDetailsOpen}
                onClick={() => setIsMobileDetailsOpen((prev) => !prev)}
                className="inline-flex min-h-[32px] items-center gap-0.5 text-xs font-medium text-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
              >
                <span>Rincian</span>
                {isMobileDetailsOpen ? (
                  <ChevronDown className="h-3.5 w-3.5" aria-hidden="true" />
                ) : (
                  <ChevronUp className="h-3.5 w-3.5" aria-hidden="true" />
                )}
              </button>
            </div>
            <p className="truncate text-lg font-semibold tabular-nums text-neutral-900">
              {estimate.hasValidWeight
                ? formatRupiah(estimate.totalCost)
                : 'Isi berat dulu'}
            </p>
          </div>

          <button
            type="button"
            onClick={onSubmitOrder}
            className="min-h-[44px] shrink-0 whitespace-nowrap rounded-xl bg-blue-700 px-4 py-2.5 text-sm font-medium text-white transition-colors duration-150 ease-out hover:bg-blue-800 motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
          >
            Kirim Pesanan
          </button>
        </div>
      </div>
    </>
  );
}
