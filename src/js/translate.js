export default function translate(filePath, lang) {
  fetch(filePath)
    .then((r) => r.json())
    .then((trads) => {
      console.log(trads, lang);
      if (!trads[lang]) throw Error("Cannot find data for this language");

      let page = new String(document.querySelector(":root").innerHTML);
      const matches = [...page.matchAll(/(?<!<\/>){{\s*(.+?)\s*}}/g)];

      matches.forEach((match) => {
        page = page.replaceAll(
          match[0],
          trads[lang][match[1].toLowerCase()]
            ? trads[lang][match[1].toLowerCase()]
            : match[1]
        );
      });

      document.querySelector(":root").innerHTML = page;
    });
}

const config = await (await fetch("/transl.json")).json();
const path = config["translations.folder"].endsWith("/")
  ? config["translations.folder"]
      .slice(0, config["translations.folder"].length - 1)
      .lastIndexOf("/")
  : config["translations.folder"];

function getTranslFile() {
  let pathname = "/index";
  if (location.pathname && location.pathname !== "/") {
    if (location.pathname.endsWith("/")) {
      pathname = location.pathname
        .slice(0, location.pathname.length - 1)
        .lastIndexOf("/");
    } else {
      pathname = location.pathname;
    }
  }
  return (
    pathname.slice(
      0,
      pathname.lastIndexOf(".") === -1
        ? pathname.length
        : pathname.lastIndexOf(".")
    ) + ".json"
  );
}

console.log(path + getTranslFile());
translate(path + getTranslFile(), navigator.language.split("-")[0]);
