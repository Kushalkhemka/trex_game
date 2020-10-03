var trex;
var trex_anim;
var ground;
var ground_anim;
var invground;
var cloud;
var cloud_img;
var score;
var obs;
var o1,o2,o3,o4,o5,o6;
var obstac;
var cloudGroup;
var obsGroup;
var PLAY=2;
var END=0;
var gameState=PLAY;
var trex_img;
var gameOver,gameOver_img;
var restart,restart_img;
var jumpSound,dieSound,checkpointSound;

function preload()
{
  trex_anim=loadAnimation("trex1.png","trex3.png","trex4.png");
  ground_anim=loadImage("ground2.png");
  cloud_img=loadImage("cloud.png");
  o1=loadImage("obstacle1.png");
  o2=loadImage("obstacle2.png");
  o3=loadImage("obstacle3.png");
  o4=loadImage("obstacle4.png");
  o5=loadImage("obstacle5.png");
  o6=loadImage("obstacle6.png");
  trex_img=loadAnimation("trex_collided.png");
  gameOver_img=loadImage("gameOver.png");
  restart_img=loadImage("restart.png");
  
  //To load sounds
  jumpSound=loadSound("jump.mp3");
  dieSound=loadSound("die.mp3");
  checkpointSound=loadSound("checkPoint.mp3");
}

function setup() 
{
  createCanvas(windowWidth,windowHeight);
  trex=createSprite(50,height-70,20,20);
  trex.addAnimation("run",trex_anim);
  trex.addAnimation("end",trex_img);
  trex.scale=0.5;
  
  
  ground=createSprite(width/2,height-40,width,15);
  ground.addImage("illusion",ground_anim);
  
  invground=createSprite(width/2,height-25,width,15);
  invground.visible=false;
  score=0;
  
  cloudGroup= new Group();
  obsGroup=new Group();
  
  // trex.debug=true;
  trex.setCollider("circle",0,0,40);
  
  gameOver=createSprite(width/2,height-250,0,0);
  gameOver.addImage(gameOver_img);
  gameOver.scale=0.7;
  restart=createSprite(width/2,height/2,10,10);
  restart.addImage(restart_img);
  restart.scale=0.6;
}

function draw()
{
  background("white");
  
  //console.log(getFrameRate());
  
  if(gameState===PLAY)
  {
    if(keyDown("space")&&trex.y>340)
  {
    trex.velocityY=-11;
    jumpSound.play();
  }
    trex.velocityY=trex.velocityY+0.5;
    
    ground.velocityX=-(1+score/100);
    
    if(score>0 && score%100===0)
    {
      checkpointSound.play();
    }
      
    
 if(frameCount%50===0)
  {
    spawnCloud();
  }
   // console.log(cloud.lifetime);
  
 if(frameCount%60===0)
  {
    obstacle();
  }
    
    gameOver.visible=false;
    restart.visible=false;
    
  score=score+Math.round(getFrameRate()/50);
    
  if(trex.isTouching(obsGroup))
  {
    gameState=END;
    dieSound.play();
  }
    
 }
  else if(gameState===END)
  {
    ground.velocityX=0;
    cloudGroup.setVelocityXEach(0);
    obsGroup.setVelocityXEach(0);
    trex.changeAnimation("end",trex_img);
    cloudGroup.setLifetimeEach(-2);
    obsGroup.setLifetimeEach(-2);
    trex.velocityY=0;
    
    gameOver.visible=true;
    restart.visible=true;
    
  }
  
  if(mousePressedOver(restart))
  {
    reset();
  }
  
  
  //console.log(trex.y);
  
  
  trex.collide(invground);
 
 if(ground.x<0)
 {
    ground.x=ground.width/2;
 }
  //To draw the sprites
  drawSprites();
  
  //To display scores
  fill("black");
  textSize(13);
  text("Score: "+score,width-80,30);
  
}

function spawnCloud()
{
  cloud=createSprite(width-15,Math.round(random(50,200)),20,20);
  trex.depth=cloud.depth;
  trex.depth=trex.depth+1;
  cloud.velocityX=-(3+score/100);
  cloud.addImage("cloud",cloud_img);
  cloud.scale=0.5;
  cloud.lifetime=130;
  cloudGroup.add(cloud);
  restart.depth=cloud.depth;
  restart.depth=restart.depth+1;
}

function obstacle()
{
  obs=createSprite(width-20,height-60,10,10);
  obs.velocityX=-(3+score/100);
  obs.scale=0.5;
  obs.lifetime=132;
  obstac=Math.round(random(1,6));
  

  switch(obstac)
  {
    case 1: obs.addImage(o1);
    break;
    
    case 2: obs.addImage(o2);
    break;
    
    case 3: obs.addImage(o3);
    break;
    
    case 4: obs.addImage(o4);
    break;
    
    case 5: obs.addImage(o5);
    break;
    
    case 6: obs.addImage(o6);
    break;
      
  }
  
  obsGroup.add(obs);
  
}

function reset()
{
  gameState=PLAY;
  score=0;
  gameOver.visible=false;
  restart.visible=false;
  trex.changeAnimation("run");
  obsGroup.destroyEach();
  cloudGroup.destroyEach();
}