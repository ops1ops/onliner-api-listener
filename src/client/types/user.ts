import { TableDataType } from '@root/client/types/helpers';

export type UserType = {
  id: number;
  name: string;
  jwt: string;
};

export type UserSubscriptions = {
  categoryKey: null | string;
  createdAt: string;
  id: number;
  key: string;
  name: string;
  price: string;
  updatedAt: string;
};

export type UserSubscriptionWithTableData = {
  tableData: TableDataType;
} & UserSubscriptions;
