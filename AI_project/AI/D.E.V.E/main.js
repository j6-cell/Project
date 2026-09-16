const { app, BrowserWindow, Tray, Menu, nativeImage, Notification, globalShortcut, shell, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');
const AutoLaunch = require('auto-launch');
const { exec } = require('child_process');

app.setAppUserModelId('com.deve.ai');

const localUserData = path.join(__dirname, 'electron-user-data');
if (!fs.existsSync(localUserData)) {
  fs.mkdirSync(localUserData, { recursive: true });
}
app.setPath('userData', localUserData);
app.commandLine.appendSwitch('user-data-dir', localUserData);
app.commandLine.appendSwitch('disk-cache-dir', path.join(localUserData, 'Cache'));
app.commandLine.appendSwitch('disable-gpu');

let mainWindow;
let tray;
let isQuitting = false;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1320,
    height: 860,
    minWidth: 980,
    minHeight: 680,
    show: false,
    frame: false,
    backgroundColor: '#020b14',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: false,
      webSecurity: true
    }
  });

  mainWindow.loadFile(path.join(__dirname, 'src', 'index.html'));

  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });

  mainWindow.on('show', () => {
    mainWindow.webContents.send('focus-input');
  });

  mainWindow.on('minimize', (event) => {
    event.preventDefault();
    mainWindow.hide();
  });

  mainWindow.on('close', (event) => {
    if (!isQuitting) {
      event.preventDefault();
      mainWindow.hide();
    }
  });
}

function createTray() {
  const iconPath = path.join(__dirname, 'assets', 'icon.ico');
  const trayIcon = nativeImage.createFromPath(iconPath);
  tray = new Tray(trayIcon);

  const contextMenu = Menu.buildFromTemplate([
    {
      label: 'Open D.E.V.E',
      click: () => {
        if (!mainWindow) createWindow();
        mainWindow.show();
        mainWindow.focus();
      }
    },
    { type: 'separator' },
    {
      label: 'Open Ollama Website',
      click: () => shell.openExternal('https://ollama.ai')
    },
    { type: 'separator' },
    {
      label: 'Quit',
      click: () => {
        isQuitting = true;
        app.quit();
      }
    }
  ]);

  tray.setToolTip('D.E.V.E — Offline AI Assistant');
  tray.setContextMenu(contextMenu);

  tray.on('double-click', () => {
    if (mainWindow) {
      mainWindow.show();
      mainWindow.focus();
    }
  });
}

function enableAutoLaunch() {
  try {
    const appLauncher = new AutoLaunch({
      name: 'D.E.V.E',
      path: process.execPath,
      isHidden: false
    });
    appLauncher.isEnabled().then((enabled) => {
      if (!enabled) appLauncher.enable();
    }).catch(() => {});
  } catch (error) {
    // ignore errors in development environment
  }
}

app.whenReady().then(() => {
  createWindow();
  createTray();
  enableAutoLaunch();

  globalShortcut.register('CommandOrControl+Shift+D', () => {
    if (mainWindow) {
      mainWindow.isVisible() ? mainWindow.hide() : mainWindow.show();
    }
  });

  setInterval(() => {
    if (!mainWindow || mainWindow.isVisible()) return;
    new Notification({
      title: 'D.E.V.E',
      body: 'D.E.V.E is running in the background. Open the app anytime from the tray.'
    }).show();
  }, 1000 * 60 * 30);

  // Emit periodic background updates to renderer (counts background ticks)
  let bgCount = 0;
  setInterval(() => {
    try {
      if (!mainWindow) return;
      bgCount++;
      mainWindow.webContents.send('bg-update', { count: bgCount });
    } catch (e) {
      // ignore send errors while window is not ready
    }
  }, 1000 * 15);

  // Simple automation trigger from renderer (placeholder for real automations)
  ipcMain.on('run-auto', (event, payload) => {
    const name = (payload && payload.name) || 'Automation';
    new Notification({ title: `D.E.V.E — ${name}`, body: `${name} triggered` }).show();
    // forward a background-update immediately so UI can react
    if (mainWindow) mainWindow.webContents.send('bg-update', { count: ++bgCount });
  });

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
    if (mainWindow) mainWindow.show();
  });

  ipcMain.on('window-minimize', () => {
    if (mainWindow) mainWindow.minimize();
  });

  ipcMain.on('window-maximize', () => {
    if (mainWindow) {
      mainWindow.isMaximized() ? mainWindow.unmaximize() : mainWindow.maximize();
    }
  });

  ipcMain.on('window-hide', () => {
    if (mainWindow) mainWindow.hide();
  });

  ipcMain.on('notify', (event, payload) => {
    if (payload && payload.title) {
      new Notification({ title: payload.title, body: payload.body || '' }).show();
    }
  });

  ipcMain.on('window-quit', () => {
    isQuitting = true;
    app.quit();
  });

  // run-command handler: executes shell commands and returns output
  ipcMain.handle('run-command', async (event, cmd) => {
    return new Promise((resolve) => {
      try {
        exec(cmd, { windowsHide: true, shell: true }, (error, stdout, stderr) => {
          if (error) {
            resolve({ success: false, error: error.message, stdout: stdout, stderr: stderr });
          } else {
            resolve({ success: true, stdout: stdout, stderr: stderr });
          }
        });
      } catch (e) {
        resolve({ success: false, error: e.message });
      }
    });
  });

  // open-path handler: opens a file or folder (returns promise)
  ipcMain.handle('open-path', async (event, p) => {
    try {
      // shell.openPath returns a promise with empty string on success
      const res = await shell.openPath(p);
      return { success: res === '' , result: res };
    } catch (e) {
      return { success: false, error: e.message };
    }
  });
});

app.on('before-quit', () => {
  isQuitting = true;
});

app.on('window-all-closed', () => {
  // Keep the app running in the tray on Windows.
});
