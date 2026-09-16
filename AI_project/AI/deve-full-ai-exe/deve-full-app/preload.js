/**
 * D.E.V.E PRELOAD — Secure Bridge
 * Exposes controlled APIs to the renderer without
 * giving it direct Node.js access.
 */

const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('deve', {

  // ── WINDOW CONTROLS ──
  minimize:    () => ipcRenderer.invoke('window:minimize'),
  maximize:    () => ipcRenderer.invoke('window:maximize'),
  close:       () => ipcRenderer.invoke('window:close'),
  hide:        () => ipcRenderer.invoke('window:hide'),
  fullscreen:  () => ipcRenderer.invoke('window:fullscreen'),
  quit:        () => ipcRenderer.invoke('app:quit'),

  // ── APP INFO ──
  version:     () => ipcRenderer.invoke('app:version'),
  platform:    () => ipcRenderer.invoke('app:platform'),
  memory:      () => ipcRenderer.invoke('app:memory'),
  systemInfo:  () => ipcRenderer.invoke('app:system'),
  bgCount:     () => ipcRenderer.invoke('bg:count'),

  // ── NOTIFICATIONS ──
  notify: (title, body) => ipcRenderer.invoke('notify', { title, body }),

  // ── EXTERNAL URLS ──
  openUrl: (url) => ipcRenderer.invoke('shell:open', url),

  // ── LOCAL STORE ──
  storeSet: (key, value) => ipcRenderer.invoke('store:set', key, value),
  storeGet: (key)        => ipcRenderer.invoke('store:get', key),

  // ── EVENT LISTENERS ──
  onBgUpdate:    (cb) => ipcRenderer.on('bg-update',    (_, data) => cb(data)),
  onFocusInput:  (cb) => ipcRenderer.on('focus-input',  ()       => cb()),
  onStartVoice:  (cb) => ipcRenderer.on('start-voice',  ()       => cb()),
  onBgTask:      (cb) => ipcRenderer.on('bg-task',      (_, t)   => cb(t)),

  // ── CLEANUP ──
  removeListener: (channel) => ipcRenderer.removeAllListeners(channel),
});
