const { app, BrowserWindow } = require("electron");
const { exec } = require("child_process");
const http = require("http");

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
    },
  });

  const tryConnect = () => {
    http
      .get("http://localhost:3000", () => {
        win.loadURL("http://localhost:3000");
      })
      .on("error", () => {
        setTimeout(tryConnect, 500);
      });
  };

  exec("npm start");
  tryConnect();
}

app.whenReady().then(createWindow);
