/* eslint-disable camelcase */
import React from 'react';
import { Container, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import './styles.css';

const ItemInfo = ({ extended_name, description, html_url, images, prices }) => (
  <Container>
    <div className="item-info-header">
      <img src={images.header} alt="item" />
      <div>
        <Typography variant="h4" component="h1" align="left" color="textPrimary">
          <a href={html_url} rel="noreferrer" target="_blank">{extended_name}</a>
        </Typography>
        <Typography gutterBottom variant="h5" component="h2" align="left" color="textPrimary">
          {description}
        </Typography>
        <Typography style={{ fontWeight: 600 }} variant="h6" component="h3" align="left" color="textPrimary">
          {prices.price_min.amount}
        </Typography>
      </div>
    </div>
  </Container>
);

ItemInfo.defaultProps = {
  extended_name: '',
  html_url: '',
  description: '',
  images: { header: '' },
  prices: { price_min: { amount: '' } },
};

ItemInfo.propTypes = {
  extended_name: PropTypes.string,
  html_url: PropTypes.string,
  description: PropTypes.string,
  images: PropTypes.shape({ header: PropTypes.string }),
  prices: PropTypes.shape({ price_min: PropTypes.shape({ amount: PropTypes.string }) }),
};

export default ItemInfo;
