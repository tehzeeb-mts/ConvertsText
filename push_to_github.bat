@echo off
setlocal enabledelayedexpansion

title ConvertsText - GitHub Sync Helper

echo =======================================================
echo   ConvertsText - GitHub Sync Helper
echo =======================================================
echo.

:: Ensure standard Git installation paths are in PATH
set "PATH=C:\Program Files\Git\cmd;C:\Program Files\Git\bin;C:\Program Files (x86)\Git\cmd;C:\Program Files (x86)\Git\bin;%LOCALAPPDATA%\Programs\Git\cmd;%LOCALAPPDATA%\Programs\Git\bin;%PATH%"

:: 1. Verify Git Installation
where git >nul 2>&1
if !ERRORLEVEL! NEQ 0 (
    echo [ERROR] Git was not found in PATH or standard Program Files locations.
    echo Please download and install Git from: https://git-scm.com/download/win
    echo.
    pause
    exit /b 1
)

for /f "tokens=*" %%v in ('git --version') do set "GIT_VER=%%v"
echo [OK] !GIT_VER!
echo.

:: 2. Ensure Branch is main
call git branch -M main >nul 2>&1

:: 3. Configure Remote Origin
call git remote get-url origin >nul 2>&1
if !ERRORLEVEL! NEQ 0 (
    echo [*] Setting remote origin to https://github.com/tehzeeb-mts/ConvertsText.git
    call git remote add origin https://github.com/tehzeeb-mts/ConvertsText.git
) else (
    :: Ensure origin points to correct repo
    call git remote set-url origin https://github.com/tehzeeb-mts/ConvertsText.git
)

:: 4. Stage All Changes
echo [*] Staging all files...
call git add -A

:: 5. Check if there are changes to commit
call git diff-index --quiet HEAD -- >nul 2>&1
if !ERRORLEVEL! NEQ 0 (
    echo [*] Changes detected.
    set /p "commit_msg=Enter commit message (Press Enter for default: 'Update ConvertsText repository'): "
    if "!commit_msg!"=="" set "commit_msg=Update ConvertsText repository"
    
    call git commit -m "!commit_msg!"
    if !ERRORLEVEL! NEQ 0 (
        echo [WARNING] Commit encountered an issue or was skipped.
    ) else (
        echo [OK] Changes committed successfully.
    )
) else (
    echo [OK] No local uncommitted changes. Working tree clean.
)

echo.
echo [*] Pushing changes to origin/main...
echo (A browser window may open if you need to authorize GitHub access)
echo.

call git push -u origin main
if !ERRORLEVEL! EQU 0 (
    echo.
    echo =======================================================
    echo   [SUCCESS] GitHub Sync Completed!
    echo   Repository: https://github.com/tehzeeb-mts/ConvertsText
    echo =======================================================
) else (
    echo.
    echo =======================================================
    echo   [ERROR] Git push failed.
    echo =======================================================
    echo Potential causes:
    echo  1. Remote branch has new commits -> Try: git pull --rebase origin main
    echo  2. Authentication needed -> Sign in to GitHub in your browser
    echo  3. Internet connection issue
    echo.
)

echo.
pause
