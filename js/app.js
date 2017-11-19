"use strict";
var canvas;
var ctx;

var gImgs = [{
        id: 1,
        url: 'img/gallery/1.jpg',
        text: "dan as worier",
        keywords: ['strong', 'powerfull', 'sexy']
    },
    {
        id: 2,
        url: 'img/gallery/danWithAHat.jpg',
        text: "dan With A Hat",
        keywords: ['peaceful', 'sweet', 'nice']
    },
    {
        id: 3,
        url: 'img/gallery/danWithBear.jpg',
        text: "dan With Bear",
        keywords: ['satisfied', 'happy']
    },
    {
        id: 4,
        url: 'img/gallery/yaronAndAsafWithSpoons.jpg',
        text: "yaron And Asaf With Spoons",
        keywords: ['happy', 'satisfied', 'weired']
    },
    {
        id: 5,
        url: 'img/gallery/yaronSurprised.jpg',
        text: "yaron Surprised",
        keywords: ['Surprised', 'investigator']
    },
    {
        id: 6,
        url: 'img/gallery/yaronWithPhone.jpg',
        text: "yaron With Phone",
        keywords: ['tech oriented', 'inspiring', 'strong']
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
//CR: right now, this is not support more than one text.
// look at the pdf for good example.
var memeChoise = {
    url: "img/gallery/danWithBear.jpg",
    fontSize: "16px",
    fontFamily: "Georgia",
    text: " ",
    upperCase: false,
    positionX: 10,
    positionY: 50,
    fontColor: "white",
    textAlign: "",
    id: 0

}

var gCanvas = document.querySelector('.canvasInEditor');

function init() {
    buildGallery(gImgs);
    //drawOnCanvas(memeChoise);
}


function buildGallery(imgs) {
    var elGallery = document.querySelector('.gallery');
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

    var ctx = gCanvas.getContext('2d');
    var img = new Image();
    img.src = memeChoise.url;
    ctx.clearRect(0, 0, gCanvas.width, gCanvas.height);
    img.onload = function () {
        ctx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height);
        ctx.font = memeChoise.fontSize + " " + memeChoise.fontFamily;
        ctx.fillStyle = memeChoise.fontColor;
        //  ctx.textAlign = memeChoise.textAlign;
        ctx.strokeText(memeChoise.text, memeChoise.positionX, memeChoise.positionY);
        ctx.fillText(memeChoise.text, memeChoise.positionX, memeChoise.positionY);

    };
    ctx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height);
    ctx.font = memeChoise.fontSize + " " + memeChoise.fontFamily;
    ctx.fillStyle = memeChoise.fontColor;
    // ctx.textAlign = memeChoise.textAlign;
    if(memeChoise.upperCase){
        ctx.strokeText(memeChoise.text.toUpperCase(), memeChoise.positionX, memeChoise.positionY);
        ctx.fillText(memeChoise.text.toUpperCase(), memeChoise.positionX, memeChoise.positionY);    
    }
    else{ctx.strokeText(memeChoise.text, memeChoise.positionX, memeChoise.positionY);
    ctx.fillText(memeChoise.text, memeChoise.positionX, memeChoise.positionY);
    }


}
// CR: you use the dom element and not his value.
function inputText() {
    memeChoise.text = document.querySelector('.canvas-text').value;
    drawImgOnCanvas(memeChoise.id);

}

function changeMemeOb(x) {
    if (x.className === 'textSize') {
        memeChoise.fontSize = x.value;
    } else if (x.className === 'textAlign') {
        switch (x.value) {
            case 'left':
                memeChoise.positionX = 10;
                memeChoise.positionY = 100;
                break;
            case 'center':
                memeChoise.positionX = gCanvas.width / 2;
                memeChoise.positionY = 100;
                break;
            case 'right':
                memeChoise.positionX = gCanvas.width - 50;
                memeChoise.positionY = 100;
                break;
        }
    } else if (x.localName === 'a') {
        memeChoise.fontFamily = x.innerText;

    }else if(x.className === 'textUppercase'){
        if (document.querySelector('.textUppercase').checked === true){
        memeChoise.upperCase = true;
        }else 
        memeChoise.upperCase = false;
    }


    drawImgOnCanvas(memeChoise.id);
    /*  if (x.class === 'textWeight') {
          memeChoise.fontWeight = x.value;
      }*/

    // memeChoise.fontColor = "white";

}




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

function downloadImg(elLink) {
    elLink.href = gCanvas.toDataURL();
    elLink.download = 'myMeme.jpg';
 }