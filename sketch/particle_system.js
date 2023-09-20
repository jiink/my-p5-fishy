class ParticleSystem {
    constructor(position) {
      this.origin = position.copy();
      this.particles = [];
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
      this.timeToLive = 200;
    }
  
    run() {
      this.update();
      this.display();
    }
  
    update() {
      this.velocity.add(this.acceleration);
      this.position.add(this.velocity);
      this.timeToLive -= 2;
    }
  
    display() {
      stroke(255, 255, 255, 100);
      strokeWeight(2);
      fill(255, 255, 255, 50);
      const radius = 10;
      ellipse(this.position.x, this.position.y, radius, radius);
    }
  
    isDead() {
      return this.timeToLive < 0;
    }
  }