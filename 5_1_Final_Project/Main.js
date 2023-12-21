/* CONSTANTS AND GLOBALS */
const width = window.innerWidth *.6; // Set the width to your desired value
const height = window.innerHeight *.6;
const marginBottom = 40; // Adjust this margin as needed for your labels

// // since we use our scales in multiple functions, they need global scope
let xScale; 
let yScale;
let svg;
let color;
let continents;
let xAxis;
let yAxis;
/* APPLICATION STATE */
let state = {
    data: [],
    selectedDateRange: "All" // + YOUR INITIAL FILTER SELECTION
    };


/* LOAD DATA */
d3.csv('../data/Continents_final.csv', d3.autoType).then(raw_data => {
  console.log("data", raw_data);
  // save our data to application state
  state.data = raw_data;
  init();
});

/* INITIALIZING FUNCTION */
// this will be run *one time* when the data finishes loading in
  function init() {
    /* SCALES */
    /** This is where you should define your scales from data to pixel space */
    xScale = d3.scaleLinear() 
    .domain([0, 5000])
    .range([0, width])
    
            
    yScale = d3.scaleBand() 
    .domain(["Continent","NorthAmerica","Europe","Asia","SouthAmerica", "Oceania","Africa"])
    .range([height, 0])
      
    /* HTML ELEMENTS */
    //svg
    svg =d3.select("#container")
      .append("svg")
      .attr("height", height)
      .attr("width", width)
      .style("background-color", "aliceblue")
    xAxis = d3.axisBottom(xScale)
    yAxis = d3.axisLeft(yScale)

  // + UI ELEMENT SETUP
const selectElement = d3.select("#dropdown") 

selectElement
 .on("change", event => {
   //console.log(event.target.value)
   state.selectedDateRange = event.target.value;
      draw(); // calls the draw function
  })
  }
//bars
function draw() {
  const filteredData = state.data
    .filter(d => state.selectedDateRange === "All" || state.selectedDateRange === d.DateRange);

  continents = Array.from(new Set(filteredData.map(d => d.Continent)));
  color = d3.scaleOrdinal().domain(continents).range(d3.schemeSet1);

  // Update the domain of xScale based on the maximum value of Continent_Count_By_Date_Range in the filtered data
  xScale.domain([0, d3.max(state.data, d => d.Continent_Count_By_Date_Range)]);


  // Update bars
  svg.selectAll("rect.bar")
    .data(filteredData, d => d.Continent)
    .join(
      enter => enter.append("rect")
        .attr("class", "bar")
        .attr("x", 0)
        .attr("y", d => yScale(d.Continent))
        .attr("height", yScale.bandwidth())
        .attr("width", 0)
        .style("fill", d => color(d.Continent))
        .call(enter => enter
          .transition()
          .duration(900)
          .attr("width", d => xScale(d.Continent_Count_By_Date_Range))
          .attr("y", d => yScale(d.Continent))
        ),
      update => update
        .call(update => update
          .transition()
          .duration(900)
          .attr("width", d => xScale(d.Continent_Count_By_Date_Range))
          .attr("y", d => yScale(d.Continent))
        ),
      exit => exit
        .call(sel => sel
          .transition()
          .duration(900)
          .attr("width", 0)
          .remove()
        )
    );

  // Update text elements
  svg.selectAll("text")
    .data(filteredData)
    .join(
      enter => enter.append("text")
        .attr("x", 0)
        .attr("y", d => yScale(d.Continent) + 25)
        .text(d => d.Continent)
        .style("text-anchor", "start"),
      update => update
        .call(update => update
          .attr("y", d => yScale(d.Continent) + 25)
          .text(d => d.Continent)
          .style("text-anchor", "start")
        ),
      exit => exit
        .call(sel => sel.remove())
    );
}

//-----------------------------------------------------Count-of-Artists-born-in-Each-Continent-Table-----------------------------------------------------------//
/* CONSTANTS AND GLOBALS */
const widthtext = window.innerWidth * 0.6; // Set the width to your desired value
const heightext = window.innerHeight * 0.6;
const marginBottomtext = 40;

let table;
let thead;
let tbody;
/* APPLICATION STATE */
let statetext = {
  data: [],
  selectedDateRange: "All" // + YOUR INITIAL FILTER SELECTION
};

d3.csv('../data/Continents_Final.csv', d3.autoType).then(raw_datatext => {
  console.log("data", raw_datatext);
  // save our data to application state
  statetext.data = raw_datatext;
  initext();
});

function initext() {
  function tabulate(data, columns) {
    // Sort the data in descending order based on 'Continent_Count_By_Date_Range'
    data.sort((a, b) => b['Continent_Count_By_Date_Range'] - a['Continent_Count_By_Date_Range']);
  
    var table = d3.select('#containertext').append('table');
    var thead = table.append('thead');
    var tbody = table.append('tbody');
  
    // append the header row
    thead.append('tr')
      .selectAll('th')
      .data(columns).enter()
      .append('th')
      .text(function (column) { return column; });
  
    // create a row for each object in the data
    var rows = tbody.selectAll('tr')
      .data(data)
      .enter()
      .append('tr');
  
    // create a cell in each row for each column
    var cells = rows.selectAll('td')
      .data(function (row) {
        return columns.map(function (column) {
          return { column: column, value: row[column] };
        });
      })
      .enter()
      .append('td')
      .text(function (d) { return d.value; });
  
    return table;
  }
  
              
  // + UI ELEMENT SETUP
  const selectElementext = d3.select("#dropdowntext");

  selectElementext
    .on("change", event => {
      //console.log(event.target.value)
      statetext.selectedDateRange = event.target.value;
      draw(); // calls the draw function
    });

    function draw() {
      // Clear the existing table
      d3.select('#containertext').select('table').remove();
    
      const filteredDatatext = statetext.data
        .filter(d => statetext.selectedDateRange === "All" || statetext.selectedDateRange === d.DateRange);
    
      // Render the new table
      tabulate(filteredDatatext, ['Continent', 'DateRange', 'Continent_Count_By_Date_Range']); // 3 column table
    }
    
  }
//--------------------------------------------------------------------------------------------------------------------------------------
//---------------------------------------------------GRAPH-TWO--------------------------------------------------------------------------
/* CONSTANTS AND GLOBALS */
const widthtwo = window.innerWidth * 0.6; 
const heightwo = window.innerHeight * 0.6;
const marginBottomtwo = 20; // Adjust this margin as needed for your labels


let xScaletwo; 
let yScaletwo;
let svgtwo;
let colortwo;
let continentstwo;
let xAxistwo;
let yAxistwo;


let statetwo = {
  data: [],
  selectedDateRange: "All" // + YOUR INITIAL FILTER SELECTION
  };

/* LOAD DATA */
d3.csv('../data/Region_Final.csv', d3.autoType).then(raw_datatwo => {
  console.log("datatwo", raw_datatwo);
  // save our data to application state
  statetwo.data = raw_datatwo;
  initwo();
});

/* INITIALIZING FUNCTION */
// this will be run *one time* when the data finishes loading in
function initwo() {
  xScaletwo = d3.scaleLinear() 
  .domain([0, 8000])
  .range([0, widthtwo])

  yScaletwo = d3.scaleBand() 
    .domain(["Region","West","NonWest"])
    .range([heightwo, 0])
}

    /* HTML ELEMENTS */
    //svg
    svgtwo =d3.select("#containertwo")
      .append("svg")
      .attr("height", heightwo)
      .attr("width", widthtwo)
      .style("background-color", "aliceblue")

    xAxistwo = d3.axisBottom(xScaletwo)
    yAxistwo = d3.axisLeft(yScaletwo)
  
    // + UI ELEMENT SETUP
const selectElementwo = d3.select("#dropdowntwo") 

selectElementwo
 .on("change", event => {
   //console.log(event.target.value)
   statetwo.selectedDateRange = event.target.value;
      drawtwo(); // calls the draw function
  })  

  //bars
function drawtwo() {
  const filteredDatatwo = statetwo.data
    .filter(d => statetwo.selectedDateRange === "All" || statetwo.selectedDateRange === d.DateRange);

  regions = Array.from(new Set(filteredDatatwo.map(d => d.Region)));
  colortwo = d3.scaleOrdinal().domain(regions).range(d3.schemeSet1);

  // Update the domain of xScale based on the maximum value of Continent_Count_By_Date_Range in the filtered data
  xScaletwo.domain([0, d3.max(statetwo.data, d => d.Continent_Count_By_Date_Range)]);


// Update bars
  svgtwo.selectAll("rect.bar")
    .data(filteredDatatwo, d => d.Region)
    .join(
      enter => enter.append("rect")
        .attr("class", "bar")
        .attr("x", 0)
        .attr("y", d => yScaletwo(d.Region))
        .attr("height", yScaletwo.bandwidth())
        .attr("width", 0)
        .style("fill", d => colortwo(d.Region))
        .call(enter => enter
          .transition()
          .duration(900)
          .attr("width", d => xScaletwo(d.Continent_Count_By_Date_Range))
          .attr("y", d => yScaletwo(d.Region))
        ),
      update => update
        .call(update => update
          .transition()
          .duration(900)
          .attr("width", d => xScaletwo(d.Continent_Count_By_Date_Range))
          .attr("y", d => yScaletwo(d.Region))
        ),
      exit => exit
        .call(sel => sel
          .transition()
          .duration(900)
          .attr("width", 0)
          .remove()
        )
    );

  // Update text elements
  svgtwo.selectAll("text")
    .data(filteredDatatwo)
    .join(
      enter => enter.append("text")
        .attr("x", 0)
        .attr("y", d => yScaletwo(d.Region) + 25)
        .text(d => d.Region)
        .style("text-anchor", "start"),
      update => update
        .call(update => update
          .attr("y", d => yScaletwo(d.Region) + 25)
          .text(d => d.Region)
          .style("text-anchor", "start")
        ),
      exit => exit
        .call(sel => sel.remove())
    );
}

//-----------------------------------------------------Count-of-Artists-born-in-Each-Region-Table-----------------------------------------------------------//
/* CONSTANTS AND GLOBALS */
const widthtextwo = window.innerWidth * 0.6; // Set the width to your desired value
const heightextwo = window.innerHeight * 0.6;
const marginBottomtextwo = 40;

let tabletwo;
let theadtwo;
let tbodytwo;

/* APPLICATION STATE */
let statetextwo = {
  data: [],
  selectedDateRange: "All" // + YOUR INITIAL FILTER SELECTION
};

d3.csv('../data/Region_Final.csv', d3.autoType).then(raw_datatextwo => {
  console.log("datatextwo", raw_datatextwo);
  // save our data to application state
  statetextwo.data = raw_datatextwo;
  initextwo();
});

function initextwo() {
  function tabulate(data, columns) {
    // Sort the data in descending order based on 'Continent_Count_By_Date_Range'
    data.sort((a, b) => b['Continent_Count_By_Date_Range'] - a['Continent_Count_By_Date_Range']);

    var tabletwo = d3.select('#containertextwo').append('table');
    var theadtwo = tabletwo.append('thead');
    var tbodytwo = tabletwo.append('tbody');

    // append the header row
    theadtwo.append('tr')
      .selectAll('th')
      .data(columns).enter()
      .append('th')
      .text(function (column) { return column; });

    // create a row for each object in the data
    var rows = tbodytwo.selectAll('tr')
      .data(data)
      .enter()
      .append('tr');

    // create a cell in each row for each column
    var cells = rows.selectAll('td')
      .data(function (row) {
        return columns.map(function (column) {
          return { column: column, value: row[column] };
        });
      })
      .enter()
      .append('td')
      .text(function (d) { return d.value; });

    return tabletwo;
  }

  /* UI ELEMENT SETUP */
  const selectElementextwo = d3.select("#dropdowntextwo");

  selectElementextwo
    .on("change", event => {
      statetextwo.selectedDateRange = event.target.value;
      drawtextwo(); // calls the draw function
    });

  function drawtextwo() {
    // Clear the existing table
    d3.select('#containertextwo').select('table').remove();

    const filteredDatatextwo = statetextwo.data
      .filter(d => statetextwo.selectedDateRange === "All" || statetextwo.selectedDateRange === d.DateRange);

    // Render the new table
    tabulate(filteredDatatextwo, ['Region', 'DateRange', 'Continent_Count_By_Date_Range']); // 3 column table
  }
}


//--------------------------------------------------------------------------------------------------------------------------------------------------------------//
//--------------------------------------------------------Cluster-Map-------------------------------------------------------------------------------------------//
/* CONSTANTS AND GLOBALS */
const widththree = window.innerWidth * 0.7,
  heighthree = window.innerHeight * 0.7,
  marginthree = { top: 20, bottom: 50, left: 60, right: 40 };

// // since we use our scales in multiple functions, they need global scope
let xScalethree;
let yScalethree;
let svgthree;
let colorthree;
let continentsthree;
let xAxisthree;
let yAxisthree;
let projection;

let statethree = {
  data: [],
  geojsonData: null, // Add a property to hold geojson data
  selectedDateRange: "All" // + YOUR INITIAL FILTER SELECTION
};

/**
 * LOAD DATA
 * Using a Promise.all([]), we can load more than one dataset at a time
 */
Promise.all([
  d3.json("../data/world.json"),
  d3.csv("../data/Countries_Final.csv", d3.autoType),
]).then(([geojson, countriestwo]) => {
  console.log('geojson, countriestwo', geojson, countriestwo);

  // Save data to the application state
  statethree.data = countriestwo;
  statethree.geojsonData = geojson;

  // Call the initializing function with the loaded geojson
  inithree();

  // Call the draw function with the loaded data
  drawthree(); // Pass geojson here
});

/* INITIALIZING FUNCTION */
// this will be run *one time* when the data finishes loading in
function inithree() {
  // SPECIFY PROJECTION
  projection = d3.geoNaturalEarth1().fitSize([widththree, heighthree], statethree.geojsonData);
}

// HTML Elements
svgthree = d3.select("#containerthree")
  .append("svg")
  .attr("height", heighthree)
  .attr("width", widththree)
  .style("background-color", "#89CFF0");

// + UI ELEMENT SETUP
const selectElementhree = d3.select("#dropdownthree");

selectElementhree
  .on("change", event => {
    //console.log(event.target.value)
    statethree.selectedDateRange = event.target.value;
    drawthree(); // calls the draw function
  });

function drawthree() {
  //console.log('Selected Date Range:', statethree.selectedDateRange);
  const filteredDatathree = statethree.data
    .filter(d => statethree.selectedDateRange === "All" || statethree.selectedDateRange === d.DateRange);

  // DEFINE PATH FUNCTION
  const pathGenFn = d3.geoPath().projection(projection);

  // APPEND GEOJSON PATH  
  svgthree.selectAll("path.name")
    .data(statethree.geojsonData.features) 
    .join(
      enter => enter.append("path")
        .attr("class", "name")
        .attr("d", pathGenFn)
        .attr("stroke", "transparent")
        .attr("fill", "purple")
        .call(enterUpdate => enterUpdate
          .transition()
          .duration(900)
          .attr("fill", d => {
            const countryName = d.properties.name;
            const selectedCountry = filteredDatathree.find(entry => entry.Country === countryName);
            return selectedCountry && selectedCountry.DateRange === statethree.selectedDateRange ? "green" : "purple";
          })
        ),
      update => update
        .call(update => update
          .transition()
          .duration(900)
          .attr("fill", d => {
            const countryName = d.properties.name;
            const selectedCountry = filteredDatathree.find(entry => entry.Country === countryName);
            console.log('SelectedCountries:', selectedCountry);
            return selectedCountry && selectedCountry.DateRange === statethree.selectedDateRange ? "green" : "purple";
          })
        ),
      exit => exit
        .call(sel => sel
          .transition()
          .duration(500)
          .attr("fill", "purple")
          .remove())
    );
}
// testddd
