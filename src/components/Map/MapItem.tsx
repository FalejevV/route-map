"use client"

import { MapContainer, TileLayer } from 'react-leaflet'
import "leaflet/dist/leaflet.css";
import MapLine from '../MapLine/MapLine';
import { LatLngExpression } from 'leaflet';
export default function MapItem(props:{
    linePositions:LatLngExpression[][],
    lineOptions:{
        color:string,
    }
}){
    return(
        <div className="w-[1100px] h-[850px] ">
            <MapContainer center={[55.5977264, 26.4236592]} zoom={13} >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {props.linePositions.length > 0 && <MapLine positions={props.linePositions} options={props.lineOptions} />}
                
            </MapContainer>
        </div>
    )
}