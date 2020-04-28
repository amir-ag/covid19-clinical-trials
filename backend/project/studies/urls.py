from django.urls import path, include
from project.studies.views import GetAllStudies, GetStudiesSearch, GetStudiesByStatus

urlpatterns = [
    path('', GetAllStudies.as_view()),
    path('search/', GetStudiesSearch.as_view()),
    path('status/', GetStudiesByStatus.as_view())
]