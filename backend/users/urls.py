from django.urls import path
from rest_framework import routers
from . import views

urlpatterns = [
    path('register/', views.RegisterView.as_view(), name='user-register'),
    path('login/', views.login_view, name='user-login'),
    path('csrf/', views.set_csrf_token, name='user-csrf'),
    path('test-auth/', views.CheckAuth.as_view(), name='user-test'),
]