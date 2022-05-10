import React from 'react';
import './App.css';
import ComponentWithGeolocation from './components/ComponentWithGeolocation';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">WEATHER APP</header>
      <ComponentWithGeolocation />
    </div>
  );
}

export default App;
