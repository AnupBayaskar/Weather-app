import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Weather = () => {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState('New York'); 
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await axios.get("https://freetestapi.com/api/v1/weathers");
        const data = response.data;
        const cityWeather = data.find(item => item.city.toLowerCase() === city.toLowerCase());
        if (cityWeather) {
          setWeather(cityWeather);
          setError(null);
        } else {
          setWeather(null);
          setError('City not found');
        }
      } catch (error) {
        console.error('Error fetching the weather data:', error);
        setError('Error fetching the weather data');
      }
    };

    fetchWeather();
  }, [city]);

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  return (
    <div>
      <h1>Weather App</h1>
      <input
        type="text"
        value={city}
        onChange={handleCityChange}
        placeholder="Enter city"
      />
      {error && <p>{error}</p>}
      {weather ? (
        <div>
          <h2>{weather.city}</h2>
          <p>Temperature: {weather.temperature}°C</p>
          <p>Weather: {weather.weather}</p>
          <p>Humidity: {weather.humidity}%</p>
          <p>Wind Speed: {weather.windSpeed} m/s</p>
        </div>
      ) : (
        !error && <p>Loading weather data...</p>
      )}
    </div>
  );
};

export default Weather;
