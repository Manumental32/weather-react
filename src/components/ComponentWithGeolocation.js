/* eslint-disable react/no-array-index-key */
/* eslint-disable no-debugger */
/* eslint-disable no-alert */
import React, { useEffect, useState } from 'react';
import useGeolocation from '../hooks/useLocation';
import getOneCallWeather from '../services/WeatherService';
import { CITIES, CURRENT_LOCATION, DAYS_TO_SHOW } from '../utils/Constants';
import WeatherDetail from './WeatherDetail';
import WeatherDetailCurrent from './WeatherDetailCurrent';

function ComponentWithGeolocation() {
  const geolocation = useGeolocation();
  const [citySelected, setCitySelected] = useState(null);
  const [weather, setWeather] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const searchWeather = (city) => {
    setIsLoading(true);
    setHasError(false);
    getOneCallWeather(city)
      .then((response) => {
        setWeather(response);
      })
      .catch(() => {
        setHasError(true);
      })
      .finally(() => {
        setIsLoading(false);
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
    if (value === String(CURRENT_LOCATION.id)) {
      setCitySelected(geolocation);
    } else {
      const selectedCity = CITIES.find(({ id }) => String(id) === value);
      setCitySelected(selectedCity);
    }
  };

  const getWeatherNextDaysToShow = () => weather?.daily?.slice(0, DAYS_TO_SHOW);

  return !geolocation.error ? (
    <div className="container">
      <div className="row">
        <div className="col">
          <select name="cities" onChange={handleOnChange}>
            <option
              key={CURRENT_LOCATION.id}
              value={CURRENT_LOCATION.id}
              defaultValue
            >
              {CURRENT_LOCATION.description}
            </option>
            {CITIES.map(({ id, description }) => (
              <option key={id} value={id}>
                {description}
              </option>
            ))}
          </select>
        </div>
      </div>
      {isLoading && <div>Cargando...</div>}
      {hasError && (
        <div>
          Ocurrió un error...
          <button type="button" onClick={searchWeather}>
            Reintentar
          </button>
        </div>
      )}
      <div className="row">
        {!isLoading && !hasError && weather && weather?.current && (
          <div className="col-12">
            <WeatherDetailCurrent data={weather?.current} />
          </div>
        )}
        {!isLoading &&
          !hasError &&
          weather &&
          getWeatherNextDaysToShow(weather).map((day, index) => (
            <div className="col-lg col-md-6 col-sm-12" key={index}>
              <WeatherDetail data={day} index={index} />
            </div>
          ))}
      </div>
    </div>
  ) : (
    <p>Error del geolocalizador.</p>
  );
}

export default ComponentWithGeolocation;
