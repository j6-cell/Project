@echo off
set "NODE_HOME=C:\Users\CPA\Tala Tala\node-v24.15.0-win-x64\node-v24.15.0-win-x64"
set "PATH=%NODE_HOME%;%PATH%"
cd /d "%~dp0"
npm.cmd run dev
