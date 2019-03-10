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

echo
echo "==================="
echo "Setting up database"
echo "==================="
sh "$SCRIPT_DIR/db/mongo-up.sh"
sh "$SCRIPT_DIR/db/pg-up.sh"

echo
echo "=============="
echo "Setting up app"
echo "=============="
sh "$SCRIPT_DIR/app/app-up.sh"