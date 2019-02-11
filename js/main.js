p5.disableFriendlyErrors = true; // disables FES
let player;
let jump = 30;
let playerWidth = 50;
let playerHeight = 40;
let pipes = [];
let pipeWidth = 50;
let pipeHeight = 200;
let fontSize = 17;
let score = 0;
let isPlaying = true;
let pipesGroup;
let gap = 155; 


let spawnPipeTime = 4000;
let lastSpawnTime;

pipes[0] = {x:800,y:0};

let landImgLoc = 0;
let x1 = 0;
let x2;
let scrollSpeed = 2;

function preload() {

  birdImg = loadImage('img/birdImg.png');
  bgImg = loadImage('img/bgImg.jpg');
  landImg = loadImage('img/landImg.png');
  pipeNorthImg = loadImage('img/pipeNorthImg.png');
  pipeSouthImg = loadImage('img/pipeSouthImg.png');
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
  lastSpawnTime = millis();
  leftScreen = createSprite(-40, height/2, 40, height);
}


function draw() {

  // Draw FPS 
  /*var fps = frameRate();
  if(fps.toFixed(2) < 15){
    console.log("Low fps");
  }*/

  image(bgImg, 0, 0);
  textSize(fontSize);
  
  if(player.position.y > 300 || player.position.y < 0){
    gameOver();
  }

  //Rotación constante del pajaro
  if (player.rotation < 20){
    player.rotation += 1; 
  }

  
  //Generación de tuberias por tiempo
  if(millis() > lastSpawnTime + spawnPipeTime) {
    let pipeNorthPosY = Math.floor(Math.random() * 70);
    let pipeNorthSprite = createSprite(850,pipeNorthPosY,pipeWidth, pipeHeight);
    pipeNorthSprite.setCollider("rectangle", 0, 0, pipeWidth, pipeHeight);
    pipeNorthSprite.addImage(pipeNorthImg);
    
    let pipeSouthSprite = createSprite(850,pipeNorthPosY + pipeHeight + gap ,pipeWidth, pipeHeight);
    pipeSouthSprite.setCollider("rectangle", 0, 0, pipeWidth, pipeHeight);
    pipeSouthSprite.addImage(pipeSouthImg);
    pipesGroup.add(pipeNorthSprite);
    pipesGroup.add(pipeSouthSprite);
    
    pipeNorthSprite.velocity.x = -1;
    pipeSouthSprite.velocity.x = -1;
    lastSpawnTime = millis();
  }

  //Puntos obtenidos en el juego
  for (let i = 0; i < pipesGroup.length; i++) {
    if(pipesGroup[i].position.x == player.position.x){
      score+= 0.5;
    }
  }

  //Colisiones con las tuberias
  player.overlap(pipesGroup, gameOver);
  
  //Colisiones con las tuberias
  leftScreen.overlap(pipesGroup, deletePipe);

  //Efecto parallax de la tierra
  image(landImg, x1, 0, width, height);
  image(landImg, x2, 0, width, height);

  drawSprites();
        
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

//Reinicio del juego
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

//Elimino la tuberia que salga de la pantalla
function deletePipe(leftScreenCol,pipeCol){
  pipeCol.remove();
}

function showMenu(){
  textFont(myFont);
  textSize(35);
  textAlign(CENTER, CENTER);
  text('GAME OVER', 0, height/2, width);
  text('Press R to replay', 0, height/2 + 50, width);
}