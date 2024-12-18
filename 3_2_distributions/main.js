/* CONSTANTS AND GLOBALS */
const width = window.innerWidth * 0.7,
height = window.innerHeight * 0.7,
margin = {top: 20, bottom: 60, left: 60, right: 40 },
radius = 5;

// these variables allow us to access anything we manipulate in init() but need access to in draw().
// All these variables are empty before we assign something to them.
let svg;
let xScale;
let yScale;
let colorScale;

/* APPLICATION STATE */
let state = {
data: [],
selectedGender: "All" // + YOUR INITIAL FILTER SELECTION
};

/* LOAD DATA */
d3.csv("../data/MoMA_distributions.csv", d3.autoType).then(raw_data => {
// + SET YOUR DATA PATH
console.log("data", raw_data);
// save our data to application state
state.data = raw_data;
init();
});

/* INITIALIZING FUNCTION */
// this will be run *one time* when the data finishes loading in
function init() {
console.log(state)
// + SCALES
xScale = d3.scaleLinear()
 .domain([0, 1000])
 //.domain(d3.extent(state.data, d=> d.ideologyScore2020))
 .range([margin.left, width - margin.right])

yScale = d3.scaleLinear()
 .domain([0, 400])
 .range([height - margin.bottom, margin.top])

colorScale = d3.scaleOrdinal()
 .domain(["Male","Female"])
 .range(["blue", "pink"])


// + AXES
const xAxis = d3.axisBottom(xScale)
const yAxis = d3.axisLeft(yScale)

// + UI ELEMENT SETUP
const selectElement = d3.select("#dropdown") 

// An alternative way to join the element selection to the data selection
//selectElement
//.selectAll("option")
//.data([...Array.from(new Set(state.data.map(d => d.Party))), "All"])
//.join("option")
//.attr("value", d =>d)
//.text(d => d)

selectElement
 .on("change", event => {
   //console.log(event.target.value)
   state.selectedGender = event.target.value;
   draw();
 })

// + CREATE SVG ELEMENT
svg = d3.select("#container")
     .append("svg")
     .attr("width", width)
     .attr("height", height)

// + Call Axes
svg
 .append("g")
 .call(xAxis)
 .attr("transform", `translate(0,${height - margin.bottom})`)

svg
 .append("g")
 .call(yAxis)
 .attr("transform", `translate(${margin.left},0)`)


draw(); // calls the draw function
}

/*----------------- DRAW FUNCTION----------------------------- */
// we call this every time there is an update to the data/state


function draw() {

// + FILTER DATA BASED ON Gender
const filteredData = state.data
 .filter(d => state.selectedGender === "All" || state.selectedGender === d.Gender);

 console.log(filteredData);


svg.selectAll('circle.artist')
.data(filteredData, d => d.ConstituentID)
.join(
 enter => enter.append("circle")
   .attr("r", 5)
   .attr("cx", d => xScale(d.Length))
   .attr("cy", height - margin.bottom)
   .call(sel => sel
   .transition()
   .duration(900)
   .attr("r", 5)
   .attr("cy", d => yScale(d.Width))),
 update => update,
 exit => exit
   .call(sel => sel
     .transition()
     .attr("r", 0) 
     .remove()
   ),
)
.attr("class", "artist")
.transition() // Additional transition for existing elements
.duration(500)
.attr("cx", d => xScale(d.Length))
.attr("cy", d => yScale(d.Width))
.style("fill", d => colorScale(d.Gender))
.attr("r", 5)
.attr("opacity", 1);
}






//
 // 

//const dot = svg
 //.selectAll("circle")
 //.data(filteredData, d => d.BioID)
 //.join(
   // + HANDLE ENTER SELECTION
   //enter => enter,

   // + HANDLE UPDATE SELECTION
   //update => update,

   // + HANDLE EXIT SELECTION
   //exit => exit
 //);
