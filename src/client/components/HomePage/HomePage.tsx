import React, { FC, useState } from "react";

import {
  Autocomplete,
  AutocompleteProps,
  CircularProgress,
  Container,
  Pagination,
  Paper,
  TextField,
} from "@mui/material";
import { AutocompleteType } from "@root/client/types/helpers";
import { ProductType } from "@root/client/types/product";

import ProductCard from "../common/ProductCard";

import useCategories from "./useCategories";
import useSearch from "./useSearch";
import useSelectedCategory from "./useSelectedCategory";

import "./styles.css";

const renderCategoryInput: AutocompleteType["renderInput"] = (params) => (
  <TextField {...params} className="autocomplete-container" label="Categories" variant="outlined" />
);

const getOptionLabel: AutocompleteProps<
  { name: string },
  boolean,
  boolean,
  boolean
>["getOptionLabel"] = ({ name }) => name;

const HomePage: FC = () => {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [products, setProducts] = useState<ProductType[]>([]);

  const categories = useCategories();

  const {
    category: { value: categoryValue, page },
    pagesCount,
    handleCategoryChange,
    handlePaginationChange,
  } = useSelectedCategory(setProducts, setLoading);

  const [searchValue, handleSearch] = useSearch(setProducts, setLoading, handleCategoryChange);

  const renderedProducts = products.map((product) => (
    <ProductCard product={product} key={product.id} />
  ));

  const pagination = categoryValue && !isLoading && (
    <Pagination
      className="pagination"
      count={pagesCount}
      page={page}
      onChange={handlePaginationChange}
    />
  );

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
            value={searchValue}
            onChange={handleSearch}
          />
        </Container>
        {pagination}
        <Container className="products-container">
          {isLoading ? <CircularProgress /> : renderedProducts}
        </Container>
        {pagination}
      </Paper>
    </Container>
  );
};

export default HomePage;
