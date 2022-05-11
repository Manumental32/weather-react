import React from 'react';
import { CITIES, CURRENT_LOCATION } from '../utils/Constants';

export default function CitiesSelector({ handleOnChange }) {
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
