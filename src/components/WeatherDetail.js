import React from 'react';
import '../App.css';
import { formatTemp, weekdayReadeable } from '../utils/CommonFunctions';
import DescriptionWeather from './DescriptionWeather';

function WeatherDetail({
  data,
  index,
  title = weekdayReadeable(index),
  temperature = ''
}) {
  if (!data) return null;
  const { humidity } = data;
  const temperatureMin = formatTemp(data.temp.min);
  const temperatureMax = formatTemp(data.temp.max);
  return (
    <div className="card mt-3">
      <h3 className="card-header size-title">{title}</h3>
      <div className="card-body">
        {temperature && (
          <h4 className="card-title temperatura text-center title">
            {temperature} C&deg;
          </h4>
        )}
        <ul>
          <li className="text-center temp-min-max size-min-max">
            <DescriptionWeather weather={data.weather[0]} />
          </li>
          {temperatureMin && (
            <li className="text-center temp-min-max size-min-max">
              La mínima: {temperatureMin} C&deg;
            </li>
          )}
          {temperatureMax && (
            <li className="text-center temp-min-max size-min-max">
              La máxima: {temperatureMax} C&deg;
            </li>
          )}
        </ul>
        <div className="card-footer text-center text-info humedad size-min-max">
          Humedad: {humidity} %
        </div>
      </div>
    </div>
  );
}

export default WeatherDetail;
