console.log("This is plot.js")

function DrawBarchart(sampleId) {
    console.log(`DrawBarchart(${sampleId})`);

    d3.json("samples.json").then(data => {

        let samples = data.samples;
        let resultArray = samples.filter(s => s.id === sampleId);
        let result = resultArray[0];

        console.log(result)

        let otu_ids = result.otu_ids;
        let otu_lables = result.otu_labels;
        let sample_values = result.sample_values;
        let yticks = otu_ids.slice(0,10).map(otuId => `OTU${otuId}`).reverse();

        let barData = {
            x: sample_values.slice(0, 10).reverse(),
            y: yticks,
            type: "bar",
            text: otu_lables.slice(0, 10).reverse(),
            orientation: "h",
        };
        let barArray = [barData];

        let barLayout = {
            title: "Top 10 Bacteria Cultures Found",
            margin: {t: 30, l: 150}
        }

        Plotly.newPlot("bar", barArray, barLayout);
    });
}


function DrawBubblechart(sampleId) {
    console.log(`DrawBubblechat(${sampleId})`);
}

function ShowMetadata(sampleId) {
    console.log(`ShowMetadata(${sampleId})`);
}


function optionChanged(id) {
    console.log(`optionChanged(${id})`);

    DrawBarchart(id);
    DrawBubblechart(id);
    ShowMetadata(id);
}

//Taken from dom's office hour session December 11th

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
    });
}

InitDashboard();