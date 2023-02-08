//1.Use the D3 library to read in samples.json from the URL https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json.
const url='https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json'
const dataPromise=d3.json(url);
console.log(`Data Promise:${dataPromise}`);
let datajson=d3.json(url).then(function(x){console.log(x);});
console.log(`printdata:${datajson}`);




function init() {
    //identify the dropdown html block
    var dropdown = d3.select('#selDataset');
    d3.json(url).then((x) => {
        var Names = x.names;

        Names.forEach((y) => {
            dropdown.append('option').text(y).property('value', y);
        });
        var initial = Names[0];
        schema1(initial);
        schema2(initial);
    });
}
//////end first block of function/////////////////////////////////////
//display the panel frame
  init();
//first graph//////////////////////////////////////////////////////////
//note here we have to pass the optionChanged function match the name of HTML file selData section
function optionChanged(z) {
        //update with the new data
        schema1(z);
        schema2(z);
    }

    //////////////////////finish of this block/////////////////////////////////////////
//build of Demographic panel
function schema1(w){
    d3.json(url).then((data)=>{
        var meta=data.metadata;
        var array=meta.filter(element=>element.id==w);
        var result=array[0];
        //retrive the sample metadata html code block
        var display=d3.select('#sample-metadata');
        //reset
        display.html('');
        //apend for key value pairs
        Object.entries(result).forEach(([key,value])=> {
            display.append('h6').text(`${key.toUpperCase()}:${value}`);
        });

    })
}
//display construction
function schema2(w){
    d3.json(url).then((data)=>{
        //hold sample
        var samples=data.samples;
        //get the id required
        var array=samples.filter(element=>element.id==w);
        var resultfirst=array[0];
// assign corresponding chart element to variables
        var labels=resultfirst.otu_labels.slice(0,10).reverse();
        var ids=resultfirst.otu_ids;
        var values=resultfirst.sample_values.slice(0,10).reverse();
//configure the bubble graph
var bubbleL=resultfirst.out_labels;
var bubbleV=resultfirst.sample_values;
///rank further
var yaxis=ids.map(element=>'OTU'+element).slice(0,10).reverse();
console.log(yaxis);
//create data feed for plotly
var trace=[{
    x:values,
    y:yaxis,
    type:'bar',
    orientation:'h',
    text:labels
}];
let layout={
    title:'Top 10 Bacteria Cultures Found'

    };
Plotly.newPlot('bar',trace,layout);

var bubbledata=[{
    x:ids,
    y:bubbleV,
    text:bubbleL,
    mode:'markers',
    marker:{
        size:bubbleV,
        color:bubbleV,
        // choose stylehttps://plotly.com/python/builtin-colorscales/
        colorscale:'Portland'
    }
}];

var layoutbuble={
    title: 'Bacteria Culture per Sample',
    xais: {title: 'OTU ID'},
    automargin:true,
    hovermode:'closest'
};
Plotly.newPlot('bubble',bubbledata,layoutbuble);
});
}



