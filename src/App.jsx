import axios from "axios";
import { useRef, useState } from "react";

import WeatherInfo from "./components/weather-info";
import WeatherInfoWeekly from "./components/weather-info-weekly";

export default function App() {
  const [weather, setWeather] = useState();
  const [weatherWeekly, setWeatherWeekly] = useState();
  const inputRef = useRef();

  async function searchCity() {
    const city = inputRef.current.value;
    const key = "6ae055123713b56d612527525352a746";

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&lang=pt_br&units=metric`;
    const urlWeekly = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${key}&lang=pt_br&units=metric`;

    const apiDataWeather = await axios.get(url);
    const apiInfoWeekly = await axios.get(urlWeekly);

    setWeather(apiDataWeather.data);
    setWeatherWeekly(apiInfoWeekly.data);
  }
  return (
    <div className="m-10 rounded-lg bg-neutral-900 p-4">
      <div className="flex items-center gap-4 p-4">
        <input
          ref={inputRef}
          type="text"
          placeholder="Digite o nome da cidade..."
          className="flex-1 rounded-lg bg-neutral-500 px-3 py-2 text-neutral-100 placeholder:text-neutral-300"
        />
        <button
          onClick={searchCity}
          className="rounded-lg bg-neutral-500 px-3 py-2"
        >
          Buscar
        </button>
      </div>

      <div className="p-4">
        {weather && <WeatherInfo weather={weather} />}
        {/* {weatherWeekly && <WeatherInfoWeekly weatherWeekly={weatherWeekly} />} */}
      </div>
    </div>
  );
}
