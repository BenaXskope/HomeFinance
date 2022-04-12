from django.urls import path, include
from rest_framework import routers
from . import views

urlpatterns = [
    path('register/', views.RegisterView.as_view(), name='user-register'),
    path('login/', views.login_view, name='user-login'),
    path('csrf/', views.set_csrf_token, name='user-csrf'),
    path('test-auth/', views.CheckAuth.as_view(), name='user-test'),
    path('change-password/', views.ChangePasswordView.as_view, name='change-password'),
    path('password-reset/', include('django_rest_passwordreset.urls', namespace='password_reset')),
]