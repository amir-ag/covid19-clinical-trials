from django.contrib import admin
from import_export.admin import ImportExportModelAdmin
from .models import Study


@admin.register(Study)
class StudyAdmin(ImportExportModelAdmin):

    @staticmethod
    def Link(self, obj):
        if obj.NCTId:
            return "<a href='%s'>Link</a>" % "https://clinicaltrials.gov/ct2/show/" + obj.NCTId
        else:
            return ''
