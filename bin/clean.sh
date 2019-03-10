CURRENT_DIR=$(pwd)
SCRIPT_DIR=$(dirname $0)

if [ $SCRIPT_DIR = '.' ]
then
SCRIPT_DIR=$CURRENT_DIR
fi

echo "============"
echo "Cleaning app"
echo "============"
sh "$SCRIPT_DIR/app/app-clean.sh"

echo "\n================="
echo "Cleaning database"
echo "================="
sh "$SCRIPT_DIR/db/mongo-clean.sh"

echo "\n============================="
echo "Cleaning shared configuration"
echo "============================="
sh "$SCRIPT_DIR/shared/shared-clean.sh"