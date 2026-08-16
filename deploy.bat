@echo off
setlocal
echo ===================================================
echo   ConvertsText - Cloudflare Deployment Helper
echo ===================================================
echo.

:: Add Node.js to PATH
set "PATH=C:\Program Files\nodejs;%PATH%"

:: Check if Node is found
where node >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Node.js was not found at C:\Program Files\nodejs
    echo Please download Node.js from https://nodejs.org/
    pause
    exit /b 1
)

echo Node.js version:
node -v
echo npm version:
npm -v
echo.

echo Choose an option:
echo   [1] Deploy to Cloudflare Workers (npx wrangler deploy)
echo   [2] Deploy to Cloudflare Pages (npx wrangler pages deploy . --project-name=convertstext)
echo   [3] Log in to Cloudflare (npx wrangler login)
echo   [4] Preview Locally (npx wrangler dev)
echo.

set /p choice="Enter choice [1-4] (default: 1): "
if "%choice%"=="" set choice=1

if "%choice%"=="1" (
    echo.
    echo Deploying to Cloudflare Workers...
    npx wrangler deploy
) else if "%choice%"=="2" (
    echo.
    echo Deploying to Cloudflare Pages...
    npx wrangler pages deploy . --project-name=convertstext
) else if "%choice%"=="3" (
    echo.
    echo Logging in to Cloudflare...
    npx wrangler login
) else if "%choice%"=="4" (
    echo.
    echo Starting local preview...
    npx wrangler dev
) else (
    echo.
    echo Running default deploy...
    npx wrangler deploy
)

echo.
echo ===================================================
echo Deployment step finished!
echo ===================================================
pause
