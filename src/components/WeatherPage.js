/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState } from 'react';
import useGeolocation from '../hooks/useLocation';
import getOneCallWeather from '../services/WeatherService';
import { DAYS_TO_SHOW } from '../utils/Constants';
import CitiesSelector from './CitiesSelector';
import ErrorView from './ErrorView';
import GeolocationError from './GeolocationError';
import LoadingView from './LoadingView';
import WeatherDetail from './WeatherDetail';
import WeatherDetailCurrent from './WeatherDetailCurrent';

function WeatherPage() {
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

  const getWeatherNextDaysToShow = () => weather?.daily?.slice(0, DAYS_TO_SHOW);

  const shouldShowCurrentWeather = () =>
    !isLoading && !hasError && weather && weather?.current;
  const shouldShowNextDaysWeather = () => !isLoading && !hasError && weather;
  const shouldShowGeolocalizationError = () => geolocation.error;

  return shouldShowGeolocalizationError() ? (
    <GeolocationError />
  ) : (
    <main className="container">
      <section className="row">
        <div className="col">
          <CitiesSelector
            setCitySelected={setCitySelected}
            geolocation={geolocation}
          />
        </div>
      </section>
      {isLoading && <LoadingView />}
      {hasError && <ErrorView handlerRetry={searchWeather} />}
      <section className="row">
        {shouldShowCurrentWeather() && (
          <div className="col-12">
            <WeatherDetailCurrent data={weather?.current} />
          </div>
        )}
        {shouldShowNextDaysWeather() &&
          getWeatherNextDaysToShow(weather).map((day, index) => (
            <div className="col-lg col-md-6 col-sm-12" key={index}>
              <WeatherDetail data={day} index={index} />
            </div>
          ))}
      </section>
    </main>
  );
}

export default WeatherPage;
