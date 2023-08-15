const path = require('path');
const {
  BrowserWindow,
  screen,
} = require('electron');

function createWindow() {
  const winWidth = 400;
  const winHeight = 400;
  const win = new BrowserWindow({
    width: winWidth,
    height: winHeight,
    transparent: true,
    frame: false,
    alwaysOnTop: true,
    resizable: false,
    webPreferences: {
      nodeIntegration: true,
      preload: path.resolve(__dirname, '../js/live2d.js'),
    },
  });
  win.center();
  // win.setIgnoreMouseEvents(true);
  win.loadFile('./src/index.html');
  win.webContents.openDevTools();

  return win;
}

module.exports = createWindow;