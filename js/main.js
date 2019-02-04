var player;
var jump = 50;
var playerSize = 40;
var pipes = [];
var pipeWidth = 50;
var pipeHeight = 200;
var fontSize = 17;
var score = 0;
pipes[0] = {x:800,y:0};
landImgLoc = 0;

var x1 = 0;
var x2;
var scrollSpeed = 2;

function preload() {

  birdImg = loadImage('img/birdImg.png');
  bgImg = loadImage('img/bgImg.jpg');
  landImg = loadImage('img/landImg.png');
  pipeNorth = loadImage('img/pipeNorth2Img.png');
  pipeSouth = loadImage('img/pipeSouthImg.png');
}

function setup() {
  createCanvas(800, 375);
  x2 = width;
  jumpSound= loadSound('sounds/jump.wav');
  player = createSprite(50, height/2, playerSize, playerSize);
  player.shapeColor = color(255);
  player.velocity.y = 1.4;
  player.addImage(birdImg);
}


function draw() {
  image(bgImg, 0, 0);
  textSize(fontSize);
  drawSprites();

  for (let i = 0; i < pipes.length; i++) {
    image(pipeNorth,pipes[i].x,pipes[i].y);
    var gap = 110; 
    image(pipeSouth,pipes[i].x,pipes[i].y + pipeHeight + gap);
    pipes[i].x-=2;

    if(pipes[i].x == 500){
      pipes.push({x:800,y:Math.random() * pipeHeight - pipeHeight} );
    }

    if(pipes[i].x + pipeWidth  < 0){
      pipes.splice(i, 1);
    }
  }
  
  //Parallax land´s effect
  image(landImg, x1, 0, width, height);
  image(landImg, x2, 0, width, height);
        
  x1 -= scrollSpeed;
  x2 -= scrollSpeed;
        
  if (x1 < -width){
    x1 = width;
  }
  if (x2 < -width){
    x2 = width;
  }

  text('Puntos: ' + score, 10, height - fontSize);
}


function mousePressed() {
  jumpSound.play();
  player.position.y -= jump;
}