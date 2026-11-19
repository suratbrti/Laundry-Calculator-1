/**
 * Komponen katalog paket layanan utama dan pilihan durasi pengerjaan (FT-01).
 */

import {Check, Layers, Shirt, Timer} from 'lucide-react';
import {MAIN_SERVICES, MainService, ServiceCode} from '../config';
import {formatRupiah} from '../lib/format';

interface ServiceCatalogProps {
  selectedServiceCode: ServiceCode;
  onSelectService: (code: ServiceCode) => void;
}

function renderServiceIcon(code: ServiceCode) {
  if (code === 'L01') {
    return <Layers className="h-6 w-6 text-neutral-400" aria-hidden="true" />;
  }
  if (code === 'L03') {
    return <Timer className="h-6 w-6 text-neutral-400" aria-hidden="true" />;
  }
  return <Shirt className="h-6 w-6 text-neutral-400" aria-hidden="true" />;
}

export function ServiceCatalog({
  selectedServiceCode,
  onSelectService,
}: ServiceCatalogProps) {
  return (
    <section aria-labelledby="catalog-heading">
      <div className="mb-3">
        <h2 id="catalog-heading" className="text-lg font-semibold text-neutral-900">
          Pilih Layanan Laundry
        </h2>
        <p className="mt-1 text-sm text-neutral-600">
          Pilih satu paket sesuai kebutuhan cucian Anda.
        </p>
      </div>

      <div role="radiogroup" aria-labelledby="catalog-heading" className="space-y-3">
        {MAIN_SERVICES.map((service: MainService) => {
          const isSelected = service.code === selectedServiceCode;
          return (
            <button
              key={service.code}
              type="button"
              role="radio"
              aria-checked={isSelected}
              onClick={() => onSelectService(service.code)}
              className={`flex min-h-[44px] w-full items-start gap-3 rounded-2xl border p-4 text-left transition-colors duration-150 ease-out motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 sm:gap-4 ${
                isSelected
                  ? 'border-blue-700 bg-blue-50'
                  : 'border-neutral-200 bg-white hover:border-neutral-300'
              }`}
            >
              <div
                role="img"
                aria-label={`Ilustrasi layanan ${service.name}`}
                className="flex aspect-[4/3] w-20 shrink-0 flex-col items-center justify-center gap-1 rounded-xl bg-neutral-100 px-1.5 text-center sm:w-24"
              >
                {renderServiceIcon(service.code)}
                <span className="line-clamp-2 text-xs leading-tight text-neutral-500">
                  {service.name}
                </span>
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-baseline justify-between gap-x-2 gap-y-1">
                  <span className="text-base font-semibold text-neutral-900">
                    {service.name}
                  </span>
                  <span className="text-base font-semibold tabular-nums text-blue-700">
                    {formatRupiah(service.price_per_kg)}/kg
                  </span>
                </div>

                <p className="mt-1 text-sm text-neutral-600">{service.description}</p>

                <div className="mt-2 flex items-center justify-between gap-2 text-sm">
                  <span className="font-medium text-neutral-700">
                    Selesai {service.duration_days} hari
                  </span>
                  {isSelected ? (
                    <span className="inline-flex items-center gap-1 font-medium text-blue-700">
                      <Check className="h-4 w-4" aria-hidden="true" />
                      <span>Dipilih</span>
                    </span>
                  ) : null}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
