from rest_framework.generics import ListAPIView
from project.studies.models import Study
from project.studies.serializers import StudySerializer

class GetAllStudies(ListAPIView):
    queryset = Study.objects.all()
    serializer_class = StudySerializer
