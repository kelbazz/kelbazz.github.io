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
                } else if ((!listCmd.prefix) && cmd === listCmd.name) {
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
        if (cmd) return "Incorrect Command: Type \"help\" for commands infos.";
        return;
        //<
    },
    generateCmdURL: (cmdsArr) => {
        let hash = []
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

        return location.protocol + '//' + location.host + location.pathname + "#" + encodeURI(JSON.stringify(hash));
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

                    if (!cmd.structure)
                        return newCmd;

                    const stc = cmd.structure;
                    const structure = [];
                    for (let i = 0; i < stc.length; i++) {
                        structure.push("[" + stc[i] + "]");
                    }
                    return newCmd + " " + structure.join(" ");
                }

                if (args[0]) {
                    for (let i = 0; i < term.cmdsList.length; i++) {
                        const cmd = term.cmdsList[i];
                        if (args[0] === cmd.prefix + cmd.name || args[0] === cmd.name)
                            return cmd.name + ": " + getStructure(cmd) + " : " + cmd.description + ".";
                    }
                    return args[0] + " was not found in the command list.";
                }

                let helpList = "";

                for (let i = 0; i < term.cmdsList.length; i++) {
                    const listCmd = term.cmdsList[i];
                    if (settings.cmdPrefix === true) {
                        if (listCmd.prefix) {
                            helpList += listCmd.prefix + listCmd.name + ": " + listCmd.description;
                        } else if ((!listCmd.prefix)) {
                            helpList += listCmd.name + ": " + listCmd.description;
                        }
                    } else if (settings.cmdPrefix !== true) {
                        helpList += listCmd.name + ": " + listCmd.description;
                    }

                    if (i < (term.cmdsList.length - 1)) {
                        helpList += ",\n";
                    } else {
                        helpList += ".";
                    }
                }
                helpList += "\nCommands starting with \"$\" only affect the interface.\nCommands starting with \"#\" are instables commands.";
                return helpList;
            }
        },
        {
            name: "alias",
            description: "Create an alias for a command",
            structure: ["alias name", "command name"],
            exec: (args) => {
                term.cmdsList[term.cmdsList.length] = {
                    name: args[0],
                    description: "Alias of the \"" + args[1] + "\" command",
                    exec: (aliasArgs) => {
                        if (aliasArgs) return term.execCmd(args[1]);
                        return term.execCmd(args[1], aliasArgs);
                    }
                }
                return args[0] + " is now an alias of the command " + args[1] + ".";
            }
        },
        {
            name: "echo",
            description: "Write arguments to the terminal",
            structure: ["text"],
            exec: (args) => {
                return args.join(" ");
            }
        },
        {
            name: "fullscreen",
            description: "Toggle the terminal in fullscreen",
            structure: ["boolean"],
            prefix: "$",
            exec: (args) => {
                if (args[0] === "true") {
                    termDiv.style.width = "100%";
                    termDiv.style.height = "100%";
                    termDiv.style.borderRadius = null;
                    return "Fullscreen set to true.";
                } else if (args[0] === "false") {
                    termDiv.style.width = "800px";
                    termDiv.style.height = "400px";
                    termDiv.style.borderRadius = "20px";
                } else {
                    return "Type an boolean in argument.";
                }
            }
        },
        {
            name: "color",
            description: "Change colors of the terminal",
            structure: ["text color", "background color"],
            prefix: "$",
            exec: (args) => {
                let $ = (el) => {
                    return document.querySelector(el);
                }

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
            }
        },
        {
            name: "clear",
            description: "Clear the terminal",
            prefix: "$",
            exec: () => {
                history.innerHTML = null;
                return "Terminal cleared.";
            }
        },
        {
            name: "restart",
            description: "Reload the page",
            exec: () => {
                document.location.reload();
                return "Reloading page...";
            }
        },
        {
            name: "set",
            description: "Configurate a value of the \"settings\" object",
            structure: ["key", "value"],
            exec: (args) => {
                settings[args[0]] = args[1];

                document.querySelector("#input-prefix").innerHTML = settings.inputPrefix();

                return args[0] + " is now set to " + args[1] + ".";
            }
        },
        {
            name: "get",
            description: "Get a value of the \"settings\" object",
            structure: ["key"],
            exec: (args) => {
                return args[0] + " is " + settings[args[0]] + ".";
            }
        },
        {
            name: "exe",
            description: "execute javascript",
            structure: ["js code"],
            exec: (args) => {
                return eval(args.join(" "));
            }
        }
    ]
}

let settings = {
    background: "#0f1020",
    color: "#f5f5f5",
    prefix: "$ ",
    cmdPrefix: true,
    name: "user",
    hostname: (navigator.userAgentData.brands[0].brand || navigator.appCodeName).toLowerCase(),
    version: 0.3,
    inputPrefix: function () {
        return this.name + "@" + this.hostname + ": " + this.prefix;
    }
}
/////
let files =
    [
        {
            type: "folder",
            name: "user",
            content: [
                {
                    type: "file",
                    name: "text.txt",
                    content: `Test de fichier text.`
                }
            ]
        }
    ];

// GUI Part

let termDiv = document.querySelector(".term");

termDiv.style = `
    width: 800px;
    height: 400px;
    background-color: ${settings.background};
    color: ${settings.color};
    font-family: monospace;
    border-radius: 20px;
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
    line-height: 30px;
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
#history {
    line-height: 30px;
}
`;

var styleSheet = document.createElement("style");
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

// DOM Constent Definition
const history = document.getElementById('history');
const input = document.getElementById('input');
const cursor = document.getElementById('cursor');
//<

function focusAndMoveCursorToTheEnd(e) {
    input.focus();

    const range = document.createRange();
    const selection = window.getSelection();
    const { childNodes } = input;
    const lastChildNode = childNodes && childNodes.length - 1;

    range.selectNodeContents(lastChildNode === -1 ? input : childNodes[lastChildNode]);
    range.collapse(false);

    selection.removeAllRanges();
    selection.addRange(range);
}

function handleCommand(command) {
    const line = document.createElement('div');

    line.textContent = settings.inputPrefix() + command;

    history.appendChild(line);

    const output = document.createElement('div');

    let args = input.textContent.split(/ +/);
    let cmd = args[0];
    args.shift();

    output.textContent = "> " + term.execCmd(cmd, ...args);

    history.appendChild(output);

}

const showCmdInTerm = (cmd, ...args) => {
    let text = document.createElement("div")
    text.innerHTML = term.execCmd(cmd, ...args);

    history.appendChild(text);
}

document.addEventListener('selectionchange', () => {
    if (document.activeElement.id !== 'input') return;

    const range = window.getSelection().getRangeAt(0);
    const end = range.endOffset;
    const length = input.textContent.length;

    if (end < length)
        input.classList.add('noCaret');
    else
        input.classList.remove('noCaret');
});

input.addEventListener('input', () => {
    if (input.childElementCount > 0) {
        const lines = input.innerText.replace(/\n$/, '').split('\n');
        const lastLine = lines[lines.length - 1];

        for (let i = 0; i <= lines.length - 2; ++i) {
            handleCommand(lines[i]);
        }

        input.textContent = lastLine;

        focusAndMoveCursorToTheEnd();
    }

    if (input.innerText.length === 0) {
        input.classList.remove('noCaret');
    }
});

document.addEventListener('keydown', (e) => {
    if (e.target !== input)
        focusAndMoveCursorToTheEnd();
});

input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();

        handleCommand(input.textContent);
        input.textContent = '';
        focusAndMoveCursorToTheEnd();
    }
});

input.focus();
showCmdInTerm("echo", "Welcome to the term, " + settings.name + ". Type \"help\" for show commands infos");
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