 /* CONSTANTS AND GLOBALS */
 const width = window.innerWidth * 0.7,
   height = window.innerHeight,
   margin = { top: 20, bottom: 50, left: 60, right: 60 };

/* LOAD DATA */
d3.csv('../data/populationOverTime.csv', d => {
  return {
     year: new Date(+d.Year, 0, 1), //changes format to javascript date
     country: d.Entity,
     population: +d.Population //Population changed to number format 
  }
}).then(data => {
  console.log('data :>> ', data);

  // SCALES
  const Xscale = d3.scaleTime()
    .domain(d3.extent(data, d => d.year))
    .range([margin.left, width-margin.right])

  const yScale =  d3.scaleLinear()
    .domain(d3.extent(data, d => d.population))
    .range([height - margin.bottom, margin.top])

  // CREATE SVG ELEMENT
  const svg =d3.select("#container")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .style("background-color", "aliceblue")

  // BUILD AND CALL AXES
const xAxis = d3.axisBottom(xScale)
  .ticks(6)

const xAxisGroup = svg.append("g")
  .attr("class", "xAxis")
  .attr("transform", `translate(${0},${height - margin.bottom})`)
  .call(xAxis)

xAxisGroup.append("text")
  .attr("class", 'xLabel')
  .attr("transform", `translate(${width / 2}, ${35})`)
  .text("Year"



  // LINE GENERATOR FUNCTION

  // DRAW LINE

});