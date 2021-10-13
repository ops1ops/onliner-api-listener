import React, { FC, useEffect, useState } from 'react';

import { CircularProgress, Typography } from '@material-ui/core';
import { initialProduct } from '@root/client/components/constants/product';
import { ProductType } from '@root/client/types/product';

import withLoading from '../../decorators/withLoading';
import { getItemByKey } from '../../services/api';
import HistoryChart from '../common/HistoryChart';

import ItemInfo from './ItemInfo/ItemInfo';

type ItemPageProps = {
  match: {
    params: {
      key: string;
    };
  };
};

const ItemPage: FC<ItemPageProps> = ({
  match: {
    params: { key },
  },
}) => {
  const [item, setItem] = useState<ProductType>(initialProduct);
  const [isLoading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const handleItemFetch = withLoading(async () => {
      const { data } = await getItemByKey(key);

      setItem(data);
    }, setLoading);

    handleItemFetch();
  }, []);

  if (isLoading) {
    return <CircularProgress />;
  }

  const { history, name } = item;

  return history ? (
    <>
      <ItemInfo {...item} />
      <HistoryChart history={history} />
    </>
  ) : (
    <Typography color='textPrimary'>
      {`The ${name} is not tracking, subscribe to it to start tracking`}
    </Typography>
  );
};

export default ItemPage;
