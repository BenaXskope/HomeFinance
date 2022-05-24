from django.db import models
from users.models import CustomUser


class Currency(models.Model):
    num_code = models.IntegerField(db_index=True, unique=True, verbose_name='Цифр. код')
    let_code = models.CharField(max_length=3, verbose_name='Букв. код')
    units = models.IntegerField(verbose_name='Единиц')
    name = models.CharField(max_length=50, verbose_name="Наименование")
    rate = models.DecimalField(verbose_name="Курс", max_digits=8, decimal_places=4, blank=False, default=0)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Валюта'
        verbose_name_plural = 'Валюты'
        ordering = ['let_code']


class Account(models.Model):
    user = models.ForeignKey(CustomUser, verbose_name="Пользователь", on_delete=models.CASCADE, related_name="account")
    total = models.DecimalField(verbose_name="Сумма", max_digits=20, decimal_places=2, blank=False, default=0)
    currencies = models.ManyToManyField(Currency, related_name='accounts', related_query_name='account', blank=True)

    def __str__(self):
        return str(self.user)

    class Meta:
        verbose_name = 'Кошелек'
        verbose_name_plural = 'Кошельки'


class Category(models.Model):
    title = models.CharField(max_length=30, verbose_name="Наименование")
    color = models.CharField(max_length=7, verbose_name='Цвет', default='#000000')
    account = models.ForeignKey(Account, verbose_name="Аккаунт", on_delete=models.CASCADE, related_name="category")
    prognosis = models.DecimalField(verbose_name="Прогноз", max_digits=20, decimal_places=2, blank=False, default=0)

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = 'Категория'
        verbose_name_plural = 'Категории'
        ordering = ['title']


class CategoryPrognosis(models.Model):
    categoryId = models.ForeignKey(Category, verbose_name="Прогноз", on_delete=models.CASCADE, related_name="prognose")
    value = models.DecimalField(verbose_name="Прогноз", max_digits=20, decimal_places=2, blank=False, default=0)
    creation_date = models.DateTimeField(auto_now_add=True, verbose_name='Дата создания')


class PayOut(models.Model):
    account = models.ForeignKey(Account, verbose_name="Аккаунт", on_delete=models.CASCADE, related_name="payout")
    description = models.CharField(max_length=30, verbose_name="Описание", blank=False, default="Описание")
    category = models.ForeignKey(Category, verbose_name="Категория", on_delete=models.CASCADE, related_name="payout")
    value = models.DecimalField(verbose_name="Сумма", max_digits=20, decimal_places=2, blank=False, default=0)
    creation_date = models.DateTimeField(auto_now_add=True, verbose_name='Дата создания')
    isExpenditure = models.BooleanField(verbose_name="Тип", blank=False, default=True)  # ЭТО ПОПОЛНЕНИЕ
    isFastRecord = models.BooleanField(verbose_name="Быстрая запись", blank=False, default=False)

    def __str__(self):
        return self.account + " " + self.creation_date

    class Meta:
        verbose_name = 'Выплата'
        verbose_name_plural = 'Выплаты'
        ordering = ['account', 'creation_date']
