# Create a container from the mongo image, 
#  set it to auto start (--restart),
#  run it as a daemon (-d),
#  and expose the port 27017 (-p)
docker pull mongo
docker run --name mongodb --restart=always -d -p 27017:27017 --network network-rollplays mongo mongod
