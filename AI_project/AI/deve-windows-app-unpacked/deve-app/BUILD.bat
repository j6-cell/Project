@echo off
echo.
echo  ██████╗ ███████╗██╗   ██╗███████╗
echo  ██╔══██╗██╔════╝██║   ██║██╔════╝
echo  ██║  ██║█████╗  ██║   ██║█████╗
echo  ██║  ██║██╔══╝  ╚██╗ ██╔╝██╔══╝
echo  ██████╔╝███████╗ ╚████╔╝ ███████╗
echo  ╚═════╝ ╚══════╝  ╚═══╝  ╚══════╝
echo.
echo  AUTONOMOUS AI SYSTEM — WINDOWS BUILD
echo  ======================================
echo.
echo [1/3] Installing dependencies...
call npm install
if errorlevel 1 goto error

echo.
echo [2/3] Building Windows installer...
call npm run build:win
if errorlevel 1 goto error

echo.
echo [3/3] Done!
echo.
echo  Your installer is ready in the dist\ folder
echo  File: dist\D.E.V.E Setup 1.0.0.exe
echo.
echo  Double-click it to install D.E.V.E on your system.
echo.
pause
goto end

:error
echo.
echo  BUILD FAILED. Check the error above.
echo  Make sure Node.js is installed: node --version
echo.
pause

:end
