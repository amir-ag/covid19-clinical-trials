# Generated by Django 3.0.4 on 2020-04-14 15:46

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Study',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('NCTId', models.TextField(verbose_name='NCT_ID')),
                ('BriefTitle', models.TextField(verbose_name='title')),
                ('BriefSummary', models.TextField(verbose_name='summary')),
                ('InterventionDescription', models.TextField(verbose_name='intervention')),
                ('InterventionName', models.TextField(verbose_name='intervention-drug')),
                ('OverallStatus', models.TextField(verbose_name='status')),
                ('CentralContactName', models.TextField(verbose_name='contact-name')),
                ('CentralContactEMail', models.TextField(verbose_name='contact-email')),
                ('CentralContactPhone', models.TextField(verbose_name='contact-phone')),
                ('LocationFacility', models.TextField(verbose_name='facility')),
                ('LocationCity', models.TextField(verbose_name='city')),
                ('LocationState', models.TextField(verbose_name='state')),
                ('LocationZip', models.TextField(verbose_name='zip-code')),
                ('LocationCountry', models.TextField(verbose_name='country')),
                ('Latitude', models.FloatField(blank=True, null=True, verbose_name='latitude')),
                ('Longitude', models.FloatField(blank=True, null=True, verbose_name='longitude')),
            ],
        ),
    ]
