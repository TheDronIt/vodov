# Generated by Django 3.1.6 on 2021-07-04 12:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('web', '0005_auto_20210704_2213'),
    ]

    operations = [
        migrations.AddField(
            model_name='household_filters',
            name='Category',
            field=models.CharField(choices=[(191, 'Колбы BB (Aquapro)'), (192, 'Колбы SL (Aquapro)'), (193, 'Баки (Aquapro)'), (140, 'Бустерные насосы (Aquapro)'), (196, 'Запчасти (Aquapro)'), (197, 'Картриджи механической очистки (Aquapro)'), (198, 'Картриджи угольные (Aquapro)'), (195, 'Мембраны, постфильтры (Aquapro)'), (199, 'Бытовые системы обратного осмоса (Aquapro)'), (271, 'Canature'), (223, 'Запчасти (NatureWater)'), (221, 'Колбы BB (NatureWater)'), (222, 'Колбы SL (NatureWater)'), (219, 'Картриджи (NatureWater)'), (226, 'Постфильтры (NatureWater)'), (225, 'Бытовые системы водоочистки (NatureWater)'), (133, 'Картриджи Аргумент, колбы Housing, Vontron'), (25, 'Картриджи механической очистки (Аргумент)'), (26, 'Картриджи угольные, умягчения, обезжелезивания (Аргумент)'), (27, 'Колбы Housing'), (28, 'Мембраны Vontron и Canature')], default=191, max_length=50, verbose_name='Категория'),
            preserve_default=False,
        ),
    ]
