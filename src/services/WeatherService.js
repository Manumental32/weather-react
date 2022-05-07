const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
const apiUrl = process.env.REACT_APP_WEATHER_API_URL;

export const getWeather = (inputVal = 'Pilar, Buenos Aires, Argentina') => {
  const url = `${apiUrl}?q=${inputVal}&appid=${apiKey}&units=metric`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log('data', data);
      return data;
    })
    .catch((error) => {
      console.error(error);
    });
};

export default getWeather;
