// Code inspired by @rifke.world

let ctx;

var img2=new Image();
img2.onload=function(){
  ctx.dragImage(img2,0,0);
  ctx.drawImage(img2,0,0);

};
img2.src="https://i.postimg.cc/XX63J069/BRITAIN-HEALTH-VIRUS.jpg";

let canvasy;


window.isHidingNow = false;

let wipeyFrame = 0;

// let imageDataArray;
let cumulativeOpacity;
let pixelArrayLength;

let alphaArrayLength;
let alphaArrayMaxCumulativeOpacity;

let color1 = '0,0,0';
let color2 = '0,0,0';



let wait = 2000;
let interact = 1;



function wipeyCanvasSetup() {
  if (window.isHidingNow != true) {
    document.body.style.color = "img2";

    canvasy = document.createElement('canvas');
    canvasy.setAttribute('id','wipeyCanvas');
    canvasy.classList.add('wipey-canvas');
    document.body.insertBefore(canvasy,document.body.childNodes[0]);

    ctx = canvasy.getContext("2d");

    wipeyCanvasSize();
  }
}
//here I should include the image

function fillCanvasWithGradient() {
  if (window.isHidingNow != true) {

    ctx.drawImage(img2,0,0);


  }
}

function wipeyCanvasSize() {
  if (window.isHidingNow != true) {
    canvasy.width = window.innerWidth;
    canvasy.height = window.innerHeight;

    imageDataArray = ctx.getImageData(0,0,canvasy.width,canvasy.height).data;
    cumulativeOpacity = alphaArrayMaxCumulativeOpacity;
    pixelArrayLength = imageDataArray.length;

    alphaArrayLength = pixelArrayLength / 4;
    alphaArrayMaxCumulativeOpacity = alphaArrayLength * 255;
    fillCanvasWithGradient();
  }
}

function wipeyWipey(x,y) {
  if (window.isHidingNow != true) {
    if (interact == 1) {
      document.body.style.color = "rgb("+color1+")";
      document.body.style.backgroundColor = "rgb("+color2+")";
      //Make the radius and centre of the circle half of the overall width and height of its container rect
      let widthOfRect = window.innerWidth * 0.08;
      let halfOfRect = widthOfRect/2;


     //here's the circle which wipes out
      let grd = ctx.createRadialGradient(x,y,0, x,y,halfOfRect);
      grd.addColorStop(0, "rgba("+color2+",1)");
      grd.addColorStop(1, "rgba("+color1+",0)");

      ctx.fillStyle = grd;
      ctx.globalCompositeOperation = 'destination-out';
      ctx.fillRect(x - halfOfRect, y - halfOfRect, widthOfRect, widthOfRect);

      if (wipeyFrame % 10 == 0) {

        imageDataArray = ctx.getImageData(0,0,canvasy.width,canvasy.height).data;
        pixelArrayLength = imageDataArray.length;
        alphaArrayLength = pixelArrayLength / 4;
        cumulativeOpacity = 0;
        //get the alpha values for each pixel
        for (let i = 3; i < pixelArrayLength; i+=4) {
          cumulativeOpacity+= imageDataArray[i];
        }

        if (cumulativeOpacity < alphaArrayMaxCumulativeOpacity*0.002) {
          cumulativeOpacity = alphaArrayMaxCumulativeOpacity;


          document.body.removeChild(document.getElementById('wipeyCanvas'));
          interact = 0;
          setTimeout(function(){
            document.body.classList.add('canvasTransparent');
          },1600);
          setTimeout(function(){
            wipeyCanvasSetup();
            document.body.classList.remove('canvasTransparent');
            interact = 1;
          },wait);
        }
      }
      wipeyFrame++;
    }
  }
}

window.addEventListener('DOMContentLoaded',wipeyCanvasSetup);
window.addEventListener('resize',wipeyCanvasSize);

window.addEventListener('load',onLoad);


function onLoad() {
  if (window.isHidingNow != true) {
    document.body.classList.add('loaded');

    document.addEventListener('mousemove',function(e){
      if (!window.USER_IS_TOUCHING) {
        wipeyWipey(e.clientX,e.clientY);
      }
    });

    document.addEventListener('touchmove', function(e) {
      if (window.USER_IS_TOUCHING) {
        let touchposx = Math.round(e.touches[0].clientX);
        let touchposy = Math.round(e.touches[0].clientY);
        if (touchposx > 1 && touchposy >1){
          wipeyWipey(touchposx, touchposy);
        }
      }
    });
  }
}
