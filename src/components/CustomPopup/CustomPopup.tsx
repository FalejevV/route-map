import { Pin } from "@/interface";
import { Popup } from "react-leaflet";
import Image from 'next/image'
import ToolButton from "../ToolButton/ToolButton";


export default function CustomPopup(props:{
    pin:Pin,
    onClick:Function
}){
    console.log(props.pin);
    return(
        <Popup>
            <div className="w-[250px] flex flex-col gap-3 p-2 pt-5 pb-7 relative">
                <div className="absolute right-2 bottom-2">
                    <ToolButton icon={"clear.svg"} onClick={props.onClick} size={[20,20]} title={"remove"} />
                </div>
                <p>{props.pin.title}</p>
                <Image src={props.pin.image} alt={"test image"} width={250} height={150} className="w-full h-[150px] object-cover bg-slate-200 rounded"/>
                <p>{props.pin.description}</p>
            </div>
        </Popup>
    )
}