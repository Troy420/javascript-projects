let bubble1, bubble2;

// SETUP
function setup() {
  createCanvas(600, 400);
  bubble1 = new Bubble(200, 200, 20);
  bubble2 = new Bubble(400, 200, 40);
  // print(bubble.x, bubble.y);
}

// DRAW
function draw() {
  background(0);
  bubble1.move();
  bubble1.show();
  bubble2.move();
  bubble2.show();
}

class Bubble {
  constructor(_x, _y, _r) {
    this.x = _x;
    this.y = _y;
    this.r = _r;
  }
  move() {
    this.x = this.x + random(-5, 5);
    this.y = this.y + random(-5, 5);
  }
  show() {
    stroke(255);
    strokeWeight(4);
    noFill();
    ellipse(this.x, this.y, this.r * 2);
  }
}
