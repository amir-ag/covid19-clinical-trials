from rest_framework.generics import ListAPIView
from project.studies.models import Study
from project.studies.serializers import StudySerializer
from rest_framework import filters
from django.core import serializers
from django.db.models import Q

from rest_framework import status
from django.http import HttpResponse
from rest_framework.response import Response
from rest_framework.views import APIView
from project.studies.models import Study
import json


class GetStudiesSearch(ListAPIView):
    search_fields = ['NCTId', 'BriefTitle', 'BriefSummary', 'InterventionDescription',\
                    'InterventionName', 'OverallStatus', 'CentralContactName', 'LocationFacility',\
                    'LeadSponsorName', 'LocationCity', 'LocationState', 'LocationZip', 'LocationCountry']
    filter_backends = (filters.SearchFilter,)

    queryset = Study.objects.all()
    serializer_class = StudySerializer


class GetAllStudies(APIView):
    def get(self, request, **kwargs):
        studies = Study.objects.all().values()
        
        
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

        return HttpResponse(json.dumps(data), content_type='application/json')


class GetStudiesByStatus(APIView):
    def get(self, request, **kwargs):
        status = request.GET['search_status']
        status = status.split(',')

        status_len = len(status)
        filter = f'list(Study.objects.filter('
        for idx, study_status in enumerate(status):
            if idx < status_len - 1:
                filter += f'Q(OverallStatus="{study_status}") | '
            else: 
                filter += f'Q(OverallStatus="{study_status}")).values())'
        
        studies = eval(filter)

        if studies:
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

            return HttpResponse(json.dumps(data), content_type="application/json")
        else:
            return HttpResponse(json.dumps([]), content_type="application/json")
        # data = eval(filter)
        # return HttpResponse(json.dumps(data), content_type="application/json")

        