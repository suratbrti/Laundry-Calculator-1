/**
 * Komponen footer ringkas berisi klausul estimasi dan jadwal operasional toko (FT-07).
 */

import {ESTIMATE_DISCLAIMER, STORE_INFO} from '../config';

export function StoreFooter() {
  return (
    <footer className="mt-8 border-t border-neutral-200 pt-6 pb-28 text-sm text-neutral-600 lg:pb-12">
      <p>{ESTIMATE_DISCLAIMER}</p>
      <p className="mt-2">
        Jam buka {STORE_INFO.opening_hours}, jadwal jemput {STORE_INFO.pickup_hours}.
      </p>
    </footer>
  );
}
