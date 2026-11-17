#!/bin/sh
set -eu
cd "$(dirname "$0")/.."
# Pass an installed standalone Tailwind 3.4.17 binary as the first argument if desired.
compiled=$(mktemp)
trap 'rm -f "$compiled"' EXIT
if [ "$#" -gt 0 ]; then
    "$1" -c tailwind.config.js -i tools/utilities.css -o "$compiled" --minify
else
    npx --yes tailwindcss@3.4.17 -c tailwind.config.js -i tools/utilities.css -o "$compiled" --minify
fi
python3 - "$compiled" <<'PY'
from pathlib import Path
import sys
path = Path('style.css')
marker = '/* END GENERATED UTILITIES */'
custom = path.read_text().split(marker, 1)[1].lstrip('\n')
compiled = Path(sys.argv[1]).read_text()
path.write_text('/* Generated Tailwind utilities. Rebuild with tools/build-styles.sh. */\n' + compiled + '\n' + marker + '\n' + custom)
PY
