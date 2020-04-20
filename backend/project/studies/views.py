from rest_framework.generics import ListAPIView
from project.studies.models import Study
from project.studies.serializers import StudySerializer
from rest_framework import filters

class GetAllStudies(ListAPIView):
    search_fields = ['NCTId', 'BriefTitle', 'BriefSummary', 'InterventionDescription',\
                    'InterventionName', 'OverallStatus', 'CentralContactName', 'LocationFacility',\
                    'LeadSponsorName', 'LocationCity', 'LocationState', 'LocationZip', 'LocationCountry']
    filter_backends = (filters.SearchFilter,)

    queryset = Study.objects.all()
    serializer_class = StudySerializer
