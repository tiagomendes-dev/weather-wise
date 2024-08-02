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
  if (!weather) {
    return null;
  }

  const { name, weather: weatherInfo, main, wind, clouds, sys } = weather;

  return (
    <div className="space-y-4">
      <div className="flex min-h-[238px] flex-col justify-center rounded-xl bg-white px-10 py-4">
        <div className="flex items-center gap-2">
          <MapPin className="size-4 text-zinc-600/90" />
          <p className="text-zinc-600/90">{name}</p>
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
            src={`http://openweathermap.org/img/wn/${weatherInfo[0]?.icon}.png`}
            alt=""
            className="size-24"
          />
          <p className="flex text-4xl font-bold">
            {Math.round(main?.temp)}
            <span className="mt-1 text-base text-zinc-600/60">&deg;C</span>
          </p>
          <div className="flex flex-col items-center justify-between">
            <div className="font-semibold leading-none text-zinc-600/60 first-letter:capitalize">
              {weatherInfo[0]?.description}
              <p className="leading-none text-zinc-600/70">
                Sensação térmica de {Math.round(main?.feels_like) ?? 0}&deg;C
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="flex items-center justify-center gap-4 rounded-xl bg-white py-4">
          <DropletIcon />
          <p>Umidade: {main?.humidity}%</p>
        </div>
        <div className="flex items-center justify-center gap-4 rounded-xl bg-white py-4">
          <WindIcon />
          <p>Ventos: {Math.round(wind?.speed ?? 0)} km/h</p>
        </div>
        <div className="flex items-center justify-center gap-4 rounded-xl bg-white py-4">
          <GaugeIcon />
          <p>Pressão: {main?.pressure} hPa</p>
        </div>
        <div className="flex items-center justify-center gap-4 rounded-xl bg-white py-4">
          <EyeIcon />
          <p>Visibilidade: {(weather.visibility ?? 0) / 1000} km</p>
        </div>
        <div className="col-span-2 flex items-center justify-center gap-4 rounded-xl bg-white py-4">
          <CloudIcon />
          <p>Núvens: {clouds?.all}%</p>
        </div>
      </div>

      <div className="rounded-xl bg-white px-10 py-4">
        <div className="flex flex-col items-center justify-between sm:flex-row">
          <div className="flex gap-4">
            <SunriseIcon />
            Nascer do sol: {new Date(sys?.sunrise * 1000).toLocaleTimeString()}
          </div>
          <div className="hidden h-10 w-[1px] bg-black/20 lg:block" />
          <div className="my-6 block h-[1px] w-10 bg-black/20 lg:hidden" />
          <div className="flex gap-4">
            <SunsetIcon />
            Pôr do sol: {new Date(sys?.sunset * 1000).toLocaleTimeString()}
          </div>
        </div>
      </div>
    </div>
  );
}
