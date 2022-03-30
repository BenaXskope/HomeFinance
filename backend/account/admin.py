from django.contrib import admin
from .models import Currency, Account, Category, PayOut


@admin.register(Currency)
class CurrencyAdmin(admin.ModelAdmin):
    list_display = ('num_code', 'let_code', 'units', 'name', 'rate')
    list_display_links = ('num_code', 'let_code', 'units')
    search_fields = ('num_code', 'let_code', 'units')


@admin.register(Account)
class AccountAdmin(admin.ModelAdmin):
    list_display = ('user', 'total')
    list_display_links = ('user', )
    list_editable = ('total',)
    search_fields = ('user', )


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('title', 'color', 'account')
    list_display_links = ('title',)
    search_fields = ('title', 'account')


@admin.register(PayOut)
class PayOutAdmin(admin.ModelAdmin):
    list_display = ('account', 'category', 'value', 'creation_date')
    list_display_links = ('account',)
    list_editable = ('value',)
    search_fields = ('account', 'account')
