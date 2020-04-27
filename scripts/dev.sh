#!/bin/bash
python manage.py makemigrations
python manage.py migrate
python manage.py runserver 0.0.0.0:8000
python manage.py fetch_studies
#python get_coordinates.py