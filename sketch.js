

//mam,my game is not ending when the girl touches the bird and villain.
//also,the villain is not destroyed when it touches the kunai(the weapon)
//the animation of bird is not displayed.
//mam also,i want to add a music thoughout the game but it is making weird sound when i does that


var PLAY=1;
var END=0;
var gameState=PLAY;

var zombie,zombieImg,girl,girlImg;
var road,roadImg,invisibleGround;
var obstaclesGroup,obstacle1,obstacle2,obstacle3,obstacle4;
var gameover,gameoverImg,gameoverSound,scoreSprite;
var score,backgroundMusic,replay,replayImg;
var birdsGroup,bird1,bird2;
var villainsGroup,villain1,villain2,villainDyingSound;
var kunai,kunaiImg,kunaiGroup,kunaiSound;

function preload(){

    zombieImg=loadAnimation("zombie1.png","zombie2.png","zombie3.png","zombie4.png","zombie5.png","zombie6.png",
    "zombie7.png","zombie8.png","zombie9.png","zombie10.png");
    
    girlImg=loadAnimation("run.png","run1.png","run2.png","run3.png","run4.png","run5.png",
    "run6.png","run7.png","run8.png","run9.png");
   
    roadImg=loadImage("road (2).jpg");
    gameoverImg=loadImage("game over.jpg");
    replayImg=loadImage("restart.png");
    gameoverSound=loadSound("game over sound.mp3");

    obstacle1=loadImage("rock1.png");
    obstacle2=loadImage("rock2.png");
    obstacle3=loadImage("rock3.png");
    obstacle4=loadImage("rock4.png");
    bird1=loadAnimation("bird-1.png","bird-2.png","bird-3.png","bird-1.png","bird-2.png","bird-3.png"); 
    bird2=loadAnimation("bird-2-1.png","bird-2-2.png","bird-3-3.png","bird-2-1.png","bird-2-2.png","bird-3-3.png");
    villain1=loadImage("villain3.png");
    villain2=loadImage("villain2.png");

    kunaiImg=loadImage("kunai.png");
    kunaiSound=loadSound("kunai sound.mp3");
    villainDyingSound=loadSound("villain dying.mp3")

    backgroundMusic=loadSound("background sound.mp3");
}

function setup() {
 createCanvas(900,500);

 zombie=createSprite(70,380,20,50);
 zombie.addAnimation("zombie",zombieImg);
 zombie.scale=.40;

 girl=createSprite(250,380,20,50);
 girl.addAnimation("girl",girlImg);
 girl.scale=.40;

 road=createSprite(200,250);
 road.addImage("scenery",roadImg);
 road.velocityX=-8;
 road.scale=4.5;
 
 invisibleGround = createSprite(500,480,1000,10);  
 invisibleGround.visible = false;

 gameover=createSprite(450,230);
 gameover.addImage("gameover",gameoverImg);
 gameover.scale=1;
 
 replay=createSprite(450,400);
 replay.addImage("restart",replayImg);
 replay.scale=.25;


 obstaclesGroup=createGroup();
 birdsGroup=createGroup();
 villainsGroup=createGroup();
 kunaiGroup=createGroup();

 score=0;

}

function draw() {
 
   background(180);
   
   if(road.x<0){
      road.x=road.width/1;
   }
 zombie.depth=road.depth;
 zombie.depth=zombie.depth+1;

 girl.depth=road.depth;
 girl.depth=girl.depth+1;

 score.depth=road.depth;
 score.depth=score.depth+1;

 birdsGroup.depth=road.depth;
 birdsGroup.depth=birdsGroup.depth+1;
 
 text("Score: "+ score, 250,380);
 

 if(gameState===PLAY){

gameover.visible=false;
replay.visible=false;

road.velocityX = -(10 + 3* score/300);
score = score + Math.round(getFrameRate()/60);

if(keyDown("up_arrow")&& girl.y >= 10) {
   girl.velocityY = -16;
}

spawnObstacles();
spawnBirds();
spawnVillain();
restart();

girl.velocityY =girl.velocityY + 0.8;

if(keyDown("space")){
   createKunai();
   kunaiSound.play();
   
}

if(kunaiGroup.isTouching(villainsGroup)){
villainsGroup.destroyEach();
kunaiGroup.destroyEach();
villainDyingSound.play();
}

if(obstaclesGroup.isTouching(girl)||birdsGroup.isTouching(girl)||villainsGroup.isTouching(girl)){
   gameState=END;
   gameoverSound.play();
}


 }

else if(gameState===END){

   gameover.visible=true;
   replay.visible=true;
   
   road.velocityX=0;
   girl.velocityY=0;

   obstaclesGroup.setLifetimeEach(-1);
   obstaclesGroup.setVelocityXEach(0);
   obstaclesGroup.destroyEach();

   birdsGroup.setLifetimeEach(-1);
   birdsGroup.setVelocityXEach(0);
   birdsGroup.destroyEach();

   villainsGroup.setLifetimeEach(-1);
   villainsGroup.setVelocityXEach(0);
   villainsGroup.destroyEach();

   kunaiGroup.setLifetimeEach(-1);
   kunaiGroup.setVelocityXEach(0);
   kunaiGroup.destroyEach(0);
   
   if(mousePressedOver(replay)) {
      restart();
    }
 }
 
 girl.collide(invisibleGround);
 
 drawSprites();
}

function spawnObstacles(){
if(frameCount % 60===0){
  var obstacle = createSprite(900,450,20,50);
  obstacle.velocityX = -(6 + score/60);
  
  var rand =Math.round(random(1,4));
  switch(rand){

   case 1:obstacle.addImage(obstacle1);
   break;
   case 2:obstacle.addImage(obstacle2);
   break;
   case 3:obstacle.addImage(obstacle3);
   break;  
   case 4:obstacle.addImage(obstacle4);
   break;
   default: break;
}

  obstacle.scale=0.10;
  obstacle.lifetime=250;

  obstaclesGroup.add(obstacle);
  obstacle.setCollider("rectangle",0,0,20,20);
}


}

function spawnBirds(){
if(frameCount % 200===0){
  var bird=createSprite(900,200,20,20);
  bird.velocityX = -(8 + score/300);

  var rand =Math.round(random(1,2));
  switch(rand){

   case 1:bird.addAnimation(bird1);
   break;
   case 2:bird.addAnimation(bird2);
   break;
   default:break;
     }
     bird.scale=0.10;
     bird.lifetime=250;

     birdsGroup.add(bird);

   }
                }

function spawnVillain(){
 if(frameCount %  250===0){
    var villain=createSprite(900,380,20,20);
    villain.velocityX=-(6 +  score/162);

    var rand=Math.round(random(1,2));
    switch(rand){

   case 1:villain.addImage(villain1);
   break;
   case 2:villain.addImage(villain2);
   break;
   default:break;

       }

       villain.scale=0.15;
       villain.lifetime=250;

       villainsGroup.add(villain);

 }
              }

function createKunai(){
 var kunai=createSprite(900,200,20,20);
 kunai.addImage("kunai",kunaiImg);
 kunai.x=girl.x;
 kunai.y=girl.y;
 kunai.velocityX=10;
 kunai.lifetime=150;
 kunai.scale=0.5;
 kunaiGroup.add(kunai);


}

function restart(){
   gameState=PLAY;
   replay.visible=false;
   gameover.visible=false;
   score=0;
}