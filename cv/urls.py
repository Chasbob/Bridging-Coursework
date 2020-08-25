from django.urls import path, re_path
from . import views

urlpatterns = [
    re_path(r'^api/cv/work/?$', views.work_list),
]