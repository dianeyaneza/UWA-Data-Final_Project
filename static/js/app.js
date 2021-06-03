d3.json('/api_wmhdata').then(function(data) {
    console.log(data);
    createAnxiety(data);
})

function createAnxiety(data) {
    function onEachEntity(entity, layer) {
        layer.bindPopup("<h3>" + data.Entity 
        );
    }

    // Draw marker radius
    function markerRadius(selectedAge) {
        return magnitude * 30000; 
    }
    
    // Draw marker colours
    function markerColour(selectedAge) {
        // Magnitude up to 1 
        if (magnitude < 1) {
            return "#E6E696"
        }
        // Magnitude 1 to 2
        else if (magnitude < 2) {
            return "yellow"
        }
        // Magnitude 2 to 3
        else if (magnitude < 3) {
            return "orange"
        }
        // Magnitude 3 to 4
        else if (magnitude < 4) {
            return "red"
        }
        // Magnitude 4 to 5
        else if (magnitude < 5) {
            return "maroon"
        }
        // Magnitude 5 and up
        else {
            return "brown"        
        }

}};

var mymap = L.map('map').setView([10.82, 21.80], 2.5);

var streets = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiZGlhbmV5YW5lemEiLCJhIjoiY2tuZnZvenkyMXZyeDJvazg3NHlvNGJoMSJ9.b2Mbk6QyGrdG8GIqJr1lNw'
}).addTo(mymap);

var cities = L.layerGroup();
L.marker([-31.95, 115.86]).bindPopup('This is Perth.').addTo(cities),
    L.marker([-26.20, 28.04]).bindPopup('This is Johannesburg.').addTo(cities),
    L.marker([23.11, -82.36]).bindPopup('This is Havana').addTo(cities);

var baseMaps = {
    "Streets": streets
};

var overlayMaps = {
    "Anxiety": cities

};

L.control.layers(overlayMaps).addTo(mymap);
