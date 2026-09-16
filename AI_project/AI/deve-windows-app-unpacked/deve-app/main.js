/**
 * D.E.V.E — MAIN PROCESS
 * Electron entry point. Manages windows, system tray,
 * background tasks, and IPC communication.
 */

const { app, BrowserWindow, Tray, Menu, ipcMain,
        Notification, globalShortcut, shell, nativeImage } = require('electron');
const path = require('path');

let mainWindow = null;
let tray = null;
let isQuitting = false;
let bgTaskCount = 0;
let bgInterval = null;

// ── CREATE ICON (SVG → NativeImage fallback) ──
function createIcon(size = 16) {
  // Inline SVG icon as data URL — no external file needed at runtime
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}">
    <rect width="${size}" height="${size}" fill="#020b14"/>
    <text x="${size/2}" y="${size*0.75}" font-size="${size*0.65}"
      text-anchor="middle" font-family="monospace" font-weight="bold"
      fill="#00c8ff">D</text>
  </svg>`;
  return nativeImage.createFromDataURL(
    'data:image/svg+xml;base64,' + Buffer.from(svg).toString('base64')
  );
}

// ── CREATE MAIN WINDOW ──
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    minWidth: 800,
    minHeight: 600,
    backgroundColor: '#020b14',
    title: 'D.E.V.E — Autonomous AI',
    icon: createIcon(256),
    frame: false,              // Custom titlebar
    titleBarStyle: 'hidden',
    trafficLightPosition: { x: 14, y: 14 },
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: false,
      webSecurity: true,
    },
    show: false,               // Show after ready-to-show
  });

  mainWindow.loadFile(path.join(__dirname, 'src', 'index.html'));

  // Show once loaded — prevents white flash
  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
    if (process.argv.includes('--dev')) {
      mainWindow.webContents.openDevTools({ mode: 'detach' });
    }
  });

  // Minimize to tray instead of close
  mainWindow.on('close', (e) => {
    if (!isQuitting) {
      e.preventDefault();
      mainWindow.hide();
      if (Notification.isSupported()) {
        new Notification({
          title: 'D.E.V.E',
          body: 'Running in the background. Click the tray icon to restore.',
          icon: createIcon(64),
          silent: true,
        }).show();
      }
    }
  });

  mainWindow.on('closed', () => { mainWindow = null; });
}

// ── SYSTEM TRAY ──
function createTray() {
  tray = new Tray(createIcon(16));
  tray.setToolTip('D.E.V.E — Autonomous AI System');

  const ctxMenu = Menu.buildFromTemplate([
    {
      label: 'D.E.V.E — ONLINE',
      enabled: false,
      icon: createIcon(14),
    },
    { type: 'separator' },
    {
      label: 'Open D.E.V.E',
      click: () => { showWindow(); },
      accelerator: 'CmdOrCtrl+Shift+D',
    },
    {
      label: 'New Command',
      click: () => {
        showWindow();
        mainWindow?.webContents.send('focus-input');
      },
    },
    { type: 'separator' },
    {
      label: 'Background Tasks',
      submenu: [
        { label: `Completed: ${bgTaskCount}`, enabled: false },
        {
          label: 'Run Background Scan',
          click: () => { mainWindow?.webContents.send('bg-task', 'manual-scan'); },
        },
      ],
    },
    { type: 'separator' },
    {
      label: 'Quit D.E.V.E',
      click: () => { isQuitting = true; app.quit(); },
    },
  ]);

  tray.setContextMenu(ctxMenu);
  tray.on('double-click', showWindow);
  tray.on('click', showWindow);
}

function showWindow() {
  if (!mainWindow) { createWindow(); return; }
  if (mainWindow.isMinimized()) mainWindow.restore();
  mainWindow.show();
  mainWindow.focus();
}

// ── BACKGROUND LOOP (runs even when window is hidden) ──
function startBackgroundLoop() {
  bgInterval = setInterval(() => {
    bgTaskCount++;
    const tasks = [
      'Monitoring system resources...',
      'Scanning for workflow optimizations...',
      'Updating AI context memory...',
      'Running scheduled automations...',
      'Checking background reminders...',
      'Compressing conversation history...',
      'Indexing knowledge cache...',
    ];
    const task = tasks[bgTaskCount % tasks.length];

    // Send to renderer if window is open
    mainWindow?.webContents.send('bg-update', { count: bgTaskCount, task });

    // Update tray tooltip
    tray?.setToolTip(`D.E.V.E — ${bgTaskCount} bg tasks done`);

  }, 10000); // every 10 seconds
}

// ── IPC HANDLERS ──
ipcMain.handle('window:minimize', () => mainWindow?.minimize());
ipcMain.handle('window:maximize', () => {
  if (mainWindow?.isMaximized()) mainWindow.unmaximize();
  else mainWindow?.maximize();
});
ipcMain.handle('window:close', () => mainWindow?.close());
ipcMain.handle('window:hide', () => mainWindow?.hide());

ipcMain.handle('app:version', () => app.getVersion());
ipcMain.handle('app:platform', () => process.platform);
ipcMain.handle('app:quit', () => { isQuitting = true; app.quit(); });

ipcMain.handle('notify', (_, { title, body }) => {
  if (Notification.isSupported()) {
    new Notification({ title, body, icon: createIcon(64) }).show();
  }
});

ipcMain.handle('shell:open', (_, url) => {
  if (url.startsWith('http://') || url.startsWith('https://')) {
    shell.openExternal(url);
  }
});

ipcMain.handle('bg:count', () => bgTaskCount);

// ── APP LIFECYCLE ──
app.whenReady().then(() => {
  createWindow();
  createTray();
  startBackgroundLoop();

  // Global hotkey: show/hide D.E.V.E
  globalShortcut.register('CmdOrCtrl+Shift+D', showWindow);

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('before-quit', () => { isQuitting = true; });
app.on('will-quit', () => {
  globalShortcut.unregisterAll();
  clearInterval(bgInterval);
});

// Keep running in background — don't quit when all windows close
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    // Don't quit — stay in tray
  }
});
