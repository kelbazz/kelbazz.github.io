addEventListener("load", () => {
  let tileContainer = document.querySelector("#tile-container");
  let repeatTime = getComputedStyle(document.documentElement).getPropertyValue(
    "--repeat-time"
  );

  for (let i = 0; i < Math.pow(repeatTime, 2); i++) {
    let tile = document.createElement("div");
    tile.classList.add("tile");
    tile.onmousedown = () => {
        tile.classList.toggle("stay");
    }
    tileContainer.appendChild(tile);
  }
});