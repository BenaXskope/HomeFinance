from __future__ import absolute_import, unicode_literals
import os
from celery import Celery

# setting the Django settings module.
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'finance.settings')
app = Celery('finance')
app.config_from_object('django.conf:settings', namespace='CELERY')
app.conf.broker_url = 'redis://localhost:6379/0'

# Looks up for task modules in Django applications and loads them
app.autodiscover_tasks()


# celery -A finance beat -l debug
# celery -A finance beat
# To run without debug function
@app.on_after_finalize.connect
def setup_periodic_tasks(sender, **kwargs):
    from account.tasks import update_rate
    sender.add_periodic_task(10, update_rate())




