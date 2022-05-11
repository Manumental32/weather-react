import React from 'react';

export default function IconWeather({ icon, description }) {
  const src = `${process.env.REACT_APP_WEATHER_IMG}${icon}.png`;
  return <img src={src} alt={description} />;
}
