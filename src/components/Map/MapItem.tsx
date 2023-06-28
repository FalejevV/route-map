"use client"

import { MapContainer, Popup, TileLayer } from 'react-leaflet'
import "leaflet/dist/leaflet.css";
import MapLine from '../MapLine/MapLine';
import { LatLngExpression, LeafletMouseEvent, PolylineOptions } from 'leaflet';
import CustomMarker from '../CustomMarker/CustomMarker';
import MapClickListener from '../MapClickListener/MapClickListener';
import MapLocationListener from '../MapLocationListener/MapCurrentLocation';
import { useMemo, useState } from 'react';
import { RootState, useAppDispatch, useAppSelector } from '@/redux/store';
import { setParsedPath, setPins } from '@/redux/features/mapData';
import { Pin } from '@/interface';
import CustomPopup from '../CustomPopup/CustomPopup';
import { setPinCreationPosition, togglePinCreationWindowToggle } from '@/redux/features/pinCreationData';


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

    function clickListener(e:LeafletMouseEvent){
      if(mapDataSelector.paintMode === "draw"){
        let newArray = [...mapDataSelector.parsedPath, [e.latlng.lat,e.latlng.lng]] as LatLngExpression[][];
        dispatch(setParsedPath(newArray));
      }else{
        let position = [e.latlng.lat,e.latlng.lng] as LatLngExpression;
        dispatch(setPinCreationPosition(position));
        dispatch(togglePinCreationWindowToggle(true));
      }
    }

    function clearPin(index:number){
      let newPinArray = [...mapDataSelector.pins].filter((pin:Pin, i:number) => i !== index)
      setTimeout(() => {
        dispatch(setPins(newPinArray));
      })
    }

    const displayPinsMemo = useMemo(() => {
      return(
        mapDataSelector.pins.map((pin:Pin,index:number) => <CustomMarker key={pin.position[0] + " " + pin.position[1] + " " + pin.title} position={[Number(pin.position[0]),Number(pin.position[1])]}> 
          <CustomPopup pin={pin} onClick={() => clearPin(index)}/>
        </CustomMarker>)
      )
    }, [mapDataSelector.pins]);

    return(
        <div className="w-full h-full">
            <MapContainer zoom={13} center={mapDataSelector.mapCenter} className='pointer'>

                <MapClickListener onClick={clickListener}/>

                {mapDataSelector.userLocation && <CustomMarker acc={mapDataSelector.userLocation.acc} size={[40,40]} icon="user-location.svg" position={[mapDataSelector.userLocation.lat, mapDataSelector.userLocation.lng]} />}
                
                {locationMemo}
                {startPin()}
                {endPin()}
                <TileLayer 
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                

                {displayPinsMemo}
                {mapDataSelector.parsedPath.length > 0 && <MapLine positions={mapDataSelector.parsedPath} options={lineOptions} />}
                
            </MapContainer>
        </div>
    )
}