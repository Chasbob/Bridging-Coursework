from django.urls import path, re_path
from . import views

urlpatterns = [
    re_path(r'^api/cv/$', views.item_list),
    re_path(r'^api/cv/types/$', views.type_list),
    re_path(r'^api/cv/types/(?P<pk>([0-9])+)/$', views.get_type),
]