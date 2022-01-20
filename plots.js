//Taken and helped from Dom's office hour session December 11th

console.log("This is plot.js")

function DrawBarchart(sampleId) {
    console.log(`DrawBarchart(${sampleId})`);
    //read the data
    d3.json("samples.json").then(data => {

        let samples = data.samples;
        let resultArray = samples.filter(s => s.id === sampleId);
        let result = resultArray[0];

        console.log(result)
        //grab the results to turn to variables /handles
        let otu_ids = result.otu_ids;
        let otu_lables = result.otu_labels;
        let sample_values = result.sample_values;
        let yticks = otu_ids.slice(0,10).map(otuId => `OTU${otuId}`).reverse();

        // defining the parameters
        let barData = {
            x: sample_values.slice(0, 10).reverse(),
            y: yticks,
            type: "bar",
            text: otu_lables.slice(0, 10).reverse(),
            orientation: "h",
        };
        //the trace that chart's setup will be
        let barArray = [barData];
        //the layout of the chart
        let barLayout = {
            title: "Top 10 Bacteria Cultures Found",
            margin: {t: 30, l: 150}
        }

        Plotly.newPlot("bar", barArray, barLayout);
    });
}

//repeat the bar chart that Dom showed in class and slightly adjuct for bubble chart variab;es

function DrawBubblechart(sampleId) {
    console.log(`drawBubbleChart(${sampleId})`);
    //read the data
    d3.json("samples.json").then(data => {

        let samples = data.samples;

        let resultArray = samples.filter(s => s.id === sampleId);
        let result = resultArray[0];

        //grab the results to turn to variables /handles
        let otu_ids = result.otu_ids;
        let otu_labels = result.otu_labels;
        let sample_values = result.sample_values;


        // Define the bubble chart data traces
        let BubbleData = {
            x: otu_ids,
            y: sample_values,
            mode: "markers",
            marker: {
                size: sample_values,
                color: otu_ids,
                colorscale: 'RdBu'
            },
            text: otu_labels,

        };

        //the trace that chart's setup will be
        let BubbleArray = [BubbleData];

        // defining the parameters
        let bubbleLayout = {
            title: "Bacteria Cultures per Sample",
            margin: {t: 0},
            xaxis: {title: "OTU ID"},
            showlegend: false,
            height: 500,
            margin: {t: 30}
        }

        //the layout of the chart
        Plotly.newPlot("bubble", BubbleArray, bubbleLayout);
    });

}
//this was the trickeist setup at least for me
function DemoBoxData(sampleId) {
    console.log(`popDemogData(${sampleId})`);

    //read the data
    d3.json("samples.json").then(data => {

        let metadata = data.metadata;

        // similar function that we did for previous charts to get the specific results that we want
        let resultArray = metadata.filter(s => s.id.toString() === sampleId);
        let result = resultArray[0];

        // Grab the element 
        let panel = d3.select("#sample-metadata");

        // Empty the panel
        panel.html("");

        // Create a list with all relevant data
        let list = panel.append("ul");

        // Add a list item for each metadata point
        Object.entries(result).forEach(([key, value]) => {
            let item = list.append("li");
            item.text(`${key}: ${value}`);
        });

    });

}


function ShowMetadata(sampleId) {
    console.log(`ShowMetadata(${sampleId})`);
}

//when selecting different datasets this option will change and change the dashboard
function optionChanged(id) {
    console.log(`optionChanged(${id})`);

    DrawBarchart(id);
    DrawBubblechart(id);
    ShowMetadata(id);
    DemoBoxData(id);
}
// the intial set up the data getting run through for the website
function InitDashboard()
{
    console.log("Initilizing dashboard")

    let selector = d3.select("#selDataset");

    d3.json("samples.json").then(data=> {

        let sampleNames = data.names;

        sampleNames.forEach(sampleId => {

            selector.append("option")
                .text(sampleId)
                .property("value", sampleId);

        });

        let sampleId = sampleNames[0];

        DrawBubblechart(sampleId);
        DrawBubblechart(sampleId);
        ShowMetadata(sampleId);
        DemoBoxData(sampleid);
    });
}

InitDashboard();

