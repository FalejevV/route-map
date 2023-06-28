import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { LatLngExpression } from "leaflet";

export interface PinCreationData{
    title:string,
    image:string,
    description:string,
    windowToggle:boolean,
    position:LatLngExpression
}

export type PinCreationValues = "title"|"image"|"description"

const initialState:PinCreationData = {
    title:"",
    image:"",
    description:"",
    windowToggle:false,
    position:[0,0]
}


const pinCreationSlice = createSlice({
    name:"pinCreationSlice",
    initialState,
    reducers:{
        setPinCreationValue:((state:PinCreationData, action:PayloadAction<{key:"title" | "image" | "description", value:string}>) => {
            state[action.payload.key] = action.payload.value;
        }),
        togglePinCreationWindowToggle:((state:PinCreationData, action:PayloadAction<boolean>) => {
            state.windowToggle = action.payload;
        }),
        setPinCreationPosition:((state:PinCreationData, action:PayloadAction<LatLngExpression>) => {
            state.position = action.payload;
        })
    }
});


export default pinCreationSlice.reducer;

export const { setPinCreationValue, togglePinCreationWindowToggle, setPinCreationPosition } = pinCreationSlice.actions;