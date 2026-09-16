# D.E.V.E — Windows AI Assistant

D.E.V.E is a Windows desktop application built with Electron designed to function as a local AI personal assistant. It connects to a locally running Ollama instance and can run in the background from the system tray.

## Quick start

1. Install dependencies:

```bash
npm install
```

2. Run in development:

```bash
npm start
```

If `npm` is not available but `node` is installed, use the local Electron CLI directly from the project:

```bash
node node_modules/electron/cli.js .
```

3. Build a Windows distributable:

```bash
npm run build:win
```

## What this app includes

- Custom Electron shell with a tray icon and background operation
- Local AI frontend UI in `src/index.html`
- Ollama integration for local model usage
- Auto-launch support at login
- Voice UI overlay and message streaming
- Windows installer support using `electron-builder`

## Recommended setup

1. Install Ollama from https://ollama.ai
2. Start Ollama locally
3. Pull a model:

```bash
ollama pull llama3
```

4. Run D.E.V.E and choose the local model in the app UI.

## Notes

- The app is configured to load `src/index.html` as the main UI.
- The tray icon stays active when the window is closed or minimized.
- The app uses `assets/icon.svg` as its icon and installer branding.

## Scripts

- `npm start` — run the Electron app in development
- `npm run dev` — run Electron with `--dev`
- `npm run build:win` — build a Windows installer using `electron-builder`

## Troubleshooting

- If the app cannot connect, verify Ollama is running on `http://localhost:11434`.
- If you need a different port, update the endpoint in the Config tab.
