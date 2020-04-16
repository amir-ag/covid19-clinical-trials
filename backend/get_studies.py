import requests
import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'project.settings')
django.setup()
# import schedule
# import time
from project.studies.models import Study
studies = Study.objects.values()

url = "https://clinicaltrials.gov/api/query/study_fields?expr=COVID-19&fields=NCTId%2CBriefTitle%2CBriefSummary%2COverallStatus%2CCentralContactEMail%2CCentralContactName%2CCentralContactPhone%2CLocationFacility%2CLocationCity%2CLocationState%2CLocationZip%2CLocationCountry%2CInterventionDescription%2CInterventionName&min_rnk=1&max_rnk=1000&fmt=json"
r = requests.get(url)
results = r.json()


def get_studies():
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
                InterventionDescription=entry['InterventionDescription'],
                InterventionName=entry['InterventionName'],
                OverallStatus=entry['OverallStatus'][0],
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

if __name__ == '__main__':
    get_studies()

# schedule.every().day.at("02:20").do(get_studies)
#
# while True:
#     schedule.run_pending()
#     time.sleep(1)
