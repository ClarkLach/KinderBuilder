const path = require("path");
const { app, BrowserWindow } = require("electron");
const url = require("url");

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    autoHideMenuBar: true,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  // Load dev server in development, or local index.html in production
  const startUrl = app.isPackaged
    ? url.pathToFileURL(path.join(process.resourcesPath, "dist", "index.html")).href
    : "http://localhost:5173";

  win.loadURL(startUrl);
}

app.whenReady().then(createWindow);

// Quit app on all windows closed
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
