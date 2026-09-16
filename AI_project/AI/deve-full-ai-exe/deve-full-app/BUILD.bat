@echo off
setlocal EnableDelayedExpansion
cls

echo.
echo  ██████╗ ███████╗██╗   ██╗███████╗
echo  ██╔══██╗██╔════╝██║   ██║██╔════╝
echo  ██║  ██║█████╗  ██║   ██║█████╗
echo  ██║  ██║██╔══╝  ╚██╗ ██╔╝██╔══╝
echo  ██████╔╝███████╗ ╚████╔╝ ███████╗
echo  ╚═════╝ ╚══════╝  ╚═══╝  ╚══════╝
echo.
echo  FULL AUTONOMOUS AI — WINDOWS BUILD
echo  Zero Internet · Zero External AI · 100%% Local
echo  ════════════════════════════════════════════
echo.

:: ── SET YOUR NODE PATH ──
set NODE_DIR=C:\Users\CPA\Tala Tala\node-v24.15.0-win-x64\node-v24.15.0-win-x64
set NODE="%NODE_DIR%\node.exe"
set NPM="%NODE_DIR%\npm.cmd"

:: Add node to PATH for this session
set PATH=%NODE_DIR%;%PATH%

:: ── CHECK NODE ──
echo [CHECK] Verifying Node.js...
%NODE% --version >nul 2>&1
if errorlevel 1 (
    echo.
    echo  ERROR: Cannot find Node.js at:
    echo  %NODE_DIR%
    echo.
    echo  Make sure the path is correct in BUILD.bat
    echo  Edit line: set NODE_DIR=^<your path here^>
    echo.
    pause
    exit /b 1
)

for /f "tokens=*" %%v in ('%NODE% --version') do set NODE_VER=%%v
echo  [OK] Node.js %NODE_VER% found

:: ── GO TO APP FOLDER ──
cd /d "%~dp0"
echo  [OK] Working directory: %CD%
echo.

:: ── STEP 1: INSTALL ──
echo [1/2] Installing dependencies...
echo       (Downloads Electron ~120MB on first run)
echo.
%NPM% install
if errorlevel 1 (
    echo.
    echo  ERROR: npm install failed
    echo  Check your internet connection for first-time setup
    echo  Then run BUILD.bat again
    echo.
    pause
    exit /b 1
)

echo.
echo  [OK] Dependencies installed
echo.

:: ── STEP 2: BUILD ──
echo [2/2] Building Windows installer...
echo       (Packages everything into DEVE-Setup-1.0.0.exe)
echo       This takes 2-4 minutes...
echo.
%NPM% run build:win
if errorlevel 1 (
    echo.
    echo  ERROR: Build failed — see error above
    pause
    exit /b 1
)

echo.
echo  ════════════════════════════════════════════
echo  BUILD COMPLETE!
echo  ════════════════════════════════════════════
echo.
echo  Your files are in the dist\ folder:
echo.
echo  INSTALLER:  dist\DEVE-Setup-1.0.0.exe
echo  PORTABLE:   dist\DEVE-Portable-1.0.0.exe
echo.
echo  INSTALLER — installs D.E.V.E to your PC with
echo              desktop shortcut and Start Menu entry
echo.
echo  PORTABLE  — runs directly, no installation needed
echo              great for USB drive use
echo.
echo  Both run with ZERO internet and ZERO external AI.
echo.
pause
