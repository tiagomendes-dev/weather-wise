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

      <div>
        <p>{weather.weather[0].description}</p>
        <div>
          <p>Humidity: {weather.main.humidity}%</p>
          <p>Wind: {Math.round(weather.wind.speed)} km/h</p>
          <p>Pressure: {weather.main.pressure} hPa</p>
          <p>Visibility: {weather.visibility / 1000} km</p>
          <p>Clouds: {weather.clouds.all}%</p>

          <p>
            Coordinates: {weather.coord.lat}, {weather.coord.lon}
          </p>

          <p>Timezone: {weather.timezone}</p>

          <p>Time: {new Date().toLocaleString()}</p>

          <p>Weather ID: {weather.weather[0].id}</p>

          <p>Weather icon: {weather.weather[0].icon}</p>

          <p>Weather main: {weather.weather[0].main}</p>
        </div>
      </div>
    </div>
  );
}
