import styles from './Map.module.css'
import {MapContainer, Marker, Popup, TileLayer, useMap, useMapEvents} from "react-leaflet";
import {useEffect, useState} from "react";
import {useCities} from "../contexts/CitiesContext.jsx";
import {useNavigate} from "react-router-dom";
import {useGeolocation} from "../hooks/useGeolocation.js";
import Button from "./Button.jsx";
import useURLPosition from "../hooks/useURLPosition.js";

export default function Map(){
    const {cities} = useCities();
    const {position: geolocationPosition, isLoading: isLoadingPosition, getPosition} = useGeolocation();
  
    const [mapPosition, setMapPosition] = useState([40,0]);
    const [mapLat, mapLng] = useURLPosition()

    useEffect(() => {
        if(mapLng && mapLat) setMapPosition([mapLat, mapLng]);
    }, [mapLat, mapLng]);

    useEffect(() => {
        if(geolocationPosition) setMapPosition(geolocationPosition);
    }, [geolocationPosition]);
    
    return <div className={styles.mapContainer}>
        {!geolocationPosition && <Button type="position" onClick={() => getPosition()}>
            {isLoadingPosition ? 'Loading...' : 'Use your Position'}
        </Button>}
        <MapContainer center={mapPosition} zoom={6} scrollWheelZoom={true} className={styles.map}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/fr/hot/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {cities.map(city  => <Marker position={[city.position.lat, city.position.lng]} key={city.id}>
                <Popup>
                   <span>{city.emoji}</span> <span>{city.cityName}</span>
                </Popup>
            </Marker>)}
            <ChangeCenter position={mapPosition} /> 
            <DetectClick />
        </MapContainer>
    </div>
}

function ChangeCenter({position}) {
    const map = useMap();
    map.setView(position);
    return null
}

function DetectClick(){
    const navigate = useNavigate();
    useMapEvents({
        click: (e) => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`)})
}
