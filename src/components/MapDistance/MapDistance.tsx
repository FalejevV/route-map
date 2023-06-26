import calculateDistance from "@/utils/calculateDistance";
import { LatLngExpression } from "leaflet"


export default function MapDistance(props:{
    path:LatLngExpression[][]
}){
    return(
        <p className="absolute left-0 bottom-0 p-2 bg-accent z-[500] text-sm">
            Distance: {calculateDistance(props.path)} KM
        </p>
    )
}