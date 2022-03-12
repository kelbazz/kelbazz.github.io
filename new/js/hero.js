const canvas = document.querySelector("#hero");
const ctx = canvas.getContext("2d");

canvas.height = innerHeight;
canvas.width = innerWidth;

class Logo {
  constructor() {
    this.img = new Image();
    this.img.src = "/src/img/kelbaz_logo.png";

    this.x = canvas.width / 2;
    this.y = canvas.height / 2;
    this.size = { x: 100.5, y: 100 };
    this.vel = { x: 1, y: 1 };
  }

  update() {
    if (this.y <= 0 || this.y + this.size.y >= canvas.height) {
      this.vel.y = -this.vel.y;
    }
    if (this.x <= 0 || this.x + this.size.x >= canvas.width) {
      this.vel.x = -this.vel.x;
    }

    this.x += this.vel.x;
    this.y += this.vel.y;
  }

  draw() {
    this.img.addEventListener("load", () => {
      // ctx.drawImage(this.img, this.x, this.y, this.size.x, this.size.y);
      ctx.fillRect(this.x, this.y, this.size.x, this.size.y);
    });
  }
}

const entities = [new Logo()];

function animate() {
  requestAnimationFrame(animate);
  ctx.fillStyle = "#0f102055";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#ffffffff";

  entities.forEach((entity) => {
    entity.update();
  });

  entities.forEach((entity) => {
    entity.draw();
  });
}
animate();
