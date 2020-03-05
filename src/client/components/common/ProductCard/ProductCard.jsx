import React from 'react';
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from '@material-ui/core';
import { useHistory } from 'react-router';
import { PropTypes } from 'prop-types';

import { subscribeUserToItem } from '../../../services/api';
import './styles.css';

const renderPrice = (prices) => {
  if (prices && prices.price_min) {
    const { price_min: { amount, currency } } = prices;

    return (
      <Typography className="price-text" color="textPrimary">
        {`От ${amount} ${currency}`}
      </Typography>
    );
  }
};

const ProductCard = (props) => {
  const { product: { id, key, full_name: fullName, description, prices, status, images: { header } } } = props;
  const history = useHistory();

  const subscribeProduct = async () => {
    await subscribeUserToItem(key);
  };

  const redirectToItemPage = () => history.push(`/item/${id}`);

  return status !== 'old' && (
    <Card className="card-container">
      <CardActionArea onClick={redirectToItemPage}>
        <CardMedia className="card-media" image={header} />
        <CardContent>
          <Typography variant="h6" color="textPrimary" component="p">
            {fullName}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button className="subscribe-button" size="large" onClick={subscribeProduct}>
          Subscribe
        </Button>
        {renderPrice(prices)}
      </CardActions>
    </Card>
  );
};

ProductCard.defaultProps = {
  product: PropTypes.shape({
    prices: PropTypes.shape({
      price_min: PropTypes.shape({
        amount: '',
        currency: '',
      }),
    }),
    images: PropTypes.shape({
      header: '',
    }),
  }),
};

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    key: PropTypes.string.isRequired,
    full_name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    prices: PropTypes.shape({
      price_min: PropTypes.shape({
        amount: PropTypes.string,
        currency: PropTypes.string,
      }),
    }),
    status: PropTypes.string.isRequired,
    images: PropTypes.shape({
      header: PropTypes.string,
    }),
  }),
};

export default ProductCard;
