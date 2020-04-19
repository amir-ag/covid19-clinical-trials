from django.contrib import admin
from import_export.admin import ImportExportModelAdmin
from .models import Study
#

@admin.register(Study)
class StudyAdmin(ImportExportModelAdmin):
    pass
