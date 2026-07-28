#!/usr/bin/env bash
#
# Move the existing fable-mvp.gg site (the "seance you can run" SPA) to its new
# home at fable-mvp.tech, so that fable-mvp.gg can be taken over by CAPRICCIO 2.
#
# RUN THIS IN A REAL TERMINAL WINDOW, NOT THROUGH CLAUDE CODE.
# It needs sudo on the droplet, and sudo needs a password, and neither Claude
# Code's Bash tool nor its `!` prefix provides a TTY for that prompt.
#
#   bash deploy/setup-fable-mvp-tech.sh
#
# It does NOT touch fable-mvp.gg. The old site stays live at .gg until you
# deploy CAPRICCIO 2 over it separately — so there is no window where the
# seance site is unreachable.

set -euo pipefail

DROPLET="eric@68.183.63.41"

echo "==> Setting up fable-mvp.tech on the droplet"
echo "    You will be prompted for your sudo password on the droplet."
echo

# `set -e` must live INSIDE the remote string — a local set -e does not apply
# to the remote shell, and without it a failed sudo falls through to the
# trailing success message.
ssh -t "$DROPLET" 'set -e

echo "--- 1. create the new web root"
sudo mkdir -p /var/www/fable-mvp.tech
sudo chown eric:eric /var/www/fable-mvp.tech

echo "--- 2. copy the current site across (originals untouched)"
rsync -a --delete /var/www/fable-mvp.gg/ /var/www/fable-mvp.tech/
du -sh /var/www/fable-mvp.tech

echo "--- 3. write the nginx vhost (HTTP only; certbot adds TLS next)"
sudo tee /etc/nginx/sites-available/fable-mvp.tech >/dev/null <<"NGINX"
# nginx vhost for fable-mvp.tech — Vite + React SPA (the "seance you can run").
# Moved here from fable-mvp.gg on 2026-07-28, which became CAPRICCIO 2.
# Static build deployed to /var/www/fable-mvp.tech via rsync (as eric).
#
# Own domain, not under *.pinecone.website, so it needs its own certbot cert:
#   sudo certbot --nginx -d fable-mvp.tech -d www.fable-mvp.tech
# certbot rewrites this file to add the :443 block + HTTP->HTTPS redirect.

server {
    listen 80;
    listen [::]:80;
    server_name fable-mvp.tech www.fable-mvp.tech;

    root /var/www/fable-mvp.tech;
    index index.html;

    # SPA: serve the file if it exists, else fall back to index.html.
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Long-cache the fingerprinted assets/ bundle.
    location /assets/ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Let certbot HTTP-01 through before TLS exists.
    location ^~ /.well-known/ {
        allow all;
        default_type text/plain;
    }
}
NGINX

echo "--- 4. enable it and test the config"
sudo ln -sfn /etc/nginx/sites-available/fable-mvp.tech /etc/nginx/sites-enabled/fable-mvp.tech
sudo nginx -t

echo "--- 5. reload nginx"
sudo systemctl reload nginx

echo "--- 6. issue the certificate"
# No -m: a certbot account already exists on this box (fable-mvp.gg has a cert),
# so certbot reuses its registered email rather than taking a guessed one.
sudo certbot --nginx -d fable-mvp.tech -d www.fable-mvp.tech --agree-tos --redirect

echo "--- 7. final config test + reload"
sudo nginx -t
sudo systemctl reload nginx

echo "--- done on the droplet"
'

echo
echo "==> Verifying from here"
sleep 2
for u in https://fable-mvp.tech/ https://www.fable-mvp.tech/; do
  printf "  %-32s %s\n" "$u" "$(curl -s -o /dev/null -w '%{http_code}' --max-time 10 "$u")"
done
echo
echo "If both return 200, the seance site is safe at its new home."
echo "Then deploy CAPRICCIO 2 over fable-mvp.gg with:  bash deploy/deploy-capriccio.sh"
