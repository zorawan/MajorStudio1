/* global d3 */
/* global jQuery */
/* global $ */

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
    let total = data.length;
    let app = d3.select(root).text('');
     for(var i=0; i<data.length; i++) {
        var item = data[i];
        item.index = i;
    }
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
       .on("touchstart", (event, itemData) => {
            //console.log(itemData.title);
            var title = document.getElementById("title");
            title.innerHTML=itemData.title;
            //title.style = 
            currentImage = itemData;
            var detail = document.getElementById("overlay");
            detail.innerHTML = "<p id='date'>Date</p>"+ itemData.date + "<p id='topics'>Topics</p>" + itemData.topic.filter(word => word != "Art" && word != "Chinese Art");
            
           
            var svgL = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            var rectL = document.createElementNS("http://www.w3.org/2000/svg", "rect");
            svgL.setAttribute("aria-hidden","true");
            svgL.setAttribute('viewbox', '0 0 24 460');
            svgL.setAttribute("class","line");
            svgL.setAttribute('fill','none');
            rectL.setAttribute('fill','#fff');
            rectL.setAttribute('width', '24px');
            rectL.setAttribute('height', '460px');
            rectL.setAttribute('fill-opacity','0.2');
            svgL.appendChild(rectL);
            detail.appendChild(svgL);
            
            var svgD = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            var pathD = document.createElementNS("http://www.w3.org/2000/svg", "path");
            svgD.setAttribute("aria-hidden","true");
            svgD.setAttribute('viewbox', '0 0 24 30');
            svgD.setAttribute("class","dot");
            svgD.setAttribute('fill','none');
            svgD.style.top = (80 + itemData.index / total * 430) + 'px';
            pathD.setAttribute('fill','#fff');
            pathD.setAttribute('fill-rule','evenodd');
            pathD.setAttribute('clip-rule','evenodd');
            pathD.setAttribute('d', "M24 0H0V30H24V0ZM2.00004 3H3.99994V16H2.00004V3ZM19.9999 3H22V12.9729L20 13L19.9999 3ZM14 17L11 21L13 23L12 24L8.00004 20L3.00004 27H22L19 23V3H17V21.081L14 17ZM14 3H16V11H14V3Z");
        
            // svgD.setAttribute('top', document.element.scrollHeight);
            svgD.appendChild(pathD);
            detail.appendChild(svgD);
            // var icThumb = document.getElementById("ic_thumb");
            // icThumb.style.top = (80 + itemData.index / total * 500) + 'px';
            // detail.appendChild(icThumb);
           
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


//try detecting visiable element on screen
function isElementInViewport (el) {

    // Special bonus for those using jQuery
    if (typeof jQuery === "function" && el instanceof jQuery) {
        el = el[0];
    }

    var rect = el.getBoundingClientRect();

    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /* or $(window).height() */
        rect.right <= (window.innerWidth || document.documentElement.clientWidth) /* or $(window).width() */
    );
}


function onVisibilityChange(el, callback) {
    var old_visible;
    return function () {
        var visible = isElementInViewport(el);
        if (visible != old_visible) {
            old_visible = visible;
            if (typeof callback == 'function') {
                callback();
            }
        }
    }
}

var handler = onVisibilityChange(el, function() {
    /* Your code go here */
});


// jQuery
$(window).on('DOMContentLoaded load resize scroll', handler);

/* // Non-jQuery
if (window.addEventListener) {
    addEventListener('DOMContentLoaded', handler, false);
    addEventListener('load', handler, false);
    addEventListener('scroll', handler, false);
    addEventListener('resize', handler, false);
} else if (window.attachEvent)  {
    attachEvent('onDOMContentLoaded', handler); // Internet Explorer 9+ :(
    attachEvent('onload', handler);
    attachEvent('onscroll', handler);
    attachEvent('onresize', handler);
}
*/