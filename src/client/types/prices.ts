export type PriceType = {
  amount?: string;
  currency?: string;
};

export type PriceLimitType = {
  converted: {
    BYN: PriceType;
    BYR: PriceType;
  };
} & PriceType;

export type OffersType = {
  count: number;
};

export type PricesType = {
  price_min: PriceLimitType;
  price_max: PriceLimitType;
  currency_sign: string | null;
  html_url: string;
  max: number | null;
  min: number | null;
  offers: OffersType;
  url: string;
};
