// Location filtering function 

// const tbody = d3.select("tbody");

// body.append('input')
//     .attr('type','text')
//     .attr('name','textInput')
//     .attr('value','Text goes here')


// Define new mymap var
// var zoomMap = new mymap

// Create event handler
// Select the id on index.html
var country_entered = d3.select("#country")
country_entered.on("keypress", runZoomIn);

var newZoomMap = new L.map('map')

// Load in data from @app.route
var appRoute = 'api_wmhdata';

function runZoomIn(userInput) {
    // console.log("select country");

    // Select the id on index.html
    var country_entered = d3.select("#country")

    // Get the value of the input element
    var userInput = country_entered.property("value");
    console.log(userInput)

    // Grab data with d3
    d3.json(appRoute).then((data) => {

        // CHECK data loads on index.html 
        // console.log(data);

        var allData = data;

        // Create var to allow user input for countries
        country_name = allData.map(c => c.Entity);
        // console.log(country_name[20]) // This works

        // Create var for latlong to update map
        var lat = allData.map(l => l.latitude);
        var long = allData.map(l => l.longitude);
        var latlong = lat.map(function (latitude, index) {
            return [latitude, long[index]];
        });
        // console.log(latlong);

        // Loop through each row and append result in #country

        // for (var i = 0; i < country_name.length; i++) {
        //     if (userInput.toLowerCase() === country_name[i].toLowerCase()) {
                // Update the latlongs on 'mymap'
                // new L.map('map').setView([latlong[0], latlong[1]], 2.5);
                // L.map.setView([latlong[0], latlong[1]])
                // L.latLng(latlong[0], latlong[1])
            //     append.setView([latlong[0], latlong[1]])
            // };
        // };

        // map.on('enter', function (enter) {
    })
}

function runZoomIn() {
    newZoomMap.addTo(mymap)
};

// Prevent the page from refreshing
// d3.event.preventDefault();

// Refresh after every function
// tbody.html("");