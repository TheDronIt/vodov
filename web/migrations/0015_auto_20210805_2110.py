# Generated by Django 3.1.6 on 2021-08-05 11:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('web', '0014_auto_20210803_1913'),
    ]

    operations = [
        migrations.CreateModel(
            name='News',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('Title', models.CharField(max_length=120, verbose_name='Заголовок')),
                ('Image', models.ImageField(upload_to='news/', verbose_name='Изображение')),
                ('Text', models.TextField(verbose_name='Содержание')),
                ('Date', models.DateTimeField(auto_now=True, verbose_name='Дата')),
            ],
        ),
    ]
