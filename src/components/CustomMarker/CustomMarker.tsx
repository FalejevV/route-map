"use client";

import { Icon } from "leaflet";
import { Circle, Marker } from "react-leaflet";

export default function CustomMarker(props:{
    icon?:string,
    size?: [number,number],
    position:[number,number],
    children?:React.ReactNode,
    type?:string,
    acc?:number
}){
    const customIcon = new Icon({
        iconUrl:props.icon || "/map-pin.svg",
        iconSize: props.size || [35,35],
    })
    
    if(props.type){
        const typeIcon = new Icon({
            iconUrl:`/marker-${props.type}.svg`,
            iconSize: props.size || [30,30],
            iconAnchor:   [2, 30],
        })
        return(
            <Marker position={props.position} icon={typeIcon}>
                {props.children}
            </Marker>
        )
    }
    return(
        <>
            <Marker position={props.position} icon={customIcon}>
                {props.children}
            </Marker>
            {props.acc && 
                <Circle center={props.position} radius={props.acc} />
            }
        </>
    )
}