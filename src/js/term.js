let term = {
  execCmd: (cmd, ...args) => {
    // Command Check
    for (let i = 0; i < term.cmdsList.length; i++) {
      const listCmd = term.cmdsList[i];
      if (settings.cmdPrefix === true) {
        if (listCmd.prefix && cmd === listCmd.prefix + listCmd.name) {
          try {
            return listCmd.exec(args);
          } catch (e) {
            return listCmd.name + ": " + e;
          }
        } else if (!listCmd.prefix && cmd === listCmd.name) {
          try {
            return listCmd.exec(args);
          } catch (e) {
            return listCmd.name + ": " + e;
          }
        }
      } else if (settings.cmdPrefix !== true && cmd === listCmd.name) {
        try {
          return listCmd.exec(args);
        } catch (e) {
          return listCmd.name + ": " + e;
        }
      }
    }
    if (cmd) return 'Incorrect Command: Type "help" for commands infos.';
    return;
    //<
  },
  generateCmdURL: (cmdsArr) => {
    let hash = [];
    try {
      for (let i = 0; i < cmdsArr.length; i++) {
        let args = cmdsArr[i];
        let cmd = args[0];
        args.shift();

        hash.push([cmd, ...args]);
      }
    } catch (e) {
      return "Error in the syntax.";
    }

    return (
      location.protocol +
      "//" +
      location.host +
      location.pathname +
      "#" +
      encodeURI(JSON.stringify(hash))
    );
  },
  cmdsList: [
    {
      name: "help",
      description: "Show commands infos",
      structure: ["command name"],
      exec: (args) => {
        const getStructure = (cmd) => {
          let newCmd = cmd.name;
          if (settings.cmdPrefix === true && cmd.prefix)
            newCmd = cmd.prefix + cmd.name;

          if (!cmd.structure) return newCmd;

          const stc = cmd.structure;
          const structure = [];
          for (let i = 0; i < stc.length; i++) {
            structure.push("[" + stc[i] + "]");
          }
          return newCmd + " " + structure.join(" ");
        };

        if (args[0]) {
          for (let i = 0; i < term.cmdsList.length; i++) {
            const cmd = term.cmdsList[i];
            if (args[0] === cmd.prefix + cmd.name || args[0] === cmd.name)
              return (
                cmd.name +
                ": " +
                getStructure(cmd) +
                " : " +
                cmd.description +
                "."
              );
          }
          return args[0] + " was not found in the command list.";
        }

        let helpList = "";

        for (let i = 0; i < term.cmdsList.length; i++) {
          const listCmd = term.cmdsList[i];
          if (settings.cmdPrefix === true) {
            if (listCmd.prefix) {
              helpList +=
                listCmd.prefix + listCmd.name + ": " + listCmd.description;
            } else if (!listCmd.prefix) {
              helpList += listCmd.name + ": " + listCmd.description;
            }
          } else if (settings.cmdPrefix !== true) {
            helpList += listCmd.name + ": " + listCmd.description;
          }

          if (i < term.cmdsList.length - 1) {
            helpList += ",\n";
          } else {
            helpList += ".";
          }
        }
        return helpList;
      },
    },
    {
      name: "alias",
      description: "Create an alias for a command",
      structure: ["alias name", "command name"],
      exec: (args) => {
        term.cmdsList[term.cmdsList.length] = {
          name: args[0],
          description: 'Alias of the "' + args[1] + '" command',
          exec: (aliasArgs) => {
            if (aliasArgs) return term.execCmd(args[1]);
            return term.execCmd(args[1], aliasArgs);
          },
        };
        return args[0] + " is now an alias of the command " + args[1] + ".";
      },
    },
    {
      name: "echo",
      description: "Write arguments to the terminal",
      structure: ["text"],
      exec: (args) => {
        return args.join(" ");
      },
    },
    {
      name: "color",
      description: "Change colors of the terminal",
      structure: ["text color", "background color"],
      prefix: "$",
      exec: (args) => {
        let $ = (el) => {
          return document.querySelector(el);
        };

        if (args[0] === "default") {
          termDiv.style.color = settings.color;
          $("#caret").style.backgroundColor = settings.color;
        } else {
          termDiv.style.color = args[0];
          $("#caret").style.backgroundColor = args[0];
        }
        if (!args[1]) return `Text color : ${args[0]}.`;

        if (args[1] === "default") {
          termDiv.style.backgroundColor = settings.background;
        } else {
          termDiv.style.background = args[1];
        }
        return `Text color : ${args[0]}, background color: ${args[1]}.`;
      },
    },
    {
      name: "clear",
      description: "Clear the terminal",
      prefix: "$",
      exec: () => {
        history.innerHTML = null;
        return "Terminal cleared.";
      },
    },
    {
      name: "restart",
      description: "Reload the page",
      exec: () => {
        document.location.reload();
        return "Reloading page...";
      },
    },
    {
      name: "set",
      description: 'Configurate a value of the "settings" object',
      structure: ["key", "value"],
      exec: (args) => {
        settings[args[0]] = args[1];

        document.querySelector("#input-prefix").innerHTML =
          settings.inputPrefix();

        return args[0] + " is now set to " + args[1] + ".";
      },
    },
    {
      name: "get",
      description: 'Get a value of the "settings" object',
      structure: ["key"],
      exec: (args) => {
        return args[0] + " is " + settings[args[0]] + ".";
      },
    },
    {
      name: "exe",
      description: "Execute javascript",
      structure: ["js code"],
      exec: (args) => {
        return eval(args.join(" "));
      },
    },
    {
      name: "projects",
      description: "Some projects I made",
      exec: (args) => {
        if (args) {
          switch (args) {
            case "w96":
              window.open("https://onofficiel.github.io/w96");
              break;
            case "border":
              window.open("https://onofficiel.github.io/border");
              break;
            case "terminal":
              window.open("https://onofficiel.github.io/terminal");
              break;
            case "openos":
              window.open("https://onofficiel.github.io/open-os");
              break;
            default:
              return "Unknown project name.";
          }
        } else {
          return showCmdInTerm(
            "echo",
            "My projects :<br/><b>border</b>: a web iframe browser<br/><b>w96</b>: I've made some app for Windows96 like VSCode<br/><b>terminal</b>: A terminal in JavaScript<br/><b>openos</b>: An Web OS WIP<br/><br/>You can see the site of any project by typing 'projects ' and a project name in bold."
          );
        }
      },
    },
    {
      name: "about",
      description: "About me",
      exec: () => {
        return "echo Hello! I'm a french Web developer. I know HTML, CSS, JavaScript and Python. I also learn graphism and design.";
      },
    },
  ],
};

let settings = {
  background: "#0f1020",
  color: "#f5f5f5",
  prefix: "$ ",
  cmdPrefix: false,
  name: "user",
  hostname: (
    navigator.userAgentData.brands[0].brand || navigator.appCodeName
  ).toLowerCase(),
  version: 0.3,
  inputPrefix: function () {
    return this.name + "@" + this.hostname + ": " + this.prefix;
  },
};
/////
let files = [
  {
    type: "folder",
    name: "user",
    content: [
      {
        type: "file",
        name: "text.txt",
        content: `Test de fichier text.`,
      },
    ],
  },
];

// GUI Part

let termDiv = document.querySelector(".term");

termDiv.style = `
    width: 100%;
    height: 100%;
    background-color: ${settings.background};
    color: ${settings.color};
    font-family: monospace;
    border-radius: 0;
    padding: 30px;
    overflow: scroll;
    transition: all 0.5s ease;
`;
termDiv.innerHTML = `
<div id="history"></div>
<div id="input-prefix">${settings.inputPrefix()}</div>
<div id="input" contenteditable="true" spellcheck="false"></div><div id="caret">&nbsp;</div>
`;

let styles = `
#input-prefix {
    display: inline;
}
#input {
    display: inline;
    outline: none;
    visibility: visible;
}
#input:empty::before {
    content: ' ';
}
@keyframes blink {
    to {
        visibility: hidden;
    }
}
#input:focus + #caret {
    animation: blink 1s steps(2, start) infinite;
}
#input.noCaret + #caret {
    visibility: hidden;
}
#caret {
    border: 0;
    padding: 0;
    outline: none;
    background-color: ${settings.color};
    display: inline-block;
    font-family: monospace;
}
`;

var styleSheet = document.createElement("style");
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

// DOM Constent Definition
const history = document.getElementById("history");
const input = document.getElementById("input");
const cursor = document.getElementById("cursor");
//<

function focusAndMoveCursorToTheEnd(e) {
  input.focus();

  const range = document.createRange();
  const selection = window.getSelection();
  const { childNodes } = input;
  const lastChildNode = childNodes && childNodes.length - 1;

  range.selectNodeContents(
    lastChildNode === -1 ? input : childNodes[lastChildNode]
  );
  range.collapse(false);

  selection.removeAllRanges();
  selection.addRange(range);
}

function handleCommand(command) {
  const line = document.createElement("div");

  line.textContent = settings.inputPrefix() + command;

  history.appendChild(line);

  const output = document.createElement("div");

  let args = input.textContent.split(/ +/);
  let cmd = args[0];
  args.shift();

  output.textContent = "> " + term.execCmd(cmd, ...args);

  history.appendChild(output);
}

const showCmdInTerm = (cmd, ...args) => {
  let text = document.createElement("div");
  text.innerHTML = term.execCmd(cmd, ...args);

  history.appendChild(text);
};

document.addEventListener("selectionchange", () => {
  if (document.activeElement.id !== "input") return;

  const range = window.getSelection().getRangeAt(0);
  const end = range.endOffset;
  const length = input.textContent.length;

  if (end < length) input.classList.add("noCaret");
  else input.classList.remove("noCaret");
});

input.addEventListener("input", () => {
  if (input.childElementCount > 0) {
    const lines = input.innerText.replace(/\n$/, "").split("\n");
    const lastLine = lines[lines.length - 1];

    for (let i = 0; i <= lines.length - 2; ++i) {
      handleCommand(lines[i]);
    }

    input.textContent = lastLine;

    focusAndMoveCursorToTheEnd();
  }

  if (input.innerText.length === 0) {
    input.classList.remove("noCaret");
  }
});

document.addEventListener("keydown", (e) => {
  if (e.target !== input) focusAndMoveCursorToTheEnd();
});

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();

    handleCommand(input.textContent);
    input.textContent = "";
    focusAndMoveCursorToTheEnd();
  }
});

input.focus();
showCmdInTerm(
  "echo",
  "&nbsp;_&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;_&nbsp;_&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;_&nbsp;<br/>|&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;|&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;|<br/>|&nbsp;|&nbsp;_____|&nbsp;|&nbsp;|__&nbsp;&nbsp;&nbsp;__&nbsp;_&nbsp;___|&nbsp;|&nbsp;Welcome&nbsp;to&nbsp;my&nbsp;website&nbsp;!<br/>|&nbsp;|/&nbsp;/&nbsp;_&nbsp;\\&nbsp;|&nbsp;'_&nbsp;\\&nbsp;/&nbsp;_`&nbsp;|_&nbsp;&nbsp;/&nbsp;|<br/>|&nbsp;&nbsp;&nbsp;&lt;&nbsp;&nbsp;__/&nbsp;|&nbsp;|_)&nbsp;|&nbsp;(_|&nbsp;|/&nbsp;/|_|&nbsp;You&nbsp;can&nbsp;access&nbsp;help&nbsp;by&nbsp;typing&nbsp;help.<br/>|_|\\_\\___|_|_.__/&nbsp;\\__,_/___(_)<br/>"
);
//<

(() => {
  let url = new URL(location.href);
  if (url.hash) {
    let hash = JSON.parse(decodeURI(url.hash.substring(1)));
    for (let i = 0; i < hash.length; i++) {
      let args = hash[i];
      let cmd = args[0];
      args.shift();

      showCmdInTerm(cmd, ...args);
    }
  }
})();
