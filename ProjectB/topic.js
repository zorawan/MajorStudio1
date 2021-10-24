var topic = [];

function wordFreq(string) {
  fs.readFile("./image.json", "utf8", (err, data) => {
    if (err) console.log(err);
    JSON.parse(data).forEach(e => {
     console.log(data); 
    });

  });
}

// const wordOrder = new Map([...freq.entries()].sort((a, b) => b[1] - a[1]));
// console.log(wordOrder);