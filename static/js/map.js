function loadmap() {

    d3.json('/api_wmhdata').then(function(data) {
        // console.log(data);
        var data = data;

        // streets tile
        var streets = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 18,
            id: 'mapbox/streets-v11',
            tileSize: 512,
            zoomOffset: -1,
            accessToken: 'pk.eyJ1IjoiZGlhbmV5YW5lemEiLCJhIjoiY2tuZnZvenkyMXZyeDJvazg3NHlvNGJoMSJ9.b2Mbk6QyGrdG8GIqJr1lNw'
        });

        var layers = {
            Anxiety: new L.LayerGroup(),
            Depression: new L.LayerGroup(),
        };

        // map object with layers
        var mymap = L.map('map', {
            center: [10.82, 21.80],
            zoom: 2.5,
            layers: [
                layers.Anxiety,
                layers.Depression
            ]
        });

        // age dropdown
        var ageOptions = ["Under 5", "5-14", "15-49", "50-69", "Over 70"]
        var ageDropdown = d3.select("#selAge")
        ageDropdown
        .selectAll('myOptions') //create class 
        .data(ageOptions)
        .enter()
        .append('option')
        .text(function (d) { return d; }) // text showed in the dropdown
        .attr("value", function (d) {return d;})

        streets.addTo(mymap);

        var entities = data.map(elem => elem.Entity);
        // console.log(entities); 
        var lat = data.map(elem => elem.latitude);
        var long = data.map(elem => elem.longitude);
        var latlong = lat.map(function(latitude, index){
            return [latitude, long[index]];
        });

        // anxiety
        var aData = L.layerGroup().addTo(mymap);
        for (i = 0; i < latlong.length; i++) {
            circle = L.circle([latlong[i][0], latlong[i][1]]).bindPopup("entities");
            aData.addLayer(circle);
        }

        // depression
        var dData = L.layerGroup().addTo(mymap);
        for (i = 0; i < latlong.length; i++) {
            circle = L.circle([latlong[i][0], latlong[i][1], {
                color: 'red',
                radius: 500
            }]);
            dData.addLayer(circle);
        }

        var overlayMaps = {
            'Anxiety': aData,
            'Depression': dData
        };

        // Create a control for our layers, add our overlay layers to it
        L.control.layers(null, overlayMaps).addTo(mymap);

        L.layerGroup().addTo(mymap);
    });

};


function updateMap() {
    d3.json('/api_wmhdata').then(function(data) {
        // console.log(data);
        var data = data;

        // Event listener for age dropdown selection 
        var ageDropdown = d3.select("#selAge")
        ageDropdown.on("change", function() {
            var selectedAge = d3.select(this).property("value")
            console.log(selectedAge); 

        // Anxiety results
        var ab5 = data.map(elem => elem.A_below_5yo);
        var aa5 = data.map(elem => elem.A_above_5yo);
        var aa14 = data.map(elem => elem.A_above_14yo);
        var aa49 = data.map(elem => elem.A_above_49yo);
        var aa69 = data.map(elem => elem.A_above_69yo);

        // Depression results
        var db5 = data.map(elem => elem.D_below_5yo);
        var da5 = data.map(elem => elem.D_above_5yo);
        var da14 = data.map(elem => elem.D_above_14yo);
        var da49 = data.map(elem => elem.D_above_49yo);
        var da69 = data.map(elem => elem.D_above_69yo);

        // if (selectedAge == "5-14") {
        //     console.log(ab5);
        //     console.log(db5);
        // } // working


        function getRadius(selectedAge) {
            // return selectedAge * 30000; 
            if (selectedAge == "Under 5") {
                return ab5 * 30000, db5 * 30000;
            }
            if (selectedAge == "5-14") {
                return aa5 * 30000, da5 * 30000;
            }
            if (selectedAge == "15-49") {
                return aa14 * 30000, da14 * 30000;
            }
            if (selectedAge == "50-69") {
                return aa49 * 30000, da49 * 30000;
            }
            if (selectedAge == "Over 70") {
                return aa69 * 30000, da69 * 30000;
            };
            
        };
        // console.log(selectedAge);
    });
});
}
loadmap()