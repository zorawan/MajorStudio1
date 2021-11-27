/* global d3 */
var imageFile = './image.json';

if (window.innerWidth > window.innerHeight) {
    // The user is in landscape mode!
    imageFile = './image_h.json';
    document.getElementById("app")
    .style('overflow-x', 'scroll')
    .style('overflow-y', 'hidden');
} 

var data = [];
var currentImage;

// load JSON using d3.json
d3.json(imageFile)
  .then( json => {
      // execute our 
      // display images function

        json.map(item =>  {
            item.date = parseInt(item.date.substring(0, item.date.length -1));
        });
        
       var data = json.sort( (a,b) => (a.date > b.date) ? 1 : -1 );
      displayImages(data, "#north-song", 960, 1127);
      displayImages(data, "#south-song", 1127, 1279);
      displayImages(data, "#yuan", 1279, 1368);
      displayImages(data, "#ming", 1368, 1644);
      displayImages(data, "#qing", 1644, 1911);
  }); 

// this function creates all
// of our DOM elements
function displayImages(data, root, startDate, endDate){
    // select a <div> with an id of "app"
    // this is where we want all of our
    // images to be added
    let app = d3.select(root).text('');

    var data = data.filter(item =>{
        return item.date >= startDate && item.date <= endDate;
    });

    let card = app.selectAll('div.smithsonian-card')
                .data(data)
                .join('div')
                .attr('class', 'smithsonian-card')
                .attr("id", function(d,i) { return "img_" + d.title; });


    card.append('div')
        .attr('class', 'image')
        .append('img')
        .style('width', '100%')
        .attr('src', d => {
            // all our images are in the "images"
            // folder which we will need to 
            // add to our filename first
            return './downloads/' + d.filename;
        })
       .on("mouseover", (event, itemData) => {
            //console.log(itemData.title);
            console.log("mouse over");
            var title = document.getElementById("title");
            title.innerHTML=itemData.title;
            //title.style = 
            currentImage = itemData;
           var detail = document.getElementById("overlay");
           detail.innerHTML = "<p id='date'>Date</p>"+ itemData.date + "<p id='topics'>Topics</p>" + itemData.topic;
       })
       .on("click", (event, itemData) => {
            //console.log(itemData.title);
            var title = document.getElementById("title");
            title.style.visibility = title.style.visibility == "visible" ? `hidden` : "visible";
            var detailContainer = document.getElementById("detail-container");
            detailContainer.style.visibility = detailContainer.style.visibility == "visible" ? `hidden` : "visible";
       });
       

}

function hideOverlay() {
    var title = document.getElementById("title");
    title.style.visibility = `hidden`;
    var detailContainer = document.getElementById("detail-container");
    detailContainer.style.visibility = `hidden`;
}

function showOverlay() {
    console.log("move end");
    var title = document.getElementById("title");
    title.style.visibility = `visible`;
    var detailContainer = document.getElementById("detail-container");
    detailContainer.style.visibility = `visible`;
}

function onNavClick() {
  hideOverlay();
  return true;
}

// var timer = null;
// window.addEventListener('scroll', function() {
//     if(timer !== null) {
//         clearTimeout(timer);        
//     }
//     timer = setTimeout(function() {
//           // do something
//           console.log("scroll end");
//     }, 150);
// }, false);


// function showDetails(){  
//     var detail = document.getElementById("overlay");
//     detail.addEventListener("click", (event) => {
//         console.log("click detail: " + currentImaage.topic);
//         document.getElementById("topic").innerHTML = currentImaage.topic;
//         document.getElementById("date").innerHTML = currentImaage.date;
//     });
// }

// function on() {
//   document.getElementById("overlay").style.display = "block";
// }

// function off() {
//   document.getElementById("overlay").style.display = "none";
// }

// var tag = document.createElement("div");
//   var text = document.createTextNode("Southern Song");
//   tag.appendChild(text);
//   var element = document.getElementById("img_Two Fighting Water Buffaloes");
//   element.appendChild(tag);
