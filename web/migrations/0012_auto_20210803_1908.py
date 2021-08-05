# Generated by Django 3.1.6 on 2021-08-03 09:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('web', '0011_auto_20210802_0004'),
    ]

    operations = [
        migrations.CreateModel(
            name='Order',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('Сode', models.CharField(max_length=120, verbose_name='Номер заказа')),
                ('FIO', models.CharField(max_length=120, verbose_name='ФИО')),
                ('Phone', models.CharField(max_length=120, verbose_name='Номер телефона')),
                ('Email', models.CharField(max_length=120, verbose_name='Почта')),
                ('Order', models.TextField(verbose_name='Заказ')),
                ('Delivery', models.CharField(choices=[('Самовывоз', 'Самовывоз'), ('Доставка', 'Доставка')], max_length=50, verbose_name='Тип доставки')),
                ('Address', models.CharField(max_length=120, verbose_name='Адрес')),
                ('Comment', models.TextField(verbose_name='Комментарий')),
                ('Price', models.IntegerField(verbose_name='Итоговая цена')),
                ('Status', models.CharField(choices=[('Обрабатывается', 'Обрабатывается'), ('Доставляется', 'Доставляется'), ('Готово к выдаче', 'Готово к выдаче'), ('Выдано', 'Выдано')], max_length=50, verbose_name='Статус заказа')),
            ],
        ),
    ]
