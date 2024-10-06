import "../App.css";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  ImageOverlay,
} from "react-leaflet";
import { client } from "../config/supabase";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
// import imgUrl from "././public/idw.jpg";

function MyMap() {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);
  // console.log(data);
  const fetchData = async () => {
    const { data, error } = await client
      .from("estaciones")
      .select("*, datos_interpolacion(*)");
    if (error) {
      console.error("Error fetching data:", error);
    } else {
      console.log("Fetched data:", data); // Para verificar los datos
      setData(data);
    }
  };

  const LaPazLocation = [-16.489689, -68.119293];
  return (
    <MapContainer zoom={12} center={LaPazLocation}>
      {data.map((estacion) => {
        // Asegurarse de que las coordenadas están disponibles
        if (!estacion.latitude || !estacion.longitude) {
          console.warn(
            `Estación con ID ${estacion.id} no tiene coordenadas válidas.`
          );
          return null; // No renderizar el marcador si las coordenadas son inválidas
        }

        return (
          <Marker
            key={estacion.id}
            position={[Number(estacion.latitude), Number(estacion.longitude)]}
          >
            <Popup className="popup-custom">
              <div className="p-4">
                <h3 className="text-lg font-bold text-blue-600">
                  {estacion.name}
                </h3>
                {/* Título más grande y con color destacado */}

                <div className="mt-2">
                  <h4 className="text-md font-semibold text-gray-800">
                    Información General
                  </h4>
                  <p className="text-sm text-gray-600">
                    Última Actualización:{" "}
                    <strong>
                      {new Date(estacion.created_at).toLocaleDateString()}
                    </strong>
                  </p>
                </div>

                <div className="mt-2">
                  <h4 className="text-md font-semibold text-gray-800">
                    Datos de Calidad
                  </h4>
                  <p className="text-sm text-gray-600">
                    Nivel de pH:{" "}
                    <strong>{estacion.datos_interpolacion[0].PH}</strong>
                  </p>
                </div>
              </div>
            </Popup>
          </Marker>
        );
      })}

      <TileLayer
        attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap'
        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {/* <ImageOverlay
        // url="https://raw.githubusercontent.com/Feliicks/data_set_VGT/main/images/idw-.jpg"
        // url={imgUrl}
        url="/idw.jpg"
        bounds={
          //Va en Top Left y Bottom Right  on orden de
          //  [lat, lon]
          [
            [-16.52853197, -68.092855649],
            [-16.541760207, -68.080000265],
          ]
        }
      /> */}
    </MapContainer>
  );
}

export default MyMap;
