import React, { FC } from 'react';

import { Container, Link, Typography } from '@mui/material';
import { initialPrices } from '@root/client/constants/product';
import { ProductType } from '@root/client/types/product';
import './styles.css';

const ItemInfo: FC<ProductType> = ({
  extended_name = '',
  description = '',
  html_url = '',
  images = { header: '', icon: null },
  prices = initialPrices,
}) => (
  <Container>
    <div className="item-info-header">
      <img src={images.header} alt="item" />
      <div>
        <Typography variant="h4" component="h1" align="left" color="textPrimary">
          <Link href={html_url} rel="noreferrer" target="_blank">
            {extended_name}
          </Link>
        </Typography>
        <Typography gutterBottom variant="h5" component="h2" align="left" color="textPrimary">
          {description}
        </Typography>
        <Typography style={{ fontWeight: 600 }} variant="h6" component="h3" align="left" color="textPrimary">
          {prices.price_min.amount || ''}
        </Typography>
      </div>
    </div>
  </Container>
);

export default ItemInfo;
