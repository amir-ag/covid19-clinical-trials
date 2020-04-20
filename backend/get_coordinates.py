import os
import django
from geopy.geocoders import GoogleV3
# import schedule
# import time

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'project.settings')
django.setup()

from project.studies.models import Study


def get_coordinates():
    studies = Study.objects.values()
    geolocator = GoogleV3(api_key="AIzaSyCTnTT4eg4Qjz7JA0BL8l7JjxFxQvhpw-s", timeout=100)
    for study in studies:
        if not study["Latitude"]:
            if study["LocationFacility"]:
                search_term = f'{study["LocationFacility"]} {study["LocationCity"]} {study["LocationCountry"]}'
                print(search_term)
                location = geolocator.geocode(f'{search_term}')
                if location:
                    entry = Study.objects.get(NCTId=study['NCTId'], LocationFacility=study['LocationFacility'], LocationZip=study['LocationZip'])
                    entry.Latitude = location.latitude
                    entry.Longitude = location.longitude
                    entry.save()
                    print("location data added and saved")
                elif study["LocationZip"] and study["LocationCity"]:
                    search_term = f'{study["LocationZip"]} {study["LocationCity"]}'
                    print(search_term)
                    location = geolocator.geocode(f'{search_term}')
                    if location:
                        entry = Study.objects.get(NCTId=study['NCTId'], LocationZip=study["LocationZip"],
                                                  LocationCity=study["LocationCity"])
                        entry.Latitude = location.latitude
                        entry.Longitude = location.longitude
                        entry.save()
                        print("location data added and saved")
                    else:
                        search_term = f'{study["LeadSponsorName"]}'
                        location = geolocator.geocode(f'{search_term}')
                        if location:
                            entry = Study.objects.get(NCTId=study['NCTId'], LocationZip=study["LocationZip"],
                                                      LocationCity=study["LocationCity"])
                            entry.Latitude = location.latitude
                            entry.Longitude = location.longitude
                            entry.save()
                            print("location data added and saved")

            elif study["LocationZip"] and study["LocationCity"]:
                search_term = f'{study["LocationZip"]} {study["LocationCity"]}'
                print(search_term)
                location = geolocator.geocode(f'{search_term}')
                if location:
                    entry = Study.objects.get(NCTId=study['NCTId'], LocationZip=study["LocationZip"], LocationCity=study["LocationCity"])
                    entry.Latitude = location.latitude
                    entry.Longitude = location.longitude
                    entry.save()
                    print("location data added and saved")

            elif study["LeadSponsorName"]:
                search_term = f'{study["LeadSponsorName"]}'
                location = geolocator.geocode(f'{search_term}')
                if location:
                    entry = Study.objects.get(NCTId=study['NCTId'], LeadSponsorName=study["LeadSponsorName"])
                    entry.Latitude = location.latitude
                    entry.Longitude = location.longitude
                    entry.save()
                    print("location data added and saved")

            elif study["LocationCountry"]:
                search_term = f'{study["LocationCountry"]}'
                print(search_term)
                location = geolocator.geocode(f'{search_term}')
                if location:
                    entry = Study.objects.get(NCTId=study['NCTId'], LocationCountry=study["LocationCountry"])
                    entry.Latitude = location.latitude
                    entry.Longitude = location.longitude
                    entry.save()
                    print("location data added and saved")

if __name__ == '__main__':
    get_coordinates()


# schedule.every().day.at("02:30").do(get_coordinates)
#
# while True:
#     schedule.run_pending()
#     time.sleep(1)
