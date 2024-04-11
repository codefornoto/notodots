var c = document.getElementById("canvas-club");
var ctx = c.getContext("2d");
var drops = [];
var max = 7;
var clearColor = "rgba(0, 0, 0, .1)";
const BACKEND_URL =
  "https://script.google.com/macros/s/AKfycbwQBJ7HBB3HwF1YArbfeSINTN229HFzo1AJU13EF1ftT7VtIPGjvDwoZrvh9sKDE_Av0Q/exec";
let texts = ["NOTODOTS powered by Code for Noto"];
this.textIndex = 0;

const sleep = (time) => new Promise((r) => setTimeout(r, time)); //timeはミリ秒

async function getDataFromSpreadSheet() {
  $.ajax({
    type: "GET",
    url: BACKEND_URL,
  }).done((result) => {
    // 成功した時の処理
    console.log("called api");
    texts = JSON.parse(result);
    console.log(texts);
  });
  // .fail((error) => {
  //   // 失敗した時の処理
  //   alert("Error:" + JSON.stringify(error));
  // })
  // .always((res) => {
  //   // 常にやる処理
  //   // do something
  // });
}

async function resetAnimation() {
  drops.length = 0;
  if (textIndex == texts.length) {
    this.textIndex = 0;
  } else {
    this.textIndex += 1;
  }
  setup();
}

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
    this.vy = random(1, 10);
    this.vw = 3;
    this.vh = 1;
    // this.vw = 10;
    // this.vh = 3;
    this.size = 2;
    this.hit = random(c.height * 0.8, c.height * 0.9);
    this.a = 1;
    // this.va = 1.5;
    // this.va = 0.96;
    this.va = 0.98;
    this.waveColor = "hsla(" + random(0, 360) + ", 100%, 50%, " + this.a + ")";
    this.alpha = 0;
    this.y = random(-200, window.innerHeight + 100);
    console.log(this.y);
    this.text = texts[Math.floor(Math.random() * texts.length)]; // テキストを設定
    // this.text = this.texts[Math.floor(Math.random() * this.texts.length)];

    if (this.alpha > 0.00000001) {
      // 小さな値を閾値として設定
      this.alpha -= 0.000000001; // 減少量を小さくする
    } else {
      this.alpha += 0.00000001;
    }
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
      ctx.font = "16px Arial";
      var textWidth = ctx.measureText(this.text).width;
      ctx.fillText(this.text, this.x - textWidth / 2, this.y);

      // ここ波紋のとこじゃなくて、textの透明度の設定してる

      if (this.alpha < 1) {
        this.alpha += 0.02;
      } else {
        this.alpha -= 0.0002;
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
  getDataFromSpreadSheet();
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

requestAnimationFrame(animate);

window.addEventListener("resize", resizeCanvas);

resizeCanvas();
animate();
