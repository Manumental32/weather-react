const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
const apiUrl = process.env.REACT_APP_WEATHER_API_URL;

export const getWeather = ({
  latitude,
  longitude,
  units = 'metric',
  part = 'hourly,minutely,alerts',
  lang = 'es',
  url = `${apiUrl}onecall?appid=${apiKey}&lat=${latitude}&lon=${longitude}&units=${units}&exclude=${part}&lang=${lang}`
}) =>
  fetch(url)
    .then((response) => response.json())
    .then((data) => data);

export default getWeather;
