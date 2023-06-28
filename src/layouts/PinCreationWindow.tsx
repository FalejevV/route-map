import TextArea from "@/components/TextArea/TextArea";
import TextField from "@/components/TextField/TextField";
import ToolButton from "@/components/ToolButton/ToolButton";
import { Pin } from "@/interface";
import { setPins } from "@/redux/features/mapData";
import { PinCreationValues, setPinCreationValue, togglePinCreationWindowToggle } from "@/redux/features/pinCreationData";
import { RootState, useAppDispatch, useAppSelector } from "@/redux/store";
import React from "react";



export default function PinCreationWindow(){
    const pinCreationDataSelector = useAppSelector((state:RootState) => state.pinCreationData);
    const mapDataSelector = useAppSelector((state:RootState) => state.mapData);
    const dispatch = useAppDispatch();

    function onChangeHandler(e:React.ChangeEvent, key:PinCreationValues){
        dispatch(setPinCreationValue({
            key,
            value: (e.target as HTMLInputElement).value
        }))
    }

    function addPin(){
        let pinArray = [...mapDataSelector.pins, {
            title:pinCreationDataSelector.title,
            image:pinCreationDataSelector.image,
            description:pinCreationDataSelector.description,
            position:pinCreationDataSelector.position
          }] as Pin[];
          dispatch(togglePinCreationWindowToggle(false));
          dispatch(setPins(pinArray))
    }
    return(
        <div className="max-w-[400px] w-full flex flex-col gap-4 rounded bg-background absolute left-[50%] top-[50%] z-[5000] translate-x-[-50%] translate-y-[-50%] p-5 pt-7">
            <div className="absolute right-2 top-2">
                <ToolButton icon={"close.svg"} onClick={() => dispatch(togglePinCreationWindowToggle(false))} title={"close"} />
            </div>
            <TextField value={pinCreationDataSelector.title} 
            onChange={(e:React.ChangeEvent) => onChangeHandler(e, "title")} 

            title={"Title"} id={"title"} placeholder={"Title here"} />
            <TextField value={pinCreationDataSelector.image}
            onChange={(e:React.ChangeEvent) => onChangeHandler(e, "image")} 
            title={"Image"} id={"image"} placeholder={"Just a URL for now"} />

            <TextArea  value={pinCreationDataSelector.description}
            onChange={(e:React.ChangeEvent) => onChangeHandler(e, "description")} 
            title={"Description"} id={"description"} placeholder={"Tell us more about it"} />
            <button className="bg-accent h-12 rounded mt-2" onClick={addPin}>Add pin</button>
        </div>
    )
}