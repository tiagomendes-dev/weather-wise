/* eslint-disable react/prop-types */
export default function WeatherInfoWeekly({ weatherWeekly }) {
  let dailyForecast = {};

  for (let forecast of weatherWeekly.list) {
    const date = new Date(forecast.dt * 1000).toLocaleDateString();

    if (!dailyForecast[date]) dailyForecast[date] = forecast;
  }

  const nextWeekForecast = Object.values(dailyForecast).slice(0, 5);

  function convertDate(date) {
    const newDate = new Date(date.dt * 1000).toLocaleDateString("pt-BR", {
      weekday: "long",
      day: "2-digit",
    });

    return newDate;
  }

  return (
    <div>
      {nextWeekForecast.map((forecast) => (
        <div key={forecast.dt} className="inline-flex bg-green-100">
          <p>{convertDate(forecast)}</p>
          <img
            src={`http://openweathermap.org/img/wn/${forecast.weather[0].icon}.png`}
            alt=""
          />
          <p>{Math.round(forecast.main.temp_min)}&deg;C min</p>
          <p>{Math.round(forecast.main.temp_max)}&deg;C max</p>

          <p>{forecast.weather[0].description}</p>

          <p>Humidity: {forecast.main.humidity}%</p>

          <p>Wind: {Math.round(forecast.wind.speed)} km/h</p>

          <p>Pressure: {forecast.main.pressure} hPa</p>

          <p>Clouds: {forecast.clouds.all}%</p>

          <p>Visibility: {forecast.visibility} m</p>

          <p>
            Sunrise:{" "}
            {new Date(forecast.sys.sunrise * 1000).toLocaleTimeString()}
          </p>

          <p>
            Sunset: {new Date(forecast.sys.sunset * 1000).toLocaleTimeString()}
          </p>
        </div>
      ))}
    </div>
  );
}
