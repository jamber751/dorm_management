from django.urls import path
from . import views

urlpatterns = [
    path('get', views.device_get),
    path('register', views.device_register),
    path('delete', views.device_delete)
]