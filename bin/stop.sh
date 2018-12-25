# close app
docker-compose down -v

# close db
docker kill mongodb
docker rm mongodb

# close network
docker network rm network-rollplays