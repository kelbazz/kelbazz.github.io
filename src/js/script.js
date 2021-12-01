document.documentElement.style.setProperty(
  "--repeat-x",
  window.innerWidth / 5,
);
document.documentElement.style.setProperty(
  "--repeat-y",
  window.innerHeight / 5
);

let tileContainer = document.querySelector("#tile-container");
let repeatX = getComputedStyle(document.documentElement).getPropertyValue(
  "--repeat-x"
);
let repeatY = getComputedStyle(document.documentElement).getPropertyValue(
  "--repeat-y"
);

for (let i = 0; i < repeatX * repeatY; i++) {
  let tile = document.createElement("div");
  tile.classList.add("tile");
  tile.addEventListener("click", () => {
    tile.classList.toggle("stay");
  });
  tileContainer.appendChild(tile);
}

let tiles = tileContainer.querySelectorAll(".tile");

setInterval(() => {
  tiles[Math.floor(Math.random() * tiles.length)].click();
}, 500);
