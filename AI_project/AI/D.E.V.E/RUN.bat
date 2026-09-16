@echo off
cd /d "%~dp0"
set "NODE_HOME=C:\Users\CPA\Tala Tala\node-v24.15.0-win-x64\node-v24.15.0-win-x64"
set "PATH=%NODE_HOME%;%PATH%"
if not exist "%~dp0electron-user-data" mkdir "%~dp0electron-user-data"
if not exist "%~dp0electron-temp" mkdir "%~dp0electron-temp"
set "TMP=%~dp0electron-temp"
set "TEMP=%~dp0electron-temp"
if exist "%~dp0node_modules\.bin\electron.cmd" (
  call "%~dp0node_modules\.bin\electron.cmd" . --user-data-dir="%~dp0electron-user-data" --disk-cache-dir="%~dp0electron-user-data\Cache" --disable-gpu
) else (
  echo Electron is not installed locally. Please run "npm install" first if npm is available.
)
