import "../App.css";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

function MyMap() {
  const LaPazLocation = [-16.489689, -68.119293];

  const position = [51.505, -0.09];
  return (
    <MapContainer
      zoom={12}
      center={LaPazLocationg}
      // style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap'
        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
    </MapContainer>
  );
}

export default MyMap;
