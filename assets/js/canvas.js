let canvas,ctx;

window.onload = function(){
    canvas = document.getElementById("gameCanvas");
    ctx = canvas.getContext("2d");

    document.addEventListener('keydown',keyPressed);
    document.addEventListener('keyup',keyReleased);
    
    setInterval(updateAll,1000/60);
}

let gunXPos = 0;
const GUN_Y_POS = 580;
const GUN_SIZE = 20;
let gunXSpeed = 5;
let gunYSpeed = 5;

let bulletXPos = 0;
let bulletYPos = 0;
const BULLET_WIDTH = 4;
const BULLET_HEIGHT = 6;
let bulletYSpeed = 10;


let targetXPos = 0;
let targetYPos = 0;
const TARGET_SIZE = 20;
let targetXSpeed = 1;
let targetYSpeed = 1;

let settingUp = true;

function updateAll(){
    colorRect(0,0,canvas.width,canvas.height,'black');
    colorRect(gunXPos,GUN_Y_POS,GUN_SIZE,GUN_SIZE,'green');
    colorRect(bulletXPos,bulletYPos,BULLET_WIDTH,BULLET_HEIGHT,'red');
    colorRect(targetXPos,targetYPos,TARGET_SIZE,TARGET_SIZE,'blue');

    if(settingUp ){
        setUp();
        settingUp = false;
    }

    moveGun();
    bulletShoot();
}

function colorRect(topLeftX,topLeftY,boxWidth,boxHeight,colorFill){
    ctx.fillStyle = colorFill;
    ctx.fillRect(topLeftX,topLeftY,boxWidth,boxHeight);
}

let leftKeyPress = false;
let rightKeyPress = false;
let shooting = false;
let shot = false;

const LEFT_KEY = 37;
const RIGHT_KEY = 39;
const SPACE_KEY = 32;

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

function keyReleased(evt){
    if(evt.keyCode == LEFT_KEY){
        leftKeyPress = false;
    }
    if(evt.keyCode == RIGHT_KEY){
        rightKeyPress = false;
    }
}

function bulletShoot(){
    if(shooting && shot == false){
        bulletXPos = gunXPos + GUN_SIZE/2 - BULLET_WIDTH/2;
        bulletYPos = GUN_Y_POS;
        shot = true;
    }
    if(shooting && shot){
        bulletYPos -= bulletYSpeed;
    }
    if(bulletYPos < 0 || bulletXPos + BULLET_WIDTH > targetXPos && bulletXPos < targetXPos + TARGET_SIZE && bulletYPos + BULLET_HEIGHT > targetYPos && bulletYPos < targetYPos + TARGET_SIZE){
        console.log("BOUM");
        shot = false;
        shooting = false;
        targetXPos = Math.floor(Math.random() * (canvas.width - TARGET_SIZE));
        targetYPos = Math.floor(Math.random() * (canvas.height/2));
    }
    if(shot == false && shooting == false){
        bulletXPos = 0 - BULLET_WIDTH;
        bulletYPos = 0;
        
    }
    
}


function setUp(){
    gunXPos = canvas.width / 2 - GUN_SIZE / 2;
    targetXPos = Math.floor(Math.random() * (canvas.width - TARGET_SIZE));
    targetYPos = Math.floor(Math.random() * (canvas.height/2));
    
}

function moveGun(){
    if(leftKeyPress){
        gunXPos -= gunXSpeed;
    }
    if(rightKeyPress){
        gunXPos += gunXSpeed;
    }
}



