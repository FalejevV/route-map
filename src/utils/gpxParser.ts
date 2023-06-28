import { Pin } from "@/interface";
import { LatLngExpression, LatLngTuple } from "leaflet";
import { xml2json } from "xml-js";


interface RoutePoint{
    _attributres:{
        lat:string,
        lon:string
    }[]
}

interface Props{
    file:File
}

function extractPathArray(trkseg:[] | {trkpt:[]}):LatLngExpression[][]{
    let result:any = [];
    if(Array.isArray(trkseg)){
        trkseg.forEach((trksegItem:any) => {
            let item:any = Object.values(trksegItem)[0];
            if(Array.isArray(item)){
                item.forEach((point:RoutePoint) => {
                    result.push([Object.values(point)[0].lat, Object.values(point)[0].lon]);
                })
            }else{
                if(item.lat !== undefined){
                    result.push(item.lat, item.lon);
                }
            }
        })
    }else{
        trkseg.trkpt.forEach((point:RoutePoint) => {
            result.push([Object.values(point)[0].lat, Object.values(point)[0].lon]);
        })
    }
    return result;
}

interface WPT{
    name:{
        _text:string
    }
    desc:{
        _text:string
    }
    lat:string,
    lon:string,
    _attributes:{
        lat:string,
        lon:string,
    }
}

function extractPins(wptArray:WPT | WPT[]){
    let pinArray:Pin[] = [];

    if(!Array.isArray(wptArray)){
        let wptPosition = [Number(wptArray._attributes.lat), Number(wptArray._attributes.lon)] as LatLngTuple;
        pinArray.push({
            title: wptArray.name._text || "",
            image: "",
            description: wptArray.desc._text || "",
            position: wptPosition
        })
    }else{
        wptArray.forEach((wpt) => {
            let wptPosition = [Number(wpt._attributes.lat), Number(wpt._attributes.lon)] as LatLngTuple;
            console.log(wpt);
            pinArray.push({
                title: wpt.name._text || "",
                image: "",
                description: wpt.desc._text,
                position: wptPosition
            })
        })
    }
    return pinArray;
}

export interface GpxParsed{
    path:LatLngExpression[][],
    pins:Pin[]
}

export default function gpxParser(props:Props):Promise<GpxParsed>{
    let reader = new FileReader();
    reader.readAsText(props.file, "UTF-8");
    return new Promise((res,rej) => {
        reader.onload = function (evt) {
            let target = evt.target;
            let result = target?.result as string;
            let pathResult:LatLngExpression[][] = [];
            let pinResult:Pin[] = [];
            let routeParse = JSON.parse(xml2json(result, { spaces: 2, compact: true }));
            if(routeParse.gpx){
                pathResult = extractPathArray(routeParse.gpx.trk.trkseg);
                console.log(routeParse.gpx);
                pinResult = extractPins(routeParse.gpx.wpt);
            }
            res({
                path:pathResult,
                pins:pinResult
            });
        }
    })
}