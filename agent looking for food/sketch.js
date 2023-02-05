let targetsReached = 0;
let rangeOfVision = 100;

function setup() {
  createCanvas(400, 400);
  target = new Target(width, height);
  seeker = new Seeker(width, height);
}

function draw() {
  background(0);
  noStroke();
  
  target.show();
  
  let d = dist(seeker.x, seeker.y, target.x, target.y);
  
  if (d < rangeOfVision) {
    seeker.seek(target.x, target.y);
  } else {
    seeker.runRandomly(width, height);
  }
  
  if (d < 10) {
    target.changePlace(width, height);
    targetsReached++;
  }
  
  fill(255);
  text("COMIDAS: " + targetsReached, 10, 20);
  
  seeker.show(target.x, target.y, rangeOfVision);
}