import React, { useState } from 'react';
import { CircularProgress, Container, Paper, TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Pagination from '@material-ui/lab/Pagination';

import HorizontalItemCard from '../common/HorizontalItemCard';
import useCategories from './useCategories';
import useSearch from './useSearch';
import useSelectedCategory from './useSelectedCategory';
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
  const [items, setItems] = useState([]);

  const categories = useCategories();

  const {
    category: { value: categoryValue, page },
    pagesCount,
    handleCategoryChange,
    handlePaginationChange,
  } = useSelectedCategory(setItems, setLoading);

  const [searchValue, handleSearch] = useSearch(setItems, setLoading, handleCategoryChange);

  const renderedItems = items.map((item) => <HorizontalItemCard item={item} key={item.id} />);

  const pagination = categoryValue && (
    <Pagination className="pagination" disabled={isLoading} count={pagesCount} page={page} onChange={handlePaginationChange} />
  );

  return (
    <Container className="container">
      <Paper elevation={3} className="paper-container">
        <Container className="filters-container">
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
            value={searchValue}
            onChange={handleSearch}
          />
        </Container>
        {pagination}
        <Container className="products-container">
          {isLoading ? <CircularProgress /> : renderedItems}
        </Container>
        {pagination}
      </Paper>
    </Container>
  );
};

export default HomePage;
