from django.urls import path, include
from project.studies.views import GetAllStudies, GetStudiesSearch

urlpatterns = [
    path('', GetAllStudies.as_view()),
    path('search/', GetStudiesSearch.as_view())
]