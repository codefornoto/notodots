// $(function () {
//   $(".surface").raindrops({
//     rippleSpeed: 0.2,
//     canvasHeight: 600,
//     frequency: 10,
//   });
// });

var c = document.getElementById("canvas-club");
var ctx = c.getContext("2d");
var h = (c.height = 770); // ウィンドウの高さの80%をCanvasの高さに設定
var w = (c.width = 1440); // 任意の幅を設定（ウィンドウの高さだけで制約するため、幅は固定しても構いません）
var texts = []; // テキストを格納する配列

var clearColor = "rgba(0, 0, 0, .1)";
var max = 30;
var drops = [];

function random(min, max) {
  return Math.random() * (max - min) + min;
}

function O() {}

O.prototype = {
  init: function () {
    this.x = random(0, w);
    this.color = "hsl(" + random(0, 360) + ", 100%, 50%)";
    this.w = 350;
    this.h = 100;
    this.vy = random(2, 3);
    this.vw = 3;
    this.vh = 1;
    this.size = 2;
    this.hit = random(h * 0.8, h * 0.9);
    this.a = 1;
    this.va = 0.96;
    this.waveColor = "hsla(" + random(0, 360) + ", 100%, 50%, " + this.a + ")";
    this.alpha = 0; // 初期透明度を設定
    // 雨粒の位置をもっと上下にランダムに配置する
    this.y = random(-100, window.innerHeight + 100); // 画面の高さの範囲内でランダムな位置に設定
    this.text = texts[Math.floor(Math.random() * texts.length)];
  },
  draw: function () {
    if (this.y > this.hit) {
      // 波紋の描画
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

      // フェードインとフェードアウトを実現するため、透明度を調整する
      ctx.globalAlpha = this.alpha;

      // 波紋を描画する部分で、波紋の色を this.waveColor に設定
      //ctx.strokeStyle = this.waveColor;

      // テキストを描画する
      ctx.fillStyle = this.waveColor; // フォントの色を波紋の色と同じに設定
      ctx.font = "12px Arial"; // フォントとサイズを設定
      var textWidth = ctx.measureText(this.text).width; // テキストの幅を計算
      ctx.fillText(this.text, this.x - textWidth / 2, this.y); // テキストを波紋の真ん中に描画

      // 透明度を更新してフェードインとフェードアウトを実現する
      if (this.alpha < 1) {
        this.alpha += 0.02; // フェードイン中は透明度を増加させる
      } else {
        this.alpha -= 0.02; // フェードアウト中は透明度を減少させる
      }

      ctx.globalAlpha = 1; // 描画の透明度をリセット
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

function resize() {
  w = c.width = window.innerWidth;
  h = c.height = window.innerHeight;
}

function setup() {
  for (var i = 0; i < max; i++) {
    (function (j) {
      setTimeout(function () {
        var o = new O();
        o.init();
        drops.push(o);
      }, j * 200);
    })(i);
  }
}

function anim() {
  ctx.fillStyle = clearColor;
  ctx.fillRect(0, 0, w, h);
  for (var i in drops) {
    drops[i].draw();
  }
  requestAnimationFrame(anim);
}

window.addEventListener("resize", resize);

setup();
anim();
