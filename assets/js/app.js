var mymap = L.map('map').setView([-31.95, 115.86], 13);

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiZGlhbmV5YW5lemEiLCJhIjoiY2tuZnZvenkyMXZyeDJvazg3NHlvNGJoMSJ9.b2Mbk6QyGrdG8GIqJr1lNw'
}).addTo(mymap);

var perth = L.marker([-31.95, 115.86]).bindPopup('This is Perth.'),
    johannesburg = L.marker([-26.20, 28.04]).bindPopup('This is Johannesburg.'),
    havana = L.marker([23.11, -82.36]).bindPopup('This is Havana');

var cities = L.layerGroup([perth, johannesburg, havana]);

var grayscale = L.tileLayer(mapboxUrl, {id: 'map', tileSize: 512, zoomOffset: -1, attribution: mapboxAttribution}),
    streets = L.tileLayer(mapboxUrl, {id: 'map', tileSize: 512, zoomOffset: -1, attribution: mapboxAttribution});

var map = L.map('map', {
    center: [-31.95, 115.86],
    zoom: 10,
    layers: [grayscale, cities]
});

var baseMaps = {
    "Grayscale": grayscale,
    "Streets": streets
};

var overlayMaps = {
    "Cities": cities
};

L.control.layers(baseMaps, overlayMaps).addTo(map);
