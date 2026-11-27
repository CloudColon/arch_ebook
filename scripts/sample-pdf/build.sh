#!/usr/bin/env bash
# Builds public/ai-blueprint-sample.pdf from sample.html with headless Chrome.
set -euo pipefail
cd "$(dirname "$0")"
chrome=$(command -v google-chrome || command -v chromium || command -v chromium-browser)
"$chrome" --headless=new --disable-gpu --no-pdf-header-footer --virtual-time-budget=10000 \
  --print-to-pdf=../../public/ai-blueprint-sample.pdf "file://$PWD/sample.html" 2>/dev/null
echo "Wrote public/ai-blueprint-sample.pdf"
