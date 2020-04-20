import requests
import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'project.settings')
django.setup()
# import schedule
# import time
from project.studies.models import Study
studies = Study.objects.values()

url = "https://clinicaltrials.gov/api/query/study_fields?expr=COVID-19&fields=NCTId%2CBriefTitle%2CBriefSummary%2COverallStatus%2CCentralContactEMail%2CCentralContactName%2CCentralContactPhone%2CLocationFacility%2CLeadSponsorName%2CLocationCity%2CLocationState%2CLocationZip%2CLocationCountry%2CInterventionDescription%2CInterventionName&min_rnk=1&max_rnk=1000&fmt=json"
r = requests.get(url)
results = r.json()


def get_studies():
    count = 0
    for entry in results["StudyFieldsResponse"]["StudyFields"]:
        try:
            obj = Study.objects.get(NCTId=entry['NCTId'][0])
        except Study.DoesNotExist:
            for location in range(len(entry['LocationFacility'])):
                print("does not exist - create new!")
                try:
                    loc_LocationState = entry['LocationState'][location]
                except:
                    loc_LocationState = None

                try:
                    loc_LocationZip = entry['LocationZip'][location]
                except:
                    loc_LocationZip = None

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
                    LeadSponsorName=entry['LeadSponsorName'],
                    LocationFacility=entry['LocationFacility'][location],
                    LocationCity=entry['LocationCity'][location],
                    LocationState=f'{loc_LocationState}',
                    LocationZip=f'{loc_LocationZip}',
                    LocationCountry=entry['LocationCountry'][location]
                )
                obj.save()
        print(count)

    #clean up db for double occurences
    delete_count = 0
    for row in Study.objects.all().reverse():
        if Study.objects.filter(NCTId=row.NCTId, LocationFacility=row.LocationFacility, LocationCountry=row.LocationCountry, LocationZip=row.LocationZip, LocationCity=row.LocationCity, LocationState=row.LocationState,  ).count() > 1:
            print(row.NCTId)
            delete_count += 1
            row.delete()
    print('delete_count:', delete_count)

if __name__ == '__main__':
    get_studies()

# schedule.every().day.at("02:20").do(get_studies)
#
# while True:
#     schedule.run_pending()
#     time.sleep(1)
