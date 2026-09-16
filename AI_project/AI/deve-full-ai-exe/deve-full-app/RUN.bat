@echo off
setlocal
set NODE_DIR=C:\Users\CPA\Tala Tala\node-v24.15.0-win-x64\node-v24.15.0-win-x64
set NODE="%NODE_DIR%\node.exe"
set NPM="%NODE_DIR%\npm.cmd"
set PATH=%NODE_DIR%;%PATH%

cd /d "%~dp0"
echo Starting D.E.V.E in development mode...
%NPM% install >nul 2>&1
%NPM% start
