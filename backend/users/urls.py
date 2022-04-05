from django.urls import path, include
from . import views
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('test/', views.AuthTestView.as_view()),
    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('login/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', views.RegisterView.as_view(), name='users_register'),
    path('change_password/<int:pk>/', views.ChangePasswordView.as_view(), name='users_change_password'),
    #path('change_password/', views.ChangePasswordView1.as_view(), name='users_change_password'),
    path('update_profile/<int:pk>/', views.UpdateProfileView.as_view(), name='users_update_profile'),
]
