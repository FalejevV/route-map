"use client"

import { MapContainer, TileLayer } from 'react-leaflet'
import "leaflet/dist/leaflet.css";
import MapLine from '../MapLine/MapLine';
import { LatLngExpression, LatLngTuple, LeafletMouseEvent, PolylineOptions } from 'leaflet';
import CustomMarker from '../CustomMarker/CustomMarker';
import MapClickListener from '../MapClickListener/MapClickListener';
import MapLocationListener from '../MapLocationListener/MapCurrentLocation';
import { useMemo, useState } from 'react';
import { RootState, useAppDispatch, useAppSelector } from '@/redux/store';
import { setParsedPath } from '@/redux/features/mapData';
import { Pin } from '@/interface';
import CustomPopup from '../CustomPopup/CustomPopup';
import { setPinCreationValue, togglePinCreationWindowToggle } from '@/redux/features/pinCreationData';


const lineOptions:PolylineOptions = {
  color:"#00a2ff",
  lineCap:"round",
  lineJoin:"round",
  weight:4,
}


export default function MapItem(props:{
  interactive: boolean
}){
    const [refreshLocation, setRefreshLocation] = useState(false);
    const dispatch = useAppDispatch();
    const mapDataSelector = useAppSelector((state:RootState) => state.mapData);
    const pinCreationDataSelector = useAppSelector((state:RootState) => state.pinCreationData);
    
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
      if(!props.interactive) return;
      
      if(mapDataSelector.paintMode === "draw"){
        let newArray = [...mapDataSelector.parsedPath, [e.latlng.lat,e.latlng.lng]] as LatLngExpression[][];
        dispatch(setParsedPath(newArray));
      }else{
        let position = [e.latlng.lat,e.latlng.lng] as LatLngTuple;
        dispatch(setPinCreationValue({
          pin:{
            ...pinCreationDataSelector.pin,
            position: position,
          }
        }));
        dispatch(togglePinCreationWindowToggle(true));
      }
    }


    const displayPinsMemo = useMemo(() => {
      return(
        mapDataSelector.pins.map((pin:Pin,index:number) => <CustomMarker key={pin.key} position={[Number(pin.position[0]),Number(pin.position[1])]}> 
          <CustomPopup index={index} pin={pin}/>
        </CustomMarker>)
      )
    }, [mapDataSelector.pins]);

    return(
        <div className="w-full h-full">
            <MapContainer zoom={14} center={mapDataSelector.mapCenter} className='pointer'>

                <MapClickListener onClick={clickListener}/>

                {mapDataSelector.userLocation && <CustomMarker acc={mapDataSelector.userLocation.acc} size={[40,40]} icon="user-location.svg" position={[mapDataSelector.userLocation.lat, mapDataSelector.userLocation.lng]} />}
                {mapDataSelector.toggleUserLocation && locationMemo}

                {startPin()}
                {endPin()}
                
                {mapDataSelector.mapTheme === 1 && <TileLayer 
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />}
                
                {mapDataSelector.mapTheme === 2 &&<TileLayer 
                    attribution='Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
                    url='https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
                />}

                {displayPinsMemo}
                {mapDataSelector.parsedPath.length > 0 && <MapLine positions={mapDataSelector.parsedPath} options={lineOptions} />}
                
            </MapContainer>
        </div>
    )
}