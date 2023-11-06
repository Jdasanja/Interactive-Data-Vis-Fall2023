/* CONSTANTS AND GLOBALS */
const width = window.innerWidth * 0.7,
height = window.innerHeight * 0.7,
margin = { top: 20, bottom: 50, left: 100, right: 60 };

/* LOAD DATA */
d3.csv('../data/Total_Deaths_NYC.csv', d => {
return {
  //Year: new Date(+d.Year, 0, 1), // Remove commas from Year,
  Year: +d.Year, 
  Deaths: +d.Deaths
}
}).then(data => {
console.log('data :>> ', data);

// SCALES
const xScale = d3.scaleTime() 
 .domain(d3.extent(data, d => d.Year))
 .range([margin.left, width-margin.right])
 
 

const yScale =  d3.scaleLinear()
 .domain(d3.extent(data, d => d.Deaths))
 .range([height - margin.bottom, margin.top])

// CREATE SVG ELEMENT
const svg =d3.select("#container")
 .append("svg")
 .attr("width", width)
 .attr("height", height)
 .style("background-color", "aliceblue")

// BUILD AND CALL AXES
const xAxis = d3.axisBottom(xScale).tickFormat(d3.format("d"))

const xAxisGroup = svg.append("g")
.attr("class", "xAxis")
.attr("transform", `translate(${0},${height - margin.bottom})`)
.call(xAxis)

xAxisGroup.append("text")
.attr("class", 'xLabel')
.attr("transform", `translate(${width}, ${35})`)
.text("Year") 

const yAxis = d3.axisLeft(yScale)
// .tickFormat(formatBillions)

const yAxisGroup = svg.append("g")
.attr("class", "yAxis")
.attr("transform", `translate(${margin.left}, ${0})`)
.call(yAxis)


// AREA GENERATOR FUNCTION
const areaGen = d3.area()
.x(d => xScale(d.Year))
.y0(height - margin.bottom)
.y1(d => yScale(d.Deaths));
   // Set the bottom of the area to the bottom of the chart
  ;


svg.append("path")
.datum(data)
.attr("class", "area")
.attr("d", areaGen)
.attr("fill", "#7FFFD4")
.attr("stroke", "#B22222")
.attr("stroke-width", 1.5)
;

});