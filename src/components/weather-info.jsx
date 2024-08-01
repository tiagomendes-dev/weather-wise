/* eslint-disable react/prop-types */

export default function WeatherInfo({ weather }) {
  if (!weather) {
    console.error("Weather prop is missing or null");
    return null;
  }

  if (!weather.name) {
    console.error("Weather name is missing");
    return null;
  }

  if (!weather.main || !weather.main.temp) {
    console.error("Weather temperature is missing");
    return null;
  }

  return (
    <div className="">
      {weather.name}
      <img
        src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
        alt=""
      />
      <p>{Math.round(weather.main.temp)} &deg;C</p>
    </div>
  );
}
