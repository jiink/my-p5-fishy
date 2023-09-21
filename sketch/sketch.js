let img;
function preload() {
  img = loadImage("swimmer.png");
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
  bubbles = new ParticleSystem(createVector(0, 0));
}

function drawSwimmer(posX, posY, frame) {
  frame = frame % 3;
  if (swimTrigger) {
    frame = 3;
  }
  image(
    img,
    posX,
    posY,
    19 * swimmerScale,
    27 * swimmerScale,
    26 * frame,
    0,
    19,
    27
  );
  if (frameCount % 60 == 0) {
    bubbles.origin = createVector(posX + 5, posY + 30);
    bubbles.addParticle();
  }

  bubbles.run();
}

function draw() {
  if (swimmerY < height - img.height * swimmerScale) {
    swimmerYAccel = 0.02;
    swimmerYVel += swimmerYAccel;
    swimmerY += swimmerYVel;
  } else {
    swimmerYAccel = 0;
    swimmerYVel = 0;
  }
  swimmerX = cos(millis() / 10000) * 100 + width / 2;
  if (millis() - swimTriggerTimer > 500) {
    swimTrigger = false;
  }

  background("#2070e0");
  drawSwimmer(swimmerX, swimmerY, Math.floor(millis() / 600));
  textSize(24);
  text("Click me!", mouseX - 32, mouseY);
}

function mouseClicked() {
  swimTrigger = true;
  swimTriggerTimer = millis();
  swimmerYVel = -1.5;
  swimmerY -= 1;
  bubbles.addParticle();
}