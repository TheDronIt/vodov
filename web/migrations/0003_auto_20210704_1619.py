# Generated by Django 3.1.6 on 2021-07-04 06:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('web', '0002_auto_20210704_1603'),
    ]

    operations = [
        migrations.AddField(
            model_name='household_filters',
            name='Interface_language',
            field=models.CharField(blank=True, choices=[('Английский', 'Английский'), ('Русский', 'Русский')], max_length=50, verbose_name='Язык интерфейса'),
        ),
        migrations.AlterField(
            model_name='household_filters',
            name='Accession',
            field=models.CharField(blank=True, choices=[('DN125(фланец)', 'DN125(фланец)'), ('DN15', 'DN15'), ('DN150(фланец)', 'DN150(фланец)'), ('DN20', 'DN20'), ('DN25', 'DN25'), ('DN32', 'DN32'), ('DN40', 'DN40'), ('DN50', 'DN50'), ('DN65(фланец)', 'DN65(фланец)'), ('DN80(фланец)', 'DN80(фланец)'), ('1/2"', '1/2"'), ('1/4"', '1/4"'), ('1"', '1"'), ('3/4"', '3/4"')], max_length=50, verbose_name='Присоединение'),
        ),
        migrations.AlterField(
            model_name='household_filters',
            name='Application',
            field=models.CharField(blank=True, choices=[('Бытовое', 'Бытовое'), ('Промышленное', 'Промышленное'), ('На холодную воду', 'На холодную воду'), ('На горячую воду', 'На горячую воду')], max_length=50, verbose_name='Применение'),
        ),
        migrations.AlterField(
            model_name='household_filters',
            name='Cartridge_size',
            field=models.CharField(blank=True, choices=[('прочее', 'прочее'), ('BB 10', 'BB 10'), ('BB 20', 'BB 20'), ('SL 10', 'SL 10'), ('SL 20', 'SL 20'), ('SL 30', 'SL 30'), ('SL 40', 'SL 40')], max_length=50, verbose_name='Размер картриджа'),
        ),
        migrations.AlterField(
            model_name='household_filters',
            name='Microtity',
            field=models.CharField(blank=True, choices=[('не измеряется', 'не измеряется'), ('0,5', '0,5'), ('1', '1'), ('5', '5'), ('10', '10'), ('20', '20'), ('25', '25'), ('50', '50'), ('100', '100')], max_length=50, verbose_name='Микротность'),
        ),
        migrations.AlterField(
            model_name='household_filters',
            name='PrType',
            field=models.CharField(blank=True, choices=[('Аксессуары и запчасти', 'Аксессуары и запчасти'), ('Прочее', 'Прочее'), ('Осмос', 'Осмос'), ('Система', 'Система'), ('Фильтр от накипи', 'Фильтр от накипи'), ('Контейнер под загрузку', 'Контейнер под загрузку'), ('Механической очистки', 'Механической очистки'), ('Обезжелезивания и деманганации', 'Обезжелезивания и деманганации'), ('Угольный гранулированный', 'Угольный гранулированный'), ('Угольный прессованый', 'Угольный прессованый'), ('Умягчения', 'Умягчения'), ('корпуса для осмосов', 'корпуса для осмосов'), ('обратноосмотические мембраны', 'обратноосмотические мембраны'), ('2-х и 3-х ходовые клапана', '2-х и 3-х ходовые клапана'), ('Запчасти и комплектующие', 'Запчасти и комплектующие'), ('Инжектора', 'Инжектора'), ('Комплектующие (ПВХ и т. п.)', 'Комплектующие (ПВХ и т. п.)'), ('Комплектующие осмос', 'Комплектующие осмос'), ('Тарировочные шайбы', 'Тарировочные шайбы'), ('Емкость', 'Емкость'), ('Комплектующие', 'Комплектующие'), ('для дозации', 'для дозации'), ('Копмплектующие и запчасти', 'Копмплектующие и запчасти'), ('Марганцовочный', 'Марганцовочный'), ('Солевой', 'Солевой'), ('Импульсные', 'Импульсные'), ('Аналоговые', 'Аналоговые'), ('Цифровые', 'Цифровые'), ('Верхние дистрибьюторы и распред. системы', 'Верхние дистрибьюторы и распред. системы'), ('Нижние дистрибьюторы и распред. системы', 'Нижние дистрибьюторы и распред. системы'), ('Трубы', 'Трубы'), ('Миксы', 'Миксы'), ('Осветление/обезжелезивание', 'Осветление/обезжелезивание'), ('Смолы', 'Смолы'), ('Сорбция', 'Сорбция'), ('Химия и реагенты', 'Химия и реагенты'), ('Безреагентный - автоматический', 'Безреагентный - автоматический'), ('Безреагентный - ручной', 'Безреагентный - ручной'), ('Реагентный - автоматический', 'Реагентный - автоматический'), ('Реагентный - ручной', 'Реагентный - ручной')], max_length=50, verbose_name='Тип'),
        ),
    ]
