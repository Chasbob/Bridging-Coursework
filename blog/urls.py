from django.urls import path, re_path
from . import views

urlpatterns = [
    re_path(r'^api/blog/(?P<pk>([0-9]|\S)+)/$', views.post_detail),
    re_path(r'^api/blog/$', views.post_list),
]