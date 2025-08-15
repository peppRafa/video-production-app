@echo off
echo Setting up PostgreSQL database for Video Production App...
echo.

echo Creating database...
psql -U postgres -c "CREATE DATABASE video_production_db;"

echo.
echo Running schema...
psql -U postgres -d video_production_db -f database/schema.sql

echo.
echo Running seed data...
psql -U postgres -d video_production_db -f database/seed.sql

echo.
echo Database setup complete!
pause
