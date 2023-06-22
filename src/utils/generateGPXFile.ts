import { LatLngExpression } from "leaflet"

const fileStart = `
<?xml version="1.0" encoding="UTF-8"?>
<gpx xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://www.topografix.com/GPX/1/1" xsi:schemaLocation="http://www.topografix.com/GPX/1/1 http://www.topografix.com/GPX/1/1/gpx.xsd http://www.garmin.com/xmlschemas/GpxExtensions/v3 http://www.garmin.com/xmlschemas/GpxExtensionsv3.xsd http://www.garmin.com/xmlschemas/TrackPointExtension/v1 http://www.garmin.com/xmlschemas/TrackPointExtensionv1.xsd http://www.topografix.com/GPX/gpx_style/0/2 http://www.topografix.com/GPX/gpx_style/0/2/gpx_style.xsd" xmlns:gpxtpx="http://www.garmin.com/xmlschemas/TrackPointExtension/v1" xmlns:gpxx="http://www.garmin.com/xmlschemas/GpxExtensions/v3" xmlns:gpx_style="http://www.topografix.com/GPX/gpx_style/0/2" version="1.1" creator="https://gpx.studio (Used by V-Map)">
<metadata>
    <name>V-Map</name>
    <author>
        <name>V-Map</name>
        <link href=""></link>
    </author>
</metadata>
<trk>
    <name>V-Map</name>
    <type>Cycling</type>
    <trkseg>
`

const fileEnd = `
    </trkseg> \n
    </trk> \n
    </gpx> \n
`


export default function generateGPXFile(path:LatLngExpression[][]){
    if(path.length === 0) return;

    let resultFileContent = "" + fileStart;
    path.forEach((point:LatLngExpression[]) => {
        resultFileContent += `<trkpt lat="${point[0]}" lon="${point[1]}"></trkpt> \n`
    })
    resultFileContent += fileEnd;

    
    const url = 'data:text/json;charset=utf-8,' + resultFileContent;
    const link = document.createElement('a');
    link.download = `V-Map.gpx`;
    link.href = url;
    document.body.appendChild(link);
    link.click();
}