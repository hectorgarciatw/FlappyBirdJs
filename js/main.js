let player;
let jump = 50;
let playerWidth = 50;
let playerHeight = 40;
let pipes = [];
let pipeWidth = 50;
let pipeHeight = 200;
let fontSize = 17;
let score = 0;
let isPlaying = true;

pipes[0] = {x:800,y:0};

let landImgLoc = 0;
let x1 = 0;
let x2;
let scrollSpeed = 2;

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
  pipesGroup = new Group();
  x2 = width;
  player = createSprite(50, height/2, playerWidth, playerHeight);
  //Animación de las alas
  let myAnimation = player.addAnimation('flying', 'img/birdImg.png', 'img/birdImgDown.png', 'img/birdImgUp.png');
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

  //Rotación constante del pajaro
  if (player.rotation < 20){
    player.rotation += 1; 
  }
  
  for (let i = 0; i < pipes.length; i++) {
    //Elimino las tuberias que salieron de la pantalla
    if(pipes[i].x + pipeWidth  < 0){
      pipes.shift(); 
    }
    
    image(pipeNorth,pipes[i].x,pipes[i].y);
    let gap = 110; 
    image(pipeSouth,pipes[i].x,pipes[i].y + pipeHeight + gap);
    pipes[i].x-=2.5;  


    //Colisiones con tuberías (Recordar que el player tiene la imagen en modo CENTER CENTER)
    if( player.position.x + (playerWidth/2 - 5) >= pipes[i].x  && 
      ((player.position.y >= pipes[i].y && player.position.y <= pipes[i].y + pipeHeight) || 
        (player.position.y >= pipes[i].y + pipeHeight + gap && player.position.y <= pipes[i].y + 2*pipeHeight + gap ))){
      gameOver();
    }

    if(pipes[i].x == 550){
      pipes.push({x:800,y:Math.random() * pipeHeight - pipeHeight} );
    }

    if(pipes[i].x == player.position.x){
      score++;
    }
  }
  
  //Efecto parallax de la tierra
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
    player.rotation = -20;
    player.position.y -= jump;
  }
}

//Recargando el juego
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