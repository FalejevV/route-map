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
        setSrc('https://cdn-icons-png.flaticon.com/512/1079/1079536.png?w=1380&t=st=1687966598~exp=1687967198~hmac=a93e83f33b7863c387a4c188a8ef432bbfea4449bdcdb4b7e421048c32841d38')
    }
    
    return(
        <Popup>
            <div className="w-[250px] flex flex-col gap-3 p-2 pt-5 pb-7 relative">
                <div className="absolute right-2 bottom-2">
                    <ToolButton icon={"clear.svg"} onClick={props.onClick} size={[20,20]} title={"remove"} />
                </div>
                <p>{props.pin.title}</p>
                <Image src={src} onError={replaceImageOnError} alt={"pin image"} width={250} height={150} className="w-full h-[150px] object-cover bg-slate-200 rounded"/>
                <p>{props.pin.description}</p>
            </div>
        </Popup>
    )
}