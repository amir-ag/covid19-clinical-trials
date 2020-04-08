from rest_framework import serializers
from project.studies.models import Study


class StudySerializer(serializers.ModelSerializer):
    visitStudy = serializers.SerializerMethodField()

    class Meta:
        model = Study
        fields = '__all__'
        exclude = ['password']

    @staticmethod
    def get_visitStudy(self, study):
        return f"https://clinicaltrials.gov/ct2/show/{self.study.NCTId}"
