var spr;
var jump = 70;
var playerSize = 40;
var pipes = [];
pipes[0] = {x:800,y:0};


function preload() {

  birdImg = loadImage('img/bird2.png');
  bgImg = loadImage('img/bgImg.jpg');
  pipeNorth = loadImage('img/pipeImg.png');
}

function setup() {
  createCanvas(800, 375);
  
  spr = createSprite(50, height/2, playerSize, playerSize);
  spr.shapeColor = color(255);
  spr.velocity.y = 1.5;
  spr.addImage(birdImg);
}
function draw() {

  background(50);
  image(bgImg, 0, 0);
  drawSprites();

  for (let i = 0; i < pipes.length; i++) {
    image(pipeNorth,pipes[i].x,pipes[i].y);
    pipes[i].x--;

    if(pipes[i].x == 500){
      console.log("Agregar nueva pipe");
      pipes.push({x:800,y:0});
    }

    if(pipes[i].x < 0){
      console.log("Eliminar esta pipe");
    }
    
  }

  

}
function mousePressed() {
  spr.position.y -= jump;
}