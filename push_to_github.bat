@echo off
setlocal enabledelayedexpansion

echo =======================================================
echo   ConvertsText - Automated Git Setup ^& Push Helper
echo =======================================================
echo.

:: Add Git common installation paths to PATH
set "PATH=C:\Program Files\Git\cmd;C:\Program Files (x86)\Git\cmd;%LOCALAPPDATA%\Programs\Git\cmd;%PATH%"

:: Check if git is installed
where git >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo [!] Git is not installed on your system.
    echo.
    echo Please download and install Git from:
    echo https://git-scm.com/download/win
    echo.
    echo Once installed, rerun this script to push automatically!
    echo.
    pause
    exit /b 1
)

echo [OK] Git is available:
git --version
echo.

:: Initialize Git if not already initialized
if not exist ".git" (
    echo [*] Initializing Git repository...
    git init -b main
) else (
    echo [*] Existing Git repository detected.
)

:: Add all files
echo [*] Staging project files...
git add .

:: Commit
set /p commit_msg="Enter commit message (Press Enter for default: 'Initial commit: ConvertsText'): "
if "!commit_msg!"=="" set "commit_msg=Initial commit: ConvertsText"

git commit -m "!commit_msg!"

:: Check remote
git remote get-url origin >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo.
    echo -------------------------------------------------------
    echo Step: Connect your GitHub Repository
    echo 1. Go to https://github.com/new and create a repository (e.g. 'convertstext')
    echo 2. Copy the repository URL (e.g. https://github.com/YOUR_USERNAME/convertstext.git)
    echo -------------------------------------------------------
    echo.
    set /p repo_url="Enter your GitHub Repository URL: "
    if not "!repo_url!"=="" (
        git remote add origin !repo_url!
        git branch -M main
        echo.
        echo [*] Pushing to GitHub...
        git push -u origin main
    ) else (
        echo [!] No remote URL entered. You can set it later using: git remote add origin ^<url^>
    )
) else (
    echo.
    echo [*] Pushing latest changes to origin main...
    git push -u origin main
)

echo.
echo =======================================================
echo Git push completed!
echo =======================================================
pause
