var player;
var jump = 50;
var playerWidth = 50;
var playerHeight = 40;
var pipes = [];
var pipeWidth = 50;
var pipeHeight = 200;
var fontSize = 17;
var score = 0;
var isPlaying = true;

pipes[0] = {x:800,y:0};
var landImgLoc = 0;


var x1 = 0;
var x2;
var scrollSpeed = 2;

function preload() {

  birdImg = loadImage('img/birdImg.png');
  bgImg = loadImage('img/bgImg.jpg');
  landImg = loadImage('img/landImg.png');
  pipeNorth = loadImage('img/pipeNorth2Img.png');
  pipeSouth = loadImage('img/pipeSouthImg.png');
  jumpSound= loadSound('sounds/jump.wav');
  gameOverSound= loadSound('sounds/gameOver.wav');
  myFont = loadFont('fonts/rules.ttf');
}

function setup() {
  createCanvas(800, 375);
  x2 = width;
  player = createSprite(50, height/2, playerWidth, playerHeight);
  var myAnimation = player.addAnimation('flying', 'img/birdImg.png', 'img/birdImgDown.png', 'img/birdImgUp.png');
  player.shapeColor = color(255);
  player.velocity.y = 1.4;
  player.addImage(birdImg);
}


function draw() {
  image(bgImg, 0, 0);
  textSize(fontSize);
  drawSprites();

  if(player.position.y > 300 || player.position.y < 0){
    gameOver();
  }



  for (let i = 0; i < pipes.length; i++) {
    image(pipeNorth,pipes[i].x,pipes[i].y);
    var gap = 110; 
    image(pipeSouth,pipes[i].x,pipes[i].y + pipeHeight + gap);
    pipes[i].x-=2;

    //Colisiones con tuberías (Recordar que el player tiene la imagen en modo CENTER CENTER)
    if( player.position.x + (playerWidth/2 - 5) >= pipes[i].x  && 
      ((player.position.y >= pipes[i].y && player.position.y <= pipes[i].y + pipeHeight) || 
        (player.position.y >= pipes[i].y + pipeHeight + gap && player.position.y <= pipes[i].y + 2*pipeHeight + gap ))){
      gameOver();
    }

    if(pipes[i].x == 500){
      pipes.push({x:800,y:Math.random() * pipeHeight - pipeHeight} );
    }

    if(pipes[i].x + pipeWidth  < 0){
      pipes.splice(i, 1);
    }

    if(pipes[i].x == player.position.x){
      score++;
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

  textFont(myFont);
  textSize(20);
  textAlign(CENTER, BOTTOM);
  text('Points   ' + score, 60, height - 7);
}


function mousePressed() {
  if(isPlaying){
    jumpSound.play();
    player.position.y -= jump;
  }
}

//Reloading game
function keyPressed() {
  if(keyCode === 82){
    location.reload();
  }
}

function gameOver(){
  isPlaying = false;
  noLoop();
  gameOverSound.play();
  showMenu();
  
}

function showMenu(){
  textFont(myFont);
  textSize(35);
  textAlign(CENTER, CENTER);
  text('GAME OVER', 0, height/2, width);
  text('Press R to replay', 0, height/2 + 50, width);
}