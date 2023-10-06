import React, { useState } from 'react';
import {
  Button,
  CircularProgress,
  Typography,
  Paper,
} from '@material-ui/core';
import { PropTypes } from 'prop-types';

import withLoading from '../../../decorators/withLoading';
import { subscribeUserToItem } from '../../../services/api';
import './styles.css';
import ItemLink from '../ItemLink';

const HorizontalItemCard = (props) => {
  const {
    item: {
      key,
      full_name: fullName,
      description,
      prices,
      status,
      isSubscribed: initialIsSubscribed,
      images: { header },
    },
  } = props;

  const { amount, currency } = prices?.price_min || {};

  const [isSubscribed, setSubscribed] = useState(initialIsSubscribed);
  const [isLoading, setLoading] = useState(false);

  const subscribeProduct = withLoading(async () => {
    await subscribeUserToItem(key);

    setSubscribed(true);
  }, setLoading);

  return status !== 'old' && (
    <Paper className="horizontal-item-container">
      <img src={header} alt="" />
      <div className="horizontal-item-column">
        <ItemLink path={key} name={fullName} />
        <Typography variant="body2" color="textSecondary" component="p">
          {description}
        </Typography>
      </div>
      <Typography variant="subtitle2">
        {`${amount} ${currency}`}
      </Typography>
      <Button className="subscribe-button" size="large" onClick={subscribeProduct} disabled={isSubscribed}>
        {isSubscribed ? 'Subscribed' : 'Subscribe'}
        {isLoading && <CircularProgress size={15} />}
      </Button>
    </Paper>
  );
};

HorizontalItemCard.defaultProps = {
  item: PropTypes.shape({
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

HorizontalItemCard.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    key: PropTypes.string.isRequired,
    full_name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    isSubscribed: PropTypes.bool.isRequired,
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

export default HorizontalItemCard;
