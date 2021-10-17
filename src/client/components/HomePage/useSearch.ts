import { Dispatch, SetStateAction, useEffect, useState } from "react";

import { TextFieldProps } from "@mui/material";
import { HandleCategoryChangeType } from "@root/client/types/helpers";
import { ProductType } from "@root/client/types/product";
import { useDebounce } from "use-debounce";

import withLoading from "../../decorators/withLoading";
import { searchItems } from "../../services/api";
import localStorageService from "../../services/localStorageService";
import sortByName from "../../utils/sortByName";

const SEARCH_DEBOUNCE_TIME = 300;

const INITIAL_SEARCH_VALUE = localStorageService.getSearchValue();

type UseSearchReturnType = [string, TextFieldProps["onChange"]];

const useSearch = (
  setProducts: Dispatch<SetStateAction<ProductType[]>>,
  setLoading: Dispatch<SetStateAction<boolean>>,
  handleCategoryChange: HandleCategoryChangeType,
): UseSearchReturnType => {
  const [searchValue, setSearchValue] = useState<string>(INITIAL_SEARCH_VALUE);
  const [debouncedSearchValue] = useDebounce<string>(searchValue, SEARCH_DEBOUNCE_TIME);

  useEffect(() => {
    const handleFetchBySearch = withLoading(async () => {
      if (debouncedSearchValue) {
        localStorageService.saveSearchValue(debouncedSearchValue);

        const response = await searchItems(debouncedSearchValue);

        setProducts(sortByName<ProductType>(response.data.products));
      }
    }, setLoading);

    handleFetchBySearch();
  }, [debouncedSearchValue]);

  const handleSearch: TextFieldProps["onChange"] = ({ target: { value } }) => {
    handleCategoryChange();
    setSearchValue(value);
  };

  return [searchValue, handleSearch];
};

export default useSearch;
