const { app, BrowserWindow, shell } = require('electron');

const APP_URL = 'https://kingpickz.com/iptv/';

function createWindow() {
  const win = new BrowserWindow({
    width: 1280,
    height: 800,
    minWidth: 480,
    minHeight: 360,
    title: 'KINGZ IPTV',
    backgroundColor: '#0b0f1a',
    autoHideMenuBar: true,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false
    }
  });

  win.loadURL(APP_URL);

  // Open external (non-app) links in the system browser, keep app navigation inside.
  win.webContents.setWindowOpenHandler(({ url }) => {
    if (!url.startsWith(APP_URL.split('/iptv/')[0])) {
      shell.openExternal(url);
      return { action: 'deny' };
    }
    return { action: 'allow' };
  });
}

app.whenReady().then(() => {
  createWindow();
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
