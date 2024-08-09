/* eslint-disable react/prop-types */
export default function WeatherInfoWeekly({ weatherWeekly }) {
  let dailyForecast = {};

  for (let forecast of weatherWeekly.list) {
    const date = new Date(forecast.dt * 1000).toLocaleDateString();

    if (!dailyForecast[date]) dailyForecast[date] = forecast;
  }

  const nextWeekForecast = Object.values(dailyForecast).slice(1, 6);

  function convertDate(date) {
    const newDate = new Date(date.dt * 1000).toLocaleDateString("pt-BR", {
      weekday: "long",
      day: "2-digit",
    });

    return newDate;
  }

  return (
    <div className="flex flex-col gap-4">
      {nextWeekForecast.map((forecast) => (
        <div
          key={forecast.dt}
          className="flex items-center justify-between border-b border-black/10 pb-4 pt-2 last:border-none"
        >
          <div className="flex gap-2">
            <img
              src={`http://openweathermap.org/img/wn/${forecast.weather[0].icon}.png`}
              alt=""
            />
            <div>
              <p className="text-xs text-zinc-500 first-letter:capitalize">
                {convertDate(forecast)}
              </p>
              <p className="text-sm font-semibold capitalize">
                {forecast.weather[0].description}
              </p>
            </div>
          </div>
          <p className="text-2xl font-bold lg:text-4xl">
            {Math.round(forecast.main.temp)}&deg;C
          </p>
        </div>
      ))}
    </div>
  );
}
