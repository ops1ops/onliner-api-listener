import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js';
import PropTypes from 'prop-types';

import { getItemById } from '../../services/api';

const generateChart = (ref, data) => (
  new Chart(ref, {
    type: 'line',
    data: {
      labels: data.history.map(({ createdAt }) => new Date(createdAt).toLocaleDateString()),
      datasets: [{ label: 'History', data: data.history.map(({ price }) => price) }],
    },
  })
);

const ItemPage = ({ match: { params: { id } } }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const handleItemFetch = async () => {
      try {
        const { data } = await getItemById(id);

        if (data.history.length) {
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
      <canvas id="chart" ref={chartRef} />
    </div>
  );
};

ItemPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.number.isRequired,
    }),
  }).isRequired,
};

export default ItemPage;
