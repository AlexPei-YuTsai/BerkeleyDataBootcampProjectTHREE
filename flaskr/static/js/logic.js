// Adding tilesets here
let street = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
});

let topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
  attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
});



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
let config = {responsive: true}

Plotly.newPlot("plot", plotData, plotLayout, config);
Plotly.newPlot("plot2", plotData, plotLayout, config);
Plotly.newPlot("plot3", plotData, plotLayout, config);

// Define variables and map components globally so we can remove and replace them later
let plastic, agg, baseMaps, overlayMaps, map, layerControl;

// Define map creation functions here:
// Looks hacky, but that's because I otherwise don't know how to update maps and their layers
function defaultMap(data){
    let geojsonMarkerOptions = {
        radius: 4,
        fillColor: "#ff7800",
        color: "#fff",
        weight: 1,
        opacity: 1,
        fillOpacity: 0.8
    };

    let trash = L.geoJson(data,{
        pointToLayer: function (feature, latlng) {
            return L.circleMarker(latlng, geojsonMarkerOptions);
        },

        // Binding a popup to each layer
        onEachFeature: function(feature, layer) {
            layer.bindPopup(
            `<b>Place Occurred:
            <hr>
            <b>Latitude:</b> ${feature.geometry.coordinates[1]}<br>
            <b>Longitude:</b> ${feature.geometry.coordinates[0]}<br>`
            )
        }
    });
    
    // Create a baseMaps object.
    baseMaps = {
        "Street Map": street,
        "Topographic Map": topo
    };

    // Create an overlay object to hold our overlay.
    overlayMaps = {
        //"Trash": trash
    };

    // Defining what layers to load in on default
    map = L.map('map',{
        center: [0, 0],
        zoom: 2,
        layers: [street, trash]
    });
    
    layerControl = L.control.layers(baseMaps, overlayMaps, {collapsed:false}).addTo(map);
}


// Initialize Map and bring data in
d3.json("/api/init").then(function(data){
    plastic = data;
    console.log(plastic);

    defaultMap(data);
});

d3.json("/api/agg").then(function(data){
    agg = data;
});


function optionChanged(value){
    console.log(value);
    if (value==1){
        map.off();
        map.remove();
        layerControl.remove();
        mapMaker(plastic);
    }
    if (value==5){
        map.off();
        map.remove();

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
        
        baseMaps={
            "Street Map":street
        };
        
        overlayMaps={
            "Group A":A,
            "Group B":B
        };
        
        map = L.map('map',{
            center: [51.505, -0.09],
            zoom: 11,
            layers: [street, A, B]
        });
        
        layerControl.remove();
        layerControl = L.control.layers(baseMaps, overlayMaps, {collapsed:false}).addTo(map);
    }; 
};
