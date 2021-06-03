function updateMap() {

    d3.json('/api_wmhdata').then(function(data) {
        // console.log(data);
        var data = data;
        // createAnxiety(data);

        // coordinates
        var lat = data.map(elem => elem.latitude);
        var long = data.map(elem => elem.longitude);
        var latlong = lat.map(function(latitude, index){
            return [latitude, long[index]];
            // console.log(latlong)
        });

        // Anxiety by age group
        var ab5 = data.map(elem => elem.A_below_5yo);
        var aa5 = data.map(elem => elem.A_above_5yo);
        var aa14 = data.map(elem => elem.A_above_14yo);
        var aa49 = data.map(elem => elem.A_above_49yo);
        var aa69 = data.map(elem => elem.A_above_69yo);
        // console.log(ab5)

        // Depression by age group
        var db5 = data.map(elem => elem.D_below_5yo);
        var da5 = data.map(elem => elem.D_above_5yo);
        var da14 = data.map(elem => elem.D_above_14yo);
        var da49 = data.map(elem => elem.D_above_49yo);
        var da69 = data.map(elem => elem.D_above_69yo);
        // console.log(db5)
        
        // age dropdown
        var ageOptions = ["Under 5", "5-14", "15-49", "50-69", "Over 70"]
        
        d3.select("#selAge")
            .selectAll('myOptions') //create class 
            .data(ageOptions)
            .enter()
            .append('option')
            .text(function (d) { return d; }) // text showed in the dropdown
            .attr("value", function (d) {return d;})
        });

        // Event listener for age dropdown selection 
        d3.select("#selAge").on("change", function(selectedOption) {
            
            var selectedOption = d3.select(this).property("value")
            console.log(selectedOption); 
            
            // filtData = data.filter(data => data.category == selectedOption);
            // console.log(filtData);

            // // RUN FUNCTIONS // 
            updateMap(selectedOption); 
            // updateTable(); // The code for this function is located in 3_table.js file

        

        // function updateMap(selectedGroup){

            


            
        // }
    });
};

updateMap();
