let img;
function preload() {
  img = loadImage('swimmer.png');
}

let bubbles;
var swimmerX = 0;
var swimmerY = 0;
var swimmerYVel = 0;
var swimmerYAccel = 10;
var swimmerScale = 4;
var swimTrigger = false;
var swimTriggerTimer = 0;

function setup() {
  createCanvas(400, 400);
  noSmooth();
  //bubbles = new ParticleSystem(fish.getMouthPosition());
}


function drawSwimmer(posX, posY, frame)
{
  frame = frame % 3;
  if (swimTrigger)
  {
    frame = 3;
  }
  image(img, posX, posY, 19 * swimmerScale, 27 * swimmerScale, 26 * frame, 0, 19, 27);
}

function draw() {
  if (swimmerY < height - img.height * swimmerScale)
  {
    swimmerYAccel = 0.02;
    swimmerYVel += swimmerYAccel;
    swimmerY += swimmerYVel;
  }
  else
  {
    swimmerYAccel = 0;
    swimmerYVel = 0;
  }
  swimmerX = cos(millis() / 10000) * 100 + width/2;
  if (millis() - swimTriggerTimer > 500)
  {
    swimTrigger = false;
  }
  

  background('#2070e0');
  drawSwimmer(swimmerX, swimmerY, Math.floor(millis()/600));
}

function mouseClicked()
{
  swimTrigger = true;
  swimTriggerTimer = millis();
  swimmerYVel = -1.5;
  swimmerY -= 1;
}