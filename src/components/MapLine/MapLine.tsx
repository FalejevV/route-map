import { LatLngExpression, PolylineOptions } from "leaflet";
import { Polyline } from "react-leaflet";

export default function MapLine(props:{
    positions:LatLngExpression[][],
    options:PolylineOptions
}){
    
    return(
        <Polyline positions={props.positions} pathOptions={props.options} />
    )
}