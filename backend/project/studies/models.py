from django.contrib.postgres.fields import ArrayField
from django.db import models


class Study(models.Model):
    NCTId = models.TextField(verbose_name="NCT_ID")
    BriefTitle = models.TextField(verbose_name="title")
    BriefSummary = models.TextField(verbose_name="summary")
    InterventionDescription = models.TextField(verbose_name="intervention")
    InterventionName = ArrayField(models.TextField(verbose_name="intervention-drug"))
    OverallStatus = models.TextField(verbose_name="status")
    CentralContactName = ArrayField(models.TextField(verbose_name="contact-name"))
    CentralContactEMail = ArrayField(models.TextField(verbose_name="contact-email"))
    CentralContactPhone = ArrayField(models.TextField(verbose_name="contact-phone"))
    LocationFacility = ArrayField(models.TextField(verbose_name="facility"))
    LocationCity = ArrayField(models.TextField(verbose_name="city"))
    LocationState = ArrayField(models.TextField(verbose_name="state"))
    LocationZip = ArrayField(models.TextField(verbose_name="zip-code"))
    LocationCountry = ArrayField(models.TextField(verbose_name="country"))
    Latitude = models.FloatField(verbose_name="latitude", blank=True, null=True)
    Longitude = models.FloatField(verbose_name="longitude", blank=True, null=True)

# link = https://clinicaltrials.gov/ct2/show/ + NCTId

    def __str__(self):
        return f"{self.BriefTitle} by {self.LocationFacility}"

"https://clinicaltrials.gov/api/query/study_fields?expr=COVID-19&fields=NCTId%2CBriefTitle%2CBriefSummary%2COverallStatus%2CCentralContactEMail%2CCentralContactName%2CCentralContactPhone%2CLocationFacility%2CLocationCity%2CLocationState%2CLocationZip%2CLocationCountry%2CInterventionDescription%2CInterventionName&min_rnk=1&max_rnk=1000&fmt=json"