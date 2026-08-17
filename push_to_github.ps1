# ==============================================================================
# ConvertsText - PowerShell GitHub Sync Helper
# ==============================================================================

$candidatePaths = @(
    "C:\Program Files\Git\cmd",
    "C:\Program Files\Git\bin",
    "C:\Program Files (x86)\Git\cmd",
    "C:\Program Files (x86)\Git\bin",
    "$env:LOCALAPPDATA\Programs\Git\cmd",
    "$env:LOCALAPPDATA\Programs\Git\bin"
)

foreach ($path in $candidatePaths) {
    if (Test-Path $path) {
        if ($env:Path -notlike "*$path*") {
            $env:Path = "$path;$env:Path"
        }
    }
}

Write-Host "=======================================================" -ForegroundColor Cyan
Write-Host "  ConvertsText - GitHub Sync Helper (PowerShell)" -ForegroundColor Cyan
Write-Host "=======================================================" -ForegroundColor Cyan
Write-Host ""

try {
    $gitVer = git --version
    Write-Host "[OK] $gitVer" -ForegroundColor Green
} catch {
    Write-Host "[ERROR] Git was not found in PATH or standard Program Files locations." -ForegroundColor Red
    Write-Host "Please download Git from https://git-scm.com/download/win" -ForegroundColor Yellow
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host ""
# Ensure on main branch
git branch -M main | Out-Null

# Set remote origin
$originUrl = git remote get-url origin 2>$null
if ($LASTEXITCODE -ne 0) {
    Write-Host "[*] Adding remote origin..." -ForegroundColor Yellow
    git remote add origin https://github.com/tehzeeb-mts/ConvertsText.git
} else {
    git remote set-url origin https://github.com/tehzeeb-mts/ConvertsText.git
}

# Stage all files
Write-Host "[*] Staging files..." -ForegroundColor Cyan
git add -A

# Check for changes
$status = git status --porcelain
if (![string]::IsNullOrWhiteSpace($status)) {
    Write-Host "[*] Uncommitted changes detected." -ForegroundColor Yellow
    $msg = Read-Host "Enter commit message (Press Enter for default: 'Update ConvertsText repository')"
    if ([string]::IsNullOrWhiteSpace($msg)) {
        $msg = "Update ConvertsText repository"
    }
    git commit -m "$msg"
    Write-Host "[OK] Changes committed." -ForegroundColor Green
} else {
    Write-Host "[OK] Working tree clean. Ready to push." -ForegroundColor Green
}

Write-Host ""
Write-Host "[*] Pushing changes to origin/main..." -ForegroundColor Cyan
Write-Host "(A browser window may open if you need to authorize GitHub access)" -ForegroundColor DarkGray
Write-Host ""

git push -u origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "=======================================================" -ForegroundColor Green
    Write-Host "  [SUCCESS] GitHub Sync Completed!" -ForegroundColor Green
    Write-Host "  Repository: https://github.com/tehzeeb-mts/ConvertsText" -ForegroundColor Green
    Write-Host "=======================================================" -ForegroundColor Green
} else {
    Write-Host ""
    Write-Host "=======================================================" -ForegroundColor Red
    Write-Host "  [ERROR] Git push encountered an error." -ForegroundColor Red
    Write-Host "=======================================================" -ForegroundColor Red
    Write-Host "Possible reasons:" -ForegroundColor Yellow
    Write-Host " 1. Remote repository has new commits -> Run: git pull --rebase origin main"
    Write-Host " 2. Browser authentication required"
    Write-Host " 3. Network or repository permission issue"
}

Write-Host ""
Read-Host "Press Enter to continue..."
