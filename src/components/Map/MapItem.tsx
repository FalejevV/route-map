"use client"

import { MapContainer, TileLayer, useMapEvents } from 'react-leaflet'
import "leaflet/dist/leaflet.css";
import MapLine from '../MapLine/MapLine';
import { LatLngExpression, LeafletMouseEvent, PolylineOptions } from 'leaflet';
import CustomMarker from '../CustomMarker/CustomMarker';

export default function MapItem(props:{
    linePositions:LatLngExpression[][],
    setLinePositions:Function,
    lineOptions:PolylineOptions
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

      function startPin(){
        if(props.linePositions.length > 0){
            let lat = Number(props.linePositions[0][0]);
            let lng = Number(props.linePositions[0][1]);
            return <CustomMarker type="start" position={[lat,lng]} />
        }
      }

      function endPin(){
        if(props.linePositions.length > 1){
            let firstArray = props.linePositions[props.linePositions.length - 1];
            let lat = Number(firstArray[0]);
            let lng = Number(firstArray[1]);
            return <CustomMarker type="end" position={[lat,lng]} />
        }
      }
    return(
        <div className="w-[1100px] h-[850px] ">
            <MapContainer center={[55.5977264, 26.4236592]} zoom={13}>
                <MapClickListener />
                {startPin()}
                {endPin()}
                <TileLayer 
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {props.linePositions.length > 0 && <MapLine positions={props.linePositions} options={props.lineOptions} />}
                
            </MapContainer>
        </div>
    )
}