/* eslint-disable react/no-array-index-key */
/* eslint-disable no-debugger */
/* eslint-disable no-alert */
import React, { useEffect, useState } from 'react';
import useGeolocation from '../hooks/useLocation';
import getOneCallWeather from '../services/WeatherService';
import { cities, currentLocation } from '../utils/Constants';
import WeatherDetail from './WeatherDetail';

function ComponentWithGeolocation() {
  const geolocation = useGeolocation();
  const [citySelected, setCitySelected] = useState(null);
  const [weather, setWeather] = useState(null);

  const searchWeather = (city) => {
    getOneCallWeather(city)
      .then((response) => {
        setWeather(response);
      })
      .catch((error) => {
        alert(error);
      });
  };

  useEffect(() => {
    if (geolocation?.latitude) {
      searchWeather(geolocation);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [geolocation?.latitude]);

  useEffect(() => {
    if (citySelected) {
      searchWeather(citySelected);
    }
  }, [citySelected]);

  const handleOnChange = ({ target }) => {
    const { value } = target;
    if (value === String(currentLocation.id)) {
      setCitySelected(geolocation);
    } else {
      const selectedCity = cities.find(({ id }) => String(id) === value);
      setCitySelected(selectedCity);
    }
  };

  return !geolocation.error ? (
    <>
      <div className="container">
        <div className="row">
          <div className="col">
            <select name="cities" onChange={handleOnChange}>
              <option
                key={currentLocation.id}
                value={currentLocation.id}
                defaultValue
              >
                {currentLocation.description}
              </option>
              {cities.map(({ id, description }) => (
                <option key={id} value={id}>
                  {description}
                </option>
              ))}
            </select>
          </div>
          <div className="row">
            {citySelected &&
              weather &&
              weather?.daily?.slice(0, 5).map((day, index) => (
                <div className="col" key={index}>
                  <WeatherDetail data={day} />
                </div>
              ))}
          </div>
        </div>
      </div>
      {/* <section>{weather && JSON.stringify(weather)}</section> */}
    </>
  ) : (
    <p>Error del geolocalizador.</p>
  );
}

export default ComponentWithGeolocation;
