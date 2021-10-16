import { ProductStatus } from '@root/client/enums';
import {
  ForumType,
  HistoryItemType,
  ManufacturerType,
  MaxCobrandCashbackType,
  ReviewsType,
  SaleType,
  SecondType,
} from '@root/client/types/helpers';
import { ImagesType } from '@root/client/types/images';
import { PricesType } from '@root/client/types/prices';

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
