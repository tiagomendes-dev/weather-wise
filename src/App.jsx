import axios from "axios";
import { useRef, useState } from "react";

import WeatherInfo from "./components/weather-info";

export default function App() {
  const [weather, setWeather] = useState({});
  const inputRef = useRef();

  async function searchCity() {
    const city = inputRef.current.value;
    const key = "6ae055123713b56d612527525352a746";

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&lang=pt_br&units=metric`;

    const apiDataWeather = await axios.get(url);
    setWeather(apiDataWeather.data);
  }
  return (
    <>
      <div>
        <input
          ref={inputRef}
          type="text"
          placeholder="Digite o nome da cidade..."
        />
        <button onClick={searchCity}>Buscar</button>

        <WeatherInfo weather={weather} />
      </div>
    </>
  );
}
