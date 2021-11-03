console.log('Loading...');

let meanTemp = [];
let floatTemp = [];
let latitude = [];
let floatLatitude =[];
let longitude = [];
let floatLongitude = [];
let minLatitude = 0.
let maxLatitude = 0.
let minlongitude = 0.
let maxlongitude = 0.
let city = [];

// https://p5js.org/reference/#/p5/loadTable
function preload() {
  table = loadTable('future_cities_data_truncated.csv', 'csv', 'header');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  print(table.getRowCount() + ' total rows in table');
  print(table.getColumnCount() + ' total columns in table');
  print('All cities:', table.getColumn('current_city'));
  city = table.getColumn("current_city");
  latitude = table.getColumn("Latitude");
  longitude = table.getColumn("Longitude");
  console.log(latitude, longitude);
  meanTemp = table.getColumn("Annual_Mean_Temperature"); // store the values as an array 
  
  for(let i = 0; i< meanTemp.length;i++){
  floatTemp.push(parseFloat(meanTemp[i])); // convert the array of strings to array of floats 
  floatLatitude.push(parseFloat(latitude[i]));
  floatLongitude.push(parseFloat(longitude[i]));
  
    }
     minLatitude = (Math.min(...floatLatitude)); 
     minlongitude = (Math.min(...floatLongitude));
     maxLatitude = (Math.max(...floatLatitude)); 
     maxlongitude = (Math.max(...floatLongitude));

  }
function draw() {
  background('white');
  const newX = floatLatitude.map(floatLatitude => map(floatLatitude, minLatitude, maxLatitude, 0, windowWidth));
  const newY = floatLongitude.map(floatLongitude => map(floatLongitude, minlongitude, maxlongitude, 0, windowHeight));

    for(let i = 0; i < table.getColumnCount(); i++){
circle(newX[i]-random(0.5)*2,newY[i]-random(0.5)*2, floatTemp[i]*0.9);
fill (200,0,100);
    
text(city[i],newX[i]-random(0.5)*2, newY[i]-random(0.5)*2);
textSize(11);
fill(0,0,100);  
    }
  
    } 
