var container = L.DomUtil.get('map');
if(container != null){
container._leaflet_id = null;
}

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

        const mapcenter = [10.82, 21.80]
        const mapzoom = [2.5]

        // map object with layers
        var mymap = L.map('map', {
            center: mapcenter,
            zoom: mapzoom,
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
        // var aData = L.layerGroup().addTo(mymap);
        // for (i = 0; i < latlong.length; i++) {
        //     circle = L.circle([latlong[i][0], latlong[i][1]]);
        //     aData.addLayer(circle);
        // }

        // depression
        // var dData = L.layerGroup().addTo(mymap);
        // for (i = 0; i < latlong.length; i++) {
        //     circle = L.circle([latlong[i][0], latlong[i][1]]);
        //     dData.addLayer(circle);
        // }

        // testing marker radius *not working, disables layer control
        // anxiety

        // var circle = L.circle();

        /////////////////////////////////
        // TEST TO CHANGE RADIUS      ///
        ////////////////////////////////

        var aData = L.layerGroup().addTo(mymap);
        for (i = 0; i < latlong.length; i++) {
            circle = L.circle([latlong[i][0], latlong[i][1]], 300000, {
                color: 'royalblue',
                fillColor: 'white',
                fillOpacity: 0.5
            });
            aData.addLayer(circle);

            function changeRadius(selectedAge) {
                if(selectedAge == "Under 5") {
                    circle.setRadius(rad_ab5)
                }
              }

            // function markerRadius(selectedAge) {
            //     // return selectedAge * 300000; 
            //     if (selectedAge == "Under 5") {
            //         circle.setRadius(rad_ab5, rad_db5);
            //     }
            //     if (selectedAge == "5-14") {
            //         return rad_aa5, rad_da5;
            //     }
            //     if (selectedAge == "15-49") {
            //         return rad_aa14, rad_da14;
            //     }
            //     if (selectedAge == "50-69") {
            //         return rad_aa49, rad_da49;
            //     }
            //     if (selectedAge == "Over 70") {
            //         return rad_aa69, rad_da69;
            //     };
            // };
        }

        // // depression
        // var dData = L.layerGroup().addTo(mymap);
        // for (i = 0; i < latlong.length; i++) {
        //     circle = L.circle([latlong[i][0], latlong[i][1]], {
        //         radius: markerRadius(selectedAge)
        //     });
        //     dData.addLayer(circle);
        // }

        var overlayMaps = {
            'Anxiety': aData,
            // 'Depression': dData
        };

        // Create a control for our layers, add our overlay layers to it
        L.control.layers(null, overlayMaps).addTo(mymap);

        L.layerGroup().addTo(mymap);
    });

    updateMap();
};


function updateMap() {
    d3.json('/api_wmhdata').then(function(data) {
        // console.log(data);
        var data = data;

        // countries
        var entities = data.map(elem => elem.Entity);
        // console.log(entities); 
        // coordinates
        var lat = data.map(elem => elem.latitude);
        var long = data.map(elem => elem.longitude);
        var latlong = lat.map(function(latitude, index){
            return [latitude, long[index]];
        });

        // Event listener for country
        // const countryEntered = d3.select("#country").property("value");
        // let newcountry = 

        // if (countryEntered){
        //     newcountry = filteredData.filter(row => row.Entity === countryEntered);
        // }
        
        

        // Event listener for age dropdown selection 
        var ageDropdown = d3.select("#selAge")
        ageDropdown.on("change", function() {
            var selectedAge = d3.select(this).property("value")
            console.log(selectedAge); 

        
        // Anxiety results multiplied for marker radius
        var rad_ab5 = data.map(elem => elem.A_below_5yo) * 300000;
        var rad_aa5 = data.map(elem => elem.A_above_5yo) * 300000;
        var rad_aa14 = data.map(elem => elem.A_above_14yo) * 300000;
        var rad_aa49 = data.map(elem => elem.A_above_49yo) * 300000;
        var rad_aa69 = data.map(elem => elem.A_above_69yo) * 300000;

        // Depression results multiplied for marker radius
        var rad_db5 = data.map(elem => elem.D_below_5yo) * 300000;
        var rad_da5 = data.map(elem => elem.D_above_5yo) * 300000;
        var rad_da14 = data.map(elem => elem.D_above_14yo) * 300000;
        var rad_da49 = data.map(elem => elem.D_above_49yo) * 300000;
        var rad_da69 = data.map(elem => elem.D_above_69yo) * 300000;

        if (selectedAge == "5-14") {
            console.log(ab5);
            console.log(db5);
        } // working

        // var newRadius = L.circleMarker()

        // function markerRadius(selectedAge) {
        //     // return selectedAge * 30000; 
        //     if (selectedAge == "Under 5") {
        //         return rad_ab5, rad_db5;
        //     }
        //     if (selectedAge == "5-14") {
        //         return rad_aa5, rad_da5;
        //     }
        //     if (selectedAge == "15-49") {
        //         return rad_aa14, rad_da14;
        //     }
        //     if (selectedAge == "50-69") {
        //         return rad_aa49, rad_da49;
        //     }
        //     if (selectedAge == "Over 70") {
        //         return rad_aa69, rad_da69;
        //     };
        // };
    });
});
}
loadmap()



        // // key code = 13 (ENTER), key code = 32 (SPACE)
        // if(d3.event.keyCode === 13) {
        //     console.log("Congrats, you pressed enter")

        //     // Prevent the page from refreshing
        //     d3.event.preventDefault();

        //     // Select the id show 
        //     var show_entered = d3.select("#show");

        //     //Get the value property of the input element
        //     var inputValue = show_entered.property("value");
        //     console.log(inputValue);

        //     // Enter in code to filter and match and print table
        //     tbody.html("");

        //     d3.json('/api_events').then((data) => {
        //     console.log(data);
        //     var allData = data;
        
    