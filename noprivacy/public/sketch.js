var socket;
var capture;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255);
  capture = createCapture(VIDEO);
  socket = io.connect('http://yirui123.github.io/noprivacy');
  capture.size(random(100, 320), random(100, 320));
  capture.hide();
  socket.on('mouse', newDrawing);
}

function newDrawing(data) {
  // noStroke();
  // fill(155, 155, 255);
  // ellipse(data.x, data.y, 50, 50);
  image(capture, data.x, data.y, random(100, 320), random(100, 320));
  filter(INVERT);
}

function mouseDragged() {
  console.log('sending: ' + mouseX + ', ' + mouseY);

  var data = {
    x: mouseX,
    y: mouseY
  }
  // name the message 'mouse'
  socket.emit('mouse', data);

  // noStroke();
  // fill(155, 0, 255);
  // ellipse(mouseX, mouseY, 50, 50);
  image(capture, mouseX, mouseY, random(100, 320), random(100, 320));
  filter(POSTERIZE, 3);
}

function draw() {
  background(255, 255, 255, 1);
}