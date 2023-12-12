import React, { useState, useEffect } from 'react';

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const fetchWeatherData = async (latitude, longitude) => {
      try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=f5bf95abb0464b637bc44c46c459808d`
        );

        if (!response.ok) {
          throw new Error('Failed to fetch weather data');
        }

        const data = await response.json();
        return data;
      } catch (error) {
        console.error('Error fetching weather data:', error);
        throw error;
      }
    };

    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            fetchWeatherData(latitude, longitude).then((data) => {
              setWeatherData(data);
            });
          },
          (error) => {
            console.error('Error getting location:', error);
            // Handle errors
          }
        );
      } else {
        console.error('Geolocation is not supported by your browser');
        // Handle unsupported browser
      }
    };

    // Ask for location permission and fetch weather data
    getLocation();
  }, []);

  return (
    <div className="weather-container">
      {weatherData ? (
        <div className="weather-box">
          <div className="weather-text">
            <h2>{weatherData.name}, {weatherData.sys.country}</h2>
            <p>Weather:             {weatherData.weather[0].description
              .split(' ')
              .map(word => word.charAt(0).toUpperCase() + word.slice(1))
              .join(' ')}</p>
            <p>Temperature: {weatherData.main.temp} &deg;F</p>
          </div>
          <div className="weather-icon">
            {/* Add styling for the icon, for example, margin or positioning */}
            <img src={`http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`} alt="Weather Icon" />
          </div>
        </div>
      ) : (
        <p>Loading weather data...</p>
      )}
    </div>
  );
};

export default Weather;
