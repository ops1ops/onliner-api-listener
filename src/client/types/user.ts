export type UserType = {
  id: number;
  name: string;
  jwt: string;
};

export type UserSubscription = {
  categoryKey: null | string;
  createdAt: string;
  id: number;
  key: string;
  name: string;
  price: string;
  updatedAt: string;
};
