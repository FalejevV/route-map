"use client";

import { Icon } from "leaflet";
import { Marker } from "react-leaflet";

export default function CustomMarker(props:{
    icon?:string,
    size?: [number,number],
    position:[number,number],
    children?:React.ReactNode
}){
    const customIcon = new Icon({
        iconUrl:props.icon || "/pin.svg",
        iconSize: props.size || [35,35]
    })
    return(
        <Marker position={props.position} icon={customIcon}>
            {props.children}
        </Marker>
    )
}