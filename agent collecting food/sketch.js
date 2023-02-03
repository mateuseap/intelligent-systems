let targetX;
let targetY;
let targetsReached = 0;

function setup() {
  createCanvas(400, 400);
  targetX = random(width);
  targetY = random(height);
  seeker = new Seeker(400, 400)
}

function draw() {
  background(0);
  noStroke()
  
  fill(255, 191, 0);
  ellipse(targetX, targetY, 15, 15);
  
  seeker.seek(targetX, targetY)
  
  let d = dist(seeker.x, seeker.y, targetX, targetY);
  if (d < 10) {
    targetX = random(width);
    targetY = random(height);
    targetsReached++;
  }
  
  fill(255);
  text("COMIDAS: " + targetsReached, 10, 20);
  
  seeker.show(targetX, targetY);
}