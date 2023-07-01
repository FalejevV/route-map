import { RootState, useAppSelector } from "@/redux/store";
import calculateDistance from "@/utils/calculateDistance";
import { LatLngExpression } from "leaflet"


export default function MapDistance(){
    const mapDataParsedPathSelector = useAppSelector((state:RootState) => state.mapData.parsedPath);

    return(
        <p className="absolute left-3 bottom-3 p-2 bg-accent z-[500] text-sm border-gray">
            Distance: {calculateDistance(mapDataParsedPathSelector)} KM
        </p>
    )
}