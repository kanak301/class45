
var car,car1,scooter1;
var carimg,bg,car1img;
var bgimg,scooter1img,resetimg,gameoverimg;
var life = 3;
var obstacle1group,obstacle2group;
var gameState = "play" ; 
var gameOver;
var reset;
var flag1 = 0;
var coins,coinimg;
var score = 0;

function preload(){
 carimg = loadImage("Images/Carimg.png") ;
 bgimg = loadImage("Images/trackimg.jpg") ;
 car1img = loadImage("Images/Car3img.png");
 scooter1img = loadImage("Images/scooterimg.png");
 resetimg = loadImage("Images/resetbutton.jpg");
 gameoverimg = loadImage("Images/gob.png");
coinimg = loadImage("Images/Coinspriteimg.png");

}
function setup() {

  createCanvas(displayWidth,displayHeight);

  bg = createSprite(displayWidth/2,displayHeight/2,displayWidth,displayHeight);
  bg.velocityY = 30;
  bg.addImage(bgimg)
  bg.scale = 4;

  car = createSprite(displayWidth/2,displayHeight/2,20,50);
  car.addImage(carimg);

  obstacle1group = new Group();
  obstacle2group = new Group(); 

  car.scale=0.1;

}

function draw() {

  background(255); 

  if(gameState == "play"){

    if(bg.y>displayHeight/2){
      bg.y = 0;
    }

    score = score+Math.round(frameCount/100);

    createobstacle1();
    createobstacle2();

    if(car.isTouching(obstacle1group)||car.isTouching(obstacle2group)){

      life = life-1;

      obstacle1group.destroyEach();
      obstacle2group.destroyEach();
  
    }

    //togivescores
    createcoins();

    if(coins!=undefined&&car.isTouching(coins)){
     score=50+frameCount;
    }
  
    moveleft();
    moveright();
    increasespeed();
    
    if(life == 0 ){
      gameState = "end";
    }

  }

  else if(gameState == "end" ){

   car.visible = false;
   bg.visible = false;


   if(flag1==0){
    gameOver = createSprite(displayWidth/2,displayHeight/2 - 150,40,20);
   gameOver.addImage(gameoverimg);
   gameOver.scale = 0.5;

   reset = createSprite(displayWidth/2,displayHeight/2 +50,40,20);
   reset.addImage(resetimg);
   reset.scale = 0.1;

   flag1+=1;
  }

  

if(mouseIsOver(reset)){

  gameState = "play";
  resetgame();
  console.log("hi");




}

  }
 
  
  drawSprites();

  //scoresandlife
  fill("yellow");
  strokeWeight(5);
  stroke("red");
  textSize(20);
  text("LIFE:"+life,displayWidth/3,displayHeight/7);
  text("SCORE:"+score,displayWidth/2+150,displayHeight/7);
}

function moveleft(){
  if(keyDown("l")){
    car.x = car.x + 10;

  }
}

function moveright(){
  if(keyDown("r")){
    car.x = car.x - 10;

  }
}

function increasespeed(){
  if(keyDown("space")&&car.y>50){
    car.y = car.y - 1;

  }
}

function createobstacle1(){
  if(frameCount%200==0){

  var rox = random(50,displayWidth-50);

  car1 = createSprite(rox,0,20,50);
  car1.addImage(car1img);
  car1.scale = 0.3;
  car1.velocityY = 15;
  car1.display();
  obstacle1group.add(car1);
  }
}

function createobstacle2(){
  if(frameCount%100==0){

  var rox2 = random(50,displayWidth-50);

  scooter1 = createSprite(rox2,0,20,50);
  scooter1.addImage(scooter1img);
  scooter1.scale = 0.3;
  scooter1.velocityY = 15;
  scooter1.display();
  obstacle2group.add(scooter1);
  }
}

function resetgame(){
  car.visible = true;
  bg.visible = true;
  life = 3;
  gameOver.destroy();
  reset.destroy();
  score = 0;
}

function createcoins(){
  if (frameCount%400==0){
    var randomx = random(50,displayWidth-50);
    
    coins = createSprite(randomx,0,20,20);
    coins.velocityY = -30
    coins.addImage(coinimg);
  }
}

