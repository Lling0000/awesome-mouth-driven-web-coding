#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
INPUT="${1:-$ROOT/data}"
cd "$ROOT"

node "$ROOT/agent/lexicon-agent.mjs" \
  --input "$INPUT" \
  --base "$ROOT/lexicons/qianwen/base-terms.txt" \
  --daily \
  --max 300

node "$ROOT/agent/qianwen-lexicon-import.mjs"
