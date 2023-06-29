import { RootState, useAppDispatch, useAppSelector } from "@/redux/store";
import ToolButton from "../ToolButton/ToolButton";
import { setToggleUserLocation, setUserLocation } from "@/redux/features/mapData";
import { useEffect } from "react";


export default function LocationListenerToggle(){

    const dispatch = useAppDispatch();
    const toggleUserLocationSelector = useAppSelector((state:RootState) => state.mapData.toggleUserLocation);

    function toggleLocationListener(){
        dispatch(setToggleUserLocation(!toggleUserLocationSelector));
    }

    useEffect(() => {
        if(!toggleUserLocationSelector){
            dispatch(setUserLocation(undefined));
        }
    },[toggleUserLocationSelector])

    return(
        <div className="absolute left-2 bottom-11 w-[50px] h-[50px] bg-background z-[5000] flex items-center justify-center rounded">
            <div className={` opacity-60 ${toggleUserLocationSelector && "opacity-[1]"}`}>
            <ToolButton icon={"user-location.svg"} size={[45,45]} onClick={toggleLocationListener} title={"Toggle location"}/>
            </div>
        </div>
    )
}