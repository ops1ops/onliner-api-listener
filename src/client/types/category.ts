export type CategoryType = {
  key: string;
  name: string;
};

export type PaginationCategoryType = {
  value?: CategoryType | null;
  page: number;
};
