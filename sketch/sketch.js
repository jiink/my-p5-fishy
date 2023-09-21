let swimmerSprite;
function preload() {
  swimmerSprite = loadImage("swimmer.png");
}

let bubbles;
var swimmerX = 0;
var swimmerY = 0;
var swimmerYVel = 0;
var swimmerYAccel = 10;
var swimmerScale = 4;
var swimmerFriction = 0.98;
var swimTrigger = false;
var swimTriggerTimer = 0;
var swimTriggerLength = 300;

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
  if (swimTrigger && (millis() - swimTriggerTimer) > swimTriggerLength / 2)
  {
    frame = 4;
  }
  image(
    swimmerSprite,
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

function jump() {
  swimTrigger = true;
  swimTriggerTimer = millis();
  swimmerYVel = -1.9;
  swimmerY -= 1;
  bubbles.addParticle();
}

function draw() {
  if (swimmerY < height - img.height * swimmerScale) {
    swimmerYAccel = 0.02;
    swimmerYVel += swimmerYAccel;
    swimmerYVel *= swimmerFriction;
    swimmerY += swimmerYVel;
  } else {
    swimmerYAccel = 0;
    swimmerYVel = 0;
    jump();
  }
  swimmerX = cos(millis() / 10000) * 100 + width / 2;
  if (millis() - swimTriggerTimer > swimTriggerLength) {
    swimTrigger = false;
  }

  background("#2B6790");
  drawSwimmer(swimmerX, swimmerY, Math.floor(millis() / 600));
  textSize(24);
  text("Click me!", mouseX - 32, mouseY);
}

function mouseClicked() {
  jump();
}