import React, { FC, useState } from 'react';

import {
  Button,
  ButtonProps,
  Card,
  CardActionArea,
  CardActionAreaProps,
  CardActions,
  CardContent,
  CardMedia,
  CircularProgress,
  Typography,
} from '@mui/material';
import { ProductStatus } from '@root/client/enums';
import { subscribeUserToItem } from '@root/client/services/api';
import { PricesType } from '@root/client/types/prices';
import { ProductType } from '@root/client/types/product';
import { useHistory } from 'react-router';

import './styles.css';
import { initialProduct } from '@root/client/constants/product';

type ProductCardProps = {
  product: ProductType;
};

const renderPrice = (prices: PricesType = initialProduct['prices']) => {
  if (prices && prices.price_min) {
    const {
      price_min: { amount, currency },
    } = prices;

    return (
      <Typography className="price-text" color="textPrimary">
        {`От ${amount} ${currency}`}
      </Typography>
    );
  }

  return null;
};

const ProductCard: FC<ProductCardProps> = (props) => {
  const {
    product: {
      key,
      full_name: fullName,
      description,
      prices,
      status,
      isSubscribed,
      images: { header = '' },
    },
  } = props;

  const history = useHistory();
  const [isItemSubscribed, setIsItemSubscribed] = useState<boolean>(isSubscribed);
  const [isSubscribing, setIsSubscribing] = useState<boolean>(false);

  const subscribeProduct: ButtonProps['onClick'] = async () => {
    try {
      setIsSubscribing(true);
      await subscribeUserToItem(key);
      setIsItemSubscribed(true);
    } finally {
      setIsSubscribing(false);
    }
  };

  const isStatusOld = status === ProductStatus.OLD;

  const redirectToItemPage: CardActionAreaProps['onClick'] = () => history.push(`/item/${key}`);

  return !isStatusOld ? (
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
        <Button className="subscribe-button" size="large" onClick={subscribeProduct} disabled={isItemSubscribed}>
          {isItemSubscribed ? 'Subscribed' : 'Subscribe'}
          {isSubscribing ? <CircularProgress size={15} /> : ''}
        </Button>
        {renderPrice(prices)}
      </CardActions>
    </Card>
  ) : null;
};

export default ProductCard;
