from rest_framework.viewsets import ReadOnlyModelViewSet, ModelViewSet
from . import serializers
from . import models
from rest_flex_fields.views import FlexFieldsMixin
from rest_flex_fields import is_expanded


class CurrencyView(ReadOnlyModelViewSet):
    serializer_class = serializers.CurrencySerializer
    queryset = models.Currency.objects.all()


class AccountView(FlexFieldsMixin, ModelViewSet):
    serializer_class = serializers.AccountSerializer
    permit_list_expands = ['user', 'currencies', 'category', 'payout', 'payout.category']

    def get_queryset(self):
        queryset = models.Account.objects.all()

        if is_expanded(self.request, 'user'):
            queryset = queryset.select_related('user')

        if is_expanded(self.request, 'currencies'):
            queryset = queryset.prefetch_related('currencies')

        if is_expanded(self.request, 'category'):
            queryset = queryset.prefetch_related('category')

        if is_expanded(self.request, 'currencies'):
            queryset = queryset.prefetch_related('payout')

        if is_expanded(self.request, 'category'):
            queryset = queryset.prefetch_related('payout__category')

        return queryset


class CategoryView(FlexFieldsMixin, ModelViewSet):
    serializer_class = serializers.CategorySerializer
    permit_list_expands = ['account', 'payout']
    filterset_fields = ('account', 'payout')

    def get_queryset(self):
        queryset = models.Category.objects.all()

        if is_expanded(self.request, 'account'):
            queryset = queryset.select_related('account')

        if is_expanded(self.request, 'payout'):
            queryset = queryset.prefetch_related('payout')

        return queryset


class PayOutView(FlexFieldsMixin, ModelViewSet):
    serializer_class = serializers.PayOutSerializer
    permit_list_expands = ['account', 'category']
    filterset_fields = ('account', 'category')

    def get_queryset(self):
        queryset = models.PayOut.objects.all()

        if is_expanded(self.request, 'account'):
            queryset = queryset.select_related('account')

        if is_expanded(self.request, 'category'):
            queryset = queryset.select_related('category')

        return queryset
