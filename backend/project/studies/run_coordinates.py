import csv
import os
os.environ['DJANGO_SETTINGS_MODULE'] = 'project.settings'
from project.studies.models import Study


with open('cities15000.csv', newline='') as csvfile:
    reader = csv.reader(csvfile)
    # entries_csv = []
    studies = Study.objects.all()
    for study in studies:
        for row in reader:
            if study["LocationCity"] == row[0]:
                study["Latitude"] = row[1]
                study["Longitude"] = row[2]
                Study.objects.save(study)
