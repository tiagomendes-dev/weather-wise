import axios from "axios";
import { SearchIcon } from "lucide-react";
import { useRef, useState } from "react";
import { MapContainer, Marker, TileLayer } from "react-leaflet";

import WeatherInfo from "./weather-info";
import WeatherInfoWeekly from "./weather-info-weekly";

export default function ViaCepFetcher() {
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
    <div>
      <header className="rounded-xl bg-white px-10 py-4">
        <div className="flex items-center justify-between">
          <h1 className="hidden text-xl font-bold text-blue-500 sm:block">
            WeatherWise
          </h1>

          <div className="flex w-full items-center gap-4 sm:w-auto">
            <div className="inline-flex w-full rounded-lg border sm:w-auto">
              <button className="px-4" onClick={searchCity}>
                <SearchIcon className="size-4 text-zinc-600/70" />
              </button>
              <input
                ref={inputRef}
                className="flex-1 outline-none"
                type="text"
                placeholder="Search location"
              />

              {/* <LocationFetcher onLocationFetched={handleLocationFetched} /> */}
            </div>
          </div>
        </div>
      </header>

      {weather && (
        <div className="space-y-4">
          <div className="grid gap-4 xl:grid-cols-2">
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
              zoom={3}
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
