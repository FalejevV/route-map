import FileInput from "@/components/FileInput/FileInput";
import ToolButton from "@/components/ToolButton/ToolButton";
import mapData, { setPaintMode, setParsedPath, setPins } from "@/redux/features/mapData";
import { RootState, useAppDispatch, useAppSelector } from "@/redux/store";
import generateGPXFile from "@/utils/generateGPXFile";
import gpxParser, { GpxParsed } from "@/utils/gpxParser";
import { LatLngExpression } from "leaflet";
import { useEffect, useState } from "react";


export default function MapToolsTab(){

    const dispatch = useAppDispatch();
    const mapDataSelector = useAppSelector((state:RootState) => state.mapData);
    const [file,setFile] = useState<File | undefined>();
    
    function eraseLastPath(){
        let newPath = [...mapDataSelector.parsedPath].slice(0, mapDataSelector.parsedPath.length - 1);
        dispatch(setParsedPath(newPath));
    }
    
    useEffect(() => {
        if(file){
            gpxParser({file}).then((res:GpxParsed) => {
                dispatch(setParsedPath(res.path));
                dispatch(setPins([...mapDataSelector.pins, ...res.pins]))
            });
        }else{
            dispatch(setParsedPath([]));
        }
    },[file])

    return(
        <div className="w-full h-[40px] flex gap-6 items-center bg-[#d6eaf8] p-2 text-[#000000b6] font-semibold">
            <p className="pr-10">Map editor</p>

            <div className="flex items-center gap-[10px]">
                <ToolButton icon={"/draw.svg"} onClick={() => dispatch(setPaintMode("draw"))} title={"Draw path"} toggled={mapDataSelector.paintMode==="draw"} clickable/>
                <ToolButton icon={"/pin.svg"} onClick={() => dispatch(setPaintMode("pin"))} title={"Place pin"} toggled={mapDataSelector.paintMode==="pin"} clickable/>
            </div>

            <div className="flex items-center gap-[10px] flex-1 justify-end">
                <ToolButton icon={"/undo.svg"} onClick={eraseLastPath} title={"Undo"} clickable={mapDataSelector.parsedPath.length > 0}/>
                <ToolButton icon={"/draw-clear.svg"} onClick={() => {confirm("Clear path?") && dispatch(setParsedPath([]))}} title={"Clear path"} clickable={mapDataSelector.parsedPath.length > 0}/>
                <ToolButton icon={"/pins-clear.svg"} onClick={() => {confirm("Clear pins?") &&dispatch(setPins([]))}} title={"Clear pins"} clickable={mapDataSelector.pins.length > 0}/>
                <FileInput fileExtension=".gpx" setFile={setFile} file={file} title={"file"} icon={"upload.svg"} setPath={(path:LatLngExpression[][]) => dispatch(setParsedPath(path))} path={[]} />
                <ToolButton icon={"/save.svg"} onClick={() => generateGPXFile(mapDataSelector.parsedPath, mapDataSelector.pins)} title={"Save"} clickable={mapDataSelector.parsedPath.length > 0 || mapDataSelector.pins.length > 0}/>
            </div>
         </div>
    )
}