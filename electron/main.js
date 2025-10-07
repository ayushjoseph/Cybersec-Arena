import { app, BrowserWindow } from 'electron';

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    backgroundColor: '#0b0f1a',
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
    },
    title: 'CyberSec Arena',
  });
  const url = process.env.VITE_DEV_SERVER_URL || 'http://localhost:5173';
  win.loadURL(url);
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
