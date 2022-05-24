#!/bin/bash
echo "Migrate the Database at startup of project"

python manage.py makemigrations

sleep 10

python manage.py migrate users
python manage.py migrate

# Wait for few minute and run db migraiton
#while ! python manage.py migrate users 2>&1; do
#   echo "USERS Migration is in progress status"
#   sleep 3
#done
#
#while ! python manage.py migrate account 2>&1; do
#   echo "Migration is in progress status"
#   sleep 3
#done
#
#while ! python manage.py migrate 2>&1; do
#   echo "Migration is in progress status"
#   sleep 3
#done

echo "Django docker is fully configured successfully."

exec "$@"