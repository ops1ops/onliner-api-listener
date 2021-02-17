import { useEffect, useState } from 'react';

import withLoading from '../../decorators/withLoading';
import localStorageService from '../../services/localStorageService';
import { getCategoryItems } from '../../services/api';

const INITIAL_PAGE = 1;
const DEFAULT_CATEGORY = { value: null, page: INITIAL_PAGE };
const INITIAL_CATEGORY = localStorageService.getFilterCategory() || DEFAULT_CATEGORY;

const useSelectedCategory = (setProducts, setLoading) => {
  const [category, setCategory] = useState(INITIAL_CATEGORY);
  const [pagesCount, setPagesCount] = useState();

  useEffect(() => {
    const fetchCategoryItems = withLoading(async () => {
      const { value, page: currentPage } = category;

      if (value) {
        localStorageService.saveFilterCategory(category);

        const { data: { products: fetchedProducts, page: { last } } } = await getCategoryItems(value.key, currentPage);

        setPagesCount(last);
        setProducts(fetchedProducts);
      }
    }, setLoading);

    fetchCategoryItems();
  }, [category]);

  const handlePaginationChange = (_event, value) => setCategory((prevCategory) => ({ ...prevCategory, page: value }));

  const handleCategoryChange = (_event, value) => {
    setCategory({ value, page: INITIAL_PAGE });

    if (!value) {
      setProducts([]);
      setPagesCount();
    }
  };

  return { category, pagesCount, handleCategoryChange, handlePaginationChange };
};

export default useSelectedCategory;
