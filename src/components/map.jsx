import "leaflet/dist/leaflet.css";

import { MapContainer, TileLayer } from "react-leaflet";

export default function Map() {
  return (
    <div className="w-full">
      <MapContainer
        style={{
          height: "60vh",
          width: "fit-contain",
          borderRadius: "0.75rem",
          backgroundSize: "cover",
        }}
        center={[51.505, -0.09]}
        zoom={6}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>
    </div>
  );
}
