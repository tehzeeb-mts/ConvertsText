# ==============================================================================
# ConvertsText - Cloudflare Deployment Script
# ==============================================================================

# Ensure Node.js & npm are in PATH
if ($env:Path -notlike "*C:\Program Files\nodejs*") {
    $env:Path = "C:\Program Files\nodejs;$env:Path"
}

Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "🚀 ConvertsText Cloudflare Deployment" -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "Node: $(node -v)" -ForegroundColor Green
Write-Host "npm:  v$(npm -v)" -ForegroundColor Green
Write-Host ""

Write-Host "Select deployment target:" -ForegroundColor Yellow
Write-Host "  1. Deploy to Cloudflare Workers (wrangler deploy)"
Write-Host "  2. Deploy to Cloudflare Pages (wrangler pages deploy)"
Write-Host "  3. Login to Cloudflare (npx wrangler login)"
Write-Host "  4. Local Preview (wrangler dev)"
Write-Host ""

$choice = Read-Host "Enter option [1-4] (default: 1)"
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
    default {
        Write-Host "Invalid selection. Running wrangler deploy..." -ForegroundColor Red
        npx wrangler deploy
    }
}
