let street = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
});

groupA = [];
groupB = [];

function MarkerOptions(group){
    if(group=="A"){
        color="red";
    }else{
        color="blue";
    }
    return {
        weight: 1,
        opacity: 1,
        fillOpacity: 0.8,
        color:color
    };
} 

for(let i=0; i<5; i++){
    groupA.push(L.circleMarker([51.505, -0.09+(i*0.02)], MarkerOptions("A")).bindPopup(`Marker A${i+1}`));
    groupB.push(L.circleMarker([51.505+(i*0.02), -0.11], MarkerOptions("B")).bindPopup(`Marker B${i+1}`))
}

let A = L.layerGroup(groupA);
let B = L.layerGroup(groupB);

let baseMaps={
    "Street Map":street
};

let overlayMaps={
    "Group A":A,
    "Group B":B
};

let map = L.map('map',{
    center: [51.505, -0.09],
    zoom: 11,
    layers: [street, A, B]
});

d3.json("/test")

let layerControl = L.control.layers(baseMaps, overlayMaps, {collapsed:false}).addTo(map);

let x = [1,2,3,4,5];
let y = [5,4,3,2,1];
let plotData = [{
    type:"plot",
    x:x,
    y:y,
}];
// Autorange used to reverse the default ordering of the horizontal bar chart
let plotLayout = {
title:`Test`,
xaxis:{title:"TestX"},
yaxis:{
    title:"TestY"
}
};

Plotly.newPlot("plot", plotData, plotLayout);

console.log(a)