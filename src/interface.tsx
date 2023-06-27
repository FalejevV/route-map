import { LatLngExpression } from "leaflet"

export interface UserLocation{
    lat:number,
    lng:number,
    acc:number
}

export interface Pin{
    title:string,
    thumbnail:string,
    description:string,
    position:LatLngExpression[]
}