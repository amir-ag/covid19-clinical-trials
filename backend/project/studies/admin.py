from django.contrib import admin
from import_export.admin import ImportExportModelAdmin

# Register your models here.
from .models import Study

@admin.register(Study)
class PatientAdmin(ImportExportModelAdmin):
    pass

from .models.registration import Registration
admin.site.register(Registration)