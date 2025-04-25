#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" <<-EOSQL
    CREATE DATABASE users_db;
    CREATE DATABASE rooms_db;
    CREATE DATABASE bookings_db;
    
    GRANT ALL PRIVILEGES ON DATABASE users_db TO admin;
    GRANT ALL PRIVILEGES ON DATABASE rooms_db TO admin;
    GRANT ALL PRIVILEGES ON DATABASE bookings_db TO admin;
EOSQL