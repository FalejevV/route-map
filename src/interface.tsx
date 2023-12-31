import { LatLngTuple } from "leaflet"

export interface UserLocation{
    lat:number,
    lng:number,
    acc:number
}

export interface Pin{
    title:string,
    image:string,
    description:string,
    position:LatLngTuple,
    key:string
}