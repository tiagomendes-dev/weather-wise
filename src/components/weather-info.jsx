/* eslint-disable react/prop-types */
import "leaflet/dist/leaflet.css";

import {
  ClockIcon,
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

  const formatTime = (unixTimestamp, timezoneOffset) => {
    const date = new Date(unixTimestamp * 1000);
    const localDate = new Date(
      date.toLocaleString("en-US", { timeZone: "UTC" }),
    );
    localDate.setSeconds(localDate.getSeconds() + timezoneOffset);
    return localDate.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getLocalTime = (timezone) => {
    const date = new Date();
    const utcOffset = date.getTimezoneOffset() * 60; // Em segundos
    const localTime = date.getTime() / 1000 + utcOffset + timezone;
    return new Date(localTime * 1000).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const { name, weather: weatherInfo, main, wind, clouds } = weather;

  return (
    <div className="space-y-4">
      <div className="flex min-h-[238px] flex-col justify-center rounded-xl bg-white px-10 py-4">
        <div className="flex items-center gap-2 sm:gap-4">
          <div className="flex items-center gap-1">
            <MapPin className="size-4 text-zinc-600/90" />
            <p className="text-xs text-zinc-600/90">{name}</p>
          </div>
          <div className="flex items-center gap-1">
            <ClockIcon className="size-4 text-zinc-600/90" />
            <p className="text-xs text-zinc-600/90">
              Hora local: {getLocalTime(weather.timezone)}
            </p>
          </div>
        </div>
        <div className="mt-10 flex flex-col items-center justify-center gap-6 sm:flex-row">
          <img
            src={`http://openweathermap.org/img/wn/${weatherInfo[0]?.icon}.png`}
            alt=""
            className="size-24"
          />
          <p className="flex text-4xl font-bold">
            {Math.round(main?.temp)}
            <span className="mt-1 text-base text-zinc-600/60">&deg;C</span>
          </p>
          <div className="flex flex-col items-center text-center sm:text-left">
            <div className="font-semibold leading-none text-zinc-600/60 first-letter:capitalize">
              {weatherInfo[0]?.description}
              <p className="leading-none text-zinc-600/70">
                Sensação térmica de {Math.round(main?.feels_like) ?? 0}&deg;C
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-4 text-xs sm:text-base lg:grid-cols-3">
        <div className="flex items-center justify-center gap-2 rounded-xl bg-white py-4 sm:gap-4">
          <DropletIcon className="size-4" />
          <p>Umidade: {main?.humidity}%</p>
        </div>
        <div className="flex items-center justify-center gap-2 rounded-xl bg-white py-4 sm:gap-4">
          <WindIcon className="size-4" />
          <p>Ventos: {Math.round(wind?.speed ?? 0)} km/h</p>
        </div>
        <div className="flex items-center justify-center gap-2 rounded-xl bg-white py-4 sm:gap-4">
          <GaugeIcon className="size-4" />
          <p>Pressão: {main?.pressure} hPa</p>
        </div>
        <div className="flex items-center justify-center gap-2 rounded-xl bg-white py-4 sm:gap-4">
          <EyeIcon className="size-4" />
          <p>Visibilidade: {(weather.visibility ?? 0) / 1000} km</p>
        </div>
        <div className="col-span-2 flex items-center justify-center gap-2 rounded-xl bg-white py-4 sm:gap-4">
          <CloudIcon className="size-4" />
          <p>Núvens: {clouds?.all}%</p>
        </div>
      </div>

      <div className="rounded-xl bg-white px-10 py-4">
        <div className="flex flex-col items-center justify-between sm:flex-row">
          <div className="flex items-center gap-4">
            <SunriseIcon className="size-5" />
            Nascer do sol: {formatTime(weather.sys.sunrise, weather.timezone)}
          </div>
          <div className="hidden h-10 w-[1px] bg-black/20 lg:block" />
          <div className="my-6 block h-[1px] w-10 bg-black/20 lg:hidden" />
          <div className="flex items-center gap-4">
            <SunsetIcon className="size-5" />
            Pôr do sol: {formatTime(weather.sys.sunset, weather.timezone)}
          </div>
        </div>
      </div>
    </div>
  );
}
