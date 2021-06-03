// Location filtering function 

// const tbody = d3.select("tbody");

// body.append('input')
//     .attr('type','text')
//     .attr('name','textInput')
//     .attr('value','Text goes here')

// Load in data from @app.route
var appRoute = 'api_wmhdata';

// Create event handler
// Select the id on index.html
var country_entered = d3.select("#country")
country_entered.on("keypress", runZoomIn);

function runZoomIn(userInput) {
    console.log("hello");

    // Prevent the page from refreshing
    // d3.event.preventDefault();

    // Select the id on index.html
    var country_entered = d3.select("#country")

    // Get the value of the input element
    var userInput = country_entered.property("value").toUpperCase();
    console.log(userInput)

    // Refresh after every function
    // tbody.html("");

    // Grab data with d3
    d3.json(appRoute).then((data) => {

        // CHECK data loads on index.html 
        // console.log(data);

        var allData = data;

        // Create var to allow user input for countries
        country_name = allData.map(c => c.Entity);
        // console.log(country_name[20]) // This works

        // Loop through each row and append result in #country
        for (var i = 0; i < country_name.length; i++) {
            if (userInput === country_name[i]) {

                // Update the latlongs on 'mymap'
                var mymap = L.map('map').setView([10.82, 21.80], 2.5);
            }
        }


    })
}

runEnter();