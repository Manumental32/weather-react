import React from 'react';
import useGeolocation from '../hooks/useLocation';
import { CITIES, CURRENT_LOCATION } from '../utils/Constants';

export default function CitiesSelector({ setCitySelected }) {
  const geolocation = useGeolocation();

  const handleOnChange = ({ target }) => {
    const { value } = target;
    if (value === String(CURRENT_LOCATION.id)) {
      setCitySelected(geolocation);
    } else {
      const selectedCity = CITIES.find(({ id }) => String(id) === value);
      setCitySelected(selectedCity);
    }
  };

  return (
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
  );
}
