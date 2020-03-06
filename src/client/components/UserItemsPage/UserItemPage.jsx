import React, { useEffect, useState } from 'react';
import {
  CircularProgress,
  Container,
  List,
  Paper,
} from '@material-ui/core';
import { getUserSubscriptions } from '../../services/api';
import './styles.css';
import ListProduct from '../common/ListProduct/ListProduct';

const UserItemPage = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const handleProductsFetch = async () => {
      try {
        const { data } = await getUserSubscriptions();

        setProducts(data);
      } catch (error) {
        // TODO error
      } finally {
        setLoading(false);
      }
    };

    handleProductsFetch();
  }, []);

  const renderedProducts = products
    .slice()
    .sort((a, b) => {
      if (a.name > b.name) {
        return 1;
      }
      if (a.name < b.name) {
        return -1;
      }

      return 0;
    })
    .map((product) => <ListProduct product={product} key={product.id} />);

  return (
    <Container className="main-container">
      <Paper elevation={3} className="wrapper-container">
        <List className="user-items-container">
          {isLoading ? <CircularProgress /> : renderedProducts}
        </List>
      </Paper>
    </Container>
  );
};

export default UserItemPage;
