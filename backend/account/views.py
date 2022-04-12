from rest_framework.response import Response
from rest_framework.viewsets import ReadOnlyModelViewSet, ModelViewSet
from . import serializers
from . import models
from rest_flex_fields.views import FlexFieldsMixin
from rest_flex_fields import is_expanded
from rest_framework.views import APIView
import requests
import xml.etree.ElementTree as ET


class CurrencyUpdate(APIView):

    def get(self, request):
        doc = requests.get('http://www.cbr.ru/scripts/XML_daily.asp')
        doc.encoding = 'utf-8'
        doc = ET.fromstring(doc.content)
        # root = doc.getroot()
        for currency in doc:
            num_code = currency.find('NumCode').text
            let_code = currency.find('CharCode').text
            units = currency.find('Nominal').text
            name = currency.find('Name').text
            rate = currency.find('Value').text
            rate = rate.replace(',', '.')
            rate = float(rate)
            # print(numCode, let_code, units, name, rate)
            cur = models.Currency.objects.get(num_code=num_code)
            cur.rate = rate
            cur.save()
            print('Currencies updated')
            return Response(status=200)


class CurrencyView(ReadOnlyModelViewSet):
    serializer_class = serializers.CurrencySerializer
    queryset = models.Currency.objects.all()


class AccountView(FlexFieldsMixin, ModelViewSet):
    serializer_class = serializers.AccountSerializer
    permit_list_expands = ['user', 'currencies', 'category', 'payout', 'payout.category']

    def get_queryset(self):
        user = self.request.user
        queryset = models.Account.objects.filter(user=user)

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

    def list(self, request, *args, **kwargs):
        user = self.request.user
        account = models.Account.objects.get(user=user)
        serializer = self.get_serializer(account)
        return Response(serializer.data)

    def retrieve(self, request, *args, **kwargs):
        user = self.request.user
        account = models.Account.objects.get(user=user)
        serializer = self.get_serializer(account)
        return Response(serializer.data)

    def create(self, request, *args, **kwargs):
        if models.Account.objects.get(user=request.user):
            return Response({"detail": "Account already exist"})
        request.data['user'] = request.user.id
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=201, headers=headers)

    def partial_update(self, request, pk, *args, **kwargs):
        currencies_ids = request.data['currencies']
        currencies_ids = currencies_ids.split(',')
        account = models.Account.objects.get(pk=pk)
        for cur_id in currencies_ids:
            account.currencies.add(models.Currency.objects.get(pk=cur_id))
        serializer = self.get_serializer(account)
        return Response(serializer.data)


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

    def create(self, request, *args, **kwargs):
        request.data['account'] = request.user.id
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=201, headers=headers)


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
