# Generated by Django 3.1.6 on 2021-08-01 13:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('web', '0009_auto_20210801_2325'),
    ]

    operations = [
        migrations.RenameField(
            model_name='basket',
            old_name='pr_category_id',
            new_name='pr_category',
        )
    ]
