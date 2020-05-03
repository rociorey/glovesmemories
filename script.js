var canvas=document.getElementById("canvasTop");
var ctx=canvas.getContext("2d");
var canvas2=document.getElementById("canvasBottom");
var ctx2=canvas2.getContext("2d");

var canvasOffset=$("#canvasTop").offset();
var offsetX=canvasOffset.left;
var offsetY=canvasOffset.top;

var startX;
var startY;
var isDown=true;

var img=new Image();
img.onload=function(){
    canvas.width=canvas2.width=img.width;
    canvas.height=canvas2.height=img.height;
    ctx.lineWidth=50;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.fillStyle="red";
    ctx.shadowColor='white';
    ctx.shadowOffsetX=0;
    ctx.shadowOffsetY=0;
    ctx.shadowBlur=40;
    ctx.fillRect(0,0,canvas.width,canvas.height);
    ctx2.drawImage(img,0,0);
};
img.src="https://i.postimg.cc/YCSK7w0G/30-04-20-Glove-Texts.png";

var img2=new Image();
img2.onload=function(){
    ctx.drawImage(img2,0,0);
};
img2.src="https://i.postimg.cc/XX63J069/BRITAIN-HEALTH-VIRUS.jpg";


function handleMouseDown(e){
    e.preventDefault();
    startX=parseInt(e.pageX-offsetX);
    startY=parseInt(e.pageY-offsetY);
    isDown=true;
}

function handleMouseMove(e){
    if(!isDown){return;}
    mouseX=parseInt(e.pageX-offsetX);
    mouseY=parseInt(e.pageY-offsetY);
    
    // Put your mousemove stuff here
    ctx.save();
    ctx.globalCompositeOperation="destination-out";
    ctx.beginPath();
    ctx.moveTo(startX,startY);
    ctx.lineTo(mouseX,mouseY);
    ctx.stroke();
    startX=mouseX;
    startY=mouseY;
}

$("#canvasTop").mousemove(function(e){handleMouseMove(e);});


