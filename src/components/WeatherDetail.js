import React from 'react';
import '../App.css';

function dataDetail({ data }) {
  if (!data) return null;
  const { description } = data.weather;
  const { humidity } = data;
  const title = 'Lunes';
  const temperatureMin = parseFloat(data.temp.min).toFixed(0);
  const temperatureMax = parseFloat(data.temp.max).toFixed(0);
  return (
    <div className="card mt-3">
      <h3 className="card-header size-title">{title}</h3>
      <div className="card-body">
        <h4 className="card-title temperatura text-center tempe">
          {description}
        </h4>
        <ul>
          <li className="text-center temp-min-max size-min-max">
            La mínima: {temperatureMin} C&deg;{' '}
          </li>
          <li className="text-center temp-min-max size-min-max">
            La máxima: {temperatureMax} C&deg;
          </li>
        </ul>
        <div className="card-footer text-center text-info humedad size-min-max">
          Humedad: {humidity} %
        </div>
      </div>
    </div>
  );
}

export default dataDetail;
