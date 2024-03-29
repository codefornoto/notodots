var c = document.getElementById("canvas-club");
var ctx = c.getContext("2d");
var drops = [];
var max = 1;
var clearColor = "rgba(0, 0, 0, .1)";
var texts = ["text1", "text2", "text3"]; // Example texts

function random(min, max) {
  return Math.random() * (max - min) + min;
}

function O(texts) {
  this.texts = texts;
}

O.prototype = {
  init: function () {
    this.x = random(300, window.innerWidth - 300);
    this.color = "hsl(" + random(0, 360) + ", 100%, 50%)";
    this.w = 350;
    this.h = 100;
    this.vy = random(4, 5);
    this.vw = 3;
    this.vh = 1;
    this.size = 2;
    this.hit = random(c.height * 0.8, c.height * 0.9);
    this.a = 1;
    this.va = 0.96;
    this.waveColor = "hsla(" + random(0, 360) + ", 100%, 50%, " + this.a + ")";
    this.alpha = 0;
    this.y = 300; //random(200, window.innerHeight + 100);
    this.text = this.texts[Math.floor(Math.random() * this.texts.length)];
  },
  draw: function () {
    if (this.y > this.hit) {
      ctx.beginPath();
      ctx.moveTo(this.x, this.y - this.h / 2);
      ctx.bezierCurveTo(
        this.x + this.w / 2,
        this.y - this.h / 2,
        this.x + this.w / 2,
        this.y + this.h / 2,
        this.x,
        this.y + this.h / 2
      );
      ctx.bezierCurveTo(
        this.x - this.w / 2,
        this.y + this.h / 2,
        this.x - this.w / 2,
        this.y - this.h / 2,
        this.x,
        this.y - this.h / 2
      );

      ctx.strokeStyle = this.waveColor;
      ctx.stroke();
      ctx.closePath();

      ctx.globalAlpha = this.alpha;

      ctx.fillStyle = this.waveColor;
      ctx.font = "12px Arial";
      var textWidth = ctx.measureText(this.text).width;
      ctx.fillText(this.text, this.x - textWidth / 2, this.y);

      if (this.alpha < 1) {
        this.alpha += 0.02;
      } else {
        this.alpha -= 0.02;
      }

      ctx.globalAlpha = 1;
    } else {
      ctx.fillStyle = this.color;
      ctx.fillRect(this.x, this.y, this.size, this.size * 5);
    }
    this.update();
  },
  update: function () {
    if (this.y < this.hit) {
      this.y += this.vy;
    } else {
      if (this.a > 0.03) {
        this.w += this.vw;
        this.h += this.vh;
        if (this.w > 100) {
          this.a *= this.va;
          this.vw *= 0.98;
          this.vh *= 0.98;
        }
      } else {
        this.init();
      }
    }
  },
};

function resizeCanvas() {
  c.width = window.innerWidth;
  c.height = window.innerHeight;
  drops.length = 0; // Clear the drops array
  setup();
}

function setup() {
  for (var i = 0; i < max; i++) {
    var o = new O(texts);
    o.init();
    drops.push(o);
  }
}

function animate() {
  ctx.fillStyle = clearColor;
  ctx.fillRect(0, 0, c.width, c.height);
  for (var i in drops) {
    drops[i].draw();
  }
  requestAnimationFrame(animate);
}

window.addEventListener("resize", resizeCanvas);

resizeCanvas();
animate();
