console.log("This is plot.js")

function DrawBarchart(sampleId) {
    console.log(`DrawBarchart(${sampleId})`);
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

        console.log(data);

        let sampleNames = data.names;

        sampleNames.forEach(sampleId => {

            selector.append("option")
                .text(sampleId)
                .property("value", sampleId);

        });
    });
}

InitDashboard();