document.documentElement.style.setProperty(
  "--repeat-x",
  getDivider(window.innerWidth, 10)
);
document.documentElement.style.setProperty(
  "--repeat-y",
  getDivider(window.innerHeight, 10)
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

function getDivider(divider, result) {
  let i = 0;

  while (Math.floor(divider / i) != result) {
    i++;
  }
  return i;
}
