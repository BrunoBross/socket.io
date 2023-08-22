docker run --name socket -e POSTGRES_USER=admin -e POSTGRES_PASSWORD=admin --restart=always -p 5433:5432 -d postgres
