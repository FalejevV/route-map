"use client"

import { MapContainer, TileLayer } from 'react-leaflet'
import "leaflet/dist/leaflet.css";
import MapLine from '../MapLine/MapLine';
import { LatLngExpression, LeafletMouseEvent, PolylineOptions } from 'leaflet';
import CustomMarker from '../CustomMarker/CustomMarker';
import MapClickListener from '../MapClickListener/MapClickListener';
import MapLocationListener from '../MapLocationListener/MapCurrentLocation';

export default function MapItem(props:{
    linePositions:LatLngExpression[][],
    setLinePositions:Function,
    lineOptions:PolylineOptions,
    center:LatLngExpression,
    paintMode:string,
    setUserLocation:Function,
    userLocation:{
      lat:number,
      lng:number,
      acc:number
    } | undefined
}){


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
        <div className="w-full h-full">
            <MapContainer zoom={13} center={props.center} className='pointer'>

                <MapClickListener onClick={(e:LeafletMouseEvent) => {
                    props.setLinePositions((prev:LatLngExpression[]) => {
                      let newArray = [...prev, [e.latlng.lat,e.latlng.lng]];
                      return newArray;
                    })
                }}/>

                {props.userLocation && <CustomMarker acc={props.userLocation.acc} size={[40,40]} icon="user-location.svg" position={[props.userLocation.lat, props.userLocation.lng]} />}
                <MapLocationListener setUserLocation={props.setUserLocation}/>

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