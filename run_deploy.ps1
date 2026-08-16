# Ensure paths are updated
$candidatePaths = @("C:\nvm4w\nodejs", "$env:LOCALAPPDATA\nvm", "C:\Program Files\nodejs", "C:\Program Files (x86)\nodejs", "$env:APPDATA\npm")
foreach ($p in $candidatePaths) {
    if (Test-Path $p) {
        if ($env:Path -notlike "*$p*") {
            $env:Path = "$p;$env:Path"
        }
    }
}

Write-Host "Running Cloudflare Wrangler deployment..." -ForegroundColor Cyan
npx wrangler deploy

