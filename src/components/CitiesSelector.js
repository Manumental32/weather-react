/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { CITIES, CURRENT_LOCATION } from '../utils/Constants';

export default function CitiesSelector({ setCitySelected, geolocation }) {
  const handleOnChange = ({ target }) => {
    const { value } = target;
    let selectedCity = null;
    if (value === String(CURRENT_LOCATION.id)) {
      selectedCity = geolocation;
    } else {
      selectedCity = CITIES.find(({ id }) => String(id) === value);
    }
    setCitySelected(selectedCity);
  };

  return (
    <>
      <label htmlFor="cities" className="label-select">
        Seleccione una ciudad para ver el clima:
      </label>
      <select name="cities" id="cities" onChange={handleOnChange}>
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
    </>
  );
}
