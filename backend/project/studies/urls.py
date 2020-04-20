from django.urls import path, include
from project.studies.views import GetAllStudies

urlpatterns = [
    path('', GetAllStudies.as_view())

]