import type { QuoteParams, PriceResult } from '../types.ts';

const PRICES = {
  EZ: 54,
  DZ: 74,
  BREAKFAST: 10,
  SHORT_STAY_SURCHARGE: 8,
};

export function calculatePrice(params: QuoteParams): PriceResult {
  if (params.isEvent) {
    return {
      total: null,
      message: 'Preis auf Anfrage (Messe/Oktoberfest)',
      nights: 0,
    };
  }

  if (!params.checkin || !params.checkout) {
    return { total: null, message: 'Bitte An- und Abreise wählen.', nights: 0 };
  }

  const checkinDate = new Date(params.checkin);
  const checkoutDate = new Date(params.checkout);

  if (checkoutDate <= checkinDate) {
    return { total: null, message: 'Abreise muss nach Anreise sein.', nights: 0 };
  }

  const nights = Math.ceil((checkoutDate.getTime() - checkinDate.getTime()) / (1000 * 60 * 60 * 24));

  if (nights <= 0) {
    return { total: null, message: 'Mindestens 1 Nacht.', nights: 0 };
  }

  const roomPrice = params.roomType === 'EZ' ? PRICES.EZ : PRICES.DZ;
  let total = roomPrice * nights;

  if (params.breakfast) {
    total += PRICES.BREAKFAST * params.persons * nights;
  }

  if (nights === 1) {
    total += PRICES.SHORT_STAY_SURCHARGE * params.persons;
  }

  return {
    total,
    message: `Geschätzter Gesamtpreis: €${total.toFixed(2)}`,
    nights,
  };
}