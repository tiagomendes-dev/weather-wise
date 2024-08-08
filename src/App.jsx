import axios from "axios";
import { LocateFixedIcon, SearchIcon } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { MapContainer, Marker, TileLayer } from "react-leaflet";

import WeatherInfo from "./components/weather-info";
import WeatherInfoWeekly from "./components/weather-info-weekly";

export default function App() {

  const [location, setLocation] = useState("");
  const [weather, setWeather] = useState(null);
  const [weatherWeekly, setWeatherWeekly] = useState(null);

  const inputRef = useRef();
  const mapRef = useRef(null);

  const key = import.meta.env.VITE_OPENWEATHERMAP_API_KEY;

  const handleGeolocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          // Chame uma API para converter coordenadas em um nome de local (usando a OpenWeatherMap ou outra API de geocodificação)
          const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}&units=metric`,
          );
          const data = await response.json();
          const city = data.name;
          setLocation(city);
        } catch (error) {
          console.error("Erro ao obter o nome da cidade:", error);
        }
      });
    } else {
      alert("Geolocalização não é suportada pelo seu navegador.");
    }
  };

  async function searchCity() {
    const city = inputRef.current.value;

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&lang=pt_br&units=metric`;
    const urlWeekly = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${key}&lang=pt_br&units=metric`;

    const apiDataWeather = await axios.get(url);
    const apiInfoWeekly = await axios.get(urlWeekly);

    setWeather(apiDataWeather.data);
    setWeatherWeekly(apiInfoWeekly.data);
  }

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      searchCity();
    }
  };


  useEffect(() => {
    if (weather && mapRef.current) {
      const { lat, lon } = weather.coord;
      const map = mapRef.current;
      map.setView([lat, lon], 6);
    }
  }, [weather]);

  return (
    <div className="space-y-4">
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
                onKeyDown={handleKeyPress}
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="flex-1 outline-none"
                type="text"
                placeholder="Search location"
              />
              <button
                onClick={handleGeolocation}
                className="rounded-r-lg bg-zinc-400/50 px-2 py-2"
              >
                <LocateFixedIcon className="size-4" />
              </button>
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
              zoom={6}
              ref={mapRef}
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
