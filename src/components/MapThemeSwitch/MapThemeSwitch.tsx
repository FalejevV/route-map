import { setMapTheme } from "@/redux/features/mapData";
import { RootState, useAppDispatch, useAppSelector } from "@/redux/store";
import Image from "next/image";



export default function MapThemeSwitcher(){
    const dispatch = useAppDispatch();
    const mapThemeSelector = useAppSelector((state:RootState) => state.mapData.mapTheme);
    return(
        <div className="flex flex-col absolute z-[500] left-3 top-32 bg-background rounded overflow-hidden border-gray">
            <Image width={50} height={50} src="/mapTheme/map.jpg" alt={"default map theme"} 
            className={`${mapThemeSelector === 1 && " border-blue-400"} border-4 cursor-pointer transition-all duration-200`}
            onClick={() => dispatch(setMapTheme(1))}
            />

            <Image width={50} height={50} src="/mapTheme/satellite.jpg" alt={"satellite map theme"} 
            className={`${mapThemeSelector === 2 && "border-blue-400"} border-4 cursor-pointer transition-all duration-200`}
            onClick={() => dispatch(setMapTheme(2))}
            />
        </div>
    )
}
