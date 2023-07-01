import { Pin } from "@/interface";
import { Popup } from "react-leaflet";
import Image from 'next/image'
import ToolButton from "../ToolButton/ToolButton";
import { useState } from "react";
import { RootState, useAppDispatch, useAppSelector } from "@/redux/store";
import { setPins } from "@/redux/features/mapData";
import { setPinCreationValue, togglePinCreationWindowToggle } from "@/redux/features/pinCreationData";


export default function CustomPopup(props:{
    pin:Pin,
    index:number
}){
    const [src, setSrc] = useState(props.pin.image);
    const dispatch = useAppDispatch();
    const mapDataPinsSelector = useAppSelector((state:RootState) => state.mapData.pins);

    function replaceImageOnError(){
        setSrc("/error-pin-image.jpg")
    }


    function clearPin(index:number){
        let newPinArray = [...mapDataPinsSelector].filter((pin:Pin, i:number) => i !== index)
        setTimeout(() => {
          dispatch(setPins(newPinArray));
        })
    }

    function editPin(){
        dispatch(setPinCreationValue({
            pin: props.pin
        }));
        dispatch(togglePinCreationWindowToggle(true));
    }

    return(
        <Popup>
            <div className="w-[250px] flex flex-col gap-3 p-2 pt-5 pb-7 relative">
                <div className="absolute right-2 bottom-2 flex items-center gap-2">
                    <ToolButton icon={"draw.svg"} onClick={() => editPin()} size={[20,20]} title={"edit"} />
                    <ToolButton icon={"clear.svg"} onClick={() => clearPin(props.index)} size={[20,20]} title={"remove"} />
                </div>
                <p>
                    <b>Title: </b>
                     {props.pin.title}
                </p>
                
                <p>
                    <b>Description: </b>
                    {props.pin.description}
                </p>
            </div>
        </Popup>
    )
}