import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWeatherData, selectWeatherData, selectCity } from "../redux/WeatherSlice";

function WeatherData() {
  const dispatch = useDispatch();
  const weatherData = useSelector(selectWeatherData);
  const city = useSelector(selectCity);

  useEffect(() => {
    dispatch(fetchWeatherData(city));
  }, [dispatch, city]);

  if (!weatherData) {
    return <div>Loading...</div>;
  }

  return (
    <div className='current'>
      <img
        src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
        alt="Weather Icon"
      />
      <h2> {city}</h2>
      <p>{Math.round(weatherData.main.temp - 273.15)}°C</p>
      <p>{weatherData.weather[0].description}</p>

    </div>
  );
}

export default WeatherData;