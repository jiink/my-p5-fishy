let bubbleSprite;

class ParticleSystem {
    constructor(position) {
      this.origin = position.copy();
      this.particles = [];
      bubbleSprite = loadImage("bubble.png");
    }
  
    addParticle() {
      this.particles.push(new Particle(this.origin));
    }
  
    run() {
      for (let i = this.particles.length - 1; i >= 0; i--) {
        const p = this.particles[i];
        p.run();
        if (p.isDead()) {
          this.particles.splice(i, 1);
        }
      }
    }
  }
  
  class Particle {
    constructor(position) {
      this.acceleration = createVector(0, -0.05);
      this.velocity = createVector(random(-1, 1), random(-1, 0));
      this.position = position.copy();
      this.timeToLive = 100;
      this.type = Math.round(Math.random());
    }
  
    run() {
      this.update();
      this.display();
    }
  
    update() {
      this.velocity.add(this.acceleration);
      this.position.add(this.velocity);
      this.timeToLive -= 1;
    }
  
    display() {
      if (this.type == 0 || (Math.floor(this.timeToLive)) % 2 == 0)
      {
        image(bubbleSprite, this.position.x, this.position.y, bubbleSprite.width * 4, bubbleSprite.height * 4);
      }
    }
  
    isDead() {
      return this.timeToLive < 0;
    }
  }