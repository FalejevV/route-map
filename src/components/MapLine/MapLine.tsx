import { LatLngExpression } from "leaflet";
import { Polyline } from "react-leaflet";

export default function MapLine(props:{
    positions:LatLngExpression[][],
    options:{
        color:string
    }
}){
    
    return(
        <Polyline positions={props.positions} pathOptions={props.options} />
    )
}