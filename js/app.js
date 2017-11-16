var canvas;
var ctx;

var gImgs = [{
        id: 1,
        url: 'img/gallery/danAsWorier.jpg',
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
        url: 'img/yaronAndAsafWithSpoons',
        text: "yaron And Asaf With Spoons",
        keywords: ['happy']
    },
    {
        id: 5,
        url: 'img/yaronSurprised',
        text: "yaron Surprised",
        keywords: ['Surprised']
    },
    {
        id: 6,
        url: 'img/yaronWithPhone',
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


//put html
function buildGallery(gImgs){
        var elImgs = document.querySelector('.gallery');
        var strHtmls = '';
        gImgs.forEach(function (id,text) {
            var strHtml = `
                    
            `
            strHtmls += strHtml
        });
        elImgs.innerHTML = strHtmls;
}
    
    


function init() {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    drawOnCanvas();
}



function drawOnCanvas() {
    var img = new Image();
    img.src = "img/meme.png";

    img.onload = function () {
        ctx.drawImage(img, 0, 0, 568, 360);

        ctx.font = "50px 'Segoe UI'";
        ctx.fillStyle = 'white';
        ctx.fillText("Text on Canvas", 50, 300);
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