var canvas;
var ctx;

var gImgs = [{
    id: 1,
    url: 'img/gallery/1.jpg',
    text: "dan as worier",
    keywords: ['strong', 'powerfull','sexy']
},
{
    id: 2,
    url: 'img/gallery/danWithAHat.jpg',
    text: "dan With A Hat",
    keywords: ['peaceful','sweet','nice']
},
{
    id: 3,
    url: 'img/gallery/danWithBear.jpg',
    text: "dan With Bear",
    keywords: ['satisfied','happy']
},
{
    id: 4,
    url: 'img/gallery/yaronAndAsafWithSpoons.jpg',
    text: "yaron And Asaf With Spoons",
    keywords: ['happy','satisfied','weired']
},
{
    id: 5,
    url: 'img/gallery/yaronSurprised.jpg',
    text: "yaron Surprised",
    keywords: ['Surprised','investigator']
},
{
    id: 6,
    url: 'img/gallery/yaronWithPhone.jpg',
    text: "yaron With Phone",
    keywords: ['tech oriented','inspiring','strong']
}
];


var gMeme = {
    selectedImgId: 5,
    txts: [{
        line: 'I never eat Falafel',
        size: 20,
        align: 'left',
        color: 'red'
    }]
}

var gKeywordsMap = createKeywordsMapObj(gImgs);

var memeChoise = {
    url: "img/gallery/danWithBear.jpg",
    fontSize: 60,
    fontFamily: "Georgia",
    text:"..בתאכלסס",
    positionX: 10,
    positionY: 50,
    fontColor: "white"


}
function init(){
buildGallery(gImgs);
//drawOnCanvas(memeChoise);
}


function buildGallery(imgs) {
    var elGallery = document.querySelector('.gallery');
    var strHtmls = '';
    imgs.forEach(function (img) {
        console.log(img.url);
        var strHtml = `<ul class="galleryList">
            <li class="galleryItem" onclick= drawImgOnCanvas(${img.id})>
                <ul class="itemFather">
                    <li class="imageItem">
                        <img src= "${img.url}"/> </li>
                    <li class="textItem">${img.text}</li>
                </ul>
            </li>
        </ul> `


        strHtmls += strHtml
    });
    elGallery.innerHTML = strHtmls;
}


function drawImgOnCanvas(imgId){
    memeChoise.url = gImgs[imgId-1].url; //updta the meme object wiyh the right url
    var canvas = document.querySelector('.canvasInEditor');
    var ctx = canvas.getContext('2d');
    var img = new Image();
    img.src = memeChoise.url;
    img.onload = function () {
        ctx.drawImage(img, 0, 0,canvas.width,canvas.height);
        ctx.font = memeChoise.fontSize +"px " + memeChoise.fontFamily;
        ctx.fillStyle = memeChoise.fontColor;
        ctx.fillText(memeChoise.text,50,150);
           
    };
    
}



/*

function drawOnCanvas(memeChoise) {
    var canvas = document.querySelector('.canvasInEditor');
    var ctx = canvas.getContext('2d');
    var img = new Image();
    img.src = memeChoise.url;

    img.onload = function () {
        ctx.drawImage(img, 0, 0,canvas.width,canvas.height);
        ctx.font = memeChoise.fontSize +"px " + memeChoise.fontFamily;
        ctx.fillStyle = memeChoise.fontColor;
        ctx.fillText(memeChoise.text,canvas.width-250,canvas.height-50);
        
        
    };
}*/




/**
 * This is the function that will take care of image extracting and
 * setting proper filename for the download.
 * IMPORTANT: Call it from within a onclick event.
 */
function downloadImg(elLink) {
    elLink.href = canvas.toDataURL();
    elLink.download = 'perfectMeme.jpg';
}


//AVINOAM MADE CHANGES FROM HERE ON: 
//(besides for laughter at line 81 ;))
//also made a change in build gallery - to show the img obj name


//filtering function for the search by keywords feild, can be modifed for the "words get big for being popular shit."
function filterGallery(keywords) {
    var filteredGallery;
    if (keywords.length === 0 ) {
        buildGallery(gImgs);
        return;
    }
    var keywordsArr = keywords.split(" ");
    keywordsArr = keywordsArr.map(function (keyword){
        return keyword.toLowerCase();
    });
    if (keywordsArr.length > 1) {
        filteredGallery = gImgs.filter(function (img) {
            var containsAllWords = false;
            for (var i = 0; i < keywordsArr.length; i++) {
                var word = keywordsArr[i];
                if (img.keywords.includes(word)) {//can make search better by searching for a words within an item inside img.keywords
                    containsAllWords = true;
                }
                else {
                    containsAllWords = false;
                    break;
                }
            }
            if (containsAllWords) return img;
        });
    } else {
        filteredGallery = gImgs.filter(function (img) {
            if (img.keywords.includes(keywordsArr[0])) return img;
        });
    }
    buildGallery(filteredGallery);
}

function createKeywordsMapObj(imgs) {//makes a mapObj
    var keywordsMap = {};
    imgs.forEach(function (img) {
        for (var i = 0; i < img.keywords.length; i++) {
            var currKeyword = img.keywords[i];
            if (keywordsMap[currKeyword]) {
                keywordsMap[currKeyword]++;
            }else{
                keywordsMap[currKeyword] = 1;
            }
        }
    });
    return keywordsMap;
}

function makeKeywordsBigger(){//only takes place in div class="keywordsPopularity"
    var strHtml = '';
    for (var word in gKeywordsMap) {
        strHtml+= `<span style="font-size:${gKeywordsMap[word] * 0.5}em; margin:5px;">${word}</span>`;
    }
    var elKeywordsPopularity = document.querySelector('.keywordsPopularity');
    elKeywordsPopularity.innerHTML = strHtml;
}