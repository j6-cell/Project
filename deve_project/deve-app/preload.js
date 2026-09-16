/**
 * D.E.V.E PRELOAD — Secure IPC Bridge
 * Exposes safe APIs to the renderer without giving it
 * full Node.js access.
 */

const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('deve', {
  // Window controls
  minimize: () => ipcRenderer.invoke('window:minimize'),
  maximize: () => ipcRenderer.invoke('window:maximize'),
  close:    () => ipcRenderer.invoke('window:close'),
  hide:     () => ipcRenderer.invoke('window:hide'),
  quit:     () => ipcRenderer.invoke('app:quit'),

  // App info
  version:  () => ipcRenderer.invoke('app:version'),
  platform: () => ipcRenderer.invoke('app:platform'),

  // Notifications
  notify: (title, body) => ipcRenderer.invoke('notify', { title, body }),

  // Open external URL in browser
  openUrl: (url) => ipcRenderer.invoke('shell:open', url),

  // Background task count
  bgCount: () => ipcRenderer.invoke('bg:count'),

  // Listen for events from main process
  onBgUpdate: (cb) => ipcRenderer.on('bg-update', (_, data) => cb(data)),
  onFocusInput: (cb) => ipcRenderer.on('focus-input', () => cb()),
  onBgTask: (cb) => ipcRenderer.on('bg-task', (_, task) => cb(task)),

  // Remove listeners
  removeAllListeners: (channel) => ipcRenderer.removeAllListeners(channel),
});
