# close app
docker-compose down -v

# close db
docker kill mongo

# close network
docker network rm network-rollplays