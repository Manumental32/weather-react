import React from 'react';
import '../App.css';
import { weekdayReadeable } from '../utils/CommonFunctions';
import DescriptionWeather from './DescriptionWeather';

function WeatherDetailCurrent({ data }) {
  if (!data) return null;
  const title = `Hoy ${weekdayReadeable(-1)}`;
  const { humidity } = data;
  const temperature = parseFloat(data.temp).toFixed(0);
  return (
    <div className="card mt-3">
      <h3 className="card-header size-title">{title}</h3>
      <div className="card-body">
        <h4 className="card-title temperatura text-center title">
          {temperature} C&deg;
        </h4>
        <ul>
          <li className="text-center temp-min-max size-min-max">
            <DescriptionWeather weather={data.weather[0]} />
          </li>
        </ul>
      </div>
      <div className="card-footer text-center text-info humedad size-min-max">
        Humedad: {humidity} %
      </div>
    </div>
  );
}

export default WeatherDetailCurrent;
