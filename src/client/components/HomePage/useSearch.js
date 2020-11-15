import { useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';

import withLoading from '../../decorators/withLoading';
import localStorageService from '../../services/localStorageService';
import { searchItems } from '../../services/api';
import sort from '../../utils/sort';

const SEARCH_DEBOUNCE_TIME = 300;

const useSearch = (setProducts, setLoading) => {
  const [searchValue, setSearchValue] = useState();
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

  const handleSearch = ({ target: { value } }) => setSearchValue(value);

  return handleSearch;
};

export default useSearch;

