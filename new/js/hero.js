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
  }

  update() {}

  draw() {
    this.img.addEventListener(
      "load",
      () => {
        ctx.drawImage(this.img, this.x, this.y);
      }
    );
  }
}

const entities = [new Logo()];

function animate() {
  requestAnimationFrame(animate);
  ctx.save();
  ctx.fillStyle = "#0f102055";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.restore();

  entities.forEach((entity) => {
    entity.update();
  });

  entities.forEach((entity) => {
    entity.draw();
  });
}
animate();
