"use strict";

// dependencies
const fs = require('fs'),
      querystring = require('querystring');

var topic = [];

function wordFreq(string) {
  var rawFile = new XMLHttpRequest();
  rawFile.open(string, false);
  fs.readFile("./image.json", "utf8", (err, data) => {
    if (err) console.log(err);
    JSON.parse(data).forEach(e => {
     return e.date;
     
    });
console.log(wordFreq);
  });
}




// const wordOrder = new Map([...freq.entries()].sort((a, b) => b[1] - a[1]));
// console.log(wordOrder);