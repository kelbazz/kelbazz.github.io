let canvas = document.querySelector("#canvas");
let ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let mouse = {
    x: undefined,
    y: undefined,
};

canvas.addEventListener("mousemove", (e) => {
    mouse.x = e.x;
    mouse.y = e.y;
});

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

class Object {
    constructor(x, y, r, mxr, dx, dy, c) {
        this.x = x;
        this.y = y;

        this.r = r;

        this.mxr = mxr;
        this.mnr = r;

        this.dx = dx;
        this.dy = dy;

        this.c = c;
    }

    draw() {
        ctx.beginPath();
        ctx.fillStyle = this.c;
        ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
        ctx.fill();
    }

    update() {
        if (this.x + this.r > canvas.width || this.x - this.r < 0) {
            this.dx = -this.dx;
        }
        if (this.y + this.r > canvas.height || this.y - this.r < 0) {
            this.dy = -this.dy;
        }

        if (
            mouse.x - this.x < 50 &&
            mouse.x - this.x > -50 &&
            mouse.y - this.y < 50 &&
            mouse.y - this.y > -50 &&
            this.r < this.mxr
        ) {
            this.r += 1;
        } else if (this.r > this.mnr) {
            this.r -= 1;
        }

        this.x += this.dx;
        this.y += this.dy;

        this.draw();
    }
}
let colorArr = ["#0f1020", "#0099ff"];
let objArr = [];
for (let i = 0; i < 500; i++) {
    let r = Math.random() * 3 + 1;
    let x = Math.random() * (canvas.width - r * 2) + r;
    let y = Math.random() * (canvas.height - r * 2) + r;
    let mxr = Math.random() * Math.random() * 10 + 5;
    let dx = Math.random() - 0.5;
    let dy = Math.random() - 0.5;
    let c = colorArr[Math.floor(Math.random() * colorArr.length)];

    let circle = new Object(x, y, r, mxr, dx, dy, c);
    objArr.push(circle);
}

const animate = () => {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();

    for (const circle of objArr) {
        circle.update();
    }
};

animate();