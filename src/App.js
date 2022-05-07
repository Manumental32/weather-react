import React from 'react';
import './App.css';
import getWeather from './services/WeatherService';

function App() {
  getWeather();
  return (
    <div className="App">
      <header className="App-header">WEATHER APP</header>
      <section />
    </div>
  );
}

export default App;
