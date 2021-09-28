/* global d3*/
/* global fetch*/

// Smithsonian API example code
// check API documentation for search here: http://edan.si.edu/openaccess/apidocs/#api-search-search

// put your API key here;
const API_KEY = 'H9sDGWfc38fa6QB8jQ7O2Pb20ZbPzeHWtgVD4psd'


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


// search: fetches an array of terms based on term category
function fetchSearchData(searchTerm, start) {
    var count = 1000;
    let url = encodeURI(searchBaseURL + "?api_key=" + API_KEY + "&q=" + searchTerm + "&rows=" + count + "&start=" + start);
    console.log(url);

    async function getData() {
        try{
  
        		const response = await fetch(url)
        		    .then(res => res.json())
        		    .then(data => {
        		        console.log(data);
                		var array = data["response"]["rows"];
                      
                        array.map((item) => {
                         const tax_order = item["content"]["indexedStructured"]["tax_order"][0];
                         tax_order_array[tax_order] = tax_order_array[tax_order] ? tax_order_array[tax_order] + 1 : 1;
                     
                         const tax_class = item["content"]["indexedStructured"]["tax_class"][0];
                         tax_class_array[tax_class] = tax_class_array[tax_class] ? tax_class_array[tax_class] + 1 : 1;
                    
                        const tax_family = item["content"]["indexedStructured"]["tax_family"][0];
                         tax_family_array[tax_family] = tax_family_array[tax_family] ? tax_family_array[tax_family] + 1 : 1;
                    
                        const geo_info = item["content"]["indexedStructured"]["geoLocation"][0];
                        geoLocation.push(geo_info);
                        });
                        
                       
                        total += count;
                        var rowCount = data["response"]["rowCount"];
                        console.log("totaal: " + total + "; rowCount=" + rowCount);
                        if (total < rowCount) {
                            fetchSearchData(searchTerm, total);
                        } 
                        else {
                            console.log(geoLocation);
                            
                            draw(tax_class_array,150, 400, 180, ["#D6AE99","#D0A38A","#CB977C","#C58C6D","#BF805F"]);
                            draw(tax_order_array,100, 150, 300, ["#FFE8D6","#FFDCC2","#FFD1AD","#FFC599","#FFBA85","#FFAE70"]);
                            draw(tax_family_array,90, 700, 250, ["#C9C9BA","#C0C0AF","#B7B7A4","#AEAE98","#A5A58D","#9C9C81"]);
                        
                        var title = document.getElementById("rowCount");
                        var text = document.createTextNode("TOTAL PLANTS: " +rowCount);
                        title.appendChild(text);
                        
                      }    
                    } 
        		    );
    }
    catch (error) {
        console.log(error);
    }
    }
 getData();

}

fetchSearchData(search, 0);

function draw(data_json,radius, x, y, color_array) {
    //var radius = 100;
    var data = [];
    var other = 0;
    for (var key in data_json) {
        if (data_json.hasOwnProperty(key)) {
            if (data_json[key] > 1){
            var item = { 'name': key + "", 'count': data_json[key] };
            data.push(item);
            }
            else{
                other += data_json[key];
            }
        }
    }
    if (other > 0){
            var item = { 'name': 'Others' + "", 'count': other };
            data.push(item);
    }
    data.sort(function compareFn(a, b) {  return a.count - b.count});
    
    var svg = d3.select("svg"),
        
        g = svg.append("g").attr("transform", "translate(" + x + "," + y + ")");

    var color = d3.scaleOrdinal(color_array);
    
    var pie = d3.pie().value(function(d) { 
                return d['count']; 
            });

    var path = d3.arc()
        .outerRadius(radius)
        .innerRadius(20);

    // var label = d3.arc()
    //     .outerRadius(radius)
    //     .innerRadius(20);

    //Generate groups
    var arcs = g.selectAll("arc")
        .data(pie(data))
        .enter()
        .append("g")
        .attr("class", "arc")
        .on("mouseover", (e,d)=>{
            // console.log(e)
            console.log(d.data);
            tooldiv.style("visibility","visible")
            .text( d.data.name + ": " + d.data.count);
        })
          
        .on("mousemove", (e,d)=>{
            tooldiv.style('top',(e.pageY-50)+ 'px');
            tooldiv.style('left',(e.pageX-50)+ 'px');
        })
        .on("mouseout",()=>{
            tooldiv.style("visibility","hidden");
        });
    arcs.append("path")
        .attr("d", path)
        .attr("fill", function(d, i) { return color(i); })
        .text(function(d) { return d; });
        


    


    // arcs.append("text")
    //     .attr("transform", function(d) { 
    //         return "translate(" + label.centroid(d) + ")"; 
    //         })
    //     .text(function(d) { return d.data.name; });
    
    // Create tooltip

    const tooldiv = 
        d3.select("#tooltip")
        .append("div")
        .style("visibility","hidden")
        .style("position","absolute")
        .style("background-color","#F8F8FF")
        .style("color", "#70A928")
        .style("border-radius", "6px")
        .style("padding", "12px")
        .style("box-shadow", "0px 2px 0px #C2C2FF")
}    


// When the user scrolls the page, execute myFunction
window.onscroll = function() {myFunction()};

// Get the header
var header = document.getElementById("myHeader");

// Get the offset position of the navbar
var sticky = header.offsetTop;

// Add the sticky class to the header when you reach its scroll position. Remove "sticky" when you leave the scroll position
function myFunction() {
  if (window.pageYOffset > sticky) {
    header.classList.add("sticky");
  } else {
    header.classList.remove("sticky");
  }
}

// function click(){
//     document.querySelector('#sidenav').addEventListener('click', () => {
//     document.querySelector('#sidenav').classList.add('sidenavClick');
// }); 
// }


