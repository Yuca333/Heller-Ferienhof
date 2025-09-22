
export interface QuoteParams {
  checkin: string;
  checkout: string;
  persons: number;
  roomType: 'EZ' | 'DZ';
  breakfast: boolean;
  isEvent: boolean;
}

export interface PriceResult {
  total: number | null;
  message: string;
  nights: number;
}
