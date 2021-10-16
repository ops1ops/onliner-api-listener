import { ProductStatus } from '@root/client/enums';
import { SecondType } from '@root/client/types/helpers';
import { PriceType } from '@root/client/types/prices';
import { ProductType } from '@root/client/types/product';

export const initialPrice: PriceType = {
  amount: '',
  currency: '',
};

export const initialPriceLimit = {
  converted: {
    BYN: initialPrice,
    BYR: initialPrice,
  },
  ...initialPrice,
};

export const initialSale = {
  can_be_subscribed: false,
  subscribed: false,
  discount: 0,
  is_on_sale: false,
  min_prices_median: initialPrice,
};

export const initialManufacturer = {
  key: '',
  legal_address: '',
  legal_name: '',
  name: '',
};

export const initialMaxCobrandCashback = {
  label: '',
  percentage: 0,
};

export const InitialForum = {
  post_url: '',
  topic_id: 0,
  topic_url: '',
};

export const initialReviews = {
  count: 0,
  html_url: '',
  rating: 0,
  url: '',
};

export const initialPrices = {
  price_min: initialPriceLimit,
  price_max: initialPriceLimit,
  currency_sign: null,
  html_url: '',
  max: null,
  min: null,
  offers: { count: 0 },
  url: '',
};

export const initialSecond: SecondType = {
  max_price: null,
  min_price: null,
  offers_count: 0,
};

export const initialProduct: ProductType = {
  certification_required: false,
  color_code: null,
  description: '',
  extended_name: '',
  forum: InitialForum,
  full_name: '',
  image_size: [],
  manufacturer: initialManufacturer,
  max_cobrand_cashback: initialMaxCobrandCashback,
  name: '',
  name_prefix: '',
  parent_key: '',
  sale: initialSale,
  status: ProductStatus.ACTIVE,
  id: 0,
  url: '',
  key: '',
  isSubscribed: false,
  review_url: '',
  reviews: initialReviews,
  micro_description: '',
  second: initialSecond,
  stickers: null,
  history: [],
  html_url: '',
  images: { header: '', icon: null },
  prices: initialPrices,
};
