import { setUserLocation } from "@/redux/features/mapData";
import { useAppDispatch } from "@/redux/store";
import L from "leaflet";
import { useMap } from "react-leaflet";



export default function MapLocationListener(){
    const dispatch = useAppDispatch();

    function useLocation(){
        const map = useMap();
        
        map.locate().on("locationfound", function (e) {
            map.flyTo(e.latlng, 15);
            dispatch(setUserLocation({
                ...e.latlng,
                acc:e.accuracy
            }))
        });
          
    }
    useLocation();

    return(<></>);
}