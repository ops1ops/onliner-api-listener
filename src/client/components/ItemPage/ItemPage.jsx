import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';

import { getItemByKey } from '../../services/api';

const generateChart = (ref, data) => (
  new Chart(ref, {
    type: 'line',
    data: {
      labels: data.history.map(({ createdAt }) => new Date(createdAt).toLocaleDateString()),
      datasets: [{ label: 'History', data: data.history.map(({ price }) => price) }],
    },
  })
);

const ItemPage = ({ match: { params: { key } } }) => {
  const chartRef = useRef(null);
  const [item, setItem] = useState({});

  useEffect(() => {
    const handleItemFetch = async () => {
      try {
        const { data } = await getItemByKey(key);
        setItem(data);

        if (data.history && data.history.length) {
          const myChartRef = chartRef.current.getContext('2d');
          generateChart(myChartRef, data);
        }
      } catch (error) {
        // TODO: handle error
      }
    };

    handleItemFetch();
  }, []);

  return (
    <div>
      <Typography variant="h5" color="textPrimary" component="h1">
        {item.history && item.history.length === 0 && `The ${item.name} is tracking, but its price has not been updated.`}
        {!item.history && `The ${item.name} is not tracking, subscribe to it to start tracking`}
      </Typography>
      <canvas id="chart" ref={chartRef} />
      {/* <HistoryChart history={item.history} /> */}
    </div>
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
