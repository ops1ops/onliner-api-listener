/* eslint-disable */
import React, { useEffect, useRef } from 'react';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import themeAnimated from '@amcharts/amcharts4/themes/animated';
import { Typography } from '@material-ui/core';
import PropTypes from 'prop-types';

import './styles.css';

const getScalableTimelineChart = (chartRef) => {
  const scalableTimelineChart = am4core.create(chartRef.current, am4charts.XYChart);
  const dateAxis = scalableTimelineChart.xAxes.push(new am4charts.DateAxis());
  dateAxis.renderer.minGridDistance = 50;
  scalableTimelineChart.yAxes.push(new am4charts.ValueAxis());
  const series = scalableTimelineChart.series.push(new am4charts.LineSeries());
  series.dataFields.valueY = 'price';
  series.dataFields.dateX = 'date';
  series.strokeWidth = 2;
  series.minBulletDistance = 10;
  series.tooltipText = '{valueY}';
  series.tooltip.pointerOrientation = 'vertical';
  series.tooltip.background.cornerRadius = 20;
  series.tooltip.background.fillOpacity = 0.5;
  series.tooltip.label.padding(12, 12, 12, 12);

  scalableTimelineChart.scrollbarX = new am4charts.XYChartScrollbar();
  scalableTimelineChart.scrollbarX.series.push(series);

  scalableTimelineChart.cursor = new am4charts.XYCursor();
  scalableTimelineChart.cursor.xAxis = dateAxis;
  scalableTimelineChart.cursor.snapToSeries = series;

  return scalableTimelineChart;
};

const HistoryChart = ({ history = [] }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (history.length === 0) {
      return;
    }

    am4core.useTheme(themeAnimated);
    const chart = getScalableTimelineChart(chartRef);
    chart.data = history.map(({ createdAt, price }) => ({ date: new Date(createdAt), price: Number(price) }));

    return () => chart.dispose();
  }, [history]);

  return (
    <>
      {
        history.length === 0 && (
          <Typography color="textPrimary">
            Item is being tracked, but its price has never been changed.
          </Typography>
        )
      }
      <div ref={chartRef} className="chart-container" />
    </>
  );
};

HistoryChart.defaultProps = {
  history: [],
};

HistoryChart.propTypes = {
  history: PropTypes.arrayOf(PropTypes.shape({
    createdAt: PropTypes.string,
    price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  })),
};

export default HistoryChart;
