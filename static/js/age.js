function updateMap() {

    d3.json('/api_wmhdata').then(function(data) {
        // console.log(data);
        var data = data;
        // createAnxiety(data);
        
        // age dropdown
        var ageOptions = ["Under 5", "5-14", "15-49", "50-69", "Over 70"]
        
        d3.select("#selAge")
            .selectAll('myOptions') //create class 
            .data(ageOptions)
            .enter()
            .append('option')
            .text(function (d) { return d; }) // text showed in the dropdown
            .attr("value", function (d) {return d;})

        // Event listener for age dropdown selection 
        d3.select("#selAge").on("change", function(selectedAge) {
            
            var selectedAge = d3.select(this).property("value")
            console.log(selectedAge); 
            // console.log(data);
            
            // // coordinates
            var lat = data.map(elem => elem.latitude);
            var long = data.map(elem => elem.longitude);
            var latlong = lat.map(function(latitude, index){
                return [latitude, long[index]];
            });

            // // Anxiety data by age selection
            // // filtA will be size of Anxiety markers on the map
            if (selectedAge == "Under 5") {
                filtA = data.map(elem => elem.A_below_5yo);
            }
            if (selectedAge == "5-14") {
                filtA =  data.map(elem => elem.A_above_5yo);
            }
            if (selectedAge == "15-49") {
                filtA =  data.map(elem => elem.A_above_14yo);
            }
            if (selectedAge == "50-69") {
                filtA =  data.map(elem => elem.A_above_49yo);
            }
            if (selectedAge == "Over 70") {
                filtA =  data.map(elem => elem.A_above_69yo);
            }
            console.log(filtA);

            // // Depression data
            // // filtD will be size of Depression markers on the map
            if (selectedAge == "Under 5") {
                filtD = data.map(elem => elem.D_below_5yo);
            }
            if (selectedAge == "5-14") {
                filtD =  data.map(elem => elem.D_above_5yo);
            }
            if (selectedAge == "15-49") {
                filtD =  data.map(elem => elem.D_above_14yo);
            }
            if (selectedAge == "50-69") {
                filtD =  data.map(elem => elem.D_above_49yo);
            }
            if (selectedAge == "Over 70") {
                filtD =  data.map(elem => elem.D_above_69yo);
            }
            console.log(filtD);
            
        });

    });
};

updateMap();
