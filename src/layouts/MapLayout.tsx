"use client";

import FileInput from "@/components/FileInput/FileInput";
import { useEffect, useState } from "react";
import dynamic from 'next/dynamic'
import { LatLngExpression } from "leaflet";
import gpxParser from "@/utils/gpxParser";

const Map = dynamic(
    () => import('../components/Map/MapItem'),
    { ssr: false }
)

const lineOptions = {
    color:"red"
}

export default function MapLayout(){
    
    const [file,setFile] = useState<File | undefined>();
    const [parsedPath, setParsedPath] = useState<LatLngExpression[][]>([[]]);
    
    useEffect(() => {
        if(file){
            gpxParser({file}).then((res:any) => setParsedPath(res));
        }else{
            setParsedPath([]);
        }
    },[file])

    

    return (
        <div className='w-min h-max flex gap-4 flex-col items-center'>
            <FileInput path={parsedPath} setPath={setParsedPath} file={file} setFile={setFile} />
            <Map setLinePositions={setParsedPath} linePositions={parsedPath} lineOptions={lineOptions} />
        </div>
    )
}