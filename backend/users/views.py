from django.conf import settings
from rest_framework import generics, permissions
from .serializers import RegisterSerializer, ChangePasswordSerializer
from .models import CustomUser
import json
from django.contrib.auth import authenticate, login
from django.views.decorators.http import require_POST
from django.views.decorators.csrf import ensure_csrf_cookie
from django.http import JsonResponse

from rest_framework.views import APIView
from rest_framework.authentication import SessionAuthentication
from rest_framework.response import Response

from account.models import Account


@ensure_csrf_cookie
def set_csrf_token(request):
    """
    This will be `/api/set-csrf-cookie/` on `urls.py`
    """
    return JsonResponse({"details": "CSRF cookie set"})


@require_POST
def login_view(request):
    """
    This will be `/api/login/` on `urls.py`
    """
    data = json.loads(request.body)
    email = data.get('email')
    password = data.get('password')
    if email is None or password is None:
        return JsonResponse({
            "errors": {
                "__all__": "Please enter both username and password"
            }
        }, status=400)
    user = CustomUser.objects.get(email=email, password=password)
    if user is not None:
        login(request, user)
        return JsonResponse({"detail": "Success"})
    return JsonResponse(
        {"detail": "Invalid credentials"},
        status=400,
    )


class RegisterView(generics.CreateAPIView):
    serializer_class = RegisterSerializer
    permission_classes = (permissions.AllowAny,)

    def perform_create(self, serializer):
        user = serializer.save()
        acc = Account(user=user, total=0)
        acc.save()
        user.backend = settings.AUTHENTICATION_BACKENDS[0]
        login(self.request, user)


class ChangePasswordView(generics.UpdateAPIView):
    """
    An endpoint for changing password.
    """
    serializer_class = ChangePasswordSerializer
    model = CustomUser
    permission_classes = (permissions.IsAuthenticated,)

    def get_object(self, queryset=None):
        obj = self.request.user
        return obj

    def update(self, request, *args, **kwargs):
        self.object = self.get_object()
        serializer = self.get_serializer(data=request.data)

        if serializer.is_valid():
            response = {
                'message': 'Password updated successfully',
                'data': []
            }

            return Response({'message': 'Password updated successfully'}, 200)

        return Response(serializer.errors, 400)


class CheckAuth(APIView):
    authentication_classes = [SessionAuthentication]

    def get(self, request):
        return Response({'detail': 'You\'re Authenticated'})
