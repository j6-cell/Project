# D.E.V.E — Autonomous AI System
### 100% Local · No Internet Required · Windows Desktop App

---

## BUILD IN 3 STEPS

Open a terminal (Command Prompt or PowerShell) in this folder and run:

```
npm install
npm run build:win
```

Your installer will appear in the `dist/` folder as:
**D.E.V.E Setup 1.0.0.exe**

Double-click it to install. D.E.V.E will appear on your desktop and Start Menu.

---

## ACTIVATE THE LOCAL AI (Free, No Account Needed)

D.E.V.E uses **Ollama** — a free, open-source local AI engine.

1. Go to **https://ollama.ai** and download for Windows
2. Install and run Ollama
3. Open Command Prompt and run one of:

```
ollama pull llama3        # Best all-round (4.7 GB)
ollama pull mistral       # Fast and smart (4.1 GB)
ollama pull phi3          # Tiny but capable (2.2 GB)
ollama pull codellama     # Best for coding (3.8 GB)
ollama pull gemma2        # Google's model (5.4 GB)
```

4. Launch D.E.V.E — it auto-detects Ollama and connects instantly.

**Everything runs 100% on your machine. No cloud. No accounts. No data leaves your device.**

---

## FEATURES

- JARVIS-style holographic UI with animated orb
- Real voice input (speech-to-text) + voice responses (TTS)
- Runs in background — minimizes to system tray
- Custom titlebar + window controls
- Global hotkey: Ctrl+Shift+D to show/hide
- Background automation loop (runs even when minimized)
- Desktop notifications
- Switch between multiple local AI models
- 425 capabilities: code, design, finance, writing, research, automation, and more
- Custom personality/persona settings
- Conversation memory across the session

---

## DEVELOPMENT MODE

```
npm run dev
```

---

## SYSTEM REQUIREMENTS

- Windows 10 / 11 (64-bit)
- Node.js 18+ (you already have this)
- 8 GB RAM minimum (16 GB recommended for larger models)
- 5–10 GB disk space for AI models
- Ollama installed and running

