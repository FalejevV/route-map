import { Pin } from "@/interface";
import { Popup } from "react-leaflet";
import Image from 'next/image'
import ToolButton from "../ToolButton/ToolButton";
import { useAppDispatch } from "@/redux/store";


export default function CustomPopup(props:{
    pin:Pin,
    onClick:Function
}){
    
    return(
        <Popup>
            <div className="w-[250px] flex flex-col gap-3 p-2 pt-5 pb-7 relative">
                <div className="absolute right-2 bottom-2">
                    <ToolButton icon={"clear.svg"} onClick={props.onClick} size={[20,20]} title={"remove"} />
                </div>
                <p>{props.pin.title}</p>
                <Image src={"/pin-image-test.jpeg"} alt={"test image"} width={250} height={150} className="w-full h-[150px] object-cover"/>
                <p>{props.pin.description}</p>
            </div>
        </Popup>
    )
}