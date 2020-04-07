from django.db import models


class Study(models.Model):

    BriefTitle = models.TextField(verbose_name="title")
    BriefSummary = models.TextField(verbose_name="summary")
    OverallStatus = models.TextField(verbose_name="status")
    CentralContactName = models.TextField(verbose_name="contact-name")
    CentralContactEMail = models.TextField(verbose_name="contact-email")
    CentralContactPhone = models.TextField(verbose_name="contact-phone")
    LocationFacility = models.TextField(verbose_name="facility")
    LocationState = models.TextField(verbose_name="state")
    LocationZip = models.TextField(verbose_name="zip-code")
    LocationCountry = models.TextField(verbose_name="country")
    Latitude = models.FloatField(verbose_name="latitude", blank=True, null=True)
    Longitude = models.FloatField(verbose_name="longitude", blank=True, null=True)

    def __str__(self):
        return self.BriefTitle

"https://clinicaltrials.gov/api/query/study_fields?expr=COVID-19&fields=BriefTitle%2CBriefSummary%2COverallStatus%2CCentralContactEMail%2CCentralContactName%2CCentralContactPhone%2CLocationFacility%2CLocationCity%2CLocationState%2CLocationZip%2CLocationCountry&min_rnk=1&max_rnk=1000&fmt=json"