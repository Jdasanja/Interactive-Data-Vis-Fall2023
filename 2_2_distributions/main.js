/* CONSTANTS AND GLOBALS */
   const width = window.innerWidth * 0.7,
   height = window.innerHeight * 0.7 ,
   margin = { top: 20, bottom: 60, left: 60, right: 40 }
   const minRadius = 0; 
   const maxRadius = 90;

/* LOAD DATA */
d3.csv('../data/MoMA_distributions.csv', d3.autoType).then(data => { console.log(data)

    /* SCALES */
  const xScale = d3.scaleLinear()
    .domain([d3.min(data, d => d['Length (cm)']), d3.max(data, d => d['Length (cm)'])])
    .range([margin.left, width - margin.right])
    
  const yScale = d3.scaleLinear()
      .domain([d3.min(data,d => d['Width (cm)']), d3.max(data,d => d['Width (cm)'])])
      .range([height - margin.bottom, margin.top])
  
  const artistLifespanScale = d3.scaleSqrt()
      .domain([0, d3.max(data, d => d['Artist Lifespan'])])
      .range([minRadius, maxRadius]);
  
  const xAxis = d3.axisBottom(xScale)
  const yAxis = d3.axisLeft(yScale)

    
    /* HTML ELEMENTS */
  const svg = d3.select("#container")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    
    // axis scales

    svg.append("g")
      .attr("transform", `translate(${0},${height - margin.bottom})`)
      .call(selection => selection.call(xAxis))
    
      svg.append("g")
        .attr("transform", `translate(${margin.left},${0})`)
        .call(selection => selection.call(yAxis))

        
  //circles
  svg.selectAll("circle.senator")
    .data(data, d => d.Title)
    .join("circle")
    .attr("class", "senator")
    .attr("id", d =>d.Title)
    .attr("r", d => artistLifespanScale(d['Artist Lifespan']) / 4)
    .attr("cx", d =>  xScale(d['Length (cm)']))
    .attr("cy", d => yScale(d['Width (cm)']))
    .style("fill", "steelblue") 
    .style("stroke", "black")    
    .style("stroke-width", 1)    
    .style("fill-opacity", 0.7); 
  });