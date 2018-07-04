var symbol;
var symbolSize = 28;
var streams = [];

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  background(0);
  var title = createP('for the hungry ones');
  title.addClass('title');
  button = createButton('about');
  textSize(symbolSize);
  var x = 0;
  // var y = 0;
  for (var i = 0; i <= width / symbolSize; i++) {
    stream = new Stream();
    stream.generateSymbols(x, random(0, height));
    streams.push(stream);
    x += symbolSize * 5;
  }

}

function draw() {
  background(255, 155);
  streams.forEach(function(stream) {
    stream.render();
  });
}

function mouseMoved() {
  streams.forEach(function(stream) {
    stream.update();
  });
}


function Symbol(x, y, speed, first, last) {
  this.x = x;
  this.y = y;
  this.speed = speed;
  this.switchInterval = round(random(5, 15));
  this.value;
  this.first = first;
  this.last = last;

  this.setToRandomSymbol = function() {
    if (frameCount % this.switchInterval == 0) {
      var emojiArray = [0x1F344, 0x1F349, 0x1F351, 0x1F355, 0x1F359, 0x1F357, 0x1F35D, 0x1F364, 0x1F363, 0x1F369, 0x1F371, 0x1F372, 0x1F37B];
      var ranEmo = emojiArray[Math.floor(Math.random() * emojiArray.length)];
      this.value = String.fromCodePoint(
        ranEmo
      );
    } else {
      return false;
    }
  }

  this.rain = function() {
    this.y = (this.y >= height) ? 0 : this.y += this.speed;

  }
}

function Stream() {
  this.symbols = [];
  this.totalSymbols = round(random(3, 13));
  this.speed = random(1, 3);
  this.generateSymbols = function(x, y) {
    // var y = 0;
    // var x = width / 2;
    var first = round(random(0, 5)) == 1;
    var last = round(random(0, 2)) == 1;
    for (var i = 0; i <= this.totalSymbols; i++) {
      symbol = new Symbol(x, y, this.speed, first, last);
      symbol.setToRandomSymbol();
      this.symbols.push(symbol);
      y -= symbolSize * 2;
      // x -= symbolSize * 2;
      first = false;
      last = false;

    }
  }

  this.update = function() {
    translate(width / 2, height / 2);
    rotate(PI / 2);
    this.symbols.forEach(function(symbol) {
      fill(0, 0, 0);
      text(symbol.value, symbol.x, symbol.y);
      symbol.rain();
      symbol.setToRandomSymbol();
    });
  }

  this.render = function() {
    translate(0, 0);
    rotate(0);
    this.symbols.forEach(function(symbol) {
      if (symbol.first) {
        fill(0, 0, 0, 255);
      } else if (symbol.last) {
        fill(0, 0, 0, 255);
      } else {
        fill(0, 0, 255, 155);
      }
      text(symbol.value, symbol.x, symbol.y);
      symbol.rain();
      symbol.setToRandomSymbol();
    });
  }
}
