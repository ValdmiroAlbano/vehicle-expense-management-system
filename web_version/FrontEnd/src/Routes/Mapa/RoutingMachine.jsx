import { useEffect } from 'react'
import L, { marker } from "leaflet"
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css"
import { useMap } from 'react-leaflet';
function RoutingMachine() {
    const map = useMap();
    useEffect(() => {
        const meuEndereco = L.marker([-8.782276946619374, 13.315623721545677]).addTo(map)
        map.on("click", (e) => {
           L.marker([e.latlng.lat, e.latlng.lng]).addTo(map)
           L.Routing.control({
            waypoints: [
              L.latLng([-8.782276946619374, 13.315623721545677]),
              L.latLng([e.latlng.lat, e.latlng.lng])
            ],
            lineOptions:{
                styles:[
                    {
                        color: 'blue',
                        opacity: 0.7,
                        weight: 4
                    },
                ],
            },
            routeWhileDragging: true,
            geocoder: L.Control.Geocoder.nominatim(),
            addWaypoints:false,
            fitSelectedRoutes:true,
            showAlternatives:true,
           })
           .addTo(map)
        })
    },[])

  return null;
}

export default RoutingMachine