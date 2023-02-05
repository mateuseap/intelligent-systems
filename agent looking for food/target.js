class Target {
  constructor(width, height) {
    this.x = random(width);
    this.y = random(height);
  }
  
  changePlace(width, height) {
    this.x = random(width);
    this.y = random(height);
  } 
  
  show() {
    fill(255, 191, 0);
    ellipse(this.x, this.y, 15, 15);
  }
}