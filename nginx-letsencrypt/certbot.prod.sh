sudo docker run -it --rm \
-v /srv/rollplays/etc/letsencrypt:/etc/letsencrypt \
-v ~/roll-plays/nginx-letsencrypt/site:/data/letsencrypt \
certbot/certbot \
certonly --webroot \
--webroot-path=/data/letsencrypt \
--email quek.ruoling@gmail.com --agree-tos --no-eff-email \
-d rollplays.me www.rollplays.me \
-d api.rollplays.me
