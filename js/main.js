var player;
var jump = 50;
var playerSize = 40;
var pipes = [];
var pipeWidth = 50;
var pipeHeight = 200;
pipes[0] = {x:800,y:0};

function preload() {

  birdImg = loadImage('img/birdImg.png');
  bgImg = loadImage('img/bgImg.jpg');
  pipeNorth = loadImage('img/pipeNorth2Img.png');
  pipeSouth = loadImage('img/pipeSouthImg.png');
}

function setup() {
  createCanvas(800, 375);
  player = createSprite(50, height/2, playerSize, playerSize);
  player.shapeColor = color(255);
  player.velocity.y = 1.4;
  player.addImage(birdImg);
}
function draw() {

  background(50);
  image(bgImg, 0, 0);
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
}
function mousePressed() {
  player.position.y -= jump;
}