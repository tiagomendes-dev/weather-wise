import ViaCepFetcher from "./components/via-cep-fetcher";

export default function App() {
  return (
    <div className="space-y-4">
      <ViaCepFetcher />
      {/* {weather && (
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
      )} */}
    </div>
  );
}
