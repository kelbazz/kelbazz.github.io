let tileContainer = document.querySelector("#tile-container");
let tileSize = getComputedStyle(document.documentElement).getPropertyValue("--tile-size");

for (let i = 0; i < Math.pow(tileSize, 2); i++) {
    let tile = document.createElement("div");
    tile.classList.add("tile");
    tileContainer.appendChild(tile);
}