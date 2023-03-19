# Generated by Django 3.2.18 on 2023-03-19 20:46

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Sheet',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('pos_index', models.IntegerField(unique=True, verbose_name='Номер')),
                ('order', models.CharField(blank=True, default='', max_length=100, verbose_name='заказ №')),
                ('price_usd', models.CharField(blank=True, default='', max_length=100, verbose_name='стоимость, $')),
                ('price_rub', models.CharField(blank=True, default='', max_length=100, verbose_name='стоимость, руб.')),
                ('delivery_date', models.DateTimeField(blank=True, null=True, verbose_name='срок поставки')),
            ],
            options={
                'ordering': ['pk'],
            },
        ),
    ]