import { Reducer } from 'react';

import { AutocompleteProps } from '@mui/material';
import { UserActionsType } from '@root/client/store/actions/actionsTypes';
import { UserReducerState } from '@root/client/store/reducers/userReducer';
import { CategoryType } from '@root/client/types/category';
import { PriceType } from '@root/client/types/prices';
import { ProductType } from '@root/client/types/product';

export type AutocompleteType = AutocompleteProps<CategoryType, undefined, undefined, undefined>;
export type AutocompleteParametersType = Parameters<NonNullable<AutocompleteType['onChange']>>;

export type HandleCategoryChangeType = (
  event?: AutocompleteParametersType[0],
  value?: AutocompleteParametersType[1],
) => void;

export type SearchItemsType = {
  page: {
    current: number;
    items: number;
    last: number;
    limit: number;
  };
  products: ProductType[];
  total: number;
};

export type EntityWithNameType = {
  name: string;
};

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
  offers_count: number;
};

export type ContextType = Reducer<UserReducerState, UserActionsType>;
