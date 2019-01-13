docker pull postgres
docker run --name postgres --restart=always -d -p 5432:5432 --network network-rollplays postgres