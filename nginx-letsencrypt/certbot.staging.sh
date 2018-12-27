sudo docker run -it --rm \
-v /srv/rollplays/etc/letsencrypt:/etc/letsencrypt \
-v ~/roll-plays/nginx-letsencrypt/site:/data/letsencrypt \
certbot/certbot \
certonly --webroot \
--webroot-path=/data/letsencrypt \
--register-unsafely-without-email --agree-tos \
--staging \
-d rollplays.me
