{
  let firstTime = true;
  const color = window.matchMedia("(prefers-color-scheme: dark)")
    ? "#ffffff"
    : "#0f1020";

  window.say = (txt) => {
    console.log(
      txt +
        (firstTime
          ? txt === "hey!" || txt === "hey"
            ? "\n(Well done! Now try with other words!)"
            : "\n(Well done! Now try to look at other possible things you can do!)"
          : "")
    );
    firstTime = false;
  };

  console.log(
    [
      "%c   @@@@@@@@@@@@@@%c  Hey dev! Or aren't you?",
      "%c   @@@@@@@@@@@@' %c  ",
      "%c,@@%c `@@@@@@@@'   %c  Maybe you've found a new secret",
      "%c@@@%c  :@@@@@'     %c  place full of mistery! This is",
      "%c`@@%c ,@@@@' %c@@,   %c  called a console and you can do",
      "%c   @@@@'   %c@@@@, %c  many thing with it!",
      '%c   @@\'     %c@@@@@@%c  try typping `%cconsole.log("hey!")%c`',
    ].join("\n"),
    `color: #0099ff`,
    `color: inherit`,
    `color: #0099ff`,
    `color: inherit`,
    `color: ${color}`,
    `color: #0099ff`,
    `color: inherit`,
    `color: ${color}`,
    `color: #0099ff`,
    `color: inherit`,
    `color: ${color}`,
    `color: #0099ff`,
    `color: ${color}`,
    `color: inherit`,
    `color: #0099ff`,
    `color: ${color}`,
    `color: inherit`,
    `color: #0099ff`,
    `color: ${color}`,
    `color: inherit`,
    `color: #0099ff`,
    `color: inherit`
  );
}

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
