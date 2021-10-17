import { useEffect, useState } from 'react';

import { CategoryType } from '@root/client/types/category';

import { getCategories } from '../../services/api';
import sortByName from '../../utils/sortByName';

type UseCategoriesReturnType = CategoryType[];

const useCategories = (): UseCategoriesReturnType => {
  const [categories, setCategories] = useState<CategoryType[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await getCategories();

        setCategories(sortByName<CategoryType>(data));
      } catch (error) {
        setCategories([]);
      }
    };

    fetchCategories();
  }, []);

  return categories;
};

export default useCategories;
