(() => {})();

window.kos = {
  /**
   * Init the system.
   */
  main: () => {
    let flags = location.hash
      ? JSON.parse(decodeURI(location.hash.slice(1)))
      : [];
    console.log("Flags: ", flags);

    window.addEventListener("load", () => {
      let osDiv = document.querySelector(".os-container");

      /*/ import Other Ressources /*/

      kos.sys.import.css("./src/css/os.css");

      /*/ Render Graphic User Interface /*/

      osDiv.innerHTML = `
              <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
                <defs>
                  <filter id="goo-filter">
                    <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
                    <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo" />
                    <feBlend in="SourceGraphic" in2="goo" />
                  </filter>
                </defs>
              </svg>
              <div class='desktop'>Desktop</div>
              `;

      osDiv.querySelector(".desktop").innerHTML = `
              
              <div class="notification-container"></div>
              <div class="desk"></div>
              `;

      /*/ Create the desk visibility system /*/

      if (flags.includes("hide_desk")) {
        osDiv.querySelector(".desk").style.display = "none";
      } else {
        osDiv.addEventListener("mousemove", (e) => {
          if (e.clientX >= innerWidth - 100)
            osDiv.querySelector(".desk").classList.add("shown");
          else osDiv.querySelector(".desk").classList.remove("shown");
        });
      }

      /*/ Create the title change system /*/

      let title = document.title;

      document.addEventListener("visibilitychange", function () {
        if (document.hidden) {
          document.title = "Good bye!";
          setTimeout(() => {
            document.title = title;
          }, 1000);
        } else {
          document.title = "Welcome back!";
          setTimeout(() => {
            document.title = title;
          }, 1000);
        }
      });

      /*/ Redefining some JavaScript functions /*/

      window.console.error = (error) => {
        let wnd = new kos.StandardWindow({
          content: `
            <div style="background-color: #ff6868;
                    width: 100%;
                    height: 100%;">
          <span style="font-size:100px;
                    position: absolute;
                    left: 50%;
                    top: 30%;
                    transform: translate(-150%, -50%);
                    color: #fff;">&#9888;</span>
          <h2 style="color: #fff;
                  position: absolute;
                  left: 60%;
                  top: 30%;
                  transform: translate(-50%, -50%);">An error occured.</h2>
          <p style="color: #fff;
                  position: absolute;
                  left: 50%;
                  top: 60%;
                  transform: translateX(-50%);
                  padding: 5px:">${error.toString()}</p>
          </div>
            `,
          resizable: false,
          minimizable: false,
          maximizable: false,
          title: "Error",
          headerColor: "#ff6868",
          width: 450,
          height: 200,
        });

        wnd.show();
        wnd.setCurrent();
      };

      window.alert = (msg) => {
        let wnd = new kos.StandardWindow({
          content: `
            <div style="
        
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-evenly;
        
            width: 100%;
            height: 100%;
        
            color: #333333;
        
            ">
                <h1 style="
        
                font-size: 80px;
        
                ">⚠</h1>
                <div>${msg.toString()}</div>
            </div>
            `,
          resizable: false,
          minimizable: false,
          maximizable: false,
          headerColor: "#333333",
          width: 430,
          height: 200,
          title: "Alert",
        })
          .center()
          .show()
          .setCurrent();
      };

      /*/ Init dev terminal /*/
      let termWnd;
      (() => {
        termWnd = new kos.StandardWindow({
          content: `
          <div class="root">
            <div id="term-history"></div>
            <div id="term-input-container"><span id="term-prefix">$&nbsp;</span><input type="text" id="term-input" autocomplete="off" spellcheck="false" /></div>
          </div>
          
          <style>
            .root {
                width: 100%;
                height: 100%;
          
                padding: 5px;
          
                font-family: monospace;
                background: #0f1020;
                color: #fff;
        
                overflow: auto;
            }
        
            #term-input-container {
                width: 100%;
                display: flex;
            }
        
            #term-input {
                flex: 1;
            }
        
            #term-history {
              width: 100%;
            }
          
            input#term-input:focus, input#term-input {
                outline: none;
                border: none;
                margin: 0;
          
                background: #0f1020;
                color: #fff;
                font-family: monospace;
            }
          </style>`,
          headerColor: "#0f1020",
          title: "Console",
          height: 400,
          width: 660,

          posX: innerWidth / 2 - 660 / 2,
          posY: 30,

          closable: 0,
          minimizable: 0,
          icon: "https://open-os.netlify.app/system/ressources/icon/terminal.png",
        });

        let body = termWnd.getContent();

        body.querySelector(".root").addEventListener("click", () => {
          body.querySelector("#term-input").focus();
        });

        body.querySelector(
          "#term-history"
        ).innerHTML = `&#x2588;&#x2588;&#x2557;&nbsp;&nbsp;&#x2588;&#x2588;&#x2557;&#x2588;&#x2588;&#x2588;&#x2588;&#x2588;&#x2588;&#x2588;&#x2557;&#x2588;&#x2588;&#x2557;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#x2588;&#x2588;&#x2588;&#x2588;&#x2588;&#x2588;&#x2557;&nbsp;&nbsp;&#x2588;&#x2588;&#x2588;&#x2588;&#x2588;&#x2557;&nbsp;&#x2588;&#x2588;&#x2588;&#x2588;&#x2588;&#x2588;&#x2588;&#x2557;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#x2588;&#x2588;&#x2588;&#x2588;&#x2588;&#x2588;&#x2557;&nbsp;&#x2588;&#x2588;&#x2588;&#x2588;&#x2588;&#x2588;&#x2588;&#x2557;<br/>&#x2588;&#x2588;&#x2551;&nbsp;&#x2588;&#x2588;&#x2554;&#x255d;&#x2588;&#x2588;&#x2554;&#x2550;&#x2550;&#x2550;&#x2550;&#x255d;&#x2588;&#x2588;&#x2551;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#x2588;&#x2588;&#x2554;&#x2550;&#x2550;&#x2588;&#x2588;&#x2557;&#x2588;&#x2588;&#x2554;&#x2550;&#x2550;&#x2588;&#x2588;&#x2557;&#x255a;&#x2550;&#x2550;&#x2588;&#x2588;&#x2588;&#x2554;&#x255d;&nbsp;&nbsp;&nbsp;&nbsp;&#x2588;&#x2588;&#x2554;&#x2550;&#x2550;&#x2550;&#x2588;&#x2588;&#x2557;&#x2588;&#x2588;&#x2554;&#x2550;&#x2550;&#x2550;&#x2550;&#x255d;<br/>&#x2588;&#x2588;&#x2588;&#x2588;&#x2588;&#x2554;&#x255d;&nbsp;&#x2588;&#x2588;&#x2588;&#x2588;&#x2588;&#x2557;&nbsp;&nbsp;&#x2588;&#x2588;&#x2551;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#x2588;&#x2588;&#x2588;&#x2588;&#x2588;&#x2588;&#x2554;&#x255d;&#x2588;&#x2588;&#x2588;&#x2588;&#x2588;&#x2588;&#x2588;&#x2551;&nbsp;&nbsp;&#x2588;&#x2588;&#x2588;&#x2554;&#x255d;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#x2588;&#x2588;&#x2551;&nbsp;&nbsp;&nbsp;&#x2588;&#x2588;&#x2551;&#x2588;&#x2588;&#x2588;&#x2588;&#x2588;&#x2588;&#x2588;&#x2557;<br/>&#x2588;&#x2588;&#x2554;&#x2550;&#x2588;&#x2588;&#x2557;&nbsp;&#x2588;&#x2588;&#x2554;&#x2550;&#x2550;&#x255d;&nbsp;&nbsp;&#x2588;&#x2588;&#x2551;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#x2588;&#x2588;&#x2554;&#x2550;&#x2550;&#x2588;&#x2588;&#x2557;&#x2588;&#x2588;&#x2554;&#x2550;&#x2550;&#x2588;&#x2588;&#x2551;&nbsp;&#x2588;&#x2588;&#x2588;&#x2554;&#x255d;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#x2588;&#x2588;&#x2551;&nbsp;&nbsp;&nbsp;&#x2588;&#x2588;&#x2551;&#x255a;&#x2550;&#x2550;&#x2550;&#x2550;&#x2588;&#x2588;&#x2551;<br/>&#x2588;&#x2588;&#x2551;&nbsp;&nbsp;&#x2588;&#x2588;&#x2557;&#x2588;&#x2588;&#x2588;&#x2588;&#x2588;&#x2588;&#x2588;&#x2557;&#x2588;&#x2588;&#x2588;&#x2588;&#x2588;&#x2588;&#x2588;&#x2557;&#x2588;&#x2588;&#x2588;&#x2588;&#x2588;&#x2588;&#x2554;&#x255d;&#x2588;&#x2588;&#x2551;&nbsp;&nbsp;&#x2588;&#x2588;&#x2551;&#x2588;&#x2588;&#x2588;&#x2588;&#x2588;&#x2588;&#x2588;&#x2557;&nbsp;&nbsp;&nbsp;&nbsp;&#x255a;&#x2588;&#x2588;&#x2588;&#x2588;&#x2588;&#x2588;&#x2554;&#x255d;&#x2588;&#x2588;&#x2588;&#x2588;&#x2588;&#x2588;&#x2588;&#x2551;<br/>&#x255a;&#x2550;&#x255d;&nbsp;&nbsp;&#x255a;&#x2550;&#x255d;&#x255a;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x255d;&#x255a;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x255d;&#x255a;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x255d;&nbsp;&#x255a;&#x2550;&#x255d;&nbsp;&nbsp;&#x255a;&#x2550;&#x255d;&#x255a;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x255d;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#x255a;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x255d;&nbsp;&#x255a;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x255d;<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br/>Enter some JavaScript<br/><br/>`;
        body
          .querySelector("#term-input")
          .addEventListener("keypress", async (e) => {
            if (e.key == "Enter") {
              body.querySelector("#term-prefix").innerHTML = "$&nbsp;";
              let result =
                "<span>" +
                kos.util.escapeHtml(
                  "$ " + body.querySelector("#term-input").value
                ) +
                "</span><br />";
              try {
                result +=
                  "<span>" +
                  eval(body.querySelector("#term-input").value) +
                  "</span>";
              } catch (e) {
                result += "<span style='color: #ff6868;'>" + e + "</span>";
              }

              let line = document.createElement("div");
              line.innerHTML = result;

              body.querySelector("#term-history").appendChild(line);
              body.querySelector("#term-input").value = "";
              body.querySelector(".root").scrollTo({
                top: body.querySelector(".root").scrollHeight,
                behavior: "smooth",
              });
            }
          });

        flags.includes("show_term") ? termWnd.show() : termWnd.hide();
      })();

      /*/ Create the main window /*/
      (() => {
        if (!flags.includes("hide_main_wnd")) {
          let kebazWnd = new kos.StandardWindow({
            closable: false,
            resizable: false,
            maximizable: false,

            title: "Kelbaz!",
            icon: "./src/img/main_icon.png",

            height: 220,
            width: 480,

            posX: innerWidth / 2 - 480 / 2,
            posY: innerHeight - 250,

            content: `
          <div id="kelbaz-root">
            <h1>Welcome to my website !</h1>
            <div class="kelbaz-button-container">
              <button class="kelbaz-btn-1">Apps</button>
              <button class="kelbaz-btn-2">About</button>
              <button class="kelbaz-btn-3">Terminal</button>
            </div>
          </div>

          <style>
            #kelbaz-root {
              display: flex;
              flex-direction: column;

              background-color: #0099ff;
              color: #ffffff;

              justify-content: space-evenly;
              align-items: center;

              width: 100%;
              height: 100%;
            }
            #kelbaz-root>.kelbaz-button-container {
              display: flex;

              justify-content: center;
              align-items: center;

              width: 100%;

              justify-content: space-evenly;
            }

            #kelbaz-root>.kelbaz-button-container>button {
              background: none;
              color: #ffffff;
              border: 3px solid #ffffff;
              border-radius: 20px;
              padding: 10px;
              transition: all .2s ease;
            }
            #kelbaz-root>.kelbaz-button-container>button:hover {
              background: #ffffff;
              color: #0099ff;
              border: 0px solid #ffffff;
              border-radius: 20px;
              padding: 10px;
            }
          </style>
          `,
          });

          let body = kebazWnd.getContent();

          body.querySelector(".kelbaz-btn-1").onclick = () => {
            new kos.StandardWindow({
              title: "Apps",
              // icon: "./src/img/github_logo.png",

              height: 450,
              width: 630,

              posX: innerWidth / 2 - 630 / 2,
              posY: 30,

              headerColor: "#0099ff",

              content: `
            <iframe style="height:100%; width:100%; border: none;" src="apps/launcher">
              <b>IFrame is unavailable here</b>
            </iframe>
            `,
            })
              .show()
              .getContent().style.overflow = "hidden";
          };
          body.querySelector(".kelbaz-btn-2").onclick = () => {
            new kos.StandardWindow({
              title: "About",
              icon: "./src/img/about_icon.png",

              height: 220,
              width: 480,

              posX: innerWidth / 2 - 480 / 2,
              posY: 30,

              content: `
            <div id="kelbaz-about-root">
              <h1>About me!</h1>
              <p>
                Hello I'm Kelbaz! I'm a french developper passionned by programation and
                graphism.<br />
                I know JavaScript, HTML, CSS and I am learning Python.<br />
                I made some projects and they are all open source, so check out my <a color="#ffffff" href="https://github.com/onofficiel">github</a> if
                your intrested!
              </p>
            </div>

            <style>
              #kelbaz-about-root {
                display: flex;
                flex-direction: column;

                background-color: #0099ff;
                color: #ffffff;

                justify-content: space-evenly;
                align-items: center;
                text-align: center;

                width: 100%;
                height: 100%;
              }
            </style>
            `,
            }).show();
          };
          body.querySelector(".kelbaz-btn-3").onclick = () => {
            termWnd.toggleVisibility();
          };

          kebazWnd.show();
        }
      })();

      // loading all scripts in data.json

      if (!flags.includes("no_subscript")) {
        fetch("/data/data.json").then((r) => {
          r.json().then((json) => {
            json.forEach((data) => {
              switch (data.type) {
                case "wnd":
                  new kos.StandardWindow(data.params).show();
                  break;

                case "ntf":
                  new kos.StandardNotification(data.params);
                  break;

                default:
                  break;
              }
            });
          });
        });
      }

      document.body.removeChild(document.querySelector(".loader"));
    });
  },
  /**
   * System variables and functions.
   */
  sys: {
    var: {
      winId: [],
      wId: 0,
      nId: 0,
    },
    import: {
      css: (href) => {
        let link = document.createElement("link");

        link.type = "text/css";
        link.rel = "stylesheet";
        link.href = href;

        document.head.appendChild(link);
      },
      js: (src) => {
        let script = document.createElement("script");

        script.type = "text/javascript";
        script.src = src;

        document.head.appendChild(script);
      },
    },
  },
  /**
   * Utilities.
   */
  util: {
    escapeHtml: (unsafe) => {
      return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
    },
    generateId: () => {
      let id = "";
      for (let i = 0; i < 4; i++) {
        id += Math.floor(Math.random() * 10);
      }

      if (kos.sys.var.winId.length >= 9999)
        throw new Error("Cannot generate ID");
      for (const winId in kos.sys.var.winId) {
        if (winId === id) return browser.generateId();
      }
      return parseInt(id);
    },
  },
  /**
   * Interaction with the UI.
   */
  ui: {
    desk: {
      addApp: (wapp) => {
        let desk = document.querySelector(".desk");

        let app = document.createElement("img");
        app.classList.add("desk-icon");
        app.src =
          wapp.params.icon ||
          "https://open-os.netlify.app/system/ressources/icon/application.png";
        app.dataset.dId = wapp.id;

        app.addEventListener("click", () => {
          wapp.toggleVisibility();
        });

        desk.appendChild(app);
      },

      removeApp: (wapp) => {
        let desk = document.querySelector(".desk");

        desk.removeChild(
          desk.querySelector("img[data-d-id='" + wapp.id + "']")
        );
      },
    },
  },
  /**
   * Window Application.
   */
  WApplication: class {
    constructor() {
      this.windows, (this.notifications = []);
    }

    createWindow(params) {
      let wnd = new kos.StandardWindow(params);

      this.windows.push(wnd);

      return wnd;
    }

    createWindow(params) {
      let ntf = new kos.StandardNotification(params);

      this.notifications.push(ntf);

      return ntf;
    }
  },
  /**
   * Parameters for a window.
   */
  WindowParams: class {
    constructor() {
      this.posX = 100;
      this.posY = 100;
      this.height = 300;
      this.width = 480;

      this.title = "Untitled Window";
      this.icon = null;
      this.content = "";

      this.headerColor = "#0099ff";
      this.headerTextColor = "#ffffff";

      this.resizable = true;
      this.draggable = true;

      this.minimizable = true;
      this.maximizable = true;
      this.closable = true;
    }
  },

  StandardWindow: class {
    /**
     * Standard Window Creator.
     *
     * @param {object} params Parameters of the window.
     * @returns StandardWindow
     */
    constructor(params) {
      if (params == null) params = new kos.WindowParams();

      this.params = Object.assign(new kos.WindowParams(), params);
      this.winDiv = document.createElement("div");
      this.minimized = false;
      this.maximized = false;
      this.maximizeInfo = {
        left: 0,
        top: 0,
        width: 0,
        height: 0,
        borderRadius: 0,
      };

      this.winDiv.classList.add("window");
      this.winDiv.style.height = this.params.height + "px";
      this.winDiv.style.width = this.params.width + "px";
      this.winDiv.style.left = this.params.posX + "px";
      this.winDiv.style.top = this.params.posY + "px";
      this.winDiv.dataset.id = "wnd_" + kos.sys.var.wId++;

      this.id = this.winDiv.dataset.id;

      this.winDiv.innerHTML = `
            <div class="window-content">${this.params.content}</div>
            <div class="window-header cs-move" style="background: ${
              this.params.headerColor
            }; color: ${this.params.headerTextColor}">
              ${
                !!this.params.icon
                  ? `<img src="` +
                    this.params.icon +
                    `" style="width: 20px; height: 20px; ">`
                  : ""
              }
              <span class="title">${this.params.title}</span>
              ${
                this.params.minimizable ||
                this.params.maximizable ||
                this.params.closable
                  ? `
                <span class="ctrl-btn">
                  ${
                    this.params.minimizable
                      ? '<span class="minimize-btn cs-pointer">🗕</span>'
                      : ""
                  }
                  ${
                    this.params.maximizable
                      ? '<span class="maximize-btn cs-pointer">🞐</span>'
                      : ""
                  }
                  ${
                    this.params.closable
                      ? '<span class="close-btn cs-pointer">🗙</span>'
                      : ""
                  }
                </span>
                `
                  : ""
              }
            </div>
            <div class="resizer nw"></div>
            <div class="resizer ne"></div>
            <div class="resizer se"></div>
            <div class="resizer sw"></div>
        `;

      this.hide();

      if (this.params.resizable) this.makeResizable();
      if (this.params.draggable) this.makeDraggable();

      if (this.params.closable) {
        this.winDiv
          .querySelector(".close-btn")
          .addEventListener("click", () => {
            this.close();
          });
      }

      if (this.params.minimizable) {
        this.winDiv
          .querySelector(".minimize-btn")
          .addEventListener("click", () => {
            this.hide();
          });
        kos.ui.desk.addApp(this);
      }
      if (this.params.maximizable) {
        this.winDiv
          .querySelector(".window-header")
          .addEventListener("dblclick", () => {
            this.toggleMaximize();
          });

        this.winDiv
          .querySelector(".maximize-btn")
          .addEventListener("click", () => {
            this.toggleMaximize();
          });
      }

      // Window Events //

      this.winDiv.addEventListener("mousedown", () => {
        this.setCurrent();
      });

      document.querySelector(".desktop").appendChild(this.winDiv);

      return this;
    }

    /**
     * Center the window on the screen.
     *
     * @returns {StandardWindow}
     */
    center() {
      this.winDiv.style.left =
        document.body.offsetWidth / 2 -
        parseInt(this.winDiv.style.width) / 2 +
        "px";
      this.winDiv.style.top =
        document.body.offsetHeight / 2 -
        parseInt(this.winDiv.style.height) / 2 +
        "px";

      return this;
    }

    /**
     * Toggle the size of the window.
     * @returns {boolean}
     */
    toggleMaximize() {
      if (this.maximized) {
        this.winDiv.style.left = this.maximizeInfo.left;
        this.winDiv.style.top = this.maximizeInfo.top;
        this.winDiv.style.height = this.maximizeInfo.height;
        this.winDiv.style.width = this.maximizeInfo.width;
        this.winDiv.style.borderRadius = this.maximizeInfo.borderRadius;

        return (this.maximized = false);
      } else {
        this.maximizeInfo.left = this.winDiv.style.left;
        this.maximizeInfo.top = this.winDiv.style.top;
        this.maximizeInfo.height = this.winDiv.style.height;
        this.maximizeInfo.width = this.winDiv.style.width;
        this.maximizeInfo.borderRadius = this.winDiv.style.borderRadius;

        this.winDiv.style.left = 0;
        this.winDiv.style.top = 0;
        this.winDiv.style.height = "100%";
        this.winDiv.style.width = "100%";
        this.winDiv.style.borderRadius = 0;

        return (this.maximized = true);
      }
    }

    setTitle(str) {
      this.params.title = str;
      this.winDiv.querySelector(".window-header>.title").innerText = str;
    }

    /**
     * Make the window draggable.
     */
    makeDraggable() {
      (function (ctx) {
        let wnd = ctx.winDiv;

        wnd
          .querySelector("." + wnd.classList[0] + "-header")
          .addEventListener("mousedown", mousedown);

        function mousedown(e) {
          let prevX = e.clientX;
          let prevY = e.clientY;

          
          wnd.querySelector(".window-content").style.pointerEvents = "none";

          window.addEventListener("mousemove", mousemove);
          window.addEventListener("mouseup", mouseup);

          function mousemove(e) {
            if (ctx.maximized) return;

            let newX = prevX - e.clientX;
            let newY = prevY - e.clientY;

            const rect = wnd.getBoundingClientRect();

            wnd.style.left = rect.left - newX + "px";
            wnd.style.top = rect.top - newY + "px";

            prevX = e.clientX;
            prevY = e.clientY;
          }

          function mouseup() {
            wnd.querySelector(".window-content").style.pointerEvents = "auto";
            window.removeEventListener("mouseup", mouseup);
            window.removeEventListener("mousemove", mousemove);
          }
        }
      })(this);
    }

    /**
     * Make the window resizable.
     */
    makeResizable() {
      (function (ctx) {
        let wnd = ctx.winDiv;

        const resizers = wnd.querySelectorAll(".resizer");
        let currentResizer;

        for (let resizer of resizers) {
          resizer.addEventListener("mousedown", mousedown);

          function mousedown(e) {
            currentResizer = e.target;
            let isResizing = true;

            wnd.querySelector(".window-content").style.pointerEvents = "none";

            let prevX = e.clientX;
            let prevY = e.clientY;

            window.addEventListener("mousemove", mousemove);
            window.addEventListener("mouseup", mouseup);

            function mousemove(e) {
              if (ctx.maximized) return;

              const rect = wnd.getBoundingClientRect();

              if (currentResizer.classList.contains("se")) {
                wnd.style.width = rect.width - (prevX - e.clientX) + "px";
                wnd.style.height = rect.height - (prevY - e.clientY) + "px";
              } else if (currentResizer.classList.contains("sw")) {
                wnd.style.width = rect.width + (prevX - e.clientX) + "px";
                wnd.style.height = rect.height - (prevY - e.clientY) + "px";
                wnd.style.left = rect.left - (prevX - e.clientX) + "px";
              } else if (currentResizer.classList.contains("ne")) {
                wnd.style.width = rect.width - (prevX - e.clientX) + "px";
                wnd.style.height = rect.height + (prevY - e.clientY) + "px";
                wnd.style.top = rect.top - (prevY - e.clientY) + "px";
              } else {
                wnd.style.width = rect.width + (prevX - e.clientX) + "px";
                wnd.style.height = rect.height + (prevY - e.clientY) + "px";
                wnd.style.top = rect.top - (prevY - e.clientY) + "px";
                wnd.style.left = rect.left - (prevX - e.clientX) + "px";
              }

              prevX = e.clientX;
              prevY = e.clientY;
            }

            function mouseup() {
              wnd.querySelector(".window-content").style.pointerEvents = "auto";
              window.removeEventListener("mousemove", mousemove);
              window.removeEventListener("mouseup", mouseup);
              isResizing = false;
            }
          }
        }
      })(this);
    }

    /**
     * Close the window.
     *
     * @returns {boolean}
     */
    close() {
      try {
        if (this.params.minimizable) kos.ui.desk.removeApp(this);

        document.querySelector(".desktop").removeChild(this.winDiv);
        return true;
      } catch {
        return false;
      }
    }

    /**
     * Minimize the window.
     *
     * @returns {StandardWindow}
     */
    hide() {
      this.winDiv.style.display = "none";
      this.minimized = true;

      return this;
    }

    /**
     * Render the window.
     *
     * @returns {StandardWindow}
     */
    show() {
      this.winDiv.style.display = "flex";
      this.minimized = false;

      return this;
    }

    /**
     * Toggle the visibility of the window.
     *
     * @returns {StandardWindow}
     */
    toggleVisibility() {
      this.minimized ? this.show() : this.hide();

      return this;
    }

    /**
     * Take the window to the front.
     *
     * @returns {StandardWindow}
     */
    setCurrent() {
      try {
        for (
          let i = 0;
          i <
          document.querySelector(".desktop").querySelectorAll(".window").length;
          i++
        ) {
          document
            .querySelector(".desktop")
            .querySelectorAll(".window")
            [i].classList.remove("current");
        }
        document
          .querySelector('.window[data-id~="' + this.id + '"]')
          .classList.add("current");
      } catch {
      } finally {
        return this;
      }
    }

    /**
     * Return the window content.
     *
     * @returns HTMLElement
     */
    getContent() {
      return this.winDiv.querySelector(".window-content");
    }
  },
  /**
   * Parameters for a notification.
   */
  NotificationParams: class {
    constructor() {
      this.title = "Untitled Notification";
      this.icon = null;
      this.content = "";

      this.headerColor = "#0099ff";

      this.closable = true;

      this.timeout = 5000;
    }
  },

  StandardNotification: class {
    /**
     * Standard Notification Creator.
     *
     * @param params Parameters of the notification.
     * @returns StandardNotification
     */
    constructor(params) {
      if (params == null) params = new kos.NotificationParams();

      this.params = Object.assign(new kos.NotificationParams(), params);
      this.notifDiv = document.createElement("div");

      this.notifDiv.classList.add("notification");
      this.notifDiv.dataset.id = "ntf_" + kos.sys.var.nId++;

      this.id = this.notifDiv.dataset.id;

      this.notifDiv.innerHTML = `
        
        ${
          !!this.params.icon
            ? `<img src="` +
              this.params.icon +
              `" style="width: 50px; height: 50px; margin-right: 10px">`
            : ""
        }
        <div style="display: flex;
                    flex-direction: column;
        ">
          <b>${this.params.title}</b>
          <p>${this.params.content}</p>
          
        </div>
        <span>
          ${
            this.params.closable
              ? `<span class="close-btn cs-pointer" style="margin-left: 10px;">🗙</span>`
              : ""
          }
        </span>
        `;

      if (this.params.closable) {
        this.notifDiv
          .querySelector(".close-btn")
          .addEventListener("click", () => {
            this.close();
          });
      }

      if (!!this.params.timeout) {
        setTimeout(() => {
          this.close();
        }, this.params.timeout);
      }

      document
        .querySelector(".notification-container")
        .appendChild(this.notifDiv);

      return this;
    }

    /**
     * Close the notification.
     */
    close() {
      document
        .querySelector(".notification-container")
        .removeChild(this.notifDiv);
    }
  },
};
kos.main();
