#!/bin/bash

# Website Cloner - Comprehensive site capture tool
# Usage: ./clone_website.sh <url> [output_dir]

set -e

# Get the directory where this script is located
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
VENV_DIR="$SCRIPT_DIR/.venv"

URL="${1:-https://www.aura.build/share/lumina-video}"
OUTPUT_DIR="${2:-cloned_site}"

echo "======================================"
echo "  Comprehensive Website Cloner"
echo "======================================"
echo ""
echo "Target URL: $URL"
echo "Output Dir: $OUTPUT_DIR"
echo ""

# Check for Python
if ! command -v python3 &> /dev/null; then
    echo "Error: Python 3 is required"
    exit 1
fi

# Create virtual environment if it doesn't exist
if [ ! -d "$VENV_DIR" ]; then
    echo "[1/4] Creating virtual environment..."
    python3 -m venv "$VENV_DIR"
else
    echo "[1/4] Virtual environment exists"
fi

# Activate virtual environment
source "$VENV_DIR/bin/activate"

# Install dependencies
echo "[2/4] Installing dependencies..."
pip install --upgrade pip --quiet
pip install playwright aiohttp --quiet

# Install Playwright browsers
echo "[3/4] Installing Playwright browsers..."
python -m playwright install chromium --quiet 2>/dev/null || python -m playwright install chromium

# Run the cloner
echo "[4/4] Starting website clone..."
echo ""
python "$SCRIPT_DIR/website_cloner.py" "$URL" "$OUTPUT_DIR"

echo ""
echo "======================================"
echo "  Clone Complete!"
echo "======================================"
echo ""
echo "Key files:"
echo "  - $OUTPUT_DIR/index.html"
echo "  - $OUTPUT_DIR/screenshot_full.png"
echo "  - $OUTPUT_DIR/combined_styles.css"
echo "  - $OUTPUT_DIR/tailwind.config.js"
echo "  - $OUTPUT_DIR/ANALYSIS_REPORT.md"
echo ""
echo "Themes (light/dark):"
echo "  - $OUTPUT_DIR/themes/light/  (screenshots + design_tokens.json)"
echo "  - $OUTPUT_DIR/themes/dark/   (screenshots + design_tokens.json)"
echo ""
echo "Animations:"
echo "  - $OUTPUT_DIR/animations/    (frame captures every 2s)"
echo ""
echo "Data:"
echo "  - $OUTPUT_DIR/data/design_tokens.json"
echo "  - $OUTPUT_DIR/data/component_tree.json"
echo "  - $OUTPUT_DIR/data/theme_info.json"
echo ""
