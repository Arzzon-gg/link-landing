#!/usr/bin/env bash
# run.sh — start the marketing landing site (Next.js) in dev mode on :3002.
# Port 3002 avoids clashing with the Edge dashboard (:3000).
# Bash companion to run.ps1.
set -euo pipefail

script_dir="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
app_dir="$(cd -- "$script_dir/.." && pwd)"
cd "$app_dir"

if [ ! -d node_modules ]; then
  echo "==> Installing dependencies (npm install)..."
  npm install
fi

echo "==> Starting the landing site on http://localhost:3002 ..."
echo "    (Ctrl+C to stop)"
echo
npm run dev -- -p 3002
