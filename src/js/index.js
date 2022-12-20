console.log(
  [
    "   @@@@@@@@@@@@@@",
    "   @@@@@@@@@@@@' ",
    ",@@ `@@@@@@@@'   ",
    "@@@  :@@@@@'     ",
    "`@@ ,@@@@' @@,   ",
    "   @@@@'   @@@@, ",
    "   @@'     @@@@@@",
  ].join("\n")
);

const data = await fetch("../../assets/data/wise.json").then((r) => r.json());

let template =
  data.templates[Math.floor(Math.random() * data.templates.length)];
let adjective =
  data.adjectives[Math.floor(Math.random() * data.adjectives.length)];
let noun = data.nouns[Math.floor(Math.random() * data.nouns.length)];

document.querySelector(".bruh-quote").innerHTML = template.replaceAll(
  "{}",
  `${adjective} ${noun}`
);
