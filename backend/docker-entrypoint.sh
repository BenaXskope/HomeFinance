#!/bin/bash
echo "Migrate the Database at startup of project"

sleep 10

#python manage.py migrate


echo "Django docker is fully configured successfully."

exec "$@"