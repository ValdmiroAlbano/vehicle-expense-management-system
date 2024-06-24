import { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  LayersControl,
  Polyline,
} from "react-leaflet";
import viculoIcon from "../../assets/car/silhouette (2).png";
import empresaIconURl from "../../assets/Atlas.png";
import L, { Icon } from "leaflet";
import "./Mapa.css";

const Mapa = () => {
  const [userList, setUserList] = useState([]);
  const [mapaSelecionado, setMapaSelecionado] = useState("street");
  const empresaLocalizacao = [-8.791911, 13.278157];

  const handleChangeMapa = (event) => {
    setMapaSelecionado(event.target.value);
  };

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:3001");

    socket.onopen = () => {
      console.log("Conexão estabelecida com sucesso");
    };

    socket.onmessage = (event) => {
      const data = event.data;
      if (data instanceof Blob) {
        const reader = new FileReader();
        reader.onload = () => {
          const textData = reader.result;
          try {
            const jsonData = JSON.parse(textData);
            setUserList((prevList) => [...prevList, jsonData]);
          } catch (error) {
            console.error("Erro ao analisar os dados JSON:", error);
          }
        };
        reader.readAsText(data);
      } else {
        console.error("Os dados recebidos não são do tipo Blob.");
      }
    };

    return () => {
      socket.close();
    };
  }, []);

  const empresaIcon = new Icon({
    iconUrl: empresaIconURl,
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });

  const defaultIcon = new Icon({
    iconUrl: viculoIcon,
    iconSize: [50, 40],
    iconAnchor: [15, 30],
  });

  L.Marker.prototype.options.icon = defaultIcon;

  return (
    <div className='main-content'>
      <MapContainer center={empresaLocalizacao} zoom={13}>
        <LayersControl position="topright">
          <LayersControl.BaseLayer
            name="Mapa de Rua"
            checked={mapaSelecionado === "street"}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer
            name="Mapa de Terreno"
            checked={mapaSelecionado === "terrain"}
          >
            <TileLayer url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png" />
          </LayersControl.BaseLayer>
        </LayersControl>

        <Marker position={empresaLocalizacao} icon={empresaIcon}>
          <Popup>AtlasGroup</Popup>
        </Marker>

        {userList.map((user, index) => (
          <Marker
            key={index}
            position={[parseFloat(user.latitude), parseFloat(user.longitude)]}
          >
            <Popup>
              <div>
                <strong>Nome:</strong> {user.nome}
              </div>
              <div>
                <strong>Contato:</strong> {user.contato}
              </div>
            </Popup>
            <Polyline
              positions={[
                empresaLocalizacao,
                [parseFloat(user.latitude), parseFloat(user.longitude)],
              ]}
              color="blue"
            />
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default Mapa;
