import { LatLngExpression } from "leaflet";


function getDistanceFromLatLonInKm(lat1:LatLngExpression,lon1:LatLngExpression,lat2:LatLngExpression,lon2:LatLngExpression) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(Number(lat2)-Number(lat1));  // deg2rad below
    var dLon = deg2rad(Number(lon2)-Number(lon1)); 
    var a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(deg2rad(Number(lat1))) * Math.cos(deg2rad(Number(lat2))) * 
      Math.sin(dLon/2) * Math.sin(dLon/2)
      ; 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c; // Distance in km
    return d;
  }
  
  function deg2rad(deg:number) {
    return deg * (Math.PI/180)
  }

export default function calculateDistance(path:LatLngExpression[][]):number{
    let result = 0;
    let oldPoint:LatLngExpression[] = [];
    path.forEach((point:LatLngExpression[]) => {
        if(oldPoint.length === 0){
            oldPoint = point;
        }else{
            result += getDistanceFromLatLonInKm(oldPoint[0], oldPoint[1], point[0], point[1]);
            oldPoint = point;
        }
    })
    return Math.round(result * 100) / 100
    ;
}