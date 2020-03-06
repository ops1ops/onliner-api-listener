import React, { useEffect, useRef } from 'react';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import themeAnimated from '@amcharts/amcharts4/themes/animated';
import PropTypes from 'prop-types';

import './styles.css';

const HistoryChart = ({ history = [] }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    am4core.useTheme(themeAnimated);
    const chart = am4core.create(chartRef.current, am4charts.XYChart);
    chart.data = history.map(({ createdAt, price }) => ({ date: new Date(createdAt), price: price - 0 }));
    const dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.minGridDistance = 50;

    chart.yAxes.push(new am4charts.ValueAxis());

    const series = chart.series.push(new am4charts.LineSeries());
    series.dataFields.valueY = 'price';
    series.dataFields.dateX = 'date';
    series.strokeWidth = 2;
    series.minBulletDistance = 10;
    series.tooltipText = '{valueY}';
    series.tooltip.pointerOrientation = 'vertical';
    series.tooltip.background.cornerRadius = 20;
    series.tooltip.background.fillOpacity = 0.5;
    series.tooltip.label.padding(12, 12, 12, 12);

    chart.scrollbarX = new am4charts.XYChartScrollbar();
    chart.scrollbarX.series.push(series);

    chart.cursor = new am4charts.XYCursor();
    chart.cursor.xAxis = dateAxis;
    chart.cursor.snapToSeries = series;

    return () => chart.dispose();
  }, [history]);

  return <div ref={chartRef} className="chart-container" />;
};

export default HistoryChart;

HistoryChart.defaultProps = {
  history: [],
};

HistoryChart.propTypes = {
  history: PropTypes.arrayOf(PropTypes.shape({
    createdAt: PropTypes.string,
    price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  })),
};
