# ==============================================================================
# ConvertsText - Cloudflare Deployment Script
# ==============================================================================

# Ensure Node.js, npm, npx, and git are in PATH
$candidatePaths = @(
    "C:\nvm4w\nodejs",
    "$env:LOCALAPPDATA\nvm",
    "C:\Program Files\nodejs",
    "C:\Program Files (x86)\nodejs",
    "$env:APPDATA\npm",
    "C:\Program Files\Git\cmd",
    "C:\Program Files\Git\bin",
    "$env:LOCALAPPDATA\Programs\Git\cmd"
)

foreach ($path in $candidatePaths) {
    if (Test-Path $path) {
        if ($env:Path -notlike "*$path*") {
            $env:Path = "$path;$env:Path"
        }
    }
}

Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "🚀 ConvertsText Cloudflare Deployment" -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan

try {
    $nodeVer = node -v
    Write-Host "Node: $nodeVer" -ForegroundColor Green
} catch {
    Write-Host "Node: Not detected" -ForegroundColor Yellow
}

try {
    $npmVer = npm -v
    Write-Host "npm:  v$npmVer" -ForegroundColor Green
} catch {
    Write-Host "npm:  Not detected" -ForegroundColor Yellow
}

try {
    $gitVer = git --version
    Write-Host "Git:  $gitVer" -ForegroundColor Green
} catch {
    Write-Host "Git:  Not detected" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "Select an option:" -ForegroundColor Yellow
Write-Host "  1. Deploy to Cloudflare Workers (wrangler deploy)"
Write-Host "  2. Deploy to Cloudflare Pages (wrangler pages deploy)"
Write-Host "  3. Login to Cloudflare (npx wrangler login)"
Write-Host "  4. Local Preview (wrangler dev)"
Write-Host "  5. Push to GitHub (git sync helper)"
Write-Host ""

$choice = Read-Host "Enter option [1-5] (default: 1)"
if ([string]::IsNullOrWhiteSpace($choice)) { $choice = "1" }

switch ($choice) {
    "1" {
        Write-Host "`nDeploying to Cloudflare Workers..." -ForegroundColor Cyan
        npx wrangler deploy
    }
    "2" {
        Write-Host "`nDeploying to Cloudflare Pages..." -ForegroundColor Cyan
        npx wrangler pages deploy . --project-name=convertstext
    }
    "3" {
        Write-Host "`nLogging into Cloudflare..." -ForegroundColor Cyan
        npx wrangler login
    }
    "4" {
        Write-Host "`nStarting local Wrangler preview..." -ForegroundColor Cyan
        npx wrangler dev
    }
    "5" {
        Write-Host "`nLaunching GitHub Sync..." -ForegroundColor Cyan
        & ".\push_to_github.bat"
    }
    default {
        Write-Host "Running default wrangler deploy..." -ForegroundColor Cyan
        npx wrangler deploy
    }
}

