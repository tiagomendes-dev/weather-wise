/* eslint-disable react/prop-types */
import "leaflet/dist/leaflet.css";

import { MapContainer, Marker, TileLayer } from "react-leaflet";

export default function WeatherInfo({ weather }) {
  return (
    <div className="grid grid-cols-4 gap-4">
      <div className="col-span-1">
        <div>
          <h1 className="text-2xl font-semibold text-white">{weather.name}</h1>
          <img
            src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
            alt=""
            className="size-24"
          />

          <div className="flex items-center justify-between">
            <p className="text-4xl font-bold text-white">
              {Math.round(weather.main.temp)}&deg;C
            </p>
            <p className="w-32 text-right text-xl font-semibold first-letter:capitalize">
              {weather.weather[0].description}
            </p>
          </div>
        </div>
        <div className="my-4 h-[1px] w-full bg-neutral-50/10" />
        <div className="grayscale">
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

      <div className="col-span-3">
        <div className="flex h-full gap-4">
          <div className="h-full w-[1px] bg-neutral-50/10" />
          <div>
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
      </div>
    </div>
  );
}
