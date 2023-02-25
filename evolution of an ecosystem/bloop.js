class Bloop {
  constructor(l, dna_) {
    this.position = l.copy();
    this.health = 150;
    this.xoff = random(1000);
    this.yoff = random(1000);
    this.dna = dna_;
    this.maxspeed = map(this.dna.genes[0], 0, 1, 15, 0);
    this.r = map(this.dna.genes[0], 0, 1, 0, 50);
    this.vision = map(this.dna.genes[1], 0, 1, this.r, 100);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.maxForce = this.maxspeed/32;
  }

  run(f) {
    let food = f.getFood();
    let found = false;
    let foodLoc;
    for (let i = food.length - 1; i >= 0 && !found; i--) {
      let foodLocation = food[i];
      let d = p5.Vector.dist(this.position, foodLocation);
      if (d < this.vision / 2 + 8) {
        found = true;
        foodLoc = foodLocation;
      }
    }
    if (found) {
      this.seekFood(foodLoc);
    } else {
      this.update(); 
    }
    this.updateVelAcc();
    this.borders();
    this.display();
  }
  
  updateVelAcc() {
    this.vel.add(this.acc);
    this.vel.limit(this.maxspeed);
    this.position.add(this.vel);
    this.acc.set(0, 0);
  }
  
  seekFood(target) {
    let force = p5.Vector.sub(target, this.position);
    force.setMag(this.maxspeed);
    force.sub(this.vel);
    force.limit(this.maxForce);
    this.applyForce(force);
  }

  applyForce(force) {
    this.acc.add(force);
  }
  
  // A bloop can find food and eat it
  eat(f) {
    let food = f.getFood();
    // Are we touching any food objects?
    for (let i = food.length - 1; i >= 0; i--) {
      let foodLocation = food[i];
      let d = p5.Vector.dist(this.position, foodLocation);
      // If we are, juice up our strength!
      if (d < this.r / 2) {
        this.health += 100;
        food.splice(i, 1);
      }
    }
  }


  reproduce(otherBloops) {
    
    if (random(1) < 0.001) {
      for (let i = otherBloops.length - 1; i >= 0; i--) {
        let bp = otherBloops[i];
        if (bp === this) continue;
        let d = p5.Vector.dist(this.position, bp.position);
        if (d < this.vision) {
          //Crossover:
          let childGenes = [this.dna.genes[0], bp.dna.genes[1]];
          let childDNA = new DNA(childGenes);
          //Child DNA can mutate:
          childDNA.mutate(0.01);

          return new Bloop(this.position, childDNA);
        }
      }
      return null;
      
    } else {
      return null;
    }
  }

  // Method to update position
  update() {
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    // Simple movement based on perlin noise
    let vx = map(noise(this.xoff), 0, 1, -this.maxspeed, this.maxspeed);
    let vy = map(noise(this.yoff), 0, 1, -this.maxspeed, this.maxspeed);
    let velocity = createVector(vx, vy);
    this.xoff += 0.01;
    this.yoff += 0.01;
    this.position.add(velocity);
    this.health -= 0.2;
  }

  borders() {
    if (this.position.x < -this.r/2) this.position.x = width+this.r/2;
    if (this.position.y < this.r/2) this.position.y = height+this.r/2;
    if (this.position.x > width+this.r/2) this.position.x = -this.r/2;
    if (this.position.y > height+this.r/2) this.position.y = -this.r/2;
  }

  display() {
    ellipseMode(CENTER);
    stroke(0, this.health);
    fill(255, this.health);
    ellipse(this.position.x, this.position.y, this.r, this.r);
    fill(255, 255, 255, 50);
    noStroke()
    circle(this.position.x, this.position.y, this.vision);
  }

  dead() {
    if (this.health < 0.0) {
      return true;
    } else {
      return false;
    }
  }
}
