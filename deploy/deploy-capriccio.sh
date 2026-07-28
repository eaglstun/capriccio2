#!/usr/bin/env bash
#
# Deploy CAPRICCIO 2 to fable-mvp.gg.
#
# No sudo required: /var/www/fable-mvp.gg is owned by eric, and the existing
# nginx vhost already serves it correctly (static root, try_files fallback,
# /assets/ long-cached — which is exactly right for the fingerprinted bundle).
#
#   bash deploy/deploy-capriccio.sh
#
# SAFETY: this rsyncs with --delete, which removes the old site's files. It
# refuses to run until fable-mvp.tech is serving that site at its new home.
# Run deploy/setup-fable-mvp-tech.sh first.

set -euo pipefail

DROPLET="eric@68.183.63.41"
REMOTE="/var/www/fable-mvp.gg"
HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

echo "==> Safety check: is the old site live at fable-mvp.tech?"
code="$(curl -s -o /dev/null -w '%{http_code}' --max-time 10 https://fable-mvp.tech/ || echo 000)"
if [ "$code" != "200" ]; then
  echo "    fable-mvp.tech returned '$code', not 200."
  echo "    Refusing to overwrite fable-mvp.gg — the old site has nowhere to live yet."
  echo "    Run deploy/setup-fable-mvp-tech.sh first."
  exit 1
fi
echo "    200 — the seance site is safe at its new home."
echo

echo "==> Building"
cd "$HERE"
yarn build

echo
echo "==> Contents to deploy"
find dist -type f | sed 's/^/    /'
du -sh dist

echo
echo "==> Uploading to $DROPLET:$REMOTE"
rsync -avz --delete \
  --exclude '.DS_Store' \
  dist/ "$DROPLET:$REMOTE/"

echo
echo "==> Verifying"
sleep 2
for u in https://fable-mvp.gg/ https://www.fable-mvp.gg/ https://fable-mvp.gg/about.html; do
  printf "  %-40s %s\n" "$u" "$(curl -s -o /dev/null -w '%{http_code}' --max-time 10 "$u")"
done
echo
echo "  title: $(curl -s --max-time 10 https://fable-mvp.gg/ | grep -oE '<title>[^<]*</title>')"
echo
echo "CAPRICCIO 2 is live at https://fable-mvp.gg"
