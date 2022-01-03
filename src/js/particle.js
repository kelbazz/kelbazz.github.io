let canvas = document.querySelector("#canvas");
let ctx = canvas.getContext("2d");

let particles = [];

let mouse = {
  x: undefined,
  y: undefined,
};

const init = () => {
  resetResize();
  initialiseElements();
  setMousePos();
  animationLoop();
};

const resetResize = () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
};

let rgb;
const initialiseElements = () => {
  for (let i = 0; i < 150; i++) {
    let r = Math.random() * 2 + 1;
    let x = Math.random() * (canvas.width + r) - r;
    let y = Math.random() * (canvas.height + r) - r;
    let c = "rgb(15, 16, 32)";
    let cl = "rgb(0, 153, 255)";
    let s = Math.random() * 0.5;
    let v = {
      x: Math.random() - 0.5,
      y: Math.random() - 0.5,
    };
    particles.push(new Particle(x, y, r, c, cl, s, v));

    rgb = cl.match(/\d+/g);
  }
};

const setMousePos = () => {
  window.addEventListener("mousemove", (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });
};

class Particle {
  constructor(x, y, r, c, cl, s, v) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.c = c;
    this.cl = cl;
    this.s = s;
    this.v = v;
  }

  draw() {
    ctx.beginPath();
    ctx.fillStyle = this.c;
    ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();
  }

  update() {
    if (this.x - this.r <= 0 || this.x + this.r >= canvas.width) {
      this.v.x = -this.v.x;
    }
    if (this.y - this.r <= 0 || this.y + this.r >= canvas.height) {
      this.v.y = -this.v.y;
    }

    this.x += this.v.x * this.s;
    this.y += this.v.y * this.s;

    this.draw();
  }
}

const getDistanceOf = (x1, y1, x2, y2) => {
  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
};

const animationLoop = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach((particle) => {
    particle.update();
    linkParticles(mouse, particle, 200);

    particles.forEach((particle2) => {
      linkParticles(particle, particle2, 100);
    });
  });

  requestAnimationFrame(animationLoop);
};

const linkParticles = (particle1, particle2, radius) => {
  let distance = getDistanceOf(
    particle1.x,
    particle1.y,
    particle2.x,
    particle2.y
  );
  let opacity = 1 - distance / radius;

  if (opacity > 0) {
    ctx.lineWidth = 0.5;
    ctx.beginPath();
    ctx.strokeStyle = `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${opacity})`;
    ctx.moveTo(particle1.x, particle1.y);
    ctx.lineTo(particle2.x, particle2.y);
    ctx.closePath();
    ctx.stroke();
  }
};

window.addEventListener("DOMContentLoaded", init);
window.addEventListener("resize", resetResize);

let kexp = {
  particles: {
    add: (n) => {
      for (let i = 0; i < n; i++) {
        let r = Math.random() * 2 + 1;
        let x = Math.random() * (canvas.width + r) - r;
        let y = Math.random() * (canvas.height + r) - r;
        let c = "rgb(15, 16, 32)";
        let cl = "rgb(0, 153, 255)";
        let s = Math.random() * 0.5;
        let v = {
          x: Math.random() - 0.5,
          y: Math.random() - 0.5,
        };
        particles.push(new Particle(x, y, r, c, cl, s, v));

        rgb = cl.match(/\d+/g);
      }
    },
    rem: (n) => {
      for (let i = 0; i < n; i++) {
        particles.shift();
      }
    }
  },
};
