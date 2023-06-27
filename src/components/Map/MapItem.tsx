"use client"

import { MapContainer, TileLayer } from 'react-leaflet'
import "leaflet/dist/leaflet.css";
import MapLine from '../MapLine/MapLine';
import { LatLngExpression, LeafletMouseEvent, PolylineOptions } from 'leaflet';
import CustomMarker from '../CustomMarker/CustomMarker';
import MapClickListener from '../MapClickListener/MapClickListener';
import MapLocationListener from '../MapLocationListener/MapCurrentLocation';
import { useMemo, useState } from 'react';
import { RootState, useAppDispatch, useAppSelector } from '@/redux/store';
import { setParsedPath } from '@/redux/features/mapData';


const lineOptions:PolylineOptions = {
  color:"#00a2ff",
  lineCap:"round",
  lineJoin:"round",
  weight:4,
}


export default function MapItem(){
    const [refreshLocation, setRefreshLocation] = useState(false);
    const dispatch = useAppDispatch();
    const mapDataSelector = useAppSelector((state:RootState) => state.mapData);

    function startPin(){
      if(mapDataSelector.parsedPath.length > 0){
          let lat = Number(mapDataSelector.parsedPath[0][0]);
          let lng = Number(mapDataSelector.parsedPath[0][1]);
          return <CustomMarker type="start" position={[lat,lng]} />
      }
    }

    function endPin(){
      if(mapDataSelector.parsedPath.length > 1){
          let firstArray = mapDataSelector.parsedPath[mapDataSelector.parsedPath.length - 1];
          let lat = Number(firstArray[0]);
          let lng = Number(firstArray[1]);
          return <CustomMarker type="end" position={[lat,lng]} />
      }
    }

    
    const locationMemo = useMemo(() => {
      return(
        <MapLocationListener />
      )
    },[refreshLocation]);


    return(
        <div className="w-full h-full">
            <MapContainer zoom={13} center={mapDataSelector.mapCenter} className='pointer'>

                <MapClickListener onClick={(e:LeafletMouseEvent) => {
                    let newArray = [...mapDataSelector.parsedPath, [e.latlng.lat,e.latlng.lng]] as LatLngExpression[][];
                    dispatch(setParsedPath(newArray));
                }}/>

                {mapDataSelector.userLocation && <CustomMarker acc={mapDataSelector.userLocation.acc} size={[40,40]} icon="user-location.svg" position={[mapDataSelector.userLocation.lat, mapDataSelector.userLocation.lng]} />}
                
                {locationMemo}
                {startPin()}
                {endPin()}
                <TileLayer 
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {mapDataSelector.parsedPath.length > 0 && <MapLine positions={mapDataSelector.parsedPath} options={lineOptions} />}
                
            </MapContainer>
        </div>
    )
}