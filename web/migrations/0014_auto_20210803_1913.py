# Generated by Django 3.1.6 on 2021-08-03 09:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('web', '0013_auto_20210803_1911'),
    ]

    operations = [
        migrations.RenameField(
            model_name='order',
            old_name='Сode',
            new_name='Code',
        ),
    ]
