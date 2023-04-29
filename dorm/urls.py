from django.urls import path
from . import views

urlpatterns = [
    path('register', views.register_view),
    path('login', views.login_view),
    path('logout', views.logout_view),
    path('check', views.is_auth_view),
    path('csrf', views.get_CSRF)
]