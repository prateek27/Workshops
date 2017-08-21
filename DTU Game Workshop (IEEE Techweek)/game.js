//Game JS File
function loadImages(){
  playerImage = new Image;
  playerImage.src = "assets/pika.png";

  enemyImage = new Image;
  enemyImage.src = "assets/gengar.png";

  ballImage = new Image;
  ballImage.src = "assets/ball.png";
}

function init(){


  canvas = document.getElementById('mycanvas');
  console.log(canvas);
  pen  = canvas.getContext('2d');
  W = canvas.width;
  H = canvas.height;
  GAME_OVER = false;

  enemy = {
    x: 280,
    y:230,
    w:100,
    h:100,
    speed:4,
  };

  player = {
    x:10,
    y: H/2,
    w:100,
    h:100,
    speed:0
  }
  goal = {
    x:W-100,
    y:H/2,
    w:100,
    h:100
  }

  canvas.addEventListener('mousedown',function(){
    player.speed = 10;
  });
  canvas.addEventListener('mouseup',function(){
    player.speed = 0;
  });



}
function isColliding(r1,r2){

  var firstCond = Math.abs(r1.x-r2.x)<=r1.w;
  var secondCond = Math.abs(r2.y - r1.y)<=r1.h;
  return firstCond&&secondCond;

}
function draw(){
    pen.clearRect(0,0,W,H);

    pen.fillStyle = "blue";
    pen.drawImage(enemyImage,enemy.x, enemy.y,enemy.w,enemy.h);

    pen.fillStyle = "red";
    pen.drawImage(ballImage,goal.x,goal.y,goal.w,goal.h);

    pen.fillStyle = "green";
    pen.drawImage(playerImage,player.x,player.y,player.w,player.h);

}

function update(){
  enemy.y = enemy.y + enemy.speed;

  if(enemy.y>=H-enemy.h || enemy.y<=0){
    enemy.speed = -1*enemy.speed;
  }
  if(isColliding(player,enemy)){
    alert("Game Over");
    GAME_OVER = true;
  }
  if(isColliding(player,goal)){
    alert("Level-1 Complete");
    GAME_OVER = true;
  }

  player.x += player.speed;
}

function loop(){
  console.log("In Game Loop");
  draw();
  update();
  if(GAME_OVER==false){
    window.requestAnimationFrame(loop);
  }
}

loadImages();
init();
loop();
