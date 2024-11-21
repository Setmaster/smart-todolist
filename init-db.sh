#!/bin/bash

# Wait until PostgreSQL is ready
until pg_isready -h postgres -p 5432 -U labber; do
  echo "Waiting for PostgreSQL to be ready..."
  sleep 2
done

# Run the schema and seed files
echo "PostgreSQL is ready. Running schema and seed files..."
psql -U labber -d smart-todolist -f /docker-entrypoint-initdb.d/schema/project.sql
psql -U labber -d smart-todolist -f /docker-entrypoint-initdb.d/seeds/01_users.sql
psql -U labber -d smart-todolist -f /docker-entrypoint-initdb.d/seeds/02_todos.sql
