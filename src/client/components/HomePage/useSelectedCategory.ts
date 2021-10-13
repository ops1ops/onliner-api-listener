import { Dispatch, SetStateAction, useEffect, useState } from 'react';

import { PaginationProps } from '@material-ui/lab';
import { PaginationCategoryType } from '@root/client/types/category';
import { HandleCategoryChangeType } from '@root/client/types/helpers';
import { ProductType } from '@root/client/types/product';

import withLoading from '../../decorators/withLoading';
import { getCategoryItems } from '../../services/api';
import localStorageService from '../../services/localStorageService';

type UseSelectedCategoryReturnType = {
  category: PaginationCategoryType;
  pagesCount: number;
  handlePaginationChange: PaginationProps['onChange'];
  handleCategoryChange: HandleCategoryChangeType;
};

const INITIAL_PAGE = 1;
const DEFAULT_CATEGORY: PaginationCategoryType = { value: null, page: INITIAL_PAGE };
const INITIAL_CATEGORY: PaginationCategoryType =
  localStorageService.getFilterCategory() || DEFAULT_CATEGORY;

const useSelectedCategory = (
  setProducts: Dispatch<SetStateAction<ProductType[]>>,
  setLoading: Dispatch<SetStateAction<boolean>>,
): UseSelectedCategoryReturnType => {
  const [category, setCategory] = useState<PaginationCategoryType>(INITIAL_CATEGORY);
  const [pagesCount, setPagesCount] = useState<number>(0);

  useEffect(() => {
    const fetchCategoryItems = withLoading(async () => {
      const { value, page: currentPage } = category;

      if (value) {
        localStorageService.saveFilterCategory(category);

        const {
          data: {
            products: fetchedProducts,
            page: { last },
          },
        } = await getCategoryItems(value.key, currentPage);

        setPagesCount(last);
        setProducts(fetchedProducts);
      }
    }, setLoading);

    fetchCategoryItems();
  }, [category]);

  const handlePaginationChange: PaginationProps['onChange'] = (_event, value) =>
    setCategory((prevCategory) => ({ ...prevCategory, page: value }));

  const handleCategoryChange: HandleCategoryChangeType = (_event, value = null) => {
    setCategory({ value, page: INITIAL_PAGE });

    if (!value) {
      setProducts([]);
      setPagesCount(0);
    }
  };

  return { category, pagesCount, handleCategoryChange, handlePaginationChange };
};

export default useSelectedCategory;
