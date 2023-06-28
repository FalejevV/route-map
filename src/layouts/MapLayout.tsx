"use client";

import FileInput from "@/components/FileInput/FileInput";
import { useEffect, useState } from "react";
import dynamic from 'next/dynamic'
import { LatLngExpression, PolylineOptions } from "leaflet";
import gpxParser, { GpxParsed } from "@/utils/gpxParser";
import generateGPXFile from "@/utils/generateGPXFile";
import ToolButton from "@/components/ToolButton/ToolButton";
import MapDistance from "@/components/MapDistance/MapDistance";
import { RootState, useAppDispatch, useAppSelector } from "@/redux/store";
import { setPaintMode, setParsedPath, setPins } from "@/redux/features/mapData";
import PinCreationWindow from "./PinCreationWindow";

const Map = dynamic(
    () => import('../components/Map/MapItem'),
    { ssr: false }
)

export default function MapLayout(){
    
    const [file,setFile] = useState<File | undefined>();
    const dispatch = useAppDispatch();
    const mapData = useAppSelector((state:RootState) => state.mapData);
    const pinCreationToggleWindow = useAppSelector((state:RootState) => state.pinCreationData.windowToggle);

    useEffect(() => {
        if(file){
            gpxParser({file}).then((res:GpxParsed) => {
                dispatch(setParsedPath(res.path));
                dispatch(setPins(res.pins))
            });
        }else{
            dispatch(setParsedPath([]));
        }
    },[file])

    function eraseLast(){
        let newPath = [...mapData.parsedPath].slice(0, mapData.parsedPath.length - 1);
        dispatch(setParsedPath(newPath));
    }

    return (
        <div className='w-screen max-w-[850px] h-screen max-h-[750px] flex flex-col items-center border-[#4B99E6] border-2 relative'>
            <div className="w-full h-[40px] flex gap-6 items-center bg-[#d6eaf8] p-2 text-[#000000b6] font-semibold">
                <p className="pr-10">Map editor</p>

                <div className="flex items-center gap-[10px]">
                    <ToolButton icon={"/draw.svg"} onClick={() => dispatch(setPaintMode("draw"))} title={"Draw path"} toggled={mapData.paintMode==="draw"}/>
                    <ToolButton icon={"/pin.svg"} onClick={() => dispatch(setPaintMode("pin"))} title={"Place pin"} toggled={mapData.paintMode==="pin"}/>
                </div>

                <div className="flex items-center gap-[10px] flex-1 justify-end">
                    <ToolButton icon={"/undo.svg"} onClick={eraseLast} title={"Undo"} />
                    <ToolButton icon={"/clear.svg"} onClick={() => dispatch(setParsedPath([]))} title={"Clear"} />
                    <FileInput setFile={setFile} file={file} title={"file"} icon={"upload.svg"} setPath={(path:LatLngExpression[][]) => dispatch(setParsedPath(path))} path={[]} />
                    <ToolButton icon={"/save.svg"} onClick={() => generateGPXFile(mapData.parsedPath, mapData.pins)} title={"Save"} />
                </div>
            </div>
            <Map />
            <MapDistance/>
            {pinCreationToggleWindow && <PinCreationWindow />}
        </div>
            
    )
}