let world;

function setup() {
  createCanvas(640, 360);
  world = new World(20);
}

function draw() {
  background(0);
  world.run();
}

function mousePressed() {
  world.born(mouseX, mouseY);
}

function mouseDragged() {
  world.born(mouseX, mouseY);
}