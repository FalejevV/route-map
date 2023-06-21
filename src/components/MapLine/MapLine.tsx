import { LatLngExpression } from "leaflet";
import { Polyline } from "react-leaflet";

export default function MapLine(props:{
    positions:LatLngExpression[][],
    options:{
        color:string
    }
}){
    console.log("RUN");
    return(
        <Polyline positions={props.positions} pathOptions={props.options} />
    )
}