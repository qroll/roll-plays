#!/bin/bash
set -e

# renew certificate with certbot
docker run -it --rm \
-v ~/roll-plays/nginx-letsencrypt/site:/data/letsencrypt \
-v /srv/rollplays/etc/letsencrypt:/etc/letsencrypt \
-v /srv/rollplays/var/lib/letsencrypt:/var/lib/letsencrypt \
-v /srv/rollplays/var/log/letsencrypt:/var/log/letsencrypt \
certbot/certbot \
renew \
--webroot --webroot-path /data/letsencrypt

# restart nginx
docker-compose -f app/docker-compose.yml up --build nginx
