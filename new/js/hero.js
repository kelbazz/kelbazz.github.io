const canvas = document.querySelector("#hero");
const ctx = canvas.getContext("2d");

class Logo {
  constructor() {
    this.img = new Image();
    this.img.src = "./../img/kelbaz_logo.svg";

    this.x = canvas.width / 2;
    this.y = canvas.height / 2;
  }

  draw() {
    this.img.onload = function () {
      ctx.drawImage(this.img, 0, 0);
    };
  }
}

let logo = new Logo();

logo.draw();
