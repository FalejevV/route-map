"use client"

import { LatLngExpression } from "leaflet";
import Image from "next/image";
import { useEffect, useRef } from "react";

export default function FileInput(props:{
    setFile:Function,
    setPath:Function,
    file:File | undefined,
    path:LatLngExpression[][],
    title:string,
    icon:string,
}){

    function onFileInput(e:React.ChangeEvent<HTMLInputElement>){
        let files = e.target.files;
        if(files && files[0]){
            props.setFile(files[0]);
        }
    }
    let fileRef = useRef(null);

    useEffect(() => {
        if(!props.file){
            if(fileRef.current){
                let refCurrent = fileRef.current as HTMLInputElement;
                refCurrent.value = "";
            }
            

        }
    },[props.file])
    
    return(
        <div className="flex items-center gap-2">
            <input className="hidden appearance-none" id={props.title} name={props.title} ref={fileRef} type="file" size={1} onChange={onFileInput}/>
            <label className="appearance-none cursor-pointer hover-zoom" htmlFor={props.title}>
                <Image src={props.icon} alt={props.title} width={24} height={24}/>
            </label>
        </div>
    )
}