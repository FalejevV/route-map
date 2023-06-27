import { RootState, useAppSelector } from "@/redux/store";
import calculateDistance from "@/utils/calculateDistance";
import { LatLngExpression } from "leaflet"


export default function MapDistance(){
    const mapDataParsedPathSelector = useAppSelector((state:RootState) => state.mapData.parsedPath);

    return(
        <p className="absolute left-0 bottom-0 p-2 bg-accent z-[500] text-sm">
            Distance: {calculateDistance(mapDataParsedPathSelector)} KM
        </p>
    )
}