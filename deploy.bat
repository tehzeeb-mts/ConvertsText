@echo off
setlocal enabledelayedexpansion
echo ===================================================
echo   ConvertsText - Cloudflare Deployment Helper
echo ===================================================
echo.

:: Auto-detect and include all potential Node.js and Git installation paths
set "PATH=C:\nvm4w\nodejs;C:\Users\%USERNAME%\AppData\Local\nvm;C:\Program Files\nodejs;C:\Program Files (x86)\nodejs;%APPDATA%\npm;C:\Program Files\Git\cmd;C:\Program Files\Git\bin;%LOCALAPPDATA%\Programs\Git\cmd;%PATH%"

:: Check if Node is found
where node >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Node.js was not found in PATH or standard NVM / Program Files locations.
    echo Please ensure Node.js is installed or run nvm use in your terminal.
    echo Download: https://nodejs.org/ or https://github.com/coreybutler/nvm-windows
    pause
    exit /b 1
)

echo [OK] Node.js version:
call node -v
echo [OK] npm version:
call npm -v
where git >nul 2>&1
if %ERRORLEVEL% EQU 0 (
    echo [OK] Git version:
    call git --version
)
echo.

echo Choose an option:
echo   [1] Deploy to Cloudflare Workers (npx wrangler deploy)
echo   [2] Deploy to Cloudflare Pages (npx wrangler pages deploy . --project-name=convertstext)
echo   [3] Log in to Cloudflare (npx wrangler login)
echo   [4] Preview Locally (npm run dev / npx wrangler dev)
echo   [5] Push latest changes to GitHub (git add, commit, push)
echo.

set /p choice="Enter choice [1-5] (default: 1): "
if "%choice%"=="" set choice=1

if "%choice%"=="1" (
    echo.
    echo [*] Deploying to Cloudflare Workers...
    call npx wrangler deploy
) else if "%choice%"=="2" (
    echo.
    echo [*] Deploying to Cloudflare Pages...
    call npx wrangler pages deploy . --project-name=convertstext
) else if "%choice%"=="3" (
    echo.
    echo [*] Logging in to Cloudflare...
    call npx wrangler login
) else if "%choice%"=="4" (
    echo.
    echo [*] Starting local preview at http://localhost:8787 ...
    call npx wrangler dev
) else if "%choice%"=="5" (
    echo.
    echo [*] Running GitHub sync helper...
    call push_to_github.bat
) else (
    echo.
    echo [*] Running default deploy (Cloudflare Workers)...
    call npx wrangler deploy
)

echo.
echo ===================================================
echo Task finished!
echo ===================================================
pause

