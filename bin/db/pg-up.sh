docker pull postgres
docker run --name postgres \
-e POSTGRES_USER="$POSTGRES_USER" \
-e POSTGRES_PASSWORD="$POSTGRES_PASSWORD" \
-e POSTGRES_DB="$POSTGRES_DB" \
-d -p 5432:5432 postgres