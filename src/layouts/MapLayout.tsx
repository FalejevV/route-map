"use client";

import FileInput from "@/components/FileInput/FileInput";
import { useEffect, useState } from "react";
import dynamic from 'next/dynamic'
import { LatLngExpression, PolylineOptions } from "leaflet";
import gpxParser from "@/utils/gpxParser";
import generateGPXFile from "@/utils/generateGPXFile";
import ToolButton from "@/components/ToolButton/ToolButton";
import MapDistance from "@/components/MapDistance/MapDistance";

const Map = dynamic(
    () => import('../components/Map/MapItem'),
    { ssr: false }
)

const lineOptions:PolylineOptions = {
    color:"#00a2ff",
    lineCap:"round",
    lineJoin:"round",
    weight:4,
}

export default function MapLayout(){
    
    const [file,setFile] = useState<File | undefined>();
    const [parsedPath, setParsedPath] = useState<LatLngExpression[][]>([[]]);
    const [paintMode, setPaintMode] = useState("draw");
    const [userLocation, setUserLocation] = useState<{lat:number,lng:number,acc:number} | undefined>();

    useEffect(() => {
        if(file){
            gpxParser({file}).then((res:any) => setParsedPath(res));
        }else{
            setParsedPath([]);
        }
    },[file])

    function eraseLast(){
        setParsedPath(prev => prev.slice(0, prev.length - 1))
    }

    return (
        <div className='w-screen max-w-[850px] h-screen max-h-[750px] flex flex-col items-center border-[#4B99E6] border-2 relative'>
            <div className="w-full h-[40px] flex gap-6 items-center bg-[#d6eaf8] p-2 text-[#000000b6] font-semibold">
                <p className="pr-10">Map editor</p>

                <div className="flex items-center gap-[10px]">
                    <ToolButton icon={"/draw.svg"} onClick={() => setPaintMode("draw")} title={"Draw path"} />
                    <ToolButton icon={"/pin.svg"} onClick={() => setPaintMode("pin")} title={"Place pin"} />
                </div>

                <div className="flex items-center gap-[10px] flex-1 justify-end">
                    <ToolButton icon={"/undo.svg"} onClick={eraseLast} title={"Undo"} />
                    <ToolButton icon={"/clear.svg"} onClick={() => setParsedPath([])} title={"Clear"} />
                    <FileInput setFile={setFile} setPath={setParsedPath} file={file} path={parsedPath} title={"file"} icon={"upload.svg"} />
                    <ToolButton icon={"/save.svg"} onClick={() => generateGPXFile(parsedPath)} title={"Save"} />
                </div>
            </div>
            <Map paintMode={paintMode} center={[55.5977264, 26.4236592]} setLinePositions={setParsedPath} linePositions={parsedPath} lineOptions={lineOptions} setUserLocation={setUserLocation} userLocation={userLocation}/>
            <MapDistance path={parsedPath}/>
        </div>
            
    )
}