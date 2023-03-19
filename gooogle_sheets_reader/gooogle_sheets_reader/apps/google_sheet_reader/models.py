from django.db import models

# Create your models here.
class Sheet(models.Model):
    pos_index = models.IntegerField('Номер', null=False, unique=True)
    order = models.CharField('заказ №', max_length=100, null=False, blank=True, default='')
    price_usd = models.CharField('стоимость, $', max_length=100, null=False, blank=True, default='')
    price_rub = models.CharField('стоимость, руб.', max_length=100, null=False, blank=True, default='')
    delivery_date = models.DateTimeField('срок поставки', null=True, blank=True)

    class Meta:
        ordering = ['pk']

    def __str__(self):
        return self.order + ' ' + str(self.get_format_delivery_date())

    def get_format_delivery_date(self):
        return self.delivery_date.strftime("%d, %m, %Y")
