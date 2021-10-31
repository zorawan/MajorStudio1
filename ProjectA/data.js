/* global d3*/
/* global fetch*/

// Smithsonian API example code
// check API documentation for search here: http://edan.si.edu/openaccess/apidocs/#api-search-search

// put your API key here;
const API_KEY = 'H9sDGWfc38fa6QB8jQ7O2Pb20ZbPzeHWtgVD4psd';


// search base URL
const searchBaseURL = "https://api.si.edu/openaccess/api/v1.0/search";

// Constructing the search query
const search =  `"Velva E. Rudd" AND unit_Code: "NMNHBOTANY" AND online_media_type:"Images"`;

var tax_order_array = {};
var tax_class_array = {};
var tax_family_array = {};
var total = 0;
var geoLocation = [];

// https://collections.si.edu/search/results.htm?q=Flowers&view=grid&fq=data_source%3A%22Cooper+Hewitt%2C+Smithsonian+Design+Museum%22&fq=online_media_type%3A%22Images%22&media.CC0=true&fq=object_type:%22Embroidery+%28visual+works%29%22
var fs = require("fs");
var got = require('got');

// search: fetches an array of terms based on term category
function fetchSearchData(searchTerm, start) {
    var count = 1000;
    let url = encodeURI(searchBaseURL + "?api_key=" + API_KEY + "&q=" + searchTerm + "&rows=" + count + "&start=" + start);
    console.log(url);

    async function getData() {
        try{
  
  	            const response = await got(url);
        		let data = JSON.parse(response.body);
        		 console.log(data);
        		var array = data["response"]["rows"];
                fs.writeFileSync('./data.json', JSON.stringify(array), 'utf8');
        	
    }
    catch (error) {
        console.log(error);
    }
    }
 getData();

}

fetchSearchData(search, 0);

