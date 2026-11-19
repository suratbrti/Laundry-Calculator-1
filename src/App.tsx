/**
 * Halaman utama LaundryCalc yang menyatukan katalog, kalkulator berat, add-on, formulir, dan ringkasan biaya.
 */

import {useMemo, useRef, useState} from 'react';
import {AddOnOptions} from './components/AddOnOptions';
import {OrderForm} from './components/OrderForm';
import {PriceSummary} from './components/PriceSummary';
import {ServiceCatalog} from './components/ServiceCatalog';
import {StoreFooter} from './components/StoreFooter';
import {StoreHeader} from './components/StoreHeader';
import {WeightCalculator} from './components/WeightCalculator';
import {DEFAULT_SERVICE_CODE, MAIN_SERVICES, ServiceCode} from './config';
import {calculateEstimate} from './lib/calculator';
import {parseWeightInput} from './lib/format';
import {
  buildWhatsAppMessage,
  buildWhatsAppUrl,
  FormFieldKey,
  validateOrderForm,
} from './lib/whatsapp';

export default function App() {
  const [selectedServiceCode, setSelectedServiceCode] =
    useState<ServiceCode>(DEFAULT_SERVICE_CODE);
  const [weightRaw, setWeightRaw] = useState('');
  const [isPickupEnabled, setIsPickupEnabled] = useState(false);
  const [isFragranceEnabled, setIsFragranceEnabled] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [pickupAddress, setPickupAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [errors, setErrors] = useState<Partial<Record<FormFieldKey, string>>>({});
  const [lastWhatsAppUrl, setLastWhatsAppUrl] = useState<string | null>(null);
  const [lastWhatsAppMessage, setLastWhatsAppMessage] = useState<string | null>(null);

  const weightInputRef = useRef<HTMLInputElement | null>(null);
  const nameInputRef = useRef<HTMLInputElement | null>(null);
  const addressInputRef = useRef<HTMLTextAreaElement | null>(null);

  const selectedService = useMemo(
    () =>
      MAIN_SERVICES.find((item) => item.code === selectedServiceCode) ??
      MAIN_SERVICES[0],
    [selectedServiceCode],
  );

  const parsedWeight = useMemo(() => parseWeightInput(weightRaw), [weightRaw]);

  const estimate = useMemo(
    () =>
      calculateEstimate({
        service: selectedService,
        actualWeight: parsedWeight.status === 'valid' ? parsedWeight.value : null,
        isPickupEnabled,
        isFragranceEnabled,
      }),
    [selectedService, parsedWeight, isPickupEnabled, isFragranceEnabled],
  );

  const clearFieldError = (field: FormFieldKey) => {
    setErrors((prev) => {
      if (!prev[field]) {
        return prev;
      }
      const next = {...prev};
      delete next[field];
      return next;
    });
  };

  const handleChangeWeight = (value: string) => {
    setWeightRaw(value);
    clearFieldError('weight');
  };

  const handleChangeCustomerName = (value: string) => {
    setCustomerName(value);
    clearFieldError('customerName');
  };

  const handleChangePickupAddress = (value: string) => {
    setPickupAddress(value);
    clearFieldError('pickupAddress');
  };

  const handleTogglePickup = (enabled: boolean) => {
    setIsPickupEnabled(enabled);
    if (!enabled) {
      clearFieldError('pickupAddress');
    }
  };

  const focusFirstErrorField = (field: FormFieldKey | null) => {
    if (field === 'weight' && weightInputRef.current) {
      weightInputRef.current.focus();
      weightInputRef.current.scrollIntoView({behavior: 'smooth', block: 'center'});
    } else if (field === 'customerName' && nameInputRef.current) {
      nameInputRef.current.focus();
      nameInputRef.current.scrollIntoView({behavior: 'smooth', block: 'center'});
    } else if (field === 'pickupAddress' && addressInputRef.current) {
      addressInputRef.current.focus();
      addressInputRef.current.scrollIntoView({behavior: 'smooth', block: 'center'});
    }
  };

  const handleSubmitOrder = () => {
    const validation = validateOrderForm({
      weightRaw,
      customerName,
      isPickupEnabled,
      pickupAddress,
    });

    if (!validation.isValid) {
      setErrors(validation.errors);
      focusFirstErrorField(validation.firstErrorField);
      return;
    }

    setErrors({});
    const message = buildWhatsAppMessage({
      service: selectedService,
      estimate,
      isPickupEnabled,
      isFragranceEnabled,
      customerName,
      pickupAddress,
      notes,
    });
    const url = buildWhatsAppUrl(message);

    setLastWhatsAppMessage(message);
    setLastWhatsAppUrl(url);

    const link = document.createElement('a');
    link.href = url;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900">
      <StoreHeader />

      <main className="mx-auto max-w-5xl px-4 py-6 sm:px-6 lg:py-8">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-start lg:gap-8">
          <div className="space-y-6 lg:col-span-7">
            <ServiceCatalog
              selectedServiceCode={selectedServiceCode}
              onSelectService={setSelectedServiceCode}
            />

            <WeightCalculator
              weightRaw={weightRaw}
              onChangeWeight={handleChangeWeight}
              isMinChargeApplied={estimate.isMinChargeApplied}
              billedWeight={estimate.billedWeight}
              hasValidWeight={estimate.hasValidWeight}
              error={errors.weight}
              inputRef={weightInputRef}
            />

            <AddOnOptions
              isPickupEnabled={isPickupEnabled}
              onTogglePickup={handleTogglePickup}
              isFragranceEnabled={isFragranceEnabled}
              onToggleFragrance={setIsFragranceEnabled}
              hasValidWeight={estimate.hasValidWeight}
              fragranceCost={estimate.fragranceCost}
            />

            <OrderForm
              customerName={customerName}
              onChangeCustomerName={handleChangeCustomerName}
              isPickupEnabled={isPickupEnabled}
              pickupAddress={pickupAddress}
              onChangePickupAddress={handleChangePickupAddress}
              notes={notes}
              onChangeNotes={setNotes}
              errors={errors}
              nameInputRef={nameInputRef}
              addressInputRef={addressInputRef}
            />

            <StoreFooter />
          </div>

          <div className="lg:col-span-5">
            <PriceSummary
              service={selectedService}
              estimate={estimate}
              isPickupEnabled={isPickupEnabled}
              isFragranceEnabled={isFragranceEnabled}
              onSubmitOrder={handleSubmitOrder}
              lastWhatsAppUrl={lastWhatsAppUrl}
              lastWhatsAppMessage={lastWhatsAppMessage}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
