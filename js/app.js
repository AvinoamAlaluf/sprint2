var canvas;
var ctx;

var gImgs = [{
        id: 1,
        url: 'img/gallery/1.jpg',
        text: "dan as worier",
        keywords: ['strong']
    },
    {
        id: 2,
        url: 'img/gallery/danWithAHat.jpg',
        text: "dan With A Hat",
        keywords: ['peaceful']
    },
    {
        id: 3,
        url: 'img/gallery/danWithBear.jpg',
        text: "dan With A Hat keywords",
        keywords: ['satisfied']
    },
    {
        id: 4,
        url: 'img/gallery/yaronAndAsafWithSpoons.jpg',
        text: "yaron And Asaf With Spoons",
        keywords: ['happy']
    },
    {
        id: 5,
        url: 'img/gallery/yaronSurprised.jpg',
        text: "yaron Surprised",
        keywords: ['Surprised']
    },
    {
        id: 6,
        url: 'img/gallery/yaronWithPhone.jpg',
        text: "yaron With Phone",
        keywords: ['tech oriented']
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
function buildGallery(gImgs) {
    var elImgs = document.querySelector('.gallery');
    var strHtmls = '';
    gImgs.forEach(function (img) {
        console.log(img.url);
        var strHtml = `<ul class="galleryList">
            <li class="galleryItem">
                <ul class="itemFather">
                    <li class="imageItem">
                        <img src= "${img.url}"/> </li>
                    <!-- SMALLER ITEM 30-40% of screen -->
                    <li class="textItem">MAKE ME A MEME.TXT</li>
                    <!-- BIGGER ITEM 60% of screen -->
                </ul>
            </li>
        </ul> `


        strHtmls += strHtml
    });
    elImgs.innerHTML = strHtmls;
}



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