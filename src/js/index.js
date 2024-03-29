import translate from "../js/translate.js";

{
  let firstTime = true;

  window.say = (txt) => {
    console.log(txt);
    let comment = firstTime
      ? txt === "hey!" || txt === "hey"
        ? "(Well done! Now try with other words!)"
        : "(Well done! Now try to look at other possible things you can do!)"
      : undefined;
    firstTime = false;
    return comment;
  };

  console.log(
    [
      "",
      "",
      "%c   @@@@@@@@@@@@@@%c  Hey dev! Or aren't you?",
      "%c   @@@@@@@@@@@@' %c  ",
      "%c,@@%c `@@@@@@@@'   %c  Maybe you've found a new secret",
      "%c@@@%c  :@@@@@'     %c  place full of mistery! This is",
      "%c`@@%c ,@@@@' %c@@,   %c  called a console and you can do",
      "%c   @@@@'   %c@@@@, %c  many thing with it!",
      '%c   @@\'     %c@@@@@@%c  try to type `%csay("hey!")%c`',
      "",
      "",
    ].join("\n"),
    `color: #0099ff`,
    `color: inherit;font-weight: bold`,
    `color: #0099ff;font-weight: inherit`,
    `color: inherit`,
    `color: inherit`,
    `color: #0099ff`,
    `color: inherit`,
    `color: inherit`,
    `color: #0099ff`,
    `color: inherit`,
    `color: inherit`,
    `color: #0099ff`,
    `color: inherit`,
    `color: inherit`,
    `color: #0099ff`,
    `color: inherit`,
    `color: inherit`,
    `color: #0099ff`,
    `color: inherit`,
    `color: inherit`,
    `color: #0099ff`,
    `color: inherit`
  );
}

const data = await fetch("/assets/data/wise.json").then((r) => r.json());

let template =
  data.templates[Math.floor(Math.random() * data.templates.length)];
let adjective =
  data.adjectives[Math.floor(Math.random() * data.adjectives.length)];
let noun = data.nouns[Math.floor(Math.random() * data.nouns.length)];

document.querySelector(".bruh-quote").innerHTML = template.replaceAll(
  "{}",
  `${adjective} ${noun}`
);
