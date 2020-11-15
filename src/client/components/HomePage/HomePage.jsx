import React, { useState } from 'react';
import { CircularProgress, Container, Paper, TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Pagination from '@material-ui/lab/Pagination';

import ProductCard from '../common/ProductCard';
import useCategories from './useCategories';
import useSearch from './useSearch';
import useCategory from './useCategory';
import './styles.css';

const renderCategoryInput = (params) => (
  <TextField
    {...params}
    className="autocomplete-container"
    label="Categories"
    variant="outlined"
  />
);

const getOptionLabel = ({ name }) => name;

const HomePage = () => {
  const [isLoading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);

  const categories = useCategories();

  const {
    category: { value: categoryValue, page },
    pagesCount,
    handleCategoryChange,
    handlePaginationChange,
  } = useCategory(setProducts, setLoading);

  const handleSearch = useSearch(setProducts, setLoading);

  const renderedProducts = products.map((product) => <ProductCard product={product} key={product.id} />);

  return (
    <Container className="container">
      <Paper elevation={3} className="paper-container">
        <Container className="box-container">
          <Autocomplete
            value={categoryValue}
            onChange={handleCategoryChange}
            options={categories}
            getOptionLabel={getOptionLabel}
            renderInput={renderCategoryInput}
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
        { categoryValue && (
          <Pagination className="pagination" count={pagesCount} page={page} onChange={handlePaginationChange} />
        )}
        <Container className="products-container">
          {isLoading ? <CircularProgress /> : renderedProducts}
        </Container>
        { categoryValue && (
          <Pagination className="pagination" count={pagesCount} page={page} onChange={handlePaginationChange} />
        )}
      </Paper>
    </Container>
  );
};

export default HomePage;
