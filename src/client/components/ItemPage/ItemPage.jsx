import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';

import HistoryChart from '../common/HistoryChart';
import { getItemByKey } from '../../services/api';

const ItemPage = ({ match: { params: { key } } }) => {
  const [{ history, name }, setItem] = useState({ history: [] });

  useEffect(() => {
    const handleItemFetch = async () => {
      try {
        const { data } = await getItemByKey(key);

        setItem(data);
      } catch (error) {
        console.error(error);
      }
    };

    handleItemFetch();
  }, []);

  return history ? (
    <div>
      <Typography color="textPrimary">
        {history.length === 0 && `The ${name} is tracking, but its price has not been updated.`}
      </Typography>
      <HistoryChart history={history} />
    </div>
  ) : (
    <Typography color="textPrimary">
      {`The ${name} is not tracking, subscribe to it to start tracking`}
    </Typography>
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
