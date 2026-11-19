/**
 * Komponen header toko dan informasi jam operasional (FT-07).
 */

import {Clock} from 'lucide-react';
import {STORE_INFO} from '../config';

export function StoreHeader() {
  return (
    <header className="border-b border-neutral-200 bg-white">
      <div className="mx-auto flex max-w-5xl flex-col gap-2 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <h1 className="text-2xl font-semibold tracking-tight text-neutral-900">
          {STORE_INFO.brand_title}
        </h1>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-neutral-600">
          <span className="inline-flex items-center gap-1.5">
            <Clock className="h-4 w-4 shrink-0 text-neutral-500" aria-hidden="true" />
            <span>Buka setiap hari {STORE_INFO.opening_hours}</span>
          </span>
          <span aria-hidden="true" className="hidden text-neutral-300 sm:inline">
            |
          </span>
          <span>Jadwal jemput {STORE_INFO.pickup_hours}</span>
        </div>
      </div>
    </header>
  );
}
