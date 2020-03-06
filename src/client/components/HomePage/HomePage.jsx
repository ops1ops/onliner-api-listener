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
  getCategory,
  searchItems,
} from '../../services/api';
import './styles.css';
import localStorageService from '../../services/localStorageService';

const renderCategories = (params) => (
  <TextField
    {...params}
    className="autocomplete-container"
    label="Filter"
    variant="outlined"
  />
);

const DEBOUNCE_TIME = 300;
const INITIAL_PAGE = 1;

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
      const { key } = value;
      localStorageService.saveCategoryFilter(key);
      setCategoryKey(key);

      setLoading(true);
      const { data: { products: fetchedProducts, page: { last } } } = await getCategory(key);

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

        setCategories(data);
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

          setProducts(response.data.products);
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
      const { data: { products: fetchedProducts } } = await getCategory(categoryKey, value);

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
