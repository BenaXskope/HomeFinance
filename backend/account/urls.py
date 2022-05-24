from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'account', views.AccountView, basename='Account')
router.register(r'category', views.CategoryView, basename='Category')
router.register(r'currency', views.CurrencyView, basename='Currency')
router.register(r'payout', views.PayOutView, basename='PayOut')
router.register(r'fast_payout', views.FastPayOut, basename='FastPayOut')

urlpatterns = [
    path('', include(router.urls)),
    path('currency_update/', views.CurrencyUpdate().as_view(), name='UpdateCur'),
    path('category_stat/', views.category_stat, name='category_stat'),
    path('graph_points/', views.graph_points, name='graph_points'),
]
