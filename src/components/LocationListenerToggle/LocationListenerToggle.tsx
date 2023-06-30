import { RootState, useAppDispatch, useAppSelector } from "@/redux/store";
import ToolButton from "../ToolButton/ToolButton";
import { setToggleUserLocation, setUserLocation } from "@/redux/features/mapData";
import { useEffect } from "react";
import LoadingIndicator from "../LoadingIndicator/LoadingIndicator";


export default function LocationListenerToggle(){

    const dispatch = useAppDispatch();
    const [toggleUserLocationSelector, userLocationSelector] = useAppSelector((state:RootState) => [state.mapData.toggleUserLocation, state.mapData.userLocation]);
    
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
            {userLocationSelector === undefined && toggleUserLocationSelector && <LoadingIndicator />}
            <div className={` opacity-60 ${toggleUserLocationSelector && "opacity-[1]"}`}>
            <ToolButton icon={"user-location.svg"} size={[45,45]} onClick={toggleLocationListener} title={"Toggle location"}/>
            </div>
        </div>
    )
}