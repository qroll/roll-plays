CURRENT_DIR=$(pwd)
SCRIPT_DIR=$(dirname $0)

if [ $SCRIPT_DIR = '.' ]
then
SCRIPT_DIR=$CURRENT_DIR
fi

echo "==============================="
echo "Setting up shared configuration"
echo "==============================="
sh "$SCRIPT_DIR/shared/shared-up.sh"

echo "\n==================="
echo "Setting up database"
echo "==================="
sh "$SCRIPT_DIR/db/mongo-up.sh"

echo "\n=============="
echo "Setting up app"
echo "=============="
sh "$SCRIPT_DIR/app/app-up.sh"