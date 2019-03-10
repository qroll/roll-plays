CURRENT_DIR=$(pwd)
SCRIPT_DIR=$(dirname $0)

if [ $SCRIPT_DIR = '.' ]
then
SCRIPT_DIR=$CURRENT_DIR
fi

docker-compose -f $SCRIPT_DIR/docker-compose.yml down