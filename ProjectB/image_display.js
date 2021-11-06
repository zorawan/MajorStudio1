/* global d3 */
/* global $ */
// "d3" is globally available
// because we have the d3 code
// in our index.html file

var data = [];
var topicArray = [];
var titleArray = [];
// load JSON using d3.json
d3.json('./image.json')
  .then( json => {
      // execute our 
      // display images function

      displayImages(json);
  }); 

// this function creates all
// of our DOM elements
function displayImages(json){
    // select a <div> with an id of "app"
    // this is where we want all of our
    // images to be added
    let app = d3.select('#app').text('');

    // take our JSON and sort it
    // date descending
    //let data = json.sort( (a,b) => (b.date > a.date) ? 1 : -1 );
    // // date ascending
    json.map(item =>  {
        item.date = parseInt(item.date.substring(0, item.date.length -1));
    });
    
    data = json.sort( (a,b) => (a.date > b.date) ? 1 : -1 );

    // define "cards" for each item
    let card = app.selectAll('div.smithsonian-card')
                .data(data)
                .join('div')
                .attr('class', 'smithsonian-card')
                .attr("id", function(d,i) { return "img_" + d.title; });

    // create a div with a class of "image"
    // and populate it with an <img/> tag
    // that contains our filepath
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
            var title = document.getElementById("title_" + itemData.title);
            title.scrollIntoView();
            title.setAttribute('class','titleClickStyle');
            
            
            
            //TODO
            // var topicNodes = document.getElementsByClassName("topicNodes")
            // topicNodes.map(topic => {
            //     if (itemData.topic.includes(topic.innerHTML.substring(0, topic.innerHTML.length -2))) {
            //         topic.setAttribute("class", "highlightTopic");
            //     } else {
            //          topic.setAttribute("class", "topicNodes");
            //     }
            // });
            
        });
 
    // create a paragraph that will
    // hold the object date
    // card.append('p')
    //     .attr('class', 'object-date')
    //     .text(d=>d.date);

    // // create a heading tag
    // // that will be the object title
    // card.append('h2')
    //     .attr('class', 'title')
    //     .text(d=>d.title);
    
    showNav(data);
    showTopic(wordFreq(data))
}

function showNav(data) {
    
    var dynasties = document.getElementById("dynasties");
    
    var nSong = document.createElement('li');
    nSong.innerHTML = "Northern Song (960-1127)";
    dynasties.appendChild(nSong);
    
    var sSong = document.createElement('li');
    sSong.innerHTML = "Southern Song (1127-1279)";
    dynasties.appendChild(sSong);
    
    var yuan = document.createElement('li');
    yuan.innerHTML = "Yuan (1279-1368)";
    dynasties.appendChild(yuan);
    
    var ming = document.createElement('li');
    ming.innerHTML = "Ming (1368-1644)";
    dynasties.appendChild(ming);
    
    var qing = document.createElement('li');
    qing.innerHTML = "Qing (1644-1911)";
    dynasties.appendChild(qing);

    
    data.map((item) => {
         var li = document.createElement('li');
            li.setAttribute('class','titleStyle');
            li.innerHTML = item.title;
            li.id = "title_" + item.title;
            titleArray.push(li);
            
            li.addEventListener("click", function(e){
                //hight title
                data.map(titleItem => {
                    var titleElement = document.getElementById("title_" + titleItem.title);
                    if (titleElement == li) {
                        titleElement.setAttribute("class", "titleClickStyle");
                        titleElement.innerHTML = titleItem.title;
                    } else {
                        titleElement.setAttribute("class", "titleStyle");
                        titleElement.innerHTML = titleItem.title;
                    }
                });
                var img = document.getElementById("img_" + item.title);
                img.scrollIntoView();
                
                //hight topics
                topicArray.map(topicItem => {
                    if (item.topic.includes(topicItem.innerHTML.substring(0,topicItem.innerHTML.length-2))) {
                       topicItem.setAttribute('class', 'topicNodesHighLight'); 
                    } else {
                     topicItem.setAttribute('class', 'topicNodes');
                    }
                });
                //
            });
            
        
            // li.addEventListener("mouseleave", function(e){
            //     li.setAttribute('class','titleStyle');
            // });
        if (item.date <= 906){
            tang.appendChild(li);
        } else if (item.date <= 1127){
            nSong.appendChild(li);
        } else if (item.date <= 1279){
            sSong.appendChild(li);
        } else if (item.date <= 1368){
            yuan.appendChild(li);
        } else if (item.date <= 1644){
            ming.appendChild(li);
        } else if (item.date <= 1911){
            qing.appendChild(li);
        }
    });
}  
var whiteList = ["Landscapes", "Animals", "Rivers", "Mountains", "Water", "Flowers", "Men", "Birds", "Pine tree", "Boats and boating", "Winter", "Woman", "Horses", "Trees", "Blue-and-green style", "Fishing", "Pavilion", "Waterfalls", "Water buffalo", "Children", "Baimiao style", "Daoist Immortals", "Plum blossom", "Ducks, Portraits", "Cats", "Lotus", "Snow", "Attendant", "Halo", "Willow tree", "Daoism", "Palace", "Gardens, Qin", "Bamboo", "Peony", "Bridges", "Description and travel", "Camellia", "Goose", "Scholar", "Guanyin", "Temple", "Demon", "Zhong Kui", "Donkey", "Eagles", "Music", "Luohan", "Bodhisattva", "Prayer beads", "Fly whisk", "Sleeping", "Food habits", "Flute", "Playing", "Autumn", "Rocks", "Dragon","Bananas", "Kundika", "Pheasant", "Hibiscus", "Shakyamuni", "Monkeys", "Horsemen and horsewomen", "Poets", "Hollyhock", "Toads","Rites and ceremonies", "Goat", "Chrysanthemum", "Fruit", "Manjushri", "Insects", "Elephants", "Hawk", "Kings and rulers", "Farms", "Cloud", "Musical instruments", "Dance", "Hunting", "Cabbage", "Garden rock", "Umbrellas", "Egrets", "Orchids", "Cormorant", "Phoenix", "Crane", "New year", "Lakes", "Pine", "Herb gathering", "Willow", "Khakkhara", "Tiger", "Ruyi", "Narcissus", "Spring", "Plum tree", "Plants", "Sheng", "Rain", "Ocean", "Villages", "Islands", "Dogs", "Miracle", "Washing", "Mahayana Buddhism", "Wars", "Vitarka mudra", "Parrot","Teaching", "Meditation", "Groom", "Prayer", "Abhiseka mudra", "Minister", "Persimmon", "Sutra", "Tortoise", "Worship", "Stupa", "Biwa", "Pipa", "Reading", "Bird and flower", "Quail", "Sewing", "Jiehua", "Zen Buddhism", "Bodhidharma", "Mudra", "Summer", "Dove", "Wind", "Inn", "Lovers", "Writing", "Poetry", "Marriage", "Family", "Daylily", "Lute", "Tea", "Liu Hai", "Festivals", "Wave", "Seascape", "Game playing", "Musicians", "Wood-gathering", "Fans", "Roses", "Shrine", "Fishes", "Kalasa", "Frogs", "Fungus-of-immortality", "Peach", "Queen Mother of the West", "Herding", "Gourd", "Magic", "Spirit, Pig", "Chicken", "Eight Views of Xiao-Xiang", "Confucius", "Laozi", "Butterflies", "Moon", "Outer space", "Grape", "Inscriptions", "Sunrise", "Shepherd", "Beetles", "Herons", "Swallow", "Talisman", "Lu Dongbin", "King", "Vimalakirti", "Business", "Incense", "Vajra", "Monk", "Mount Emei", "Snakes", "Mythological subject", "Mandorla", "Throne", "Ba Xian", "Pagoda", "Puppets", "Mynah bird", "Dreaming", "Dhayanibuddha", "Drums", "Cymbal", "Chang'e", "Rabbits", "Magpie", "Mouse", "Melon", "Archery", "Bow", "Bees" ];

// var whiteList2 = ["Prayer", "Abhiseka mudra", "Minister", "Persimmon", "Sutra", "Tortoise", "Worship", "Stupa", "Biwa", "Pipa", "Reading", "Bird and flower", "Quail", "Sewing", "Jiehua", "Zen Buddhism", "Bodhidharma", "Mudra", "Summer", "Dove", "Wind", "Inn", "Lovers", "Writing", "Poetry", "Marriage", "Family", "Daylily", "Lute", "Tea", "Liu Hai", "Festivals", "Wave", "Seascape", "Game playing", "Musicians", "Wood-gathering", "Fans", "Roses", "Shrine", "Fishes", "Kalasa", "Frogs", "Fungus-of-immortality", "Peach", "Queen Mother of the West", "Herding", "Gourd", "Magic", "Spirit, Pig", "Chicken", "Eight Views of Xiao-Xiang", "Confucius", "Laozi", "Butterflies", "Moon", "Outer space", "Grape", "Inscriptions", "Sunrise", "Shepherd", "Beetles", "Herons", "Swallow", "Talisman", "Lu Dongbin", "King", "Vimalakirti", "Business", "Incense", "Vajra", "Monk", "Mount Emei", "Snakes", "Mythological subject", "Mandorla", "Throne", "Ba Xian", "Pagoda", "Puppets", "Mynah bird", "Dreaming", "Dhayanibuddha", "Drums", "Cymbal", "Chang'e", "Rabbits", "Magpie", "Mouse", "Melon", "Archery", "Bow", "Bees"];

function wordFreq(data) {
    var freqMap = new Map();
    data.forEach(function(item) {
        item.topic.forEach(function(w) {
            //console.log(w);
           if (whiteList.includes(w)){
                if (!freqMap.get(w)) {
                    freqMap.set(w, 0);
                }
                freqMap.set(w, freqMap.get(w)+1);
                console.log(freqMap);
           }
        });
    });

    return  [...freqMap.entries()].sort((a, b) => b[1] - a[1]);
}



function showTopic(topics) {
    var topicNode20= document.getElementById("topics20");
    var topicNode10= document.getElementById("topics10");
    var topicNode5= document.getElementById("topics5");
    var topicNode1= document.getElementById("topics1");
    //console.log(topics);
    
    topics.map(topic=>{
        var nodeChild = document.createElement("span");
        nodeChild.innerHTML = topic[0] + ", ";
        nodeChild.setAttribute('class', 'topicNodes');
        nodeChild.id = topic[0];
        if (topic[1] >=20) {
            topicNode20.appendChild(nodeChild);
        } else if(topic[1]>=10) {
            topicNode10.appendChild(nodeChild);
        } else if(topic[1]>=5) {
            topicNode5.appendChild(nodeChild);
        } else if(topic[1]==1) {
            topicNode1.appendChild(nodeChild);
        } 
        topicArray.push(nodeChild);
        
        
        nodeChild.addEventListener("click", function() {
            //console.log(topic);
            
            topicArray.map(item => {
                if (item == nodeChild) {
                   item.setAttribute('class', 'topicNodesHighLight'); 
                } else {
                item.setAttribute('class', 'topicNodes');
                }
            });
        
            data.map(item => {
                var titleElement = document.getElementById("title_" + item.title);
                if (item.topic.includes(topic[0])) {
                    titleElement.setAttribute("class", "highLightTitleStyle");
                    titleElement.innerHTML = item.title + "  &#9666;";
                } else {
                    titleElement.setAttribute("class", "titleStyle");
                    titleElement.innerHTML = item.title;
                }
            });
        });
    });
}
