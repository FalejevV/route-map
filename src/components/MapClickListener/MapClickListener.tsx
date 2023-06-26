import { LatLngExpression, LeafletMouseEvent } from "leaflet";
import { useMapEvents } from "react-leaflet";



export default function MapClickListener(props:{
    onClick:Function
}){

    function listener(){
        const map = useMapEvents({
          click: (e:LeafletMouseEvent) => {
            props.onClick(e);
          },
        })
    }
    listener();
    return(<></>)
}