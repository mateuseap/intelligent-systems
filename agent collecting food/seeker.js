class Seeker {
  constructor(width, height) {
    this.x = width/2;
    this.y = height/2;
  }

  seek(targetX, targetY) {
    let xDiff = targetX - this.x;
    let yDiff = targetY - this.y;
  
    this.x = this.x + xDiff * 0.04;
    this.y = this.y + yDiff * 0.04;
  }

  show(targetX, targetY) {
    stroke(0, 255, 0)
    fill(255);
    
    let angle = Math.atan2(targetY - this.y, targetX - this.x);
    
    translate(this.x, this.y);
    rotate(angle);
    triangle(-16, -8, -16, 8, 16, 0);
  }
}
