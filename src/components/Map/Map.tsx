"use client"

import { MapContainer, Popup, TileLayer } from 'react-leaflet'
import "leaflet/dist/leaflet.css";
import CustomMarker from '../CustomMarker/CustomMarker';

export default async function Map(){
    return(
        <MapContainer center={[51.505, -0.09]} zoom={13} >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <CustomMarker position={[51.505, -0.09]}>
                <Popup>
                    Test popup<br />
                </Popup>
            </CustomMarker>
        </MapContainer>
    )
}