class World {
  constructor(num) {
    this.food = new Food(num);
    this.bloops = [];
    for (let i = 0; i < num; i++) {
      let l = createVector(random(width), random(height));
      let dna = new DNA();
      this.bloops.push(new Bloop(l, dna));
    }
  }

  born(x, y) {
    let l = createVector(x, y);
    let dna = new DNA();
    this.bloops.push(new Bloop(l, dna));
  }

  run() {
    this.food.run();

    for (let i = this.bloops.length - 1; i >= 0; i--) {
      let b = this.bloops[i];
      b.run(this.food);
      b.eat(this.food);

      if (b.dead()) {
        this.bloops.splice(i, 1);
        this.food.add(b.position);
      }
      
      let child = b.reproduce(this.bloops);
      if (child != null) this.bloops.push(child);
    }
  }
}