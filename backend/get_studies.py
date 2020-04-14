import requests
import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'project.settings')
django.setup()

from project.studies.models import Study
studies = Study.objects.values()

url = "https://clinicaltrials.gov/api/query/study_fields?expr=COVID-19&fields=NCTId%2CBriefTitle%2CBriefSummary%2COverallStatus%2CCentralContactEMail%2CCentralContactName%2CCentralContactPhone%2CLocationFacility%2CLocationCity%2CLocationState%2CLocationZip%2CLocationCountry%2CInterventionDescription%2CInterventionName&min_rnk=1&max_rnk=1000&fmt=json"
r = requests.get(url)
results = r.json()


count = 0
for entry in results["StudyFieldsResponse"]["StudyFields"]:
    try:
        obj = Study.objects.get(NCTId=entry['NCTId'][0])
    except Study.DoesNotExist:
        print("does not exist - create new!")
        count += 1
        obj = Study(
            NCTId=entry['NCTId'][0],
            BriefTitle=entry['BriefTitle'][0],
            BriefSummary=entry['BriefSummary'][0],
            InterventionDescription=str(entry['InterventionDescription']),
            InterventionName=str(entry['InterventionName']),
            OverallStatus=str(entry['OverallStatus']),
            CentralContactName=entry['CentralContactName'],
            CentralContactEMail=entry['CentralContactEMail'],
            CentralContactPhone=entry['CentralContactPhone'],
            LocationFacility=entry['LocationFacility'],
            LocationCity=entry['LocationCity'],
            LocationState=entry['LocationState'],
            LocationZip=entry['LocationZip'],
            LocationCountry=entry['LocationCountry']
        )
        obj.save()
print(count)






#     if Study.objects.filter(NCTId=entry["NCTId"]).exists():
#         print(entry["NCTId"], "exists!")
#         count += 1
# print(count)

#     if entry["NCTId"][0] == study["NCTId"]:
# for study in studies:
# print(study["NCTId"], "found!")

