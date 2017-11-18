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

buildGallery(gImgs);
drawOnCanvas();

//put html
function buildGallery(imgs) {
    var elGallery = document.querySelector('.gallery');
    var strHtmls = '';
    imgs.forEach(function (img) {
        console.log(img.url);
        var strHtml = `<ul class="galleryList">
            <li class="galleryItem">
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


//HAHAHAHAH :)
function drawOnCanvas() {
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    var img = new Image();
    img.src = "img/gallery/danWithBear.jpg";

    img.onload = function () {
        ctx.drawImage(img, 0, 0, 568, 360);

        ctx.font = "50px 'Segoe UI'";
        ctx.fillStyle = 'white';
        ctx.fillText("בתאכלסססס", 50, 300);
    };
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
                if (img.keywords.includes(word)) {
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

