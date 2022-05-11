import React from 'react';
import IconWeather from './IconWeather';

export default function DescriptionWeather({ weather }) {
  const { icon, description } = weather;
  return (
    <>
      <IconWeather icon={icon} description={description} />
      <span className="description-weather">{description}</span>
    </>
  );
}
