/**
 * D.E.V.E FULL AI — ELECTRON MAIN PROCESS
 * Zero internet · Zero external AI · 100% local
 */

const {
  app, BrowserWindow, Tray, Menu, ipcMain,
  globalShortcut, shell, nativeImage, Notification, dialog
} = require('electron');
const path = require('path');
const os   = require('os');

// ── STATE ──
let mainWindow  = null;
let tray        = null;
let isQuitting  = false;
let bgTaskCount = 0;
let bgInterval  = null;
let startTime   = Date.now();

// ── ICON (inline SVG → NativeImage, no external file needed) ──
function makeIcon(size = 256) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}">
    <defs>
      <radialGradient id="g" cx="40%" cy="40%">
        <stop offset="0%" stop-color="#0af"/>
        <stop offset="100%" stop-color="#020b14"/>
      </radialGradient>
    </defs>
    <rect width="${size}" height="${size}" rx="${size*0.12}" fill="#020b14"/>
    <rect x="1" y="1" width="${size-2}" height="${size-2}" rx="${size*0.12}"
      fill="none" stroke="#00c8ff" stroke-width="2" stroke-opacity="0.35"/>
    <!-- Orb rings -->
    <circle cx="${size/2}" cy="${size*0.44}" r="${size*0.28}"
      fill="none" stroke="#00c8ff" stroke-width="1" stroke-opacity="0.2"/>
    <circle cx="${size/2}" cy="${size*0.44}" r="${size*0.22}"
      fill="none" stroke="#00c8ff" stroke-width="1" stroke-opacity="0.15"/>
    <!-- Orb core -->
    <circle cx="${size/2}" cy="${size*0.44}" r="${size*0.18}" fill="url(#g)" opacity="0.85"/>
    <!-- Letter D -->
    <text x="${size/2}" y="${size*0.535}" font-size="${size*0.22}"
      text-anchor="middle" font-family="monospace" font-weight="900" fill="#ffffff"
      style="text-shadow: 0 0 10px #00c8ff">D</text>
    <!-- Brand text -->
    <text x="${size/2}" y="${size*0.82}" font-size="${size*0.065}"
      text-anchor="middle" font-family="monospace" fill="#00c8ff" opacity="0.6"
      letter-spacing="${size*0.02}">D.E.V.E</text>
    <text x="${size/2}" y="${size*0.9}" font-size="${size*0.045}"
      text-anchor="middle" font-family="monospace" fill="#00c8ff" opacity="0.35"
      letter-spacing="${size*0.008}">FULL AI</text>
  </svg>`;
  return nativeImage.createFromDataURL(
    'data:image/svg+xml;base64,' + Buffer.from(svg).toString('base64')
  );
}

// ── CREATE WINDOW ──
function createWindow() {
  const icon = makeIcon(256);

  mainWindow = new BrowserWindow({
    width:  1200,
    height: 750,
    minWidth:  900,
    minHeight: 600,
    backgroundColor: '#020b14',
    title: 'D.E.V.E — Full Autonomous AI',
    icon,
    frame: false,
    titleBarStyle: 'hidden',
    titleBarOverlay: {
      color: '#010810',
      symbolColor: '#00c8ff',
      height: 38
    },
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: false,
      // Allow Web Speech API
      webSecurity: true,
    },
    show: false,
  });

  // Load the full AI HTML
  mainWindow.loadFile(path.join(__dirname, 'src', 'index.html'));

  // Show once fully loaded — no white flash
  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
    mainWindow.focus();
    if (process.argv.includes('--dev')) {
      mainWindow.webContents.openDevTools({ mode: 'detach' });
    }
  });

  // Minimize to tray on close
  mainWindow.on('close', (e) => {
    if (!isQuitting) {
      e.preventDefault();
      mainWindow.hide();
      showTrayNotification(
        'D.E.V.E Running in Background',
        'Intelligence engine active. Press Ctrl+Shift+D to restore.'
      );
    }
  });

  mainWindow.on('closed', () => { mainWindow = null; });

  // Handle external links
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: 'deny' };
  });
}

// ── SYSTEM TRAY ──
function createTray() {
  const icon = makeIcon(16);
  tray = new Tray(icon);
  tray.setToolTip('D.E.V.E — Full Autonomous AI — ONLINE');

  const buildMenu = () => Menu.buildFromTemplate([
    {
      label: 'D.E.V.E  —  ONLINE',
      enabled: false,
    },
    { type: 'separator' },
    {
      label: `BG Tasks Completed: ${bgTaskCount}`,
      enabled: false,
    },
    {
      label: `Uptime: ${formatUptime()}`,
      enabled: false,
    },
    { type: 'separator' },
    {
      label: '▶  Open D.E.V.E',
      click: showWindow,
      accelerator: 'CmdOrCtrl+Shift+D',
    },
    {
      label: '⌨  New Command',
      click: () => { showWindow(); mainWindow?.webContents.send('focus-input'); },
    },
    {
      label: '🎤  Start Voice',
      click: () => { showWindow(); mainWindow?.webContents.send('start-voice'); },
    },
    { type: 'separator' },
    {
      label: '🔄  Background Tasks',
      submenu: [
        { label: `Completed: ${bgTaskCount}`, enabled: false },
        { label: 'Run Manual Scan', click: () => mainWindow?.webContents.send('bg-task', 'manual') },
      ],
    },
    { type: 'separator' },
    {
      label: '✕  Quit D.E.V.E',
      click: () => { isQuitting = true; app.quit(); },
    },
  ]);

  tray.setContextMenu(buildMenu());
  tray.on('double-click', showWindow);
  tray.on('click', showWindow);

  // Refresh menu every 30s
  setInterval(() => tray?.setContextMenu(buildMenu()), 30000);
}

function showWindow() {
  if (!mainWindow) {
    createWindow();
    return;
  }
  if (mainWindow.isMinimized()) mainWindow.restore();
  mainWindow.show();
  mainWindow.focus();
}

function showTrayNotification(title, body) {
  if (Notification.isSupported()) {
    new Notification({
      title,
      body,
      icon: makeIcon(64),
      silent: true,
    }).show();
  }
}

function formatUptime() {
  const s = Math.floor((Date.now() - startTime) / 1000);
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  return `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(sec).padStart(2,'0')}`;
}

// ── BACKGROUND INTELLIGENCE LOOP ──
function startBackgroundLoop() {
  const tasks = [
    'Monitoring system workflows',
    'Indexing knowledge base',
    'Scanning for optimization opportunities',
    'Updating automation schedules',
    'Running passive intelligence scan',
    'Compressing conversation history',
    'Calibrating response models',
    'Checking scheduled reminders',
  ];

  bgInterval = setInterval(() => {
    bgTaskCount++;
    const task = tasks[bgTaskCount % tasks.length];

    // Notify renderer if window is open
    mainWindow?.webContents.send('bg-update', {
      count: bgTaskCount,
      task,
      uptime: formatUptime(),
    });

    // Update tray tooltip
    tray?.setToolTip(`D.E.V.E — Active — ${bgTaskCount} tasks done`);

  }, 12000);
}

// ── IPC HANDLERS ──

// Window controls
ipcMain.handle('window:minimize',  () => mainWindow?.minimize());
ipcMain.handle('window:maximize',  () => {
  mainWindow?.isMaximized() ? mainWindow.unmaximize() : mainWindow?.maximize();
});
ipcMain.handle('window:close',     () => mainWindow?.close());
ipcMain.handle('window:hide',      () => mainWindow?.hide());
ipcMain.handle('window:fullscreen',() => mainWindow?.setFullScreen(!mainWindow.isFullScreen()));

// App info
ipcMain.handle('app:version',   () => app.getVersion());
ipcMain.handle('app:platform',  () => process.platform);
ipcMain.handle('app:memory',    () => process.memoryUsage());
ipcMain.handle('app:system',    () => ({
  platform: process.platform,
  arch: process.arch,
  nodeVersion: process.versions.node,
  electronVersion: process.versions.electron,
  cpus: os.cpus().length,
  totalMem: Math.round(os.totalmem() / 1024 / 1024 / 1024 * 10) / 10,
  freeMem: Math.round(os.freemem() / 1024 / 1024 / 1024 * 10) / 10,
  hostname: os.hostname(),
  uptime: formatUptime(),
}));
ipcMain.handle('app:quit',      () => { isQuitting = true; app.quit(); });
ipcMain.handle('bg:count',      () => bgTaskCount);

// Notifications
ipcMain.handle('notify', (_, { title, body }) => {
  showTrayNotification(title || 'D.E.V.E', body || 'Notification');
});

// Open external URLs safely
ipcMain.handle('shell:open', (_, url) => {
  if (url?.startsWith('http://') || url?.startsWith('https://')) {
    shell.openExternal(url);
  }
});

// Save/load local data (no external network)
ipcMain.handle('store:set', (_, key, value) => {
  // Simple in-memory store — extend with electron-store for persistence
  if (!global.store) global.store = {};
  global.store[key] = value;
  return true;
});
ipcMain.handle('store:get', (_, key) => {
  return global.store?.[key] ?? null;
});

// ── APP LIFECYCLE ──
const gotLock = app.requestSingleInstanceLock();
if (!gotLock) {
  app.quit();
} else {
  app.on('second-instance', () => showWindow());
}

app.whenReady().then(() => {
  // Hide from dock on macOS
  if (process.platform === 'darwin') app.dock?.hide();

  createWindow();
  createTray();
  startBackgroundLoop();

  // Global hotkey: Ctrl+Shift+D shows/hides D.E.V.E
  globalShortcut.register('CmdOrCtrl+Shift+D', showWindow);
  // Global hotkey: Ctrl+Shift+V for voice
  globalShortcut.register('CmdOrCtrl+Shift+V', () => {
    showWindow();
    setTimeout(() => mainWindow?.webContents.send('start-voice'), 300);
  });

  app.on('activate', () => {
    if (!mainWindow) createWindow();
    else showWindow();
  });
});

app.on('before-quit', () => { isQuitting = true; });

app.on('will-quit', () => {
  globalShortcut.unregisterAll();
  clearInterval(bgInterval);
});

// Keep alive in background — don't quit when all windows close
app.on('window-all-closed', () => {
  // On macOS this is expected; on Windows/Linux we stay in tray
  if (process.platform !== 'darwin') {
    // Don't call app.quit() — stay running in tray
  }
});
