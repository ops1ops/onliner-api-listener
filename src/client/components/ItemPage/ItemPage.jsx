import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { CircularProgress, Typography } from '@material-ui/core';

import HistoryChart from '../common/HistoryChart';
import { getItemByKey } from '../../services/api';
import ItemInfo from './ItemInfo/ItemInfo';
import withLoading from '../../decorators/withLoading';

const ItemPage = ({ match: { params: { key } } }) => {
  const [item, setItem] = useState();
  const [isLoading, setLoading] = useState(false);

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

  const { history, name } = item || {};

  return (
    <>
      <ItemInfo {...item} />
      {!history && (
        <Typography align="center" color="textPrimary">
          {`The ${name} is not tracking, subscribe to it to start tracking`}
        </Typography>
      )}
      {history?.length === 0 && (
        <Typography align="center" color="textPrimary">
          Item is being tracked, but its price has never been changed.
        </Typography>
      )}
      {history?.length && <HistoryChart history={history} />}
    </>
  );
};

ItemPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      key: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default ItemPage;
