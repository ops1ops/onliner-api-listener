import { useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';

import withLoading from '../../decorators/withLoading';
import localStorageService from '../../services/localStorageService';
import { searchItems } from '../../services/api';
import sort from '../../utils/sort';

const SEARCH_DEBOUNCE_TIME = 300;
const INITIAL_SEARCH_VALUE = localStorageService.getSearchValue();

const useSearch = (setProducts, setLoading, handleCategoryChange) => {
  const [searchValue, setSearchValue] = useState(INITIAL_SEARCH_VALUE);
  const [debouncedSearchValue] = useDebounce(searchValue, SEARCH_DEBOUNCE_TIME);

  useEffect(() => {
    const handleFetchBySearch = withLoading(async () => {
      if (debouncedSearchValue) {
        localStorageService.saveSearchValue(debouncedSearchValue);

        const response = await searchItems(debouncedSearchValue);

        setProducts(sort(response.data.products));
      }
    }, setLoading);

    handleFetchBySearch();
  }, [debouncedSearchValue]);

  const handleSearch = ({ target: { value } }) => {
    handleCategoryChange();
    setSearchValue(value);
  };

  return [searchValue, handleSearch];
};

export default useSearch;
