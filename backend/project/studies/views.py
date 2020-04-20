from rest_framework.generics import ListAPIView
from project.studies.models import Study
from project.studies.serializers import StudySerializer
from rest_framework import filters

from rest_framework.views import APIView

class GetAllStudies(ListAPIView):
#class GetAllStudies(APIView):
    search_fields = ['NCTId', 'BriefTitle', 'BriefSummary', 'InterventionDescription',\
                    'InterventionName', 'OverallStatus', 'CentralContactName', 'LocationFacility',\
                    'LeadSponsorName', 'LocationCity', 'LocationState', 'LocationZip', 'LocationCountry']
    filter_backends = (filters.SearchFilter,)

    queryset = Study.objects.all()
    serializer_class = StudySerializer

    # def get(self, request, **kwargs):
        
    #     studies = Study.objects.all()

    #     #return Response(VisitsPerTimePeriodSerializer(visits, many=True).data)
    #     return 200

