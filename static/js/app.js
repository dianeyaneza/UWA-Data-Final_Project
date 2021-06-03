d3.json('/api_wmhdata').then(function(data) {
    // console.log(data);
    // console.log(data.Entity);
    var entities = data.map(elem => elem.Entity);
    console.log(entities); 
    var lat = data.map(elem => elem.latitude);
    var long = data.map(elem => elem.longitude);
    var latlong = lat.map(function(latitude, index){
        return [latitude, long[index]];
    });
    console.log(latlong);
    // createAnxiety(data);


    var mymap = L.map('map').setView([10.82, 21.80], 2.5);

    var streets = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'pk.eyJ1IjoiZGlhbmV5YW5lemEiLCJhIjoiY2tuZnZvenkyMXZyeDJvazg3NHlvNGJoMSJ9.b2Mbk6QyGrdG8GIqJr1lNw'
    }).addTo(mymap);


    var baseMaps = {
        "Streets": streets
    };

    // var countries = L.layerGroup();
    // L.marker([-31.95, 115.86]).bindPopup('This is Perth.').addTo(cities),
    //     L.marker([-26.20, 28.04]).bindPopup('This is Johannesburg.').addTo(cities),
    //     L.marker([23.11, -82.36]).bindPopup('This is Havana').addTo(cities);

    // var overlayMaps = {
    //     "Anxiety": cities
    // }

    //  new code to add countries coordinates marker
    var aData = L.layerGroup().addTo(mymap);
    for (i = 0; i < latlong.length; i++) {
        marker = L.marker([latlong[i][0], latlong[i][1]]);
        aData.addLayer(marker);
    }
    var dData = L.layerGroup().addTo(mymap);
    for (i = 0; i < latlong.length; i++) {
        marker = L.marker([latlong[i][0], latlong[i][1]]);
        dData.addLayer(marker);
    }
    var overlayMaps = {
        'Anxiety': aData,
        'Depression': dData

    };

    // layer control on top right
    L.control.layers(overlayMaps).addTo(mymap);

});