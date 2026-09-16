const { contextBridge, ipcRenderer, shell } = require('electron');

contextBridge.exposeInMainWorld('deve', {
  send: (channel, data) => ipcRenderer.send(channel, data),
  on: (channel, callback) => ipcRenderer.on(channel, (event, ...args) => callback(...args)),
  openUrl: (url) => shell.openExternal(url),
  minimize: () => ipcRenderer.send('window-minimize'),
  maximize: () => ipcRenderer.send('window-maximize'),
  hide: () => ipcRenderer.send('window-hide'),
  quit: () => ipcRenderer.send('window-quit'),
  notify: (title, body) => ipcRenderer.send('notify', { title, body }),
  // Automation helpers
  runAuto: (payload) => ipcRenderer.send('run-auto', payload),
  runCommand: (cmd) => ipcRenderer.invoke('run-command', cmd),
  openPath: (p) => ipcRenderer.invoke('open-path', p),
  onBgUpdate: null,
  onFocusInput: null
});

ipcRenderer.on('bg-update', (event, payload) => {
  window.deve.onBgUpdate?.(payload);
});

ipcRenderer.on('focus-input', () => {
  window.deve.onFocusInput?.();
});
