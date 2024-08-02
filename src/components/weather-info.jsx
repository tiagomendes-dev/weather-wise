/* eslint-disable react/prop-types */
import "leaflet/dist/leaflet.css";

import {
  CloudIcon,
  DropletIcon,
  EyeIcon,
  GaugeIcon,
  MapPin,
  SunriseIcon,
  SunsetIcon,
  WindIcon,
} from "lucide-react";

export default function WeatherInfo({ weather }) {
  return (
    <div className="space-y-4">
      <div className="flex min-h-[238px] flex-col justify-center rounded-xl bg-white px-10 py-4">
        <div className="flex items-center gap-2">
          <MapPin className="size-4 text-zinc-600/90" />
          <p className="text-zinc-600/90">{weather.name}</p>
        </div>
        <span>
          {new Date().toLocaleString("pt-BR", {
            hour: "2-digit",
            minute: "2-digit",
          })}{" "}
          <span className="text-sm font-light">- horário da busca</span>
        </span>
        <div className="flex items-center gap-6">
          <img
            src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
            alt=""
            className="size-24"
          />
          <p className="flex text-4xl font-bold">
            {Math.round(weather.main.temp)}
            <span className="mt-1 text-base text-zinc-600/60">&deg;C</span>
          </p>
          <div className="flex flex-col items-center justify-between">
            <div className="font-semibold leading-none text-zinc-600/60 first-letter:capitalize">
              {weather.weather[0].description}
              <p className="leading-none text-zinc-600/70">
                Sensação térmica de {Math.round(weather.main.feels_like)}&deg;C
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="flex items-center justify-center gap-4 rounded-xl bg-white py-4">
          <DropletIcon />
          <p>Umidade: {weather.main.humidity}%</p>
        </div>
        <div className="flex items-center justify-center gap-4 rounded-xl bg-white py-4">
          <WindIcon />
          <p>Ventos: {Math.round(weather.wind.speed)} km/h</p>
        </div>
        <div className="flex items-center justify-center gap-4 rounded-xl bg-white py-4">
          <GaugeIcon />
          <p>Pressão: {weather.main.pressure} hPa</p>
        </div>
        <div className="flex items-center justify-center gap-4 rounded-xl bg-white py-4">
          <EyeIcon />
          <p>Visibilidade: {weather.visibility / 1000} km</p>
        </div>
        <div className="col-span-2 flex items-center justify-center gap-4 rounded-xl bg-white py-4">
          <CloudIcon />
          <p>Núvens: {weather.clouds.all}%</p>
        </div>
      </div>

      <div className="rounded-xl bg-white px-10 py-4">
        <div className="flex items-center justify-between">
          <div className="flex gap-4">
            <SunriseIcon />
            Nascer do sol:{" "}
            {new Date(weather.sys.sunrise * 1000).toLocaleTimeString()}
          </div>
          <div className="h-10 w-[1px] bg-black/20" />
          <div className="flex gap-4">
            <SunsetIcon />
            Pôr do sol:{" "}
            {new Date(weather.sys.sunset * 1000).toLocaleTimeString()}
          </div>
        </div>
      </div>
    </div>
  );
}
