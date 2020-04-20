import os
import django
import csv


os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'project.settings')
django.setup()

from project.studies.models import Study

with open('./project/studies/cities/cities15000.csv', newline='') as csvfile:
    reader = csv.reader(csvfile)
    # entries_csv = []
    studies = Study.objects.values()
    for study in studies:
        # print(study)
        # print(study["LocationCity"])
        for row in reader:
            # print(type(study["LocationCity"]))
            # print(row[0])
            if study["LocationCity"] == row[0]:
                print(study["LocationCity"])
                # print(row[0])
                study["Latitude"] = row[1]
                study["Longitude"] = row[2]
                Study.objects.save(study)
