import { Pin } from "@/interface";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { LatLngExpression, LatLngTuple } from "leaflet";

export interface PinCreationData{
    pin:Pin,
    windowToggle:boolean,
}

export type PinCreationValues = "title"|"image"|"description"

const initialState:PinCreationData = {
    pin:{
        title: "",
        image: "",
        description: "",
        position: [0,0],
        key: ""
    },
    windowToggle:false
}


const pinCreationSlice = createSlice({
    name:"pinCreationSlice",
    initialState,
    reducers:{
        setPinCreationValue:((state:PinCreationData, action:PayloadAction<{pin:Pin}>) => {
            state.pin = action.payload.pin
        }),
        togglePinCreationWindowToggle:((state:PinCreationData, action:PayloadAction<boolean>) => {
            state.windowToggle = action.payload;
        }),
    }
});


export default pinCreationSlice.reducer;

export const { setPinCreationValue, togglePinCreationWindowToggle } = pinCreationSlice.actions;