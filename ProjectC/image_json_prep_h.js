/*
 * Note that this function uses *synchronous* JavaScript
 * There is a 2-second (2000 milliseconds) timer after which the JSON will be downloaded
 * so if the API calls are not finished by then, the JSON will only have the ones that did finish.
 * You can increase the timer if you need to.
 
 */
/* global searchAllURL*/
// if you are running this locally, you will need to npm install request and dotenv
// load a default library that lets us read/write to the file system
const fs = require('fs');
// load a default library that lets us make HTTP requests (like calls to an API)
const request = require('request');
// load dotenv for the purpose of storing our api key
// create a .env file
// store your api key (ex. API_KEY="abcdefghijk")
// make sure to put your .env file in your .gitignore
const dotenv = require('dotenv');

// getting our api key from .env
dotenv.config();
const API_KEY = process.env.API_KEY;
//console.log(API_KEY);
// endpoint URL
const searchBaseURL = "https://api.si.edu/openaccess/api/v1.0/search";
// our search term
const search =  `online_media_type:"Images" AND object_type:"Paintings" AND culture:"Chinese" AND unit_Code: "FSG"`;


// url we'll use to make our call
const url = `${searchBaseURL}?api_key=${API_KEY}&q=${search}`;


// get objects by search term
function fetchSearchData(url) {


  request(url, function(error, response, body) {
    console.error('error:', error); // print the error if one occurred
    console.log('statusCode:', response && response.statusCode); // print the response status code if a response was received
    let obj = JSON.parse(body);
    console.log(obj);

    // if there are more than 1000 objects, paginate
    // you can change the pageSize
    let pageSize = 1000;
    let rowCount = 1000;
    let numberOfQueries = Math.ceil(obj.response.rowCount / pageSize);
    console.log(numberOfQueries);
    for(let i = 0; i < numberOfQueries; i++) {
      // making sure that our last query calls for the exact number of rows
      if (i == (numberOfQueries - 1)) {
        searchAllURL = url + `&start=${i * pageSize}&rows=${obj.response.rowCount - (i * pageSize)}`;
      } else {
        searchAllURL = url + `&start=${i * pageSize}&rows=${pageSize}`;
      }
      
      fetchUrl(searchAllURL);
    }
  })
}

// set up empty Array for us to save results to
var myArray = [];

function fetchUrl(searchAllURL){
  request(searchAllURL, function (error, response, body) {
    console.error('error:', error); // print the error if one occurred
    console.log('statusCode:', response && response.statusCode); // print the response status code if a response was received

    let obj = JSON.parse(body);

    // here we are constructing our own object with just the information we need
    // first we filter out the objects that do not have the information we need (change accordingly)
    // after the objects are filtered, we map our objects and construct a new object

    let objects = obj.response.rows.filter(data => {
      
      // by default we assume we have complete data
      var dataComplete = true;
      
      // Test if images exist
      if(data.content.descriptiveNonRepeating.online_media ==undefined
        || data.content.descriptiveNonRepeating.online_media.media ==undefined
        ||  data.content.descriptiveNonRepeating.online_media.media[0] ==undefined
        || data.content.descriptiveNonRepeating.online_media.media[0].content ==undefined
        // || data.content.descriptiveNonRepeating.online_media.media[0].resources[1] ==undefined
      )dataComplete = false;

      // Test if we have a date value
      if(data.content.indexedStructured.date ==undefined)dataComplete=false;

      return dataComplete;
    
    }).map((data) => {
      
      var dimension = data.content.freetext.physicalDescription.filter((element) => {
        return element.label == "Dimensions";
      })[0].content;
      console.log(dimension);
      dimension = dimension.substring(dimension.lastIndexOf(": ")+1,dimension.lastIndexOf(" cm")).split(" x ");
      console.log(dimension);

      var height = Number(dimension[0]);
      var width = Number(dimension[1]);
      if ( height > width) {
        
        let filename = data.content.descriptiveNonRepeating.online_media.media[0].content.split('=').pop();
        
        // change the size of the images you are downloading
        // imgSizeParam can be max or max_w to force width or max_h to force height
        // primary image url should be the image delivery service url ex) https://ids.si.edu/ids/deliveryService?id=FS-5461_07
  
        let imgSizeParam = "max_w";
        let imgSizeValue = 600;
        
      // var topic = data.content.indexedStructured.topic;
      // console.log(data.content.freetext.name);
        return { 
          objectID: data.id,
          title: data.title,
          //period:data.period,
          topic:data.content.indexedStructured.topic,
          date: data.content.indexedStructured.date[0],
          // artist: data.content.freetext.name.content.Artist,
          primaryImage: data.content.descriptiveNonRepeating.online_media.media[0].content + `&${imgSizeParam}=${imgSizeValue}`,
          filename: filename.includes(".jpg") ? filename : filename + ".jpg" // if the filename we defined above doesn't include .jpg add it at the end
        };
      } else {
        //console.log("hello world");
      }
      

    });
  
    myArray.push(objects.filter(n => n));
    
    // if there are more objects than the pageSize myArray will look like this: [[...objects], [...objects]]
    // we use [].concat to flatten out myArray to be a one-dimensional array
    myArray = [].concat(...myArray);
    console.log(myArray.length);
  });
}

// calling our function
fetchSearchData(url);

// // the function inside the setTimeout saves myResults to a JSON
// // it will automatically run after 5000 ms
setTimeout(() => {
    fs.writeFileSync('./image_h.json', JSON.stringify(myArray), 'utf8');
}, 5000);



var myObject = ('./image_h.json')
