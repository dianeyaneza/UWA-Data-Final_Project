
d3.json('/wmhdata').then(function(data) {
    // console.log(data);
    var data = data;

    var ageOptions = ["Under 5", "5-14", "15-49", "50-69", "Over 70"]
    d3.select("#selAge")
        .selectAll('myOptions') //create class 
        .data(ageOptions)
        .enter()
        .append('option')
        .text(function (d) { return d; }) // text showed in the dropdown
        .attr("value", function (d) {return d;})

    d3.select("#selAge").on("change", function(selectedOption) {
        
        var selectedOption = d3.select(this).property("value")
        console.log(selectedOption); 
        
        // filtData = allData.filter(allData => allData.category == selectedOption);
        // console.log(filtData);

        // // RUN FUNCTIONS // 
        updateMap(selectedOption); 
        // updateTable(); // The code for this function is located in 3_table.js file

    });

    function updateMap(selectedGroup){
    }
})
