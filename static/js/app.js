var mymap = L.map('map').setView([10.82, 21.80], 2.5);

var streets = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiZGlhbmV5YW5lemEiLCJhIjoiY2tuZnZvenkyMXZyeDJvazg3NHlvNGJoMSJ9.b2Mbk6QyGrdG8GIqJr1lNw'
}).addTo(mymap);


var darkmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/dark-v10",
    accessToken: 'pk.eyJ1IjoiZGlhbmV5YW5lemEiLCJhIjoiY2tuZnZvenkyMXZyeDJvazg3NHlvNGJoMSJ9.b2Mbk6QyGrdG8GIqJr1lNw'
});

var cities = L.layerGroup();
L.marker([-31.95, 115.86]).bindPopup('This is Perth.').addTo(cities),
    L.marker([-26.20, 28.04]).bindPopup('This is Johannesburg.').addTo(cities),
    L.marker([23.11, -82.36]).bindPopup('This is Havana').addTo(cities);

var baseMaps = {
    "Streets": streets,
    "Dark": darkmap
};

var overlayMaps = {
    "Cities": cities
};

L.control.layers(baseMaps, overlayMaps).addTo(mymap);

// 1. Pull out co-ordinates from PostGRES (in list or dictionary form)
// 2. Store co-ordinates into location via for loop

// Load in coordinates data from @app.route("/api_events")
var appRoute = 'api_wmhdata';

//Grab data with d3
d3.json(appRoute).then((data) => {
  
    // CHECK data is loaded
    console.log(data);
});