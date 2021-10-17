import React, { FC, useEffect, useState } from 'react';

import { CircularProgress, Typography } from '@mui/material';
import ItemInfo from '@root/client/components/ItemPage/ItemInfo/ItemInfo';
import HistoryChart from '@root/client/components/common/HistoryChart';
import { initialProduct } from '@root/client/constants/product';
import withLoading from '@root/client/decorators/withLoading';
import { getItemByKey } from '@root/client/services/api';
import { ProductType } from '@root/client/types/product';

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
    <Typography color="textPrimary">{`The ${name} is not tracking, subscribe to it to start tracking`}</Typography>
  );
};

export default ItemPage;
