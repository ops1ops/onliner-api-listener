import { ProductStatus } from '@root/client/enums';
import { ProductType } from '@root/client/types/product';

export const initialProduct: ProductType = {
  certification_required: false,
  color_code: null,
  description: '',
  extended_name: '',
  forum: {
    post_url: '',
    topic_id: 0,
    topic_url: '',
  },
  full_name: '',
  image_size: [],
  manufacturer: {
    key: '',
    legal_address: '',
    legal_name: '',
    name: '',
  },
  max_cobrand_cashback: {
    label: '',
    percentage: 0,
  },
  name: '',
  name_prefix: '',
  parent_key: '',
  sale: {
    can_be_subscribed: false,
    subscribed: false,
    discount: 0,
    is_on_sale: false,
    min_prices_median: {
      amount: '',
      currency: '',
    },
  },
  status: ProductStatus.ACTIVE,
  id: 0,
  url: '',
  key: '',
  isSubscribed: false,
  review_url: '',
  reviews: {
    count: 0,
    html_url: '',
    rating: 0,
    url: '',
  },
  micro_description: '',
  second: {
    max_price: null,
    min_price: null,
    offers_count: 0,
  },
  stickers: null,
  history: [],
  html_url: '',
  images: { header: '', icon: null },
  prices: {
    price_min: {
      converted: {
        BYN: { amount: '', currency: '' },
        BYR: { amount: '', currency: '' },
      },
      amount: '',
      currency: '',
    },
    price_max: {
      converted: {
        BYN: { amount: '', currency: '' },
        BYR: { amount: '', currency: '' },
      },
      amount: '',
      currency: '',
    },
    currency_sign: null,
    html_url: '',
    max: null,
    min: null,
    offers: { count: 0 },
    url: '',
  },
};
