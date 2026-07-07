# run.ps1 — start the marketing landing site (Next.js) in dev mode on :3002.
# Port 3002 avoids clashing with the Edge dashboard (:3000).
# Works from any directory.
# Usage: .\link-landing\scripts\run.ps1

$ErrorActionPreference = "Stop"

$appDir = Split-Path $PSScriptRoot
Set-Location $appDir

if (-not (Test-Path (Join-Path $appDir "node_modules"))) {
    Write-Host "==> Installing dependencies (npm install)..." -ForegroundColor Cyan
    npm install
    if ($LASTEXITCODE -ne 0) { exit 1 }
}

Write-Host "==> Starting the landing site on http://localhost:3002 ..." -ForegroundColor Cyan
Write-Host "    (Ctrl+C to stop)`n" -ForegroundColor DarkGray
npm run dev -- -p 3002
