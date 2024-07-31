import { useRef } from "react";

export default function App() {
  const inputRef = useRef<HTMLInputElement | null>(null);

  function searchCity() {
    const inputElement = inputRef.current;

    const city = inputElement.value;
    const key = process.env.OPEN_WEATHER_MAP_API_KEY;

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`;
  }

  return (
    <>
      <input
        ref={inputRef}
        type="text"
        placeholder="Digite o nome da cidade..."
      />
      <button onClick={searchCity}>Buscar</button>{" "}
    </>
  );
}
