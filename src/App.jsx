import axios from "axios";
import { LocateFixedIcon, MoonIcon, SearchIcon } from "lucide-react";
import { useRef, useState } from "react";
import { MapContainer, Marker, TileLayer } from "react-leaflet";

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
    <div className="space-y-4">
      <header className="rounded-xl bg-white px-10 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-blue-500">WeatherWise</h1>

          <div className="flex items-center gap-4">
            <div className="inline-flex rounded-lg border bg-white">
              <button className="px-4" onClick={searchCity}>
                <SearchIcon className="size-4 text-zinc-600/70" />
              </button>
              <input
                ref={inputRef}
                className="outline-none"
                type="text"
                placeholder="Search location"
              />
              <button className="rounded-r-lg bg-zinc-400/50 px-2 py-2">
                <LocateFixedIcon className="size-4" />
              </button>
            </div>
            <button className="flex items-center gap-2 rounded-lg bg-zinc-900 px-2 py-1 text-white">
              <MoonIcon className="size-4" />
              Dark
            </button>
          </div>
        </div>
      </header>

      {weather && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {weather && <WeatherInfo weather={weather} />}

            {weatherWeekly && (
              <div className="rounded-xl bg-white px-10 py-4">
                <WeatherInfoWeekly weatherWeekly={weatherWeekly} />
              </div>
            )}
          </div>
          <div className="w-full">
            <MapContainer
              style={{
                height: "350px",
                borderRadius: "0.75rem",
                backgroundSize: "cover",
              }}
              center={[weather.coord.lat, weather.coord.lon]}
              zoom={6}
              scrollWheelZoom={false}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={[weather.coord.lat, weather.coord.lon]} />
            </MapContainer>
          </div>
        </div>
      )}
    </div>
  );
}
