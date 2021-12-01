addEventListener("load", () => {
  let tileContainer = document.querySelector("#tile-container");
  let repeatTime = getComputedStyle(document.documentElement).getPropertyValue(
    "--repeat-time"
  );

  for (let i = 0; i < Math.pow(tileSize, 2); i++) {
    let tile = document.createElement("div");
    tile.classList.add("tile");
    tileContainer.appendChild(tile);
  }
});