"use client"

import { MapContainer, TileLayer, useMapEvents } from 'react-leaflet'
import "leaflet/dist/leaflet.css";
import MapLine from '../MapLine/MapLine';
import { LatLngExpression, LeafletMouseEvent } from 'leaflet';

export default function MapItem(props:{
    linePositions:LatLngExpression[][],
    setLinePositions:Function,
    lineOptions:{
        color:string,
    }
}){

    function MapClickListener(){
        const map = useMapEvents({
          click: (e:LeafletMouseEvent) => {
            props.setLinePositions((prev:LatLngExpression[]) => {
                let newArray = [...prev, [e.latlng.lat,e.latlng.lng]];
                return newArray;
            })
          },
        })
        return null
      }

    return(
        <div className="w-[1100px] h-[850px] ">
            <MapContainer center={[55.5977264, 26.4236592]} zoom={13}>
                <MapClickListener />
                <TileLayer 
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {props.linePositions.length > 0 && <MapLine positions={props.linePositions} options={props.lineOptions} />}
                
            </MapContainer>
        </div>
    )
}