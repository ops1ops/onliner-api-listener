import { useEffect, useState } from 'react';

import { getCategories } from '../../services/api';
import sort from '../../utils/sort';

const useCategories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await getCategories();

        setCategories(sort(data));
      } catch (error) {
        setCategories([]);
      }
    };

    fetchCategories();
  }, []);

  return categories;
};

export default useCategories;
