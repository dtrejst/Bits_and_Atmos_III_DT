async function readJson(path) {
  const response = await fetch(path);
  const data = await response.json();
  return data;
}

async function init() {
  // json file generated with https://csvjson.com/csv2json
  const data = await readJson('future_cities_data.json');
  let sourceData = data.map((d) => {
    return {
      cityName: d['current_city'],
      warmestMonth: d['Max_Temperature_of_Warmest_Month'],
      coldestMonth: d [ 'Min_Temperature_of_Coldest_Month'],
    };
  });

  console.log('sourceData: ', sourceData);

  const Ydisplacement = 200;
  const circlesXcoordinate = 100;
  const dataValueScaling = 2.2;

  // Create canvas
  const svg = d3 // Variable linking to D3 library
    .select('#d3') // Selects ID from html file
    .append('svg') // Creates svg
    .attr("width", 2000) // Width of svg
    .attr("height", 20000); // Height of svg

  // enters data into function
  const circlesWarmest = svg.selectAll('circlesWarmest').data(sourceData).enter();
  const circlesColdest = svg.selectAll('circlesColdest').data(sourceData).enter();
  const textLabel = svg.selectAll('textLabel').data(sourceData).enter();
  const lines = svg.selectAll('lines').data(sourceData).enter();
//draw lines between the cold and warm circels 
  lines
  .append('line')
  .style("stroke", "black")
  .style("stroke-width", 1)
  .attr("x1", 100)
  .attr("y1",(value,index) => {
    return index * Ydisplacement + circlesXcoordinate;
   })
  .attr("x2", 1090)
  .attr("y2",(value,index) => {
    return index * Ydisplacement + circlesXcoordinate;
   });
svg.append('text')
.attr('x', 50)
.attr('y', 40)
.attr('id', 'textColorCold')
.text('Coldest month of the year');
svg.append('text')
.attr('x', 1000)
.attr('y', 40)
.attr('id', 'textColorWarm')
.text('Warmest month of the year');
  // Creates circles for Warmest temperature
  circlesWarmest
    .append('circle')
    .attr('cx', (value, index) => {
      return  circlesXcoordinate + 1000;
    })
    .attr('cy', (value,index) => {
      return index * Ydisplacement + circlesXcoordinate;
    })
    .attr('r', (value, index) => {
      return value.warmestMonth * dataValueScaling;
    })
    .attr('id', 'colorSecondary');

  // Creates circles for Coldest temperature
  circlesColdest
    .append('circle')
    .attr('cx', (value, index) => {
      return  circlesXcoordinate;
    })
    .attr('cy', (value,index) => {
      return index * Ydisplacement + circlesXcoordinate;
    })
    .attr('r', (value, index) => {
      return Math.abs(value.coldestMonth) * dataValueScaling;
    })
    .attr('id', 'colorMain');

  // Create text labels
  textLabel
    .append('text')
    .attr('x', 500)
    .attr('y', (value,index) => {
      return index * Ydisplacement + circlesXcoordinate;
    })
    .attr('id', 'textColorMain')
    .text((value, index) => {
      return value.cityName;
    })
// Create lines


}




init();