import { LatLngExpression } from "leaflet";
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

function extractArray(trkseg:[] | {trkpt:[]}):LatLngExpression[][]{
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

export default function gpxParser(props:Props):Promise<LatLngExpression[][]>{
    let reader = new FileReader();
    reader.readAsText(props.file, "UTF-8");
    return new Promise((res,rej) => {
        reader.onload = function (evt) {
            let target = evt.target;
            let result = target?.result as string;
            let pathResult:LatLngExpression[][] = [];
            let routeParse = JSON.parse(xml2json(result, { spaces: 2, compact: true }));
            if(routeParse.gpx){
                pathResult = extractArray(routeParse.gpx.trk.trkseg);
            }
            res(pathResult);
        }
    })
}