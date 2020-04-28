import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'project.settings')
django.setup()

from project.studies.models import Study, StudiesAggregatedByLocation

def create_coordinates_table():
    studies = Study.objects.values()

    data = [{
        'Latitude': studies[0]['Latitude'],
        'Longitude': studies[0]['Longitude'],
        'clinics': []
    }]

    data[0]['clinics'].append(studies[0])
    data[0]['clinics'][0].update(visitStudy=f"https://clinicaltrials.gov/ct2/show/{studies[0]['NCTId']}")

    studies_length = len(studies)
    for i in range(1, studies_length):
        is_in_data = 0
        for idx, s in enumerate(data):  # check for latitude and longitude into data list
            if studies[i]['Latitude'] == s['Latitude'] and studies[i]['Longitude'] == s['Longitude']:
                is_in_data = 1
                ckeck_id = 0
                for clinic in data[idx]['clinics']:
                    if studies[i]['id'] == clinic['id']:
                        ckeck_id = 1;
                if not ckeck_id:
                    studies[i]['visitStudy'] = f"https://clinicaltrials.gov/ct2/show/{studies[i]['NCTId']}"
                    data[idx]['clinics'].append(studies[i])

        if not is_in_data:
            studies[i]['visitStudy'] = f"https://clinicaltrials.gov/ct2/show/{studies[i]['NCTId']}"
            data.append({
                'Latitude': studies[i]['Latitude'],
                'Longitude': studies[i]['Longitude'],
                'clinics': [studies[i]]
            })
    for entry in data:
        obj = StudiesAggregatedByLocation(
            Latitude=entry['Latitude'],
            Longitude=entry['Longitude'],
            Studies=entry['clinics'])
        obj.save()


if __name__ == '__main__':
    create_coordinates_table()