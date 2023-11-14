/* CONSTANTS AND GLOBALS */
const width = window.innerWidth * 0.9,
height = window.innerHeight * 0.7,
margin = { top: 20, bottom: 50, left: 60, right: 40 };

/**
* LOAD DATA
* Using a Promise.all([]), we can load more than one dataset at a time
* */
Promise.all([
d3.json("../data/world.json"),
d3.csv("../data/MoMA_nationalities.csv", d3.autoType),
//d3.json("../data/usState.json"),
//d3.csv("../data/stateCapitals.csv", d3.autoType),
]).then(([geojson, nationalities]) => {


console.log('geojson, nationalities', geojson, nationalities)


const svg = d3.select("#container")
 .append("svg")
 .attr("height", height)
 .attr("width", width)
 .style("background-color", "pink")
// SPECIFY PROJECTION
const projection = d3.geoNaturalEarth1()
.fitSize([width, height], geojson)

// DEFINE PATH FUNCTION
const pathGenFn = d3.geoPath().projection(projection)
//console.log(path)

// APPEND GEOJSON PATH  
const countries = svg
.selectAll("path.name")
.data(geojson.features)
.enter()
.append("path")
.attr("class", "name")
.attr("d", pathGenFn)
.attr("stroke", "transparent")
.attr("fill", d => nationalities.map(entry => entry.Country).includes(d.properties.name) ? "purple" : "green");
;

});
//testddd