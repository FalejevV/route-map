"use client";

import FileInput from "@/components/FileInput/FileInput";
import { useEffect, useState } from "react";
import dynamic from 'next/dynamic'
import { LatLngExpression, PolylineOptions } from "leaflet";
import gpxParser from "@/utils/gpxParser";
import generateGPXFile from "@/utils/generateGPXFile";

const Map = dynamic(
    () => import('../components/Map/MapItem'),
    { ssr: false }
)

const lineOptions:PolylineOptions = {
    color:"black",
    lineCap:"round",
    lineJoin:"round",
    weight:4
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

    function eraseLast(){
        setParsedPath(prev => prev.slice(0, prev.length - 1))
    }

    return (
        <div className='w-min h-max flex gap-4 flex-col items-center'>
            <div className="flex gap-6 items-center justify-center">
                <FileInput path={parsedPath} setPath={setParsedPath} file={file} setFile={setFile} />
                {parsedPath.length > 0 && 
                    <>
                        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512" className="cursor-pointer fill-white" onClick={eraseLast}><path d="M48.5 224H40c-13.3 0-24-10.7-24-24V72c0-9.7 5.8-18.5 14.8-22.2s19.3-1.7 26.2 5.2L98.6 96.6c87.6-86.5 228.7-86.2 315.8 1c87.5 87.5 87.5 229.3 0 316.8s-229.3 87.5-316.8 0c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0c62.5 62.5 163.8 62.5 226.3 0s62.5-163.8 0-226.3c-62.2-62.2-162.7-62.5-225.3-1L185 183c6.9 6.9 8.9 17.2 5.2 26.2s-12.5 14.8-22.2 14.8H48.5z"/></svg>
                        <p onClick={() => generateGPXFile(parsedPath)} className="cursor-pointer text-yellow-600 whitespace-nowrap">Generate File!</p>
                    </>
                }
            </div>
            <Map setLinePositions={setParsedPath} linePositions={parsedPath} lineOptions={lineOptions} />
        </div>
    )
}