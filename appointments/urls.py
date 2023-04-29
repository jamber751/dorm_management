from django.urls import path
from . import views

urlpatterns = [
    path('get', views.appt_get),
    path('book', views.appt_book),
    path('my', views.appt_my),
    path('cancel', views.appt_cancel)
]