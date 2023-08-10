// Adding tilesets here
let street = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
});

let topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
  attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
});

// Define variables and map components globally so we can remove and replace them later
let plastic, agg, baseMaps, overlayMaps, map, layerControl;

let areaarray=[];
let biomearray=[];
let deptharray=[];
let distancearray=[];
let plasarray=[];
let propfarray=[];
let propnarray=[];
let poparray=[];

// Define map creation functions here:
// Looks hacky, but that's because I otherwise don't know how to update maps and their layers
function defaultMap(data){
    function geojsonMarkerOptions(number){
        return {
            radius: Math.max(4, Math.log(number)*1.1),
            fillColor: "#ff7800",
            color: "#fff",
            weight: 1,
            opacity: 1,
            fillOpacity: 0.8
        };
    }

    let trash = L.geoJson(data,{
        pointToLayer: function (feature, latlng) {
            return L.circleMarker(latlng, geojsonMarkerOptions(feature.properties.Total_Abundance));
        },

        // Binding a popup to each layer
        onEachFeature: function(feature, layer) {
            layer.bindPopup(
            `<b>Place Occurred:</b>
            <b>Latitude:</b> ${feature.geometry.coordinates[1]}<br>
            <b>Longitude:</b> ${feature.geometry.coordinates[0]}<br>
            <hr>
            <b>Area:</b> ${feature.properties.Area}<br>
            <b>Biome:</b> ${feature.properties.Biome}<br>
            <b>Depth:</b> ${feature.properties.Depth}<br>
            <b>Plastic Amount:</b> ${feature.properties.Total_Abundance}<br>`
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
};
function setMap(data){
    function geojsonMarkerOptions(number){
        return {
            radius: Math.max(4, Math.log(number)*2),
            fillColor: "#A9A9A9",
            color: "#fff",
            weight: 1,
            opacity: 1,
            fillOpacity: 0.8
        };
    }

    let trash = L.geoJson(data,{
        pointToLayer: function (feature, latlng) {
            return L.circleMarker(latlng, geojsonMarkerOptions(feature.properties.Population));
        },

        // Binding a popup to each layer
        onEachFeature: function(feature, layer) {
            layer.bindPopup(
            `<b>Place Occurred:</b>
            <b>Latitude:</b> ${feature.geometry.coordinates[1]}<br>
            <b>Longitude:</b> ${feature.geometry.coordinates[0]}<br>
            <hr>
            <b>Area:</b> ${feature.properties.Area}<br>
            <b>Biome:</b> ${feature.properties.Biome}<br>
            <b>Population:</b> ${feature.properties.Population}<br>
            <b>Plastic Amount:</b> ${feature.properties.Total_Abundance}<br>`
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
function setOtherMap(data){
    function geojsonMarkerOptions(number){
        return {
            radius: Math.max(4, number*15),
            fillColor: "#8B008B",
            color: "#fff",
            weight: 1,
            opacity: 1,
            fillOpacity: 0.8
        };
    }

    let trash = L.geoJson(data,{
        pointToLayer: function (feature, latlng) {
            return L.circleMarker(latlng, geojsonMarkerOptions(feature.properties.Prop_Fiber));
        },

        // Binding a popup to each layer
        onEachFeature: function(feature, layer) {
            layer.bindPopup(
            `<b>Place Occurred:</b>
            <b>Latitude:</b> ${feature.geometry.coordinates[1]}<br>
            <b>Longitude:</b> ${feature.geometry.coordinates[0]}<br>
            <hr>
            <b>Area:</b> ${feature.properties.Area}<br>
            <b>Biome:</b> ${feature.properties.Biome}<br>
            <b>Fiber Proportion:</b> ${feature.properties.Prop_Fiber}<br>
            <b>Plastic Amount:</b> ${feature.properties.Total_Abundance}<br>`
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

function stackChart(where, labels, stat1, stat2, name1, name2, value){
    var trace1 = {
        x: labels,
        y: stat1,
        name: name1,
        type: 'bar'
      };
      
      var trace2 = {
        x: labels,
        y: stat2,
        name: name2,
        type: 'bar'
      };
      
      var data = [trace1, trace2];
      
      var layout = {
        title:`Plastic Composition ${value}`,
        xaxis:{title:value},
        yaxis:{
            title:"Proportions"
        },
        barmode: 'stack'
        };
      let config = {responsive: true}
      
      Plotly.newPlot(where, data, layout, config);
}

// Initialize Map and Charts and bring data in for processing
d3.json("/api/init").then(function(data){
    plastic = data;
    console.log(plastic);

    defaultMap(data);    
}).then(function(){
    plastic.forEach(element => {
        // It's 5 in the morning. I'll use whatever ugly method that works
        if (!element["properties"]["Area"]){
            areaarray.push("NAN");  
        }else{
            areaarray.push(element["properties"]["Area"]);
        };
        if (!element["properties"]["Biome"]){
            biomearray.push(" ");
        }else{
            biomearray.push(element["properties"]["Biome"]);
        };
        deptharray.push(element["properties"]["Depth"]);
        distancearray.push(element["properties"]["Distance"]);
        poparray.push(element["properties"]["Population"]);
        plasarray.push(element["properties"]["Total_Abundance"]);
        propfarray.push(element["properties"]["Prop_Fiber"]);
        propnarray.push(element["properties"]["Prop_NonFiber"]);
    });

    //stackChart(labels, stat1, stat2, name1, name2)
});

d3.json("/api/agg/Continent").then(function(data){
    agg = data;
    
    let labels=[];
    let propf=[];
    let propn=[];
    data.forEach(element => {
        labels.push(element["Continent"]);
        propf.push(element["Fibers"]/(element["Fibers"]+element["NonFibers"]));
        propn.push(element["NonFibers"]/(element["Fibers"]+element["NonFibers"]));
    });

    stackChart("plot2", labels, propf, propn, "Fibrous Plastic", "Non-Fibrous Plastic", "By Area")
});

d3.json("/api/agg/Habitat_Type").then(function(data){
    agg = data;

    let labels=[];
    let propf=[];
    let propn=[];
    data.forEach(element => {
        labels.push(element["Habitat_Type"]);
        propf.push(element["Fibers"]/(element["Fibers"]+element["NonFibers"]));
        propn.push(element["NonFibers"]/(element["Fibers"]+element["NonFibers"]));
    });

    stackChart("plot1", labels, propf, propn, "Fibrous Plastic", "Non-Fibrous Plastic", "By Biome")
});


function optionChanged(value){
    map.off();
    map.remove();
    layerControl.remove();
    if (value=="By Abundance"){ 
        defaultMap(plastic);
    }
    if (value=="By Depth"){
        setMap(plastic);
    }
    if (value=="By Composition"){
        setOtherMap(plastic);
    }; 
};
