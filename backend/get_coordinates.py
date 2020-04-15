import os
import django
from geopy.geocoders import GoogleV3

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'project.settings')
django.setup()

from project.studies.models import Study

# geolocator = GoogleV3(api_key="AIzaSyCTnTT4eg4Qjz7JA0BL8l7JjxFxQvhpw-s")
# location = geolocator.geocode("ISGlobal")
# print(location.latitude, location.longitude)


studies = Study.objects.values()
for study in studies[:1]:
    if not study["Latitude"]:
        search_term = f'{study["LocationFacility"][0]}'
        print(search_term)
        # geolocator = GoogleV3(api_key="AIzaSyCTnTT4eg4Qjz7JA0BL8l7JjxFxQvhpw-s")
        # location = geolocator.geocode(f'{search_term}')
        entry = Study.objects.get(NCTId=study['NCTId'])
        print(study['NCTId'])
        # entry.Latitude = location[0]
        # entry.Longitude = location[1]
        # entry.save()