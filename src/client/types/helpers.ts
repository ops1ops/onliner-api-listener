import { AutocompleteProps } from '@material-ui/lab/Autocomplete';
import { CategoryType } from '@root/client/types/category';
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

export type NameType = {
  name: string;
};
