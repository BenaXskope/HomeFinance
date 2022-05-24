from celery import shared_task
import requests
import xml.etree.ElementTree as ET
from . import models
from finance.celery import app as celery_app



@celery_app.task
def update_rate():
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
