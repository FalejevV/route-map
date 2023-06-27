import { Pin, UserLocation } from "@/interface";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { LatLngExpression } from "leaflet";

export interface MapData{
    mapCenter: LatLngExpression,
    parsedPath:LatLngExpression[][],
    pins:Pin[],
    paintMode:string,
    userLocation: UserLocation | undefined,
    toggleUserLocation: boolean,
}

const initialState:MapData = {
    mapCenter: [55.5977264, 26.4236592],
    parsedPath:[],
    pins:[],
    paintMode:"draw",
    userLocation: undefined,
    toggleUserLocation: false,
};


const mapDataSlice = createSlice({
    name:"mapData",
    initialState,
    reducers:{
        setMapCenter:((state:MapData, action:PayloadAction<LatLngExpression>) => {
            state.mapCenter = action.payload;
        }),
        setParsedPath:((state:MapData, action:PayloadAction<LatLngExpression[][]>) => {
            state.parsedPath = action.payload;
        }),
        setPins:((state:MapData, action:PayloadAction<Pin[]>) => {
          state.pins = action.payload;  
        }),
        setPaintMode:((state:MapData, action:PayloadAction<string>) => {
            state.paintMode = action.payload;
        }),
        setUserLocation:((state:MapData, action:PayloadAction<UserLocation | undefined>) => {
            state.userLocation = action.payload;
        }),
        setToggleUserLocation:((state:MapData, action:PayloadAction<boolean>) => {
            state.toggleUserLocation = action.payload;
        }),
    }
})

export default mapDataSlice.reducer;

export const {setMapCenter,setParsedPath, setPins, setPaintMode,setUserLocation,setToggleUserLocation} = mapDataSlice.actions;