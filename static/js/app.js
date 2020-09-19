// 1. Use the D3 library to read in samples.json:
// ----------------------------------------------
var names  = function() {
    d3.json('../samples.json').then(function(data) {
            var names = data.names
            names.forEach((id) => {
                d3.select('#selDataset').append('option')
                .attr('value', id).text(id)
            })
    })   
};

d3.json('../samples.json').then(function(data) {
    names()
    var s_values = data.samples[0].sample_values
    var ids = data.samples[0].otu_ids
    var idsOTU = ids.map(otu => `OTU ${otu}`)
    var hoverText = data.samples[0].otu_labels
    barPlot(idsOTU, s_values, hoverText)
    bubblePlot(ids, s_values, hoverText)
    demographics()
});

// 2. Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual:
    // Use sample_values as the values for the bar chart
    // Use otu_ids as the labels for the bar chart
    // Use otu_labels as the hovertext for the chart
// --------------------------------------------------
var barPlot = function(ids, sample_values, hovText) {
    var trace = {
        type: 'bar',
        x: sample_values.slice(0, 10).reverse(),
        y: ids.slice(0, 10).reverse(),
        text: hovText.slice(0, 10).reverse(),
        orientation: 'h'
};

    var data = [trace];

    var layout = {
            title: 'Bar chart of Top 10 OTUs',
            xaxis: {
                    title: 'OTU Count'
            },
            yaxis: {
                    categoryorder: 'total ascending'
            }

    };

    Plotly.newPlot('bar', data, layout)
};

// 3. Create a bubble chart that displays each sample:
    // Use otu_ids for the x values
    // Use sample_values for the y values
    // Use sample_values for the marker size
    // Use otu_ids for the marker colors
    // Use otu_labels for the text values
// ---------------------------------------------------
var bubblePlot = function(ids, sample_values, hovText) {
    var trace = {
        x: ids,
        y: sample_values,
        mode: 'markers',
        marker: {
            size: sample_values,
            color: ids
        },
        text: hovText
    };

    var data = [trace];

    var layout = {
        title: "Bubble chart of OTU IDs",
        xaxis: {
            title: "OTU ID"
        }
    };

    Plotly.newPlot('bubble', data, layout)
};

// 4. Display the sample metadata, i.e., an individual's demographic information:
// 5. Display each key-value pair from the metadata JSON object somewhere on the page:
// --------------------------------------------------------------------------------
