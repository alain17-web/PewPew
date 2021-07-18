let canvas,ctx,freeze;


//Start the game
window.onload = function(){
    canvas = document.getElementById("gameCanvas");
    ctx = canvas.getContext("2d");
    freeze = false;

    //shoot and move onclick
    if(freeze == false){
    document.addEventListener('keydown',keyPressed);
    document.addEventListener('keyup',keyReleased);
    }
    
    setInterval(updateAll,1000/60);
    
}

//defining gun
let gunXPos = 0;
const GUN_Y_POS = 580;
const GUN_SIZE = 20;
let gunXSpeed = 5;
let gunYSpeed = 5;

//defining bullet
let bulletXPos = 0;
let bulletYPos = 0;
const BULLET_WIDTH = 4;
const BULLET_HEIGHT = 6;
let bulletYSpeed = 10;

//defining target
let targetXPos = 0;
let targetYPos = 0;
const TARGET_SIZE = 15;
let targetXSpeed = 1;
let targetYSpeed = 1;

let settingUp = true;

//defining counters
let shotsCounter = 0;
let hitCounter = 0;
let points = 0;

function updateAll(){
    colorRect(0,0,canvas.width,canvas.height,'black');//draw background
    colorRect(gunXPos,GUN_Y_POS,GUN_SIZE,GUN_SIZE,'green');//draw gun
    colorRect(bulletXPos,bulletYPos,BULLET_WIDTH,BULLET_HEIGHT,'red');//draw bullet
    drawTarget(targetXPos,targetYPos,TARGET_SIZE,TARGET_SIZE,'blue');//draw target
    
    //draw stars
    drawStar(100,100,5,30,15);
    drawStar(250,150,5,30,15);
    drawStar(650,80,5,30,15);
    drawStar(450,100,5,30,15);
    drawStar(120,300,5,30,15);
    drawStar(550,330,5,30,15);
    drawStar(700,450,5,30,15);
    drawStar(450,450,5,30,15);
    drawStar(150,500,5,30,15);
    drawStar(550,550,5,30,15);
    
    //call functions
    if(settingUp ){
        setUp();
        settingUp = false;
    }

    moveGun();
    bulletShoot();
    endGame();
}

//function to create a rectangle
function colorRect(topLeftX,topLeftY,boxWidth,boxHeight,colorFill){
    ctx.fillStyle = colorFill;
    ctx.fillRect(topLeftX,topLeftY,boxWidth,boxHeight);
}

//function to create a star
function drawStar(cx,cy,spikes,outerRadius,innerRadius){
    var rot=Math.PI/2*3;
    var x=cx;
    var y=cy;
    var step=Math.PI/spikes;

    ctx.beginPath();
    ctx.moveTo(cx,cy-outerRadius)
    for(i=0;i<spikes;i++){
      x=cx+Math.cos(rot)*outerRadius;
      y=cy+Math.sin(rot)*outerRadius;
      ctx.lineTo(x,y)
      rot+=step

      x=cx+Math.cos(rot)*innerRadius;
      y=cy+Math.sin(rot)*innerRadius;
      ctx.lineTo(x,y)
      rot+=step
    }
    ctx.lineTo(cx,cy-outerRadius);
    ctx.closePath();
    ctx.lineWidth=5;
    ctx.strokeStyle='yellow';
    ctx.stroke();
    ctx.fillStyle='yellow';
    ctx.fill();

}

//function to create a round-shaped target
function drawTarget(){
    ctx.beginPath();
    ctx.arc(targetXPos, targetYPos, TARGET_SIZE, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fillStyle='blue';
    ctx.fill();
}


//function to set up position of gun and random position for target
function setUp(){
    gunXPos = canvas.width / 2 - GUN_SIZE / 2;
    targetXPos = Math.floor(Math.random() * (canvas.width - TARGET_SIZE));
    targetYPos = Math.floor(Math.random() * (canvas.height/2));
    
}

//By default, set to false
let leftKeyPress = false;//move left
let rightKeyPress = false;//move right
let shooting = false;//shoot
let shot = false;//when a bullet has been shot

//keycodes
const LEFT_KEY = 37;
const RIGHT_KEY = 39;
const SPACE_KEY = 32;

//function to move or shoot
function keyPressed(evt){
    if(evt.keyCode == LEFT_KEY){
        leftKeyPress = true;
    }
    if(evt.keyCode == RIGHT_KEY){
        rightKeyPress = true;
    }
    if(evt.keyCode == SPACE_KEY){
        shooting = true;
    }
}

//function to stop moving when key released
function keyReleased(evt){
    if(evt.keyCode == LEFT_KEY){
        leftKeyPress = false;
    }
    if(evt.keyCode == RIGHT_KEY){
        rightKeyPress = false;
    }
}

//function to shoot
function bulletShoot(){
    if(shooting && shot == false){
        //when click on space key,position of bullet = position of gun
        bulletXPos = gunXPos + GUN_SIZE/2 - BULLET_WIDTH/2;
        bulletYPos = GUN_Y_POS;
        shot = true;
    }
    if(shooting && shot){
        //when shot, the bullet moves in a vertical direction
        bulletYPos -= bulletYSpeed;
    }
    if(bulletYPos < 0 || bulletXPos + BULLET_WIDTH > targetXPos && bulletXPos < targetXPos + TARGET_SIZE && bulletYPos + BULLET_HEIGHT > targetYPos && bulletYPos < targetYPos + TARGET_SIZE){
        //when bullet misses target and goes out of canvas

        //shots counter increases
        shotsCounter += 1;
        document.getElementById('count').innerHTML = shotsCounter;

        //shot & shooting set to false so that position of bullet = 0,0
        shot = false;
        shooting = false;
    }
    if(bulletXPos + BULLET_WIDTH > targetXPos && bulletXPos < targetXPos + TARGET_SIZE && bulletYPos + BULLET_HEIGHT > targetYPos && bulletYPos < targetYPos + TARGET_SIZE){
       //when bullet hits target

       //hit counter increases
        hitCounter += 1;
        document.getElementById('hit').innerHTML = hitCounter;

        //points increase and are stored
        points += 100;
        if (typeof(Storage) !== "undefined") {
            localStorage.setItem("points", points);
            document.getElementById("pts").innerHTML = localStorage.getItem("points");
        }

        //target gets new random position
        targetXPos = Math.floor(Math.random() * (canvas.width - TARGET_SIZE));
        targetYPos = Math.floor(Math.random() * (canvas.height/2));
    }

    if(shot == false && shooting == false){
        //position of bullet = 0,0
        bulletXPos = 0 - BULLET_WIDTH;
        bulletYPos = 0;
        
    }
    
}

//function to move the gun left or right
function moveGun(){
    if(leftKeyPress){
        gunXPos -= gunXSpeed;
    }
    if(rightKeyPress){
        gunXPos += gunXSpeed;
    }
}

//function to display GAME OVER and freeze game when 10 targets have been hit
function endGame(){
    if(hitCounter == 10){
        document.getElementById("end").innerHTML = "GAME OVER !";
        gunXPos = canvas.width / 2 - GUN_SIZE / 2;
        freeze = true;
    }
}

function reset() {
  location.reload();
}

