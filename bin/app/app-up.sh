SCRIPT_DIR=$(cd `dirname $0` && pwd)

docker-compose -f $SCRIPT_DIR/docker-compose.yml -f $SCRIPT_DIR/docker-compose.prod.yml build
docker-compose -f $SCRIPT_DIR/docker-compose.yml -f $SCRIPT_DIR/docker-compose.prod.yml up -d
