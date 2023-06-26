import L from "leaflet";
import { useMap } from "react-leaflet";



export default function MapLocationListener(props:{
    setUserLocation:Function
}){

    function locate(){
        const map = useMap();
        
        map.locate().on("locationfound", function (e) {
            props.setUserLocation({
                ...e.latlng,
                acc:e.accuracy
            });
        });
          
    }
    locate();

    return(<></>);
}