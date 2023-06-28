import { Pin } from "@/interface";
import { Popup } from "react-leaflet";
import Image from 'next/image'
import ToolButton from "../ToolButton/ToolButton";
import { useEffect, useRef, useState } from "react";


export default function CustomPopup(props:{
    pin:Pin,
    onClick:Function
}){
    const [src, setSrc] = useState(props.pin.image);
    function replaceImageOnError(){
        setSrc("/error-pin-image.jpg")
    }

    return(
        <Popup>
            <div className="w-[250px] flex flex-col gap-3 p-2 pt-5 pb-7 relative">
                <div className="absolute right-2 bottom-2">
                    <ToolButton icon={"clear.svg"} onClick={props.onClick} size={[20,20]} title={"remove"} />
                </div>
                <p>
                    <b>Title: </b>
                     {props.pin.title}
                </p>

                {props.pin.image.trim() !== "" && <Image src={src} onError={replaceImageOnError} alt={"pin image"} width={250} height={150} className="w-full h-[150px] object-cover bg-section rounded"/>}
                
                <p>
                    <b>Description:</b>
                    {props.pin.description}
                </p>
            </div>
        </Popup>
    )
}