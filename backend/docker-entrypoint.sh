#!/bin/bash
echo "Migrate the Database at startup of project"

python manage.py makemigrations

sleep 10
# Wait for few minute and run db migraiton
while ! python manage.py migrate  2>&1; do
   echo "Migration is in progress status"
   sleep 3
done

echo "Django docker is fully configured successfully."

exec "$@"