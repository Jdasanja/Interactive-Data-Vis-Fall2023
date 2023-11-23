/* CONSTANTS AND GLOBALS */
const width = window.innerWidth * 0.7,
height = window.innerHeight * 0.7,
margin = {top: 20, bottom: 60, left: 60, right: 40 },
radius = 5;

// // since we use our scales in multiple functions, they need global scope
let xScale; 
let yScale;
let svg;
let color;
color = d3.scaleOrdinal(d3.schemeAccent);

/* APPLICATION STATE */
let state = {
   data: [],
   selectedNationality: "All"
};

/* LOAD DATA */
d3.csv('../data/MoMA_topTenNationalities.csv', d3.autoType).then(raw_data => {
  console.log("data", raw_data);
  // save our data to application state
  state.data = raw_data;
  init();
});

/* INITIALIZING FUNCTION */
// this will be run *one time* when the data finishes loading in
function init() {
  /* SCALES */
  xScale = d3.scaleLinear() 
    .domain([0, 1500])
    .range([0, width])

  yScale = d3.scaleBand() 
    .domain(["Nationality","American","German","British","French", "Italian","Japanese","Swiss","Dutch", "Russian", "Austrian"])
    .range([height, 0])
  

  svg =d3.select("#container")
    .append("svg")
    .attr("height", height)
    .attr("width", width)
    .style("background-color", "aliceblue")

  const xAxis = d3.axisBottom(xScale)
  const yAxis = d3.axisLeft(yScale)

  draw(); // calls the draw function
}

/* DRAW FUNCTION */
// we call this every time there is an update to the data/state
function draw() {
  console.log(svg)
  console.log(color)
  /* HTML ELEMENTS */
  //const color = d3.scaleOrdinal(d3.schemeAccent);
  //bars
  const bars = svg.selectAll("rect.bar")
  .data(state.data)
  .join("rect")
  .attr("class", "bar")
  .attr("x", 0)
  .attr("y", d => yScale(d.Nationality))
  .attr("height", yScale.bandwidth()) // Set the width based on scale bandwidth
  .attr("width", d => xScale(d.Count))
  .style("fill", d => color(d.Nationality)); 

   // x-axis scale
   svg.selectAll("text")
    .data(state.data)
    .enter()
    .append("text")
    .attr("x", 0)
    .attr("y", d => yScale(d.Nationality) + 25)
    .text(d => d.Nationality)
    .style("text-anchor", "start");


}