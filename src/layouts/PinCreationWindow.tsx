import TextArea from "@/components/TextArea/TextArea";
import TextField from "@/components/TextField/TextField";
import ToolButton from "@/components/ToolButton/ToolButton";
import { Pin } from "@/interface";
import { setPins } from "@/redux/features/mapData";
import { PinCreationValues, setPinCreationValue, togglePinCreationWindowToggle } from "@/redux/features/pinCreationData";
import { RootState, useAppDispatch, useAppSelector } from "@/redux/store";
import { nanoid } from "@reduxjs/toolkit";
import React from "react";



export default function PinCreationWindow(){
    const pinCreationDataSelector = useAppSelector((state:RootState) => state.pinCreationData);
    const mapDataSelector = useAppSelector((state:RootState) => state.mapData);
    const dispatch = useAppDispatch();

    function onChangeHandler(e:React.ChangeEvent, key:PinCreationValues){
        dispatch(setPinCreationValue({
            pin:{
                ...pinCreationDataSelector.pin,
                [key]:(e.target as HTMLInputElement).value
            }
        }))
    }


    function addPin(){
        if(pinCreationDataSelector.pin.key !== ""){
            dispatch(setPins(mapDataSelector.pins.map((pin:Pin) => {
                if(pin.key === pinCreationDataSelector.pin.key){
                    return pinCreationDataSelector.pin
                }
                return pin;
            })))

            dispatch(togglePinCreationWindowToggle(false));
            dispatch(setPinCreationValue({
                pin: {
                    title: "",
                    image: "",
                    description: "",
                    position: [0,0],
                    key: ""
                }
            }));
            return;
        }

        let newPin = {
            title:pinCreationDataSelector.pin.title,
            image:pinCreationDataSelector.pin.image,
            description:pinCreationDataSelector.pin.description,
            position:pinCreationDataSelector.pin.position,
            key:nanoid()
          }
        let pinArray = [...mapDataSelector.pins, newPin] as Pin[];
          dispatch(togglePinCreationWindowToggle(false));
          dispatch(setPins(pinArray));
          dispatch(setPinCreationValue({
              pin: {
                  title: "",
                  image: "",
                  description: "",
                  position: [0,0],
                  key: ""
              }
          }));
    }

    function closeWindow(){
        dispatch(setPinCreationValue({
            pin: {
                title: "",
                image: "",
                description: "",
                position: [0,0],
                key: ""
            }
        }));
        dispatch(togglePinCreationWindowToggle(false));
    }
    
    return(
        <div className="max-w-[400px] w-full flex flex-col gap-4 rounded bg-background absolute left-[50%] top-[50%] z-[5000] translate-x-[-50%] translate-y-[-50%] p-5 pt-7">
            <div className="absolute right-2 top-2">
                <ToolButton icon={"close.svg"} onClick={closeWindow} title={"close"} />
            </div>
            <TextField value={pinCreationDataSelector.pin.title} 
            onChange={(e:React.ChangeEvent) => onChangeHandler(e, "title")} 
            title={"Title"} id={"title"} placeholder={"Title here"} />

            <TextArea  value={pinCreationDataSelector.pin.description}
            onChange={(e:React.ChangeEvent) => onChangeHandler(e, "description")} 
            title={"Description"} id={"description"} placeholder={"Tell us more about it"} />
            <button className="bg-accent h-12 rounded mt-2" onClick={addPin}>{pinCreationDataSelector.pin.key === "" ? "Add pin" : "Update pin"}</button>
        </div>
    )
}