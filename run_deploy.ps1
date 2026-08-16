$env:Path = "C:\Program Files\nodejs;" + $env:Path

Write-Host "Running Cloudflare Wrangler deployment..." -ForegroundColor Cyan
& "C:\Program Files\nodejs\npx.cmd" wrangler deploy
