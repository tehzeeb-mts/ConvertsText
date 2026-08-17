@echo off
setlocal enabledelayedexpansion

echo =======================================================
echo   ConvertsText - GitHub Push Helper
echo =======================================================
echo.

:: Add Git common installation paths to PATH
set "PATH=C:\Program Files\Git\cmd;C:\Program Files\Git\bin;C:\Program Files (x86)\Git\cmd;C:\Program Files (x86)\Git\bin;%LOCALAPPDATA%\Programs\Git\cmd;%LOCALAPPDATA%\Programs\Git\bin;%PATH%"

:: Check if git is installed
where git >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo [!] Git is not found in PATH.
    pause
    exit /b 1
)

echo [OK] Git is available:
git --version
echo.

:: Check current branch and set remote
git branch -M main
git remote get-url origin >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo [*] Setting remote origin to https://github.com/tehzeeb-mts/ConvertsText.git
    git remote add origin https://github.com/tehzeeb-mts/ConvertsText.git
)

:: Stage and commit any unstaged changes
echo [*] Staging all files...
git add .
git status --porcelain | findstr /R "." >nul
if %ERRORLEVEL% EQU 0 (
    set /p commit_msg="Enter commit message (Press Enter for default: 'Update ConvertsText repository'): "
    if "!commit_msg!"=="" set "commit_msg=Update ConvertsText repository"
    git commit -m "!commit_msg!"
) else (
    echo [*] Working tree is clean. Ready to push.
)

echo.
echo [*] Pushing changes to https://github.com/tehzeeb-mts/ConvertsText.git (main branch)...
echo (A browser window may open if you need to authorize GitHub access)
echo.
git push -u origin main

echo.
echo =======================================================
echo   GitHub Push Completed!
echo =======================================================
pause
