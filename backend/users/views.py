import django
from django.shortcuts import render
from rest_framework import permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from users.models import CustomUser
from .serializers import RegisterSerializer, ChangePasswordSerializer, UpdateUserSerializer
from rest_framework import generics
from finance.settings import DEBUG


class AuthTestView(APIView):

    if not DEBUG:
        permission_classes = [permissions.IsAuthenticated, ]

    def get(self, request):
        return Response("OK")


class RegisterView(generics.CreateAPIView):
    queryset = CustomUser.objects.all()
    permission_classes = (permissions.AllowAny, )
    serializer_class = RegisterSerializer


class ChangePasswordView(generics.UpdateAPIView):
    queryset = CustomUser.objects.all()
    if not DEBUG:
        permission_classes = [permissions.IsAuthenticated, ]
    serializer_class = ChangePasswordSerializer


# class ChangePasswordView1(APIView):
#     # if not DEBUG:
#     #     permission_classes = [permissions.IsAuthenticated, ]
#
#     def patch(self, request):
#         user = request.user
#         serializer = ChangePasswordSerializer
#         user = serializer.update(self, user, request.data)
#         return Response(status=200)


class UpdateProfileView(generics.UpdateAPIView):
    queryset = CustomUser.objects.all()
    if not DEBUG:
        permission_classes = [permissions.IsAuthenticated, ]
    serializer_class = UpdateUserSerializer

