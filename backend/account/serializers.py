from . import models
from rest_flex_fields import FlexFieldsModelSerializer
from rest_framework.serializers import ValidationError, Serializer
from rest_framework import serializers

import re


class CurrencySerializer(FlexFieldsModelSerializer):

    class Meta:
        model = models.Currency
        fields = '__all__'

    # def create(self, validated_data):
    #     return models.Currency.objects.create(**validated_data)


class AccountSerializer(FlexFieldsModelSerializer):

    class Meta:
        model = models.Account
        fields = ['id', 'user', 'total', 'currencies', ]
        expandable_fields = {
            'currencies': (CurrencySerializer, {'many': True})
        }
        # read_only_fields = ['user', 'category']


class CategorySerializer(FlexFieldsModelSerializer):

    def validate_color(self, value):
        if not re.match(r'[0-9A-Fa-f]{6}', value):
            raise ValidationError('Invalid color')
        return value

    class Meta:
        model = models.Category
        fields = ['id', 'title', 'color', 'account', 'prognosis']
        expandable_fields = {
            'account': AccountSerializer
        }


# Пример: http://127.0.0.1:8000/payout/?expand=account&fields=id,account.user
class PayOutSerializer(FlexFieldsModelSerializer):

    class Meta:
        model = models.PayOut
        fields = ['id', 'account', 'value', 'description', 'category', 'creation_date', 'isExpenditure', 'isFastRecord']
        expandable_fields = {
            'account': AccountSerializer,
            'category': CategorySerializer
        }

    def validate(self, data):
        if 'category' in data:
            category = data['category']
            user = models.CustomUser.objects.get(email=data['account'])
            account = models.Account.objects.get(user=user)
            # account = models.Account.objects.get(user=data['user'])
            if category.account.id != account.id:
                raise ValidationError("Category from other account.")
        return data



