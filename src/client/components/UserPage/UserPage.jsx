import React, { useEffect, useState } from 'react';
import {
  Card,
  Container,
  Paper,
  TextField,
  CardContent,
  CardActions,
  Button,
  CardMedia,
  CardActionArea,
  Typography,
} from '@material-ui/core';
import { useDebounce } from 'use-debounce';
import { useHistory } from 'react-router-dom';

import MultipleSelect from '../common/MultipleSelect';
import { getCategory, searchCategory } from '../../services/api';
import './styles.css';

const UserPage = () => {
  const [products, setProducts] = useState([]);
  const [categoryName, setCategoryName] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [value] = useDebounce(searchValue, 2000);
  const history = useHistory();

  const handleCategoryChange = (event) => {
    const keys = event.target.value.map(({ key }) => key);
    let productsArray = [];

    keys.forEach(async (key) => {
      const response = await getCategory(key);

      productsArray = productsArray.concat(response.data.products);
      setCategoryName(event.target.value);
      setProducts(productsArray);
    });
  };

  useEffect(() => {
    const handleFetch = async () => {
      if (value) {
        const response = await searchCategory(value);
        setProducts(response.data.products);
      }
    };

    handleFetch();
  }, [value]);

  const handleSearch = (event) => {
    setSearchValue(event.target.value);
  };

  const renderProducts = products.map((item) => (
    <Card className="cardContainer" key={item.id}>
      <CardActionArea onClick={() => history.push(`/item/${item.id}`)}>
        <CardMedia className="cardMedia" image={item.images.header} />
        <CardContent>
          <Typography variant="h6" color="textPrimary" component="p">
            {item.full_name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {item.description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button className="subscribeButton" size="large">
          Subscribe
        </Button>
      </CardActions>
    </Card>
  ));

  return (
    <Container className="container">
      <Paper elevation={3} className="paperContainer">
        <Container className="boxContainer">
          <MultipleSelect
            className="categoryFilter"
            categoryName={categoryName}
            onChange={handleCategoryChange}
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
          {renderProducts}
        </Container>
      </Paper>
    </Container>
  );
};

export default UserPage;
