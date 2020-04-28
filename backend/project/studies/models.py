from django.contrib.postgres.fields import ArrayField
from django.db import models


class Study(models.Model):
    NCTId = models.TextField(verbose_name="NCT_ID")
    BriefTitle = models.TextField(verbose_name="title")
    BriefSummary = models.TextField(verbose_name="summary")
    InterventionDescription = ArrayField(models.TextField(verbose_name="intervention", blank=True, null=True), default=list)
    InterventionName = ArrayField(models.TextField(verbose_name="intervention-drug", blank=True, null=True), default=list)
    OverallStatus = models.TextField(verbose_name="status")
    CentralContactName = ArrayField(models.TextField(verbose_name="contact-name", blank=True, null=True), default=list)
    CentralContactEMail = ArrayField(models.TextField(verbose_name="contact-email", blank=True, null=True), default=list)
    CentralContactPhone = ArrayField(models.TextField(verbose_name="contact-phone", blank=True, null=True), default=list)
    LocationFacility = models.TextField(verbose_name="facility")
    LeadSponsorName = models.TextField(verbose_name="sponsor")
    LocationCity = models.TextField(verbose_name="city", blank=True, null=True)
    LocationState = models.TextField(verbose_name="state", blank=True, null=True)
    LocationZip = models.TextField(verbose_name="zip-code", blank=True, null=True)
    LocationCountry = models.TextField(verbose_name="country", blank=True, null=True)
    Latitude = models.FloatField(verbose_name="latitude", blank=True, null=True)
    Longitude = models.FloatField(verbose_name="longitude", blank=True, null=True)

    def __str__(self):
        return f"{self.BriefTitle} by {self.LocationFacility}"

    
class StudiesAggregatedByLocation(models.Model):
    Latitude = models.FloatField(verbose_name="latitude", blank=True, null=True)
    Longitude = models.FloatField(verbose_name="longitude", blank=True, null=True)
    Studies = ArrayField(models.TextField(verbose_name="studies", blank=True, null=True), default=list)

    def __str__(self):
        return f"Latitude: {self.Latitude} Longitude: {self.Longitude}"
