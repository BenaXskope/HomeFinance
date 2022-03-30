from rest_framework.viewsets import ReadOnlyModelViewSet, ModelViewSet
from . import serializers
from . import models


class CurrencyView(ReadOnlyModelViewSet):
    serializer_class = serializers.CurrencySerializer
    queryset = models.Currency.objects.all()


class AccountView(ModelViewSet):
    serializer_class = serializers.AccountSerializer
    queryset = models.Account.objects.all()


class CategoryView(ModelViewSet):
    serializer_class = serializers.CategorySerializer
    queryset = models.Category.objects.all()


class PayOutView(ModelViewSet):
    serializer_class = serializers.PayOutSerializer
    queryset = models.PayOut.objects.all()

