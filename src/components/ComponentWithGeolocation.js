/* eslint-disable no-debugger */
import React, { useEffect, useState } from 'react';
import useGeolocation from '../hooks/useLocation';
import getWeather from '../services/WeatherService';
import { cities } from '../utils/Constants';

function ComponentWithGeolocation() {
  const geolocation = useGeolocation();
  const [citySelected, setCitySelected] = useState(null);

  useEffect(() => {
    if (geolocation.latitude) {
      // setCitySelected(geolocation);
      getWeather(geolocation);
    }
  }, [geolocation?.latitude]);

  useEffect(() => {
    if (citySelected) {
      getWeather(citySelected);
    }
  }, [citySelected]);

  const handleOnChange = ({ target }) => {
    const { value } = target;
    if (value === '0') {
      setCitySelected(geolocation);
    } else {
      const selectedCity = cities.find(({ id }) => String(id) === value);
      setCitySelected(selectedCity);
    }
  };

  return !geolocation.error ? (
    <>
      <ul>
        <li>Latitude: {geolocation.latitude}</li>
        <li>Longitude: {geolocation.longitude}</li>
      </ul>
      <select name="cities" onChange={handleOnChange}>
        <option key={0} value={0} defaultValue>
          Ubicación actual
        </option>
        {cities.map(({ id, description }) => (
          <option key={id} value={id}>
            {description}
          </option>
        ))}
      </select>
    </>
  ) : (
    <p>Error geolocation.</p>
  );
}

export default ComponentWithGeolocation;
