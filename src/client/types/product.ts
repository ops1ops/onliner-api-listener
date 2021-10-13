import { ProductStatus } from '@root/client/enums';
import { ImagesType } from '@root/client/types/images';
import { PricesType, PriceType } from '@root/client/types/prices';

export type ForumType = {
  post_url: string;
  topic_id: number;
  topic_url: string;
};

export type HistoryItemType = {
  createdAt: string;
  id: number;
  itemId: number;
  price: string;
  updatedAt: string;
};

export type ManufacturerType = {
  key: string;
  legal_address: string;
  legal_name: string;
  name: string;
};

export type MaxCobrandCashbackType = {
  label: string;
  percentage: number;
};

export type ReviewsType = {
  count: number;
  html_url: string;
  rating: number;
  url: string;
};

export type SaleType = {
  can_be_subscribed: boolean;
  discount: number;
  is_on_sale: boolean;
  min_prices_median: PriceType;
  subscribed: boolean;
};

export type SecondType = {
  max_price: number | null;
  min_price: number | null;
  offers_count: 0;
};

export type ProductType = {
  certification_required: boolean;
  color_code: string | null;
  description: string;
  extended_name: string;
  forum: ForumType;
  full_name: string;
  history: HistoryItemType[];
  html_url: string;
  id: number;
  image_size: unknown[];
  images: ImagesType;
  isSubscribed: boolean;
  key: string;
  manufacturer: ManufacturerType;
  max_cobrand_cashback: MaxCobrandCashbackType;
  micro_description: string;
  name: string;
  name_prefix: string;
  parent_key: string;
  prices: PricesType;
  review_url: string | null;
  reviews: ReviewsType;
  sale: SaleType;
  second: SecondType;
  status: ProductStatus;
  stickers: null;
  url: string;
};
