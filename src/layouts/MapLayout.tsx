"use client";

import FileInput from "@/components/FileInput/FileInput";
import { useEffect, useState } from "react";
import dynamic from 'next/dynamic'
import { xml2json } from 'xml-js';
import { LatLngExpression } from "leaflet";

const Map = dynamic(
    () => import('../components/Map/MapItem'),
    { ssr: false }
)

interface RoutePoint{
    _attributres:{
        lat:string,
        lon:string
    }[]
}

const lineOptions = {
    color:"red"
}

export default function MapLayout(){
    
    const [file,setFile] = useState<File>();
    const [parsedPath, setParsedPath] = useState<LatLngExpression[][]>([[]]);
    
    useEffect(() => {
        if(file){
            let reader = new FileReader();
            reader.readAsText(file, "UTF-8");
            reader.onload = function (evt) {
                let target = evt.target;
                let result = target?.result as string;

                let routeParse = JSON.parse(xml2json(result, { spaces: 2, compact: true }));
                if(routeParse.gpx.trk.trkseg.trkpt){
                    let pathResult:LatLngExpression[][] = [];
                    routeParse.gpx.trk.trkseg.trkpt.forEach((path:RoutePoint) => {
                        console.log([Object.values(path)[0].lat, Object.values(path)[0].lon]);
                        pathResult.push([Object.values(path)[0].lat, Object.values(path)[0].lon]);
                    });
                    setParsedPath(pathResult);
                }
            }
        }
    },[file])

    

    return (
        <div className='w-min h-max flex gap-4 flex-col items-center'>
            <FileInput setFile={setFile} />
            <Map linePositions={parsedPath} lineOptions={lineOptions} />
        </div>
    )
}