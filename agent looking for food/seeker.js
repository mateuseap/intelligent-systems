class Seeker {
  constructor(width, height) {
    this.x = width/2;
    this.y = height/2;
    this.vx = random(-3, 3);
    this.vy = random(-3, 3);
  }

  seek(targetX, targetY) {
    let xDiff = targetX - this.x;
    let yDiff = targetY - this.y;
  
    this.x = this.x + xDiff * 0.04;
    this.y = this.y + yDiff * 0.04;
  }
  
  runRandomly(width, height) {
    this.x += this.vx + 0.1 * sin(frameCount * 0.1);
    this.y += this.vy + 0.1 * sin(frameCount * 0.1);
    
    if (this.x > width || this.x < 0) {
      this.vx = -this.vx;
    }
    
    if (this.y > height || this.y < 0) {
      this.vy = -this.vy;
    }
  }
  
  show(targetX, targetY, rangeOfVision) {
    fill(255, 255, 255, 50);
    ellipse(this.x, this.y, rangeOfVision * 2, rangeOfVision * 2);
    
    stroke(0, 255, 0)
    fill(255);
    
    let d = dist(this.x, this.y, targetX, targetY);
    
    translate(this.x, this.y);
    
    if (d < rangeOfVision) {
      let angle = atan2(targetY - this.y, targetX - this.x);
      rotate(angle);
    } else {
      let angle = atan2(this.vy, this.vx);
      rotate(angle);
    }
    
    triangle(-16, -8, -16, 8, 16, 0);
  }
}
