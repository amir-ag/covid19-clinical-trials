from rest_framework import serializers
from project.studies.models import Study, StudiesAggregatedByLocation


class StudySerializer(serializers.ModelSerializer):
    visitStudy = serializers.SerializerMethodField()

    class Meta:
        model = Study
        fields = '__all__'

    @staticmethod
    def get_visitStudy(self):
        return f"https://clinicaltrials.gov/ct2/show/{self.NCTId}"


class StudiesAggregatedByLocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudiesAggregatedByLocation
        fields = '__all__'