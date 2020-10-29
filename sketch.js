
//declaring variables
var monkey , monkey_running, monkeyKillL
var banana ,bananaImage,bananaGroup 
var obstacle, obstacleImage,obstacleGroup
var score
var ground
var survivalTime
var score
var gameState
var play,end
function preload(){
  //loading images and animations
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  monkeyKillL=loadAnimation("sprite_0.png");
  //creating groups for banana and obstacle
  bananaGroup=createGroup();
  obstacleGroup=createGroup();
}



function setup() {
  //creating canvas
  createCanvas(600,600);
  //creating monkey sprite and adding animation to it
  monkey=createSprite(100,270,200,200);
  monkey.addAnimation("monkeyRunning",monkey_running);
  monkey.scale=0.1;
  //creating group sprite
  ground=createSprite(250,300,1600,10);
  //declaring score variable
  score=0;
  //adding gameState
  play=1;
  end=0;
  gameState=1;
}


function draw() {
  //clearing the background
  background("white");
  //if gameState is play
  if(gameState==1){
    //ground should move infinitely
    ground.velocityX=-5;
    if(ground.x<=0){
      ground.x=ground.width/2;
      ground.velocityX=-13;
    }
    //space key is pressed nad monkey is on ground the monkey should jump
    if(keyDown("space")&&monkey.y>150){
      monkey.velocityY=-13;
    }
    //so that the monkey comes back to ground
    monkey.velocityY=monkey.velocityY+0.8;
    //so that monkey does not go below the ground
    monkey.collide(ground);
    //to run the banana function when frame count is a multiple of 80
    if(frameCount%80==0){
    Banana(); 
    }
    //to run the obstacle function when frame count is a multiple of 300
    if(frameCount%300==0){
      Obstacle();
    }
    //assigning value to survival time
    survivalTime=Math.round(frameCount/frameRate());
  }
  //adding text for survival time and score
  text("Survival Time:"+survivalTime,100,50);
  text("Score:"+score,120,60);
  //running touching function
  touching();
  //if the gameState is end
  if(gameState==0){
    //making banana group and obstacle group immortal
    bananaGroup.setLifetimeEach(-1);
    obstacleGroup.setLifetimeEach(-1);
    //setting X velocity of banana group and obsatcle group to 0
    bananaGroup.setVelocityXEach(0);
    obstacleGroup.setVelocityXEach(0);
    //stopping ground
    ground.velocityX=0;
    //adding game over text
    text("game over",300,250);
    //stopping monkey
    monkey.addAnimation("pic1",monkeyKillL);
    monkey.changeAnimation("pic1",monkeyKillL);
    monkey.velocityY=0;
  }
  //displaying sprites
  drawSprites();
}

function Banana(){
  //creating banana sprite and adding image
  banana=createSprite(600,10,10,10);
  banana.addImage("pic",bananaImage);
  banana.scale=0.09;
  //setting random y position for banana
  banana.y=Math.round(random(120,200));
  //giving X velocity to banana
  banana.velocityX=-5;
  //giving banana a lifetime
  banana.lifetime=120;
  //adding banana to bananaGroup
  bananaGroup.add(banana);
}

function Obstacle(){
  //creating obstacle sprite and adding image
  obstacle=createSprite(600,280,10,10);
  obstacle.addImage("pic2",obstacleImage);
  obstacle.scale=0.09;
  //setting X velocity for obstacle
  obstacle.velocityX=-7;
  //giving obstacle a lifetime
  obstacle.lifetime=190;
  //adding obstacle to obstacleGroup
  obstacleGroup.add(obstacle);
}

function touching(){
  //if monkey is touching banana group
  if(monkey.isTouching(bananaGroup)){
    //destroy the banana
    bananaGroup.destroyEach();
    //increment score by 1
    score=score+1;
  }
  //if monkey is touching obstacle group
  if(monkey.isTouching(obstacleGroup)){
    //end gamestate
    gameState=0;
  }
}