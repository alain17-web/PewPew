window.onload = function(){
    let canvas = document.getElementById("gameCanvas");
    let ctx = canvas.getContext("2d");
    let imgGun = document.getElementById("gun");
    ctx.drawImage(imgGun,10,740,250,200);

    let imgBullet = document.getElementById("bullet");
    ctx.drawImage(imgBullet,250,400,150,100);

    let imgTarget = document.getElementById("target");
    ctx.drawImage(imgTarget,500,10,150,100);

}