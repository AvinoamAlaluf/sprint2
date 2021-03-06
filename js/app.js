"use strict";
// var canvas;
// var ctx;

var gImgs = [{
        id: 1,
        url: 'img/gallery/1.jpg',
        text: "Dan as worier",
        keywords: ['strong', 'powerfull', 'sexy','dan' ,'worier']
    },
    {
        id: 2,
        url: 'img/gallery/danWithAHat.jpg',
        text: "Dan With A Hat",
        keywords: ['peaceful', 'sweet', 'nice','dan', 'hat']
    },
    {
        id: 3,
        url: 'img/gallery/danWithBear.jpg',
        text: "Dan With Bear",
        keywords: ['satisfied', 'happy','dan','bear']
    },
    {
        id: 4,
        url: 'img/gallery/yaronAndAsafWithSpoons.jpg',
        text: "Spoons Party",
        keywords: ['happy', 'satisfied', 'weired','yaron','asaf', 'spoons']
    },
    {
        id: 5,
        url: 'img/gallery/yaronSurprised.jpg',
        text: "Yaron Surprised",
        keywords: ['surprised', 'investigator','yaron']
    },
    {
        id: 6,
        url: 'img/gallery/yaronWithPhone.jpg',
        text: "Yaron With Phone",
        keywords: ['tech','oriented', 'inspiring', 'strong','yaron','asaf', 'phone']
    },
    {
        id: 7,
        url: 'img/gallery/elad.jpg',
        text: "elad",
        keywords: ['oriented', 'strong','elad']
    },
    {
        id: 8,
        url: 'img/gallery/yaronAcrobat.jpg',
        text: "Yaron acrobat",
        keywords: ['inspiring', 'strong','yaron']
    },
    {
        id: 9,
        url: 'img/gallery/yaronThinking.jpg',
        text: "yaron Thinking",
        keywords: ['inspiring', 'thinking','yaron']
    },
];


/*var gMeme = {
    selectedImgId: 5,
    txts: [{
        line: 'I never eat Falafel',
        size: 20,
        align: 'left',
        color: 'red'
    }]
}*/

var gKeywordsMap = createKeywordsMapObj(gImgs);
//CR: right now, this is not support more than one text.
// look at the pdf for good example.
/*var memeChoise = {
    url: "img/gallery/danWithBear.jpg",
    fontSize: "20px",
    fontFamily: "Georgia",
    text: "",
    upperCase: false,
    positionX: 10,
    positionY: 50,
    fontColor: "white",
    textAlign: "",
    id: 0,
    fontwight: "",
    textShadow: false,

}*/

var gCanvas = document.querySelector('.canvasInEditor');
var elGallery = document.querySelector('.gallery');
var elMeme = document.querySelector('.memeEditor');
var elMemePopUp = document.querySelector('.memeEditorPopup');
var elColorPopUp = document.querySelector('.colorEditorPopup');
var elInput = document.querySelector('.canvas-text');
var elSearchSector = document.querySelector('.searchSector');
var elColorEditorPopupContainer = document.querySelector('.colorEditorPopupContainer');

gCanvas.width = 300;
gCanvas.height = 300;

var memeChoise = {
    url: "img/gallery/danWithBear.jpg",
    fontSize: "30px",
    fontFamily: "Impact",
    text: "",
    upperCase: false,
    positionX: gCanvas.width/2 -50,
    positionY: gCanvas.height/2,
    fontColor: "white",
    textAlign: "",
    id: 0,
    fontwight: "",
    textShadow: false,

}

function init() {
    buildGallery(gImgs);

    //drawOnCanvas(memeChoise);
}


function buildGallery(imgs) {
    hideAbout();
    showGallery(); //show gullery hide meme
    var strHtmls = '';
    imgs.forEach(function (img) {
        console.log(img.url);
        var strHtml = `<div class="galleryList">
            <div class="galleryItem" onclick= makeMeme(${img.id})>                
                <div class="imageItem">
                    <img src= "${img.url}"/> 
                </div>
                <div class="textItem">${img.text}</div>
            </div>
        </div> `;
        strHtmls += strHtml
    });
    elGallery.innerHTML = strHtmls;
}

function makeMeme(imgId) {
    memeChoise.id = imgId;
    memeChoise.url = gImgs[imgId - 1].url; //updta the meme object wiyh the right url
    drawImgOnCanvas(imgId);
}
//CR: instead of paramter work on the global memeChoise
function drawImgOnCanvas(imgId) {
    hideAbout();
    showMeme(); //show meme hide gallery
    var userTextPref = memeChoise.text
    memeChoise.upperCase ? userTextPref = userTextPref.toUpperCase() : ''; //if upper case
    //if shadow
    var ctx = gCanvas.getContext('2d');
    var img = new Image();
    img.src = memeChoise.url;
    ctx.clearRect(0, 0, gCanvas.width, gCanvas.height);

    img.onload = function () {
        ctx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height);
        ctx.font = memeChoise.fontwight + " " + memeChoise.fontSize + " " + memeChoise.fontFamily;
        ctx.shadowColor = 'black';
        memeChoise.textShadow ? ctx.shadowBlur = 30 : ctx.shadowBlur = 0;
        ctx.fillStyle = memeChoise.fontColor;
        ctx.strokeText(userTextPref, memeChoise.positionX, memeChoise.positionY);
        ctx.fillText(userTextPref, memeChoise.positionX, memeChoise.positionY);
    };
}

function showGallery(){
    hideAbout()
    elColorEditorPopupContainer.style.display = "none";
    elSearchSector.style.display = "block";
    elSearchSector.style.margin = "0 auto";
    elGallery.style.display = "inherit";
    elMeme.style.display = "none";
    elMemePopUp.style.display = "none";
    elColorPopUp.style.display = "none";
    elInput.value = ''; //clear input value
    memeChoise.text = ''; //reser text
}

function showMeme() {
    elColorEditorPopupContainer.style.display = "flex";
    elSearchSector.style.display = "none";
    elGallery.style.display = "none"; //the cointener needis to be none as well?????
    elMeme.style.display = "flex"; //show meme element
    elMemePopUp.style.display = "flex"; //show popup meme elment
    elColorPopUp.style.display = "flex"; //show popup color 
}


// CR: you use the dom element and not his value.
function inputText() {
    memeChoise.text = elInput.value;
    //  memeChoise.upperText = memeChoise.text.
    drawImgOnCanvas(memeChoise.id);

}

function changeMemeOb(x) {
    var className = x.className;
    switch (className) {
        case 'font':
            memeChoise.fontFamily = x.innerText;
            break;
        case 'textSize':
            memeChoise.fontSize = x.value;
            break;
        case 'fa fa-arrow-up fa-2x iconSpace':
            memeChoise.positionY = memeChoise.positionY - 2;
            break;
        case 'fa fa-arrow-down fa-2x iconSpace':
            memeChoise.positionY = memeChoise.positionY + 2;
            break;
        case "fa fa-arrow-right fa-2x iconSpace arrowRight":
            memeChoise.positionX = memeChoise.positionX + 2;
            break;
        case "fa fa-arrow-left fa-2x iconSpace arrowLeft":
            memeChoise.positionX = memeChoise.positionX - 2;
            break;
        case 'textUppercase':
            memeChoise.upperCase = document.querySelector('.textUppercase').checked;
            break;
        case 'textWeight':
            memeChoise.fontwight = x.value;
            break;
        case 'textShadow':
            memeChoise.textShadow = document.querySelector('.textShadow').checked;
            break;
        case 'colorPicker':
            memeChoise.fontColor = x.value;
            break;
        
    }


    drawImgOnCanvas(memeChoise.id);

}




/**
 * This is the function that will take care of image extracting and
 * setting proper filename for the download.
 */
function downloadImg(elLink) {
    elLink.href = canvas.toDataURL();
    elLink.download = 'perfectMeme.jpg';
}



//filtering function for the search by keywords feild, can be modifed for the "words get big for being popular shit."
function filterGallery(keywords) {
    var filteredGallery;
    //CR  : if(keyWords.length === 0 ) return buildGallery(gImgs)
    if (keywords.length === 0) {
        buildGallery(gImgs);
        return;
    }
    var keywordsArr = keywords.split(" ");
    keywordsArr = keywordsArr.map(function (keyword) {
        return keyword.toLowerCase();
    });
    if (keywordsArr.length > 1) {
        filteredGallery = gImgs.filter(function (img) {
            var containsAllWords = false;
            for (var i = 0; i < keywordsArr.length; i++) {
                var word = keywordsArr[i];
                if (img.keywords.includes(word)) { //can make search better by searching for a words within an item inside img.keywords
                    containsAllWords = true;
                } else {
                    containsAllWords = false;
                    break;
                }
            }
            if (containsAllWords) return img;
        });
    } else {
        filteredGallery = gImgs.filter(function (img) {
            // return (img.keywords.includes(keywordsArr[0]))
            if (img.keywords.includes(keywordsArr[0])) return img;
        });
    }
    buildGallery(filteredGallery);
}

function createKeywordsMapObj(imgs) { //makes a mapObj
    var keywordsMap = {};
    imgs.forEach(function (img) {
        for (var i = 0; i < img.keywords.length; i++) {
            var currKeyword = img.keywords[i];
            if (keywordsMap[currKeyword]) {
                keywordsMap[currKeyword]++;
            } else {
                keywordsMap[currKeyword] = 1;
            }
        }
    });
    return keywordsMap;
}

function makeKeywordsBigger() { //only takes place in div class="keywordsPopularity"
    var strHtml = '';
    for (var word in gKeywordsMap) {
        strHtml += `<span style="font-size:${gKeywordsMap[word] * 0.5}em; margin:5px;">${word}</span>`;
    }
    var elKeywordsPopularity = document.querySelector('.keywordsPopularity');
    elKeywordsPopularity.innerHTML = strHtml;
}

function downloadImg(link) {
    link.href = gCanvas.toDataURL();
    link.download = 'myMeme.jpg';
}

function hideAbout(){
    document.querySelector('.about').style.display = 'none';
}

function showAbout(){
    elColorEditorPopupContainer.style.display = "none";
    elSearchSector.style.display = "none";
    elMeme.style.display = "none";
    elMemePopUp.style.display = "none";
    elColorPopUp.style.display = "none";
    elGallery.style.display = "none";
    var elAbout = document.querySelector('.about');
    elAbout.style.display = 'flex';
    elAbout.style.flexDirection =  'column';
}
