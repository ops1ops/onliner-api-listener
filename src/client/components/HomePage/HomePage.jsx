import React, { useCallback, useEffect, useState } from 'react';
import {
  Container,
  Paper,
  TextField,
  CircularProgress,
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Pagination from '@material-ui/lab/Pagination';
import { useDebounce } from 'use-debounce';

import ProductCard from '../common/ProductCard';
import {
  getCategories,
  getCategoryItems,
  searchItems,
} from '../../services/api';
import './styles.css';
import localStorageService from '../../services/localStorageService';
import sort from '../../utils/sort';

const renderCategories = (params) => (
  <TextField
    {...params}
    className="autocomplete-container"
    label="Categories"
    variant="outlined"
  />
);

const DEBOUNCE_TIME = 300;
const INITIAL_PAGE = 1;
const categoryKeyFilter = localStorageService.getCategoryKeyFilter();

const HomePage = () => {
  const [pagesCount, setPagesCount] = useState();
  const [page, setPage] = useState(INITIAL_PAGE);
  const [categoryKey, setCategoryKey] = useState();
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [searchValue, setSearchValue] = useState();
  const [isLoading, setLoading] = useState(false);
  const [debouncedValue] = useDebounce(searchValue, DEBOUNCE_TIME);

  const handleCategoryChange = useCallback(async (event, value) => {
    try {
      const { key, name } = value;

      setCategoryKey(key);

      setLoading(true);
      const { data: { products: fetchedProducts, page: { last } } } = await getCategoryItems(key);

      localStorageService.saveCategoryKeyFilter(key);
      localStorageService.saveCategoryNameFilter(name);

      setPagesCount(last);
      setProducts(fetchedProducts);
    } catch {
      setCategoryKey(null);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const handleCategoriesFetch = async () => {
      try {
        const { data } = await getCategories();
        if (categoryKeyFilter) {
          const response = await getCategoryItems(categoryKeyFilter);
          setProducts(response.data.products);
        }
        setCategories(sort(data));
      } catch {
        // TODO error
      }
    };

    handleCategoriesFetch();
  }, []);

  useEffect(() => {
    const handleFetchBySearch = async () => {
      try {
        if (debouncedValue) {
          const response = await searchItems(debouncedValue);

          setProducts(sort(response.data.products));
        }
      } catch {
        // TODO error
      } finally {
        setLoading(false);
      }
    };

    handleFetchBySearch();
  }, [debouncedValue]);

  const handleSearch = ({ target: { value } }) => {
    setSearchValue(value);
    localStorageService.saveSearchValue(value);
    setLoading(true);
  };

  const renderedProducts = products.map((product) => <ProductCard product={product} key={product.id} />);

  const handlePaginationChange = useCallback(async (event, value) => {
    try {
      setPage(value);

      setLoading(true);
      const { data: { products: fetchedProducts } } = await getCategoryItems(categoryKey, value);

      setProducts(fetchedProducts);
    } catch {
      // TODO error
    } finally {
      setLoading(false);
    }
  }, [categoryKey]);

  return (
    <Container className="container">
      <Paper elevation={3} className="paper-container">
        <Container className="box-container">
          <Autocomplete
            onChange={handleCategoryChange}
            options={categories}
            getOptionLabel={(option) => option.name}
            renderInput={renderCategories}
            loading={isLoading}
          />
          <TextField
            id="outlined-basic"
            label="Search"
            variant="outlined"
            className="search-input"
            onChange={handleSearch}
          />
        </Container>
        { categoryKey && (
          <Pagination className="pagination" count={pagesCount} page={page} onChange={handlePaginationChange} />
        )}
        <Container className="products-container">
          {isLoading ? <CircularProgress /> : renderedProducts}
        </Container>
        { categoryKey && (
          <Pagination className="pagination" count={pagesCount} page={page} onChange={handlePaginationChange} />
        )}
      </Paper>
    </Container>
  );
};

export default HomePage;
