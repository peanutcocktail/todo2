const path = require("path")
module.exports = {
  version: "1.5",
  title: "Todo Snapshot",
  description: "A minimal Flask-powered todo list with a clean web UI and API endpoints.",
  icon: "icon.svg",
  menu: async (kernel) => {
    const installing = await kernel.running(__dirname, "install.js")
    const installed = await kernel.exists(__dirname, "app", "env")
    const running = await kernel.running(__dirname, "start.js")

    if (installing) {
      return [{
        default: true,
        icon: "fa-solid fa-plug",
        text: "Installing",
        href: "install.js"
      }]
    } else if (installed) {
      if (running) {
        const local = kernel.memory.local[path.resolve(__dirname, "start.js")]
        if (local && local.url) {
          return [{
            default: true,
            icon: "fa-solid fa-rocket",
            text: "Open Todo",
            href: local.url
          }, {
            icon: "fa-solid fa-terminal",
            text: "Terminal",
            href: "start.js"
          }]
        }
        return [{
          default: true,
          icon: "fa-solid fa-terminal",
          text: "Terminal",
          href: "start.js"
        }, {
          icon: "fa-solid fa-rotate",
          text: "Update",
          href: "update.js"
        }, {
          icon: "fa-regular fa-circle-xmark",
          text: "Reset",
          href: "reset.js"
        }]
      }
      return [{
        default: true,
        icon: "fa-solid fa-power-off",
        text: "Start",
        href: "start.js"
      }, {
        icon: "fa-solid fa-rotate",
        text: "Update",
        href: "update.js"
      }, {
        icon: "fa-solid fa-plug",
        text: "Install",
        href: "install.js"
      }, {
        icon: "fa-regular fa-circle-xmark",
        text: "Reset",
        href: "reset.js"
      }]
    }
    return [{
      default: true,
      icon: "fa-solid fa-plug",
      text: "Install",
      href: "install.js"
    }]
  }
}
