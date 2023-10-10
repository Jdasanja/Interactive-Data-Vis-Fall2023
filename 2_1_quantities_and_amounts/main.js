
/* CONSTANTS AND GLOBALS */
const width = window.innerWidth *.8; // Set the width to your desired value
const height = 500;
const marginBottom = 40; // Adjust this margin as needed for your labels


/* LOAD DATA */
d3.csv('../data/MoMA_topTenNationalities.csv', d3.autoType)
  .then(data => {
    console.log("data", data)

    /* SCALES */
    /** This is where you should define your scales from data to pixel space */
    const xScale = d3.scaleLinear() 
    .domain([0, 1500])
    .range([width,0])
    
            
    const yScale = d3.scaleBand() 
    .domain(["Nationality","American","German","British","French", "Italian","Japanese","Swiss","Dutch", "Russian", "Austrian"])
    .range([height, 0])
      
    /* HTML ELEMENTS */
    //svg
    const svg =d3.select("#container")
      .append("svg")
      .attr("height", height)
      .attr("width", width)
      .style("background-color", "aliceblue")

   const color = d3.scaleOrdinal(d3.schemeAccent);
    //bars
    const bars = svg.selectAll("rect.bar")
    .data(data)
    .join("rect")
    .attr("class", "bar")
    //.attr("x", (d, i, c) => {
      //  console.log(d, i, c)
      //  return i * 100;
      //})
    .attr("x", 0)
    .attr("y", d => yScale(d.Nationality))
    .attr("height", yScale.bandwidth()) // Set the width based on scale bandwidth
    .attr("width", d => width - xScale(d.Count))
    .style("fill", color); 

     // x-axis scale
     svg.selectAll("text")
      .data(data)
      .enter()
      .append("text")
      .attr("x", 0)
      .attr("y", d => yScale(d.Nationality) + 25)
      .text(d => d.Nationality)
      .style("text-anchor", "start"); // Vertical alignment adjustment
       });

  