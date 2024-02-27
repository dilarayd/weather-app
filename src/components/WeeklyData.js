import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWeeklyData, selectWeeklyData, selectCity } from "../redux/WeatherSlice";

function WeeklyData() {
  const dispatch = useDispatch();
  const weeklyData = useSelector(selectWeeklyData);
  const city = useSelector(selectCity)

  useEffect(() => {
    dispatch(fetchWeeklyData(city));
  }, [dispatch, city]);


  const groupedForecasts = weeklyData.reduce((grouped, forecast) => {
    const date = new Date(forecast.dt * 1000).toLocaleDateString('tr-TR', { weekday: 'long' });

    if (!grouped[date]) {
      grouped[date] = { min: forecast.main.temp, max: forecast.main.temp, icon: forecast.weather[0].icon };
    } else {
      grouped[date].min = Math.min(grouped[date].min, forecast.main.temp);
      grouped[date].max = Math.max(grouped[date].max, forecast.main.temp);
    }

    return grouped;
  }, {});
  return (
    <div className="weekly-container">
      <div>
        <div className="weather-items">
          {Object.entries(groupedForecasts).map(([date, temperatures]) => (
            <div key={date} className="weather-item">
              <p> {date}</p>
              <div>
                <img
                  src={`https://openweathermap.org/img/wn/${temperatures.icon}@2x.png`}
                  alt="Weather Icon"
                />
                <p className="temperature">
                  <span>{parseInt(temperatures.max - 273.15)}° </span>
                  {""}
                  <span className="temperature-min"> {parseInt(temperatures.min - 273.15)}°</span>
                </p>
              </div>

            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default WeeklyData;