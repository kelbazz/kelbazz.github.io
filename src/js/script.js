document.addEventListener("DOMContentLoaded", function () {
  var link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = "https://fonts.googleapis.com/css?family=Lexend+Deca";
  document.head.appendChild(link);

  var h1 = document.createElement("h1");
  h1.innerHTML = "Kelbaz";
  document.body.appendChild(h1);

  document.body.style.fontFamily = "Lexend Deca";

  h1.classList.add("title");

  h1.style.margin = "auto";
  h1.style.display = "block";

  h1.style.position = "absolute";
  h1.style.top = "50%";
  h1.style.left = "50%";

  h1.style.transform = "translate(-50%, -50%)";

  h1.style.fontSize = "3em";

  document.body.style.backgroundColor = "#0099ff";

  h1.style.color = "#ffffff";

  h1.style.transformOrigin = "center center";

  var button = document.createElement("button");
  button.innerHTML = "Click me";
  document.body.appendChild(button);

  button.style.position = "absolute";
  button.style.top = "50%";
  button.style.left = "50%";

  button.style.transform = "translate(-50%, 50px)";

  button.style.border = "1px solid #ffffff";
  button.style.backgroundColor = "#0099ff";
  button.style.color = "#ffffff";
  button.style.padding = "10px";
  button.style.fontSize = "1em";
  button.style.borderRadius = "5px";

  button.addEventListener("mouseover", function () {
    button.style.backgroundColor = "#ffffff";
    button.style.color = "#0099ff";
  });
  button.addEventListener("mouseout", function () {
    button.style.backgroundColor = "#0099ff";
    button.style.color = "#ffffff";
  });

  button.style.transition = "all 0.2s";

  button.addEventListener("click", function () {
    var colors = ["#0099ff", "#9900FF", "#FF0033", "#FFFF00", "#00FF33"];
    document.body.style.backgroundColor =
      colors[Math.floor(Math.random() * colors.length)];
  });
});
