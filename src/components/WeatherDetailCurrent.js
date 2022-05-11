import React from 'react';
import '../App.css';
import { weekdayReadeable } from '../utils/CommonFunctions';
import WeatherDetail from './WeatherDetail';

function WeatherDetailCurrent({ data }) {
  if (!data) return null;
  const title = `Hoy ${weekdayReadeable(-1)}`;
  const temperature = parseFloat(data.temp).toFixed(0);
  return (
    <WeatherDetail
      data={data}
      index={-1}
      title={title}
      temperature={temperature}
    />
  );
}

export default WeatherDetailCurrent;
