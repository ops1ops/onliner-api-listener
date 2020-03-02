import React, { useCallback, useEffect, useState } from 'react';
import {
  Container,
  Paper,
  TextField,
  CircularProgress,
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
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
    className="autocompleteContainer"
    label="Filter"
    variant="outlined"
  />
);

const DEBOUNCE_TIME = 300;

const UserPage = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [searchValue, setSearchValue] = useState();
  const [isLoading, setLoading] = useState(false);
  const [debouncedValue] = useDebounce(searchValue, DEBOUNCE_TIME);

  const handleCategoryChange = useCallback(async (event, value) => {
    if (!value) {
      setProducts([]);

      return;
    }

    try {
      setLoading(true);
      const response = await getCategory(value.key);

      localStorageService.saveCategoryFilter(value.key);
      setProducts(response.data.products);
    } catch {
      // TODO error
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

  return (
    <Container className="container">
      <Paper elevation={3} className="paperContainer">
        <Container className="boxContainer">
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
            className="searchInput"
            onChange={handleSearch}
          />
        </Container>
        <Container className="productsContainer">
          {isLoading ? <CircularProgress /> : renderedProducts}
        </Container>
      </Paper>
    </Container>
  );
};

export default UserPage;
