from django.db import models

class CategoryFilter(models.Model):
	Nomenclature_list = [
		("Мембраны и корпуса", "Мембраны и корпуса"),
		("Набор-комплект(б/х)", "Набор-комплект(б/х)"),
		("Аксессуары и запчасти для клапанов управления", "Аксессуары и запчасти для клапанов управления"),
		("Аксессуары и запчасти к колбам, быт. системам", "Аксессуары и запчасти к колбам, быт. системам"),
		("Баки для воды", "Баки для воды"),
		("Баки реагентные и запчасти", "Баки реагентные и запчасти"),
		("Бытовые системы", "Бытовые системы"),
		("Водосчетчики", "Водосчетчики"),
		("Дозирующие насосы и аксессуары", "Дозирующие насосы и аксессуары"),
		("ДРС", "ДРС"),
		("Загрузки, реагенты, химия", "Загрузки, реагенты, химия"),
		("Картриджи", "Картриджи"),
		("Клапана управления", "Клапана управления"),
		("Колбы", "Колбы"),
		("Корпуса", "Корпуса"),
		("Напорная аэрация", "Напорная аэрация"),
		("Насосы", "Насосы"),
		("ПВХ", "ПВХ"),
		("Промышленные осмоса и Ультрафильтация", "Промышленные осмоса и Ультрафильтация"),
		("Прочее", "Прочее"),
		("Ротаметры", "Ротаметры"),
		("Станции дозирования", "Станции дозирования"),
		("Установки ионообменные", "Установки ионообменные"),
		("Установки фильтрации безреагентные", "Установки фильтрации безреагентные"),
		("Установки фильтрации реагентные", "Установки фильтрации реагентные"),
		("УФ Стерелизаторы и аксессуары", "УФ Стерелизаторы и аксессуары"),
		("Фильтры грубой очистки", "Фильтры грубой очистки"),
		("Электромагнитные клапана", "Электромагнитные клапана"),
		("Услуга округления", "Услуга округления")
	]
	Vendor_list = [
		(" ","Неизвестно"),
		("Aqua", "Aqua"),
		("Aquapro", "Aquapro"),
		("Autotrol", "Autotrol"),
		("AWT", "AWT"),
		("Canature", "Canature"),
		("Cepex", "Cepex"),
		("Cintropur", "Cintropur"),
		("Clack", "Clack"),
		("CNP", "CNP"),
		("CSM", "CSM"),
		("Ecosoft", "Ecosoft"),
		("ELITECH", "ELITECH"),
		("Euraqua", "Euraqua"),
		("Filmtec", "Filmtec"),
		("Fleck", "Fleck"),
		("Grundfos", "Grundfos"),
		("Mytho", "Mytho"),
		("NanoRo", "NanoRo"),
		("NatureWater", "NatureWater"),
		("NOCCHI", "NOCCHI"),
		("Noname", "Noname"),
		("Noyi", "Noyi"),
		("Pentair", "Pentair"),
		("Philips", "Philips"),
		("Pimtas", "Pimtas"),
		("Runxin", "Runxin"),
		("Seko", "Seko"),
		("STRUCTURAL", "STRUCTURAL"),
		("Vontron", "Vontron"),
		("Wave Cyber", "Wave Cyber"),
		("Zenner", "Zenner"),
		("Аргеллит", "Аргеллит"),
		("ЕВРОПА", "ЕВРОПА"),
		("ИНДИЯ", "ИНДИЯ"),
		("КИТАЙ", "КИТАЙ"),
		("КОРЕЯ", "КОРЕЯ"),
		("РОССИЯ", "РОССИЯ"),
		("США", "США"),
		("Тайвань", "Тайвань")
	]
	Status_list = [
		("В наличии", "В наличии"),
		("Отсутствует", "Отсутствует")
	]
	Pump_list = [
		("Есть", "Есть"),
		("Нет", "Нет"),
	]
	Tank_capacity_list = [
		("Отсутствует", "Отсутствует"),
		("До 12 литров", "До 12 литров"),
		("До 8 литров", "До 8 литров")		
	]
	Additional_options_list = [
		("Отсутствует", "Отсутствует"),
		("С минерализатором", "С минерализатором"),
		("С полифостфатом", "С полифостфатом")
	]
	PrType_list = [
		("Аксессуары и запчасти", "Аксессуары и запчасти"),
		("Прочее", "Прочее"),
		("Осмос", "Осмос"),
		("Система", "Система"),
		("Фильтр от накипи", "Фильтр от накипи"),
		("Контейнер под загрузку", "Контейнер под загрузку"),
		("Механической очистки", "Механической очистки"),
		("Обезжелезивания и деманганации", "Обезжелезивания и деманганации"),
		("Угольный гранулированный", "Угольный гранулированный"),
		("Угольный прессованый", "Угольный прессованый"),
		("Умягчения", "Умягчения"),
		("корпуса для осмосов", "корпуса для осмосов"),
		("обратноосмотические мембраны", "обратноосмотические мембраны"),
		("2-х и 3-х ходовые клапана", "2-х и 3-х ходовые клапана"),
		("Запчасти и комплектующие", "Запчасти и комплектующие"),
		("Инжектора", "Инжектора"),
		("Комплектующие (ПВХ и т. п.)", "Комплектующие (ПВХ и т. п.)"),
		("Комплектующие осмос", "Комплектующие осмос"),
		("Тарировочные шайбы", "Тарировочные шайбы"),
		("Емкость", "Емкость"),
		("Комплектующие", "Комплектующие"),
		("для дозации", "для дозации"),
		("Копмплектующие и запчасти", "Копмплектующие и запчасти"),
		("Марганцовочный", "Марганцовочный"),
		("Солевой", "Солевой"),
		("Импульсные", "Импульсные"),
		("Аналоговые", "Аналоговые"),
		("Цифровые", "Цифровые"),
		("Верхние дистрибьюторы и распред. системы", "Верхние дистрибьюторы и распред. системы"),
		("Нижние дистрибьюторы и распред. системы", "Нижние дистрибьюторы и распред. системы"),
		("Трубы", "Трубы"),
		("Миксы", "Миксы"),
		("Осветление/обезжелезивание", "Осветление/обезжелезивание"),
		("Смолы", "Смолы"),
		("Сорбция", "Сорбция"),
		("Химия и реагенты", "Химия и реагенты"),
		("Безреагентный - автоматический", "Безреагентный - автоматический"),
		("Безреагентный - ручной", "Безреагентный - ручной"),
		("Реагентный - автоматический", "Реагентный - автоматический"),
		("Реагентный - ручной", "Реагентный - ручной"),
		("Аксессуары", "Аксессуары"),
		("Корпуса (для гор. воды)", "Корпуса (для гор. воды)"),
		("Корпуса (для хол. воды)", "Корпуса (для хол. воды)"),
		("комплектующие", "комплектующие"),
		("Напорная аэрация", "Напорная аэрация"),
		("вертикальный", "вертикальный"),
		("горизонтальный", "горизонтальный"),
		("Запчасти", "Запчасти"),
		("Клапана", "Клапана"),
		("Клей и растворитель", "Клей и растворитель"),
		("Краны", "Краны"),
		("Муфты разборные", "Муфты разборные"),
		("Отводы", "Отводы"),
		("Сёдла", "Сёдла"),
		("Смотровые стекла", "Смотровые стекла"),
		("Тройники и крестовины", "Тройники и крестовины"),
		("Трубы", "Трубы"),
		("Фитинги", "Фитинги"),
		("Фланцы и адаптеры", "Фланцы и адаптеры"),
		("Блок хим. промывки", "Блок хим. промывки"),
		("Комплектующие и Запчасти", "Комплектующие и Запчасти"),
		("Обратные клапана, ниппеля, переходники, огран. потока и т.д.", "Обратные клапана, ниппеля, переходники, огран. потока и т.д."),
		("Осмос", "Осмос"),
		("Ультрафильтрация", "Ультрафильтрация"),
		("Аэрация", "Аэрация"),
		("Гидропневмобаки", "Гидропневмобаки"),
		("Диспенсеры и запчасти к ним", "Диспенсеры и запчасти к ним"),
		("Кабинеты умягчения, установки в сборе и запчасти", "Кабинеты умягчения, установки в сборе и запчасти"),
		("Комплектующие и Запчасти", "Комплектующие и Запчасти"),
		("Обратные клапана, ниппеля, переходники, огран. потока и т.д.", "Обратные клапана, ниппеля, переходники, огран. потока и т.д."),
		("Прочее", "Прочее"),
		("УФ лампы", "УФ лампы"),
		("УФ стерилизаторы", "УФ стерилизаторы"),
		("Экспресс-тесты и измерительные приборы", "Экспресс-тесты и измерительные приборы"),
		("In-line", "In-line"),
		("Панельные", "Панельные"),
		("Дозирование", "Дозирование"),
		("Коррекция", "Коррекция"),
		("Чехлы", "Чехлы"),
		("дисковые", "дисковые"),
		("Зап. части и аксессуары", "Зап. части и аксессуары"),
		("мешочные", "мешочные"),
		("мультипатронные", "мультипатронные"),
		("сетчатые", "сетчатые"),
		("НЗ", "НЗ"),
		("НО", "НО")
	]
	For_flasks_list = [
		("Ключи", "Ключи"),
		("Кронштейны", "Кронштейны"),
		("Прочее", "Прочее")
	]
	For_system_list = [
		("Бустерные насосы (помпы)", "Бустерные насосы (помпы)"),
		("Краны", "Краны"),
		("Мембранные баки", "Мембранные баки"),
		("Постфильтры и паки", "Постфильтры и паки"),
		("Прочее", "Прочее")
	]
	Application_list = [
		("Бытовое", "Бытовое"),
		("Промышленное", "Промышленное"),
		("На холодную воду", "На холодную воду"),
		("На горячую воду", "На горячую воду")
	]
	Performance_list = [
		("100 GPD", "100 GPD"),
		("50 GPD", "50 GPD"),
		("60 GPD", "60 GPD"),
		("75 GPD", "75 GPD"),
		("более 1м3/час", "более 1м3/час"),
		("до 1м3/час", "до 1м3/час"),
		("до 0,5 м3/ч", "до 0,5 м3/ч"),
		("от 0,5 до 2 м3/ч", "от 0,5 до 2 м3/ч"),
		("от 10 до 20  м3/ч", "от 10 до 20  м3/ч"),
		("от 2 до 10  м3/ч", "от 2 до 10  м3/ч"),
		("от 20 до 50  м3/ч", "от 20 до 50  м3/ч"),
		("от 2 до 4,5м3/час", " от 2 до 4,5м3/час"),
		("до 2м3/час", "до 2м3/час"),
		("от 2 до 4,5м3/час", " от 2 до 4,5м3/час"),
		("до 2м3/час", "до 2м3/час"),
		("от 10 до 18м3/час", "от 10 до 18м3/час"),
		("от 18 до 30м3/час", "от 18 до 30м3/час"),
		("от 30 до 60м3/час", "от 30 до 60м3/час"),
		("от 4,5 до 6м3/час", "от 4,5 до 6м3/час"),
		("от 6 до 8м3/час", "от 6 до 8м3/час"),
		("от 60 до 90м3/час", "от 60 до 90м3/час"),
		("от 8 до 10м3/час", "от 8 до 10м3/час"),
		("до 10 м3/ч", "до 10 м3/ч"),
		("свыше 20  м3/ч", "свыше 20  м3/ч"),
		("до 2,5 м3/ч", "до 2,5 м3/ч"),
		("от 10 до 15 м3/ч", "от 10 до 15 м3/ч"),
		("от 15 до 21 м3/ч", "от 15 до 21 м3/ч"),
		("от 150 до 250 м3/ч", "от 150 до 250 м3/ч"),
		("от 2,5 до 5 м3/ч", "от 2,5 до 5 м3/ч"),
		("от 21 до 28 м3/ч", "от 21 до 28 м3/ч"),
		("от 28 до 45 м3/ч", "от 28 до 45 м3/ч"),
		("от 45 до 80 м3/ч", "от 45 до 80 м3/ч"),
		("от 5 до 10 м3/ч", "от 5 до 10 м3/ч"),
		("от 80 до 140 м3/ч", "от 80 до 140 м3/ч")
	]
	Size_list = [
		("1812", "1812"),
		("2012", "2012"),
		("2521", "2521"),
		("2540", "2540"),
		("2812", "2812"),
		("3012", "3012"),
		("4021", "4021"),
		("4040", "4040"),
		("8040", "8040"),
		("BB 10", "BB 10"),
		("BB 20", "BB 20"),
		("SL 5", "SL 5"),
		("SL 10", "SL 10"),
		("SL 20", "SL 20"),
		("SL 30", "SL 30"),
		("SL 40", "SL 40")
	]
	Microtity_list = [
		("не измеряется", "не измеряется"),
		("0,5", "0,5"),
		("1", "1"),
		("5", "5"),
		("10", "10"),
		("20", "20"),
		("25", "25"),
		("50", "50"),
		("100", "100")
	]
	Fitting_list = [
		("JC (резьба)", "JC (резьба)"),
		("JG (быстросъемное)", "JG (быстросъемное)")
	]
	Cartridge_size_list = [
		("прочее", "прочее"),
		("BB 10", "BB 10"),
		("BB 20", "BB 20"),
		("SL 5", "SL 5"),
		("SL 10", "SL 10"),
		("SL 20", "SL 20"),
		("SL 30", "SL 30"),
		("SL 40", "SL 40")
	]
	Volume_list = [
		("1000 л", "1000 л"),
		("10000 л", "10000 л"),
		("120 л", "120 л"),
		("1250 л", "1250 л"),
		("15000 л", "15000 л"),
		("200 л", "200 л"),
		("2000 л", "2000 л"),
		("210 л", "210 л"),
		("250 л", "250 л"),
		("3000 л", "3000 л"),
		("330 л", "330 л"),
		("440 л", "440 л"),
		("500 л", "500 л"),
		("5000 л", "5000 л"),
		("550 л", "550 л"),
		("700 л", "700 л"),
		("780 л", "780 л"),
		("8000 л", "8000 л"),
		("100 л", "100 л"),
		("140 л", "140 л"),
		("145 л", "145 л"),
		("60 л", "65 л"),
		("70 л", "70 л"),
		("750 л", "750 л")
	]
	Form_list = [
		("горизонтальная", "горизонтальная"),
		("круглая", "круглая"),
		("прямоугольная", "прямоугольная")
	]
	Accession_list = [
		("DN125(фланец)", "DN125(фланец)"),
		("DN15", "DN15"),
		("DN150(фланец)", "DN150(фланец)"),
		("DN20", "DN20"),
		("DN25", "DN25"),
		("DN32", "DN32"),
		("DN40", "DN40"),
		("DN50", "DN50"),
		("DN65(фланец)", "DN65(фланец)"),
		("DN80(фланец)", "DN80(фланец)"),
		('1/2"', '1/2"'),
		('1 1/2"', '1 1/2"'),
		('1/4"','1/4"'),
		('1"', '1"'),
		('3/4"', '3/4"'),
		('2"', '2"'),
		("фланец", "фланец")
	]
	View_list = [
		("Бок. посадка", "Бок. посадка"),
		("Стандарт", "Стандарт")
	]
	For_enclosures_list = [
		("0817-3672", "0817-3672"),
		("4272-6386", "4272-6386"),
		("4272-6386", "4272-6386")
	]
	Interface_language_list = [
		("Английский", "Английский"),
		("Русский", "Русский")
	]
	Neck_list = [
		('2,5"-0', '2,5"-0'),
		('4"-0', '4"-0'),
		('4"-4inch', '4"-4inch'),
		('6"-6inch (фланцы)', '6"-6inch (фланцы)')
	]
	Compressor_list = [
		("AP2", "AP2"),
		("AS19", "AS19"),
		("CAP2(AP200)", "CAP2(AP200)"),
		("LP12", "LP12")
	]
	Balloon_size_list = [
		("Прочее", "Прочее"),
		("0817", "0817"),
		("0835", "0835"),
		("0844", "0844"),
		("1017", "1017"),
		("1035", "1035"),
		("1044", "1044"),
		("1054", "1054"),
		("1248", "1248"),
		("1252", "1252"),
		("1344", "1344"),
		("1354", "1354"),
		("1465", "1465"),
		("1665", "1665"),
		("1865", "1865"),
		("2162", "2162"),
		("2472", "2472"),
		("3072", "3072"),
		("3672", "3672"),
		("4272", "4272"),
		("4872", "4872"),
		("6367", "6367"),
		("6386", "6386")
	]
	Water_pillar_list = [
		("более 80 м", "более 80 м"),
		("до 50 м", "до 50 м"),
		("от 50 до 80 м", "от 50 до 80 м")
	]
	Voltage_list = [
		("220V", "220V"),
		("380V", "380V")
	]
	PerformanceQ_list = [
		("До 5 м3/ч", "До 5 м3/ч"),
		("от 15 м3/ч", "от 15 м3/ч"),
		("От 5 м3/ч до 15 м3/ч", "От 5 м3/ч до 15 м3/ч")
	]
	Color_list = [
		("Белый", "Белый"),
		("Красный", "Красный"),
		("Прозрачный", "Прозрачный"),
		("Синий", "Синий"),
		("Стальной", "Стальной")
	]
	Size_mm_list = [
		("20мм", "20мм"),
		("25мм", "25мм"),
		("32мм", "32мм"),
		("40мм", "40мм"),
		("50мм", "50мм"),
		("63мм", "63мм"),
		("75мм", "75мм"),
		("90мм", "90мм"),
		("100мм", "100мм"),
		("110мм", "110мм"),
		("125мм", "125мм"),
		("140мм", "140мм"),
		("150мм", "150мм"),
		("160мм", "160мм"),
		("200мм", "200мм")
	]
	Compound_list = [
		("Внутренняя резьба (ВР)", "Внутренняя резьба (ВР)"),
		("Герметичное", "Герметичное"),
		("Клеевое", "Клеевое"),
		("Клеевое-резьбовое", "Клеевое-резьбовое"),
		("Наружняя резьба (НР)", "Наружняя резьба (НР)"),
		("Резьбовое", "Резьбовое"),
		("Фланцевое", "Фланцевое")
	]
	Valve_brand_and_type_list = [
		("Runxin автоматический", "Runxin автоматический"),
		("Runxin ручной", "Runxin ручной"),
		("Clack 3 кнопки", "Clack 3 кнопки"),
		("Clack 5 кнопок", "Clack 5 кнопок"),
		("Clack 5 кнопок (RUS)", "Clack 5 кнопок (RUS)"),
		("Другие", "Другие")
	]
	Presence_of_a_water_meter_list = [
		("Есть", "Есть"),
		("Нет", "Нет")
	]
	Dispenser_list = [
		("Aqua - аналоговый", "Aqua - аналоговый"),
		("Aqua - цифровой", "Aqua - цифровой"),
		("Mytho-аналоговый", "Mytho-аналоговый"),
		("Mytho-цифровой", "Mytho-цифровой"),
		("Seko - аналоговый", "Seko - аналоговый"),
		("Seko - цифровой", "Seko - цифровой")
	]
	Tank_volume_list = [
		("60л", "60л"),
		("100л", "100л"),
		("200л", "200л")
	]
	Execution_list = [
		("нержавеющая сталь", "нержавеющая сталь"),
		("пластик", "пластик")
	]
	Connection_list = [
		('1 1/2"', '1 1/2"'),
		('1/2"', '1/2"'),
		('1 1/4"', '1 1/4"'),
		('1/4"', '1/4"'),
		('1"', '1"'),
		('2"', '2"'),
		('2" (фланец)', '2" (фланец)'),
		('3/4"', '3/4"'),
		('3"', '3"'),
		('3" (фланец)', '3" (фланец)'),
		('5/4"', '5/4"'),
		('фланец', 'фланец')
	]
	def __str__(self):
		return str("-")
	'''
	Name = models.CharField(max_length=120, verbose_name='Название')
	Image = models.ImageField(upload_to='householdfilters/', blank=False, verbose_name='Изображение')
	Category = models.CharField(max_length=50, choices=Category_list, verbose_name='Категория')
	Nomenclature = models.CharField(max_length=50, choices=CategoryFilter.Nomenclature_list, blank=True, verbose_name='Вид номенклатуры')
	Vendor = models.CharField(max_length=50, choices=CategoryFilter.Vendor_list, blank=True, verbose_name='Полизводитель')
	For_systems = models.CharField(max_length=50, choices=CategoryFilter.For_system_list, blank=True, verbose_name='Для систем')
	Pump = models.CharField(max_length=50, choices=CategoryFilter.Pump_list, blank=True, verbose_name='Наличие насоса')
	Tank_capacity = models.CharField(max_length=50, choices=CategoryFilter.Tank_capacity_list, blank=True, verbose_name='Емкость бака')
	Additional_options = models.CharField(max_length=50, choices=CategoryFilter.Additional_options_list, blank=True, verbose_name='Дополнительные опции')
	PrType = models.CharField(max_length=100, choices=CategoryFilter.PrType_list, blank=True, verbose_name='Тип')
	For_flasks = models.CharField(max_length=50, choices=CategoryFilter.For_flasks_list, blank=True, verbose_name='Для колб')
	Application = models.CharField(max_length=50, choices=CategoryFilter.Application_list, blank=True, verbose_name='Применение')
	Performance = models.CharField(max_length=50, choices=CategoryFilter.Performance_list, blank=True, verbose_name='Производительность')
	PerformanceQ = models.CharField(max_length=50, choices=CategoryFilter.PerformanceQ_list, blank=True, verbose_name='Производительность Q  м3 ч')
	Size = models.CharField(max_length=50, choices=CategoryFilter.Size_list, blank=True, verbose_name='Размер')
	Microtity = models.CharField(max_length=50, choices=CategoryFilter.Microtity_list, blank=True, verbose_name='Микронность')
	Fitting = models.CharField(max_length=50, choices=CategoryFilter.Fitting_list, blank=True, verbose_name='Фитинги')
	Cartridge_size = models.CharField(max_length=50, choices=CategoryFilter.Cartridge_size_list, blank=True, verbose_name='Размер картриджа')
	Volume = models.CharField(max_length=50, choices=CategoryFilter.Volume_list, blank=True, verbose_name='Объем')
	Form = models.CharField(max_length=50, choices=CategoryFilter.Form_list, blank=True, verbose_name='Форма')
	Accession = models.CharField(max_length=50, choices=CategoryFilter.Accession_list, blank=True, verbose_name='Присоединение')
	View = models.CharField(max_length=50, choices=CategoryFilter.View_list, blank=True, verbose_name='Вид')
	For_enclosures = models.CharField(max_length=50, choices=CategoryFilter.For_enclosures_list, blank=True, verbose_name='Для корпусов')
	Interface_language = models.CharField(max_length=50, choices=CategoryFilter.Interface_language_list, blank=True, verbose_name='Язык интерфейса')
	Neck = models.CharField(max_length=50, choices=CategoryFilter.Neck_list, blank=True, verbose_name='Горловина')
	Compressor = models.CharField(max_length=50, choices=CategoryFilter.Compressor_list, blank=True, verbose_name='Компрессор')
	Balloon_size = models.CharField(max_length=50, choices=CategoryFilter.Balloon_size_list, blank=True, verbose_name='Размер баллона')
	Water_pillar = models.CharField(max_length=50, choices=CategoryFilter.Water_pillar_list, blank=True, verbose_name='H м вод ст')
	Voltage = models.CharField(max_length=50, choices=CategoryFilter.Voltage_list, blank=True, verbose_name='Напряжение')

	Size_mm = models.CharField(max_length=50, choices=CategoryFilter.Size_mm_list, blank=True, verbose_name='Размер мм')
	Compound = models.CharField(max_length=50, choices=CategoryFilter.Compound_list, blank=True, verbose_name='Соединение')
	Valve_brand_and_type = models.CharField(max_length=50, choices=CategoryFilter.Valve_brand_and_type_list, blank=True, verbose_name='Марка и тип клапана')
	Presence_of_a_water_meter = models.CharField(max_length=50, choices=CategoryFilter.Presence_of_a_water_meter_list, blank=True, verbose_name='Наличие водосчетчика')
	Dispenser = models.CharField(max_length=50, choices=CategoryFilter.Dispenser_list, blank=True, verbose_name='Дозатор')
	Tank_volume = models.CharField(max_length=50, choices=CategoryFilter.Tank_volume_list, blank=True, verbose_name='Объем бака')
	Execution = models.CharField(max_length=50, choices=CategoryFilter.Execution_list, blank=True, verbose_name='Исполнение')
	Connection = models.CharField(max_length=50, choices=CategoryFilter.Connection_list, blank=True, verbose_name='Подключение')

	About = models.TextField(blank=True)
	Value = models.IntegerField()
	Price =  models.IntegerField()
	'''


















class Household_filters(models.Model):
	class Meta:
		verbose_name = 'Бытовые фильтры'
		verbose_name_plural = 'Бытовые фильтры'

	Category_list = [
		("191", "Колбы BB (Aquapro)"),
		("192", "Колбы SL (Aquapro)"),
		("193", "Баки (Aquapro)"),
		("140", "Бустерные насосы (Aquapro)"),
		("196", "Запчасти (Aquapro)"),
		("197", "Картриджи механической очистки (Aquapro)"),
		("198", "Картриджи угольные (Aquapro)"),
		("195", "Мембраны, постфильтры (Aquapro)"),
		("199", "Бытовые системы обратного осмоса (Aquapro)"),
		("271", "Canature"),
		("223", "Запчасти (NatureWater)"),
		("221", "Колбы BB (NatureWater)"),
		("222", "Колбы SL (NatureWater)"),
		("219", "Картриджи (NatureWater)"),
		("226", "Постфильтры (NatureWater)"),
		("225", "Бытовые системы водоочистки (NatureWater)"),
		("133", "Картриджи Аргумент, колбы Housing, Vontron"),
		("25", "Картриджи механической очистки (Аргумент)"),
		("26", "Картриджи угольные, умягчения, обезжелезивания (Аргумент)"),
		("27", "Колoбы Housing"),
		("28", "Мембраны Vontron и Canature")
	]

	Name = models.CharField(max_length=120, verbose_name='Название')
	Image = models.ImageField(upload_to='householdfilters/', blank=False, verbose_name='Изображение')
	Category = models.CharField(max_length=50, choices=Category_list, verbose_name='Категория')
	Vendor = models.CharField(max_length=50, choices=CategoryFilter.Vendor_list, verbose_name='Производитель')
	Nomenclature = models.CharField(max_length=50, choices=CategoryFilter.Nomenclature_list, blank=True, verbose_name='Вид номенклатуры')

	Size = models.CharField(max_length=50, choices=CategoryFilter.Size_list, blank=True, verbose_name='Размер')
	Accession = models.CharField(max_length=50, choices=CategoryFilter.Accession_list, blank=True, verbose_name='Присоединение')
	Color = models.CharField(max_length=50, choices=CategoryFilter.Color_list, blank=True, verbose_name='Цвет')
	For_systems = models.CharField(max_length=50, choices=CategoryFilter.For_system_list, blank=True, verbose_name='Для систем')
	Cartridge_size = models.CharField(max_length=50, choices=CategoryFilter.Cartridge_size_list, blank=True, verbose_name='Размер картриджа')
	Microtity = models.CharField(max_length=50, choices=CategoryFilter.Microtity_list, blank=True, verbose_name='Микронность')
	Application = models.CharField(max_length=50, choices=CategoryFilter.Application_list, blank=True, verbose_name='Применение')
	PrType = models.CharField(max_length=100, choices=CategoryFilter.PrType_list, blank=True, verbose_name='Тип')
	Additional_options = models.CharField(max_length=50, choices=CategoryFilter.Additional_options_list, blank=True, verbose_name='Дополнительные опции')
	Tank_capacity = models.CharField(max_length=50, choices=CategoryFilter.Tank_capacity_list, blank=True, verbose_name='Емкость бака')
	Pump = models.CharField(max_length=50, choices=CategoryFilter.Pump_list, blank=True, verbose_name='Наличие насоса')
	
	About = models.TextField(blank=True)
	Status = models.CharField(max_length=50, choices=CategoryFilter.Status_list, blank=False, verbose_name='Наличие товара')
	Price =  models.IntegerField(blank=False, verbose_name='Цена')
	#Продолжить начиная с Промышленные осмоса и Ультрафильтация
	def __str__(self):
		return str(self.Name)


class Optional_equipment(models.Model):
	class Meta:
		verbose_name = 'Дополнительное оборудование'
		verbose_name_plural = 'Дополнительное оборудование'

	Category_list = [
		("13", "Аксессуары"),
		("12", "Баки"),
		("66", "Гидробаки"),
		("77", "Диспенсеры"),
		("227", "Краны шаровые с электроприводом"),
		("19", "Клапана ПВХ"),
		("22", "Трубы ПВХ"),
		("20", "Фитинги"),
		("21", "Клей"),
		("79", "Реагенты"),
		("106", "Ротаметры in-line"),
		("105", "Ротаметры RF"),
		("107", "Ротаметры панельные"),
		("81", "Экспресс-тесты"),
		("83", "Danfos"),
		("85", "Серия SV")
	]

	Name = models.CharField(max_length=120, verbose_name='Название')
	Image = models.ImageField(upload_to='optionalequipment/', blank=False, verbose_name='Изображение')
	Category = models.CharField(max_length=50, choices=Category_list, verbose_name='Категория')
	Vendor = models.CharField(max_length=50, choices=CategoryFilter.Vendor_list, verbose_name='Производитель')
	Nomenclature = models.CharField(max_length=50, choices=CategoryFilter.Nomenclature_list, blank=True, verbose_name='Вид номенклатуры')
	
	PrType = models.CharField(max_length=100, choices=CategoryFilter.PrType_list, blank=True, verbose_name='Тип')
	Volume = models.CharField(max_length=50, choices=CategoryFilter.Volume_list, blank=True, verbose_name='Объем')
	Form = models.CharField(max_length=50, choices=CategoryFilter.Form_list, blank=True, verbose_name='Форма')
	Size_mm = models.CharField(max_length=50, choices=CategoryFilter.Size_mm_list, blank=True, verbose_name='Размер мм')
	Compound = models.CharField(max_length=50, choices=CategoryFilter.Compound_list, blank=True, verbose_name='Соединение')
	Accession = models.CharField(max_length=50, choices=CategoryFilter.Accession_list, blank=True, verbose_name='Присоединение')

	About = models.TextField(blank=True)
	Status = models.CharField(max_length=50, choices=CategoryFilter.Status_list, blank=False, verbose_name='Наличие товара')
	Price =  models.IntegerField(blank=False, verbose_name='Цена')	
	def __str__(self):
		return str(self.Name)


class Components(models.Model):
	class Meta:
		verbose_name = 'Комплектующие'
		verbose_name_plural = 'Комплектующие'

	Category_list = [
		("71", "Баки реагентные"),
		("56", "Аксессуары (CLACK)"),
		("55", "Блоки управления (CLACK)"),
		("23", "Аксессуары (Euraqua EQ, Сlack CE, RR (RUS))"),
		("267", "Блоки управления (Euraqua EQ, Сlack CE, RR (RUS))"),
		("57", "Аксессуары (FLECK)"),
		("58", "Блоки управления (FLECK)"),
		("59", "Аксессуары (RUNXIN)"),
		("60", "Блоки управления (RUNXIN)"),
		("108", "Дозирующее оборудование Aqua"),
		("212", "Дозирующее оборудование Mytho"),
		("110", "Дозирующее оборудование SEKO"),
		("112", "Ёмкости для растворов"),
		("38", "ДРС"),
		("46", "Aquapro (на гор. воду)"),
		("44", "Canature"),
		("43", "Noyi"),
		("49", "STRUCTURAL"),
		("45", "Термо чехлы")
	]

	Name = models.CharField(max_length=120, verbose_name='Название')
	Image = models.ImageField(upload_to='components/', blank=False, verbose_name='Изображение')
	Category = models.CharField(max_length=50, choices=Category_list, verbose_name='Категория')
	Vendor = models.CharField(max_length=50, choices=CategoryFilter.Vendor_list, verbose_name='Производитель')
	Nomenclature = models.CharField(max_length=50, choices=CategoryFilter.Nomenclature_list, blank=True, verbose_name='Вид номенклатуры')

	PrType = models.CharField(max_length=100, choices=CategoryFilter.PrType_list, blank=True, verbose_name='Тип')
	Performance = models.CharField(max_length=50, choices=CategoryFilter.Performance_list, blank=True, verbose_name='Производительность')
	Connection = models.CharField(max_length=50, choices=CategoryFilter.Connection_list, blank=True, verbose_name='Подключение')
	Interface_language = models.CharField(max_length=50, choices=CategoryFilter.Interface_language_list, blank=True, verbose_name='Язык интерфейса')
	Volume = models.CharField(max_length=50, choices=CategoryFilter.Volume_list, blank=True, verbose_name='Объем')
	Form = models.CharField(max_length=50, choices=CategoryFilter.Form_list, blank=True, verbose_name='Форма')
	View = models.CharField(max_length=50, choices=CategoryFilter.View_list, blank=True, verbose_name='Вид')
	For_enclosures = models.CharField(max_length=50, choices=CategoryFilter.For_enclosures_list, blank=True, verbose_name='Для корпусов')
	Neck = models.CharField(max_length=50, choices=CategoryFilter.Neck_list, blank=True, verbose_name='Горловина')

	About = models.TextField(blank=True)
	Status = models.CharField(max_length=50, choices=CategoryFilter.Status_list, blank=False, verbose_name='Наличие товара')
	Price =  models.IntegerField(blank=False, verbose_name='Цена')	
	def __str__(self):
		return str(self.Name)


class Kits(models.Model):
	class Meta:
		verbose_name = 'Комплекты'
		verbose_name_plural = 'Комплекты'

	Category_list = [
		("263", "Оголовок Runxin"),
		("262", "Стандартный оголовок"),
		("233", "Aqua"),
		("232", "Mytho"),
		("231", "Seko"),
		("160", "Clack 3 кн. (Установки ионообменные)"),
		("162", "Clack 5 кн. (Установки ионообменные)"),
		("157", "Euraqua EQ (RUS) (Установки ионообменные)"),
		("161", "Runxin (Установки ионообменные)"),
		("168", "Clack (Дуплекс, Твин, Триплекс)"),
		("166", "Euraqua EQ (RUS) (Дуплекс, Твин, Триплекс)"),
		("170", "Runxin (Дуплекс, Твин, Триплекс)"),
		("172", "Clack (Кабинеты)"),
		("211", "NatureWater (Кабинеты)"),
		("173", "Runxin (Кабинеты)"),
		("175", "Комплектующие (Кабинеты)"),
		("176", "Ручник (Кабинеты)"),
		("159", "Ручные клапаны"),
		("251", "Clack (Установки фильтрации OXIDIZER)"),
		("250", "Runxin (Установки фильтрации OXIDIZER)"),
		("249", "Ручные клапаны (Установки фильтрации OXIDIZER)"),
		("181", "Clack 3 кн. (Установки фильтрации без реагентные)"),
		("182", "Clack 5 кн. (Установки фильтрации без реагентные)"),
		("179", "Euraqua EQ (RUS) (Установки фильтрации без реагентные)"),
		("183", "Runxin (Установки фильтрации без реагентные)"),
		("178", "TWIN, TRIPLEX (Установки фильтрации без реагентные)"),
		("180", "Ручные клапаны (Установки фильтрации без реагентные)"),
		("187", "Clack 3 кн. (Установки фильтрации реагентные)"),
		("189", "Clack 5 кн. (Установки фильтрации реагентные)"),
		("186", "Euraqua EQ (RUS) (Установки фильтрации реагентные)"),
		("188", "Runxin (Установки фильтрации реагентные)"),
		("185", "TWIN, TRIPLEX (Установки фильтрации реагентные)"),
		("190", "Ручные клапаны (Установки фильтрации реагентные)")
	]
	Name = models.CharField(max_length=120, verbose_name='Название')
	Image = models.ImageField(upload_to='kits/', blank=False, verbose_name='Изображение')
	Category = models.CharField(max_length=50, choices=Category_list, verbose_name='Категория')
	Vendor = models.CharField(max_length=50, choices=CategoryFilter.Vendor_list, verbose_name='Производитель')
	Nomenclature = models.CharField(max_length=50, choices=CategoryFilter.Nomenclature_list, blank=True, verbose_name='Вид номенклатуры')

	PrType = models.CharField(max_length=100, choices=CategoryFilter.PrType_list, blank=True, verbose_name='Тип')
	Balloon_size = models.CharField(max_length=50, choices=CategoryFilter.Balloon_size_list, blank=True, verbose_name='Размер баллона')
	Compressor = models.CharField(max_length=50, choices=CategoryFilter.Compressor_list, blank=True, verbose_name='Компрессор')
	Dispenser = models.CharField(max_length=50, choices=CategoryFilter.Dispenser_list, blank=True, verbose_name='Дозатор')
	Tank_volume = models.CharField(max_length=50, choices=CategoryFilter.Tank_volume_list, blank=True, verbose_name='Объем емкости')
	Valve_brand_and_type = models.CharField(max_length=50, choices=CategoryFilter.Valve_brand_and_type_list, blank=True, verbose_name='Марка и тип клапана')
	Presence_of_a_water_meter = models.CharField(max_length=50, choices=CategoryFilter.Presence_of_a_water_meter_list, blank=True, verbose_name='Наличие водосчетчика')
	Performance = models.CharField(max_length=50, choices=CategoryFilter.Performance_list, blank=True, verbose_name='Производительность')

	About = models.TextField(blank=True)
	Status = models.CharField(max_length=50, choices=CategoryFilter.Status_list, blank=False, verbose_name='Наличие товара')
	Price =  models.IntegerField(blank=False, verbose_name='Цена')	
	def __str__(self):
		return str(self.Name)


class Osmosis_and_Ultrafiltration(models.Model):
	class Meta:
		verbose_name = 'Осмосы и Ультрафильтрация'
		verbose_name_plural = 'Осмосы и Ультрафильтрация'

	Category_list = [
		("217", "Коммерческие осмосы NatureWater"),
		("269", "NOYI"),
		("208", "Semtec"),
		("213", "Wave cyber"),
		("123", "Корпуса ROPV"),
		("124", "Корпуса из нерж"),
		("266", "Aquapro"),
		("125", "CSM"),
		("127", "Filmtec"),
		("129", "Vontron"),
		("120", "Промышленные и Ком. осмосы Aquapro"),
		("115", "Промышленные и Ком. осмосы AWT"),
		("260", "Серия RO"),
		("268", "Серия ROB"),
		("259", "Серия ROL"),
		("272", "Серия ROS"),
		("239", "Промышленные осмосы"),
		("235", "Модули")
	]
	Name = models.CharField(max_length=120, verbose_name='Название')
	Image = models.ImageField(upload_to='osmosisandultrafiltration/', blank=False, verbose_name='Изображение')
	Category = models.CharField(max_length=50, choices=Category_list, verbose_name='Категория')
	Vendor = models.CharField(max_length=50, choices=CategoryFilter.Vendor_list, verbose_name='Производитель')
	Nomenclature = models.CharField(max_length=50, choices=CategoryFilter.Nomenclature_list, blank=True, verbose_name='Вид номенклатуры')

	PrType = models.CharField(max_length=100, choices=CategoryFilter.PrType_list, blank=True, verbose_name='Тип')
	Size = models.CharField(max_length=50, choices=CategoryFilter.Size_list, blank=True, verbose_name='Размер')
	Application = models.CharField(max_length=50, choices=CategoryFilter.Application_list, blank=True, verbose_name='Применение')
	Performance = models.CharField(max_length=50, choices=CategoryFilter.Performance_list, blank=True, verbose_name='Производительность')

	About = models.TextField(blank=True)
	Status = models.CharField(max_length=50, choices=CategoryFilter.Status_list, blank=False, verbose_name='Наличие товара')
	Price =  models.IntegerField(blank=False, verbose_name='Цена')	
	def __str__(self):
		return str(self.Name)


class Ultraviolet_sterilizers(models.Model):
	class Meta:
		verbose_name = 'УФ стерилизаторы'
		verbose_name_plural = 'УФ стерилизаторы'

	Category_list = [
		("91", "УФ-лампы, сменные элементы"),
		("90", "УФ-стерилизаторы Aquapro"),
		("86", "УФ-стерилизаторы DUV"),
		("244", "УФ-лампы, сменные элементы"),
		("246", "УФ-стерилизаторы STERILIZER")
	]
	Name = models.CharField(max_length=120, verbose_name='Название')
	Image = models.ImageField(upload_to='ultravioletsterilizers/', blank=False, verbose_name='Изображение')
	Category = models.CharField(max_length=50, choices=Category_list, verbose_name='Категория')
	Vendor = models.CharField(max_length=50, choices=CategoryFilter.Vendor_list, verbose_name='Производитель')
	Nomenclature = models.CharField(max_length=50, choices=CategoryFilter.Nomenclature_list, blank=True, verbose_name='Вид номенклатуры')

	PrType = models.CharField(max_length=100, choices=CategoryFilter.PrType_list, blank=True, verbose_name='Тип')
	Performance = models.CharField(max_length=50, choices=CategoryFilter.Performance_list, blank=True, verbose_name='Производительность')
	Connection = models.CharField(max_length=50, choices=CategoryFilter.Connection_list, blank=True, verbose_name='Подключение')

	About = models.TextField(blank=True)
	Status = models.CharField(max_length=50, choices=CategoryFilter.Status_list, blank=False, verbose_name='Наличие товара')
	Price =  models.IntegerField(blank=False, verbose_name='Цена')	
	def __str__(self):
		return str(self.Name)


class Filter_materials(models.Model):
	class Meta:
		verbose_name = 'Фильтрующие материалы'
		verbose_name_plural = 'Фильтрующие материалы'

	Category_list = [
		("42", "Ионообменные"),
		("41", "Осветление и обезжелезивание")
	]
	Name = models.CharField(max_length=120, verbose_name='Название')
	Image = models.ImageField(upload_to='filtermaterials/', blank=False, verbose_name='Изображение')
	Category = models.CharField(max_length=50, choices=Category_list, verbose_name='Категория')
	Vendor = models.CharField(max_length=50, choices=CategoryFilter.Vendor_list, verbose_name='Производитель')
	Nomenclature = models.CharField(max_length=50, choices=CategoryFilter.Nomenclature_list, blank=True, verbose_name='Вид номенклатуры')

	PrType = models.CharField(max_length=100, choices=CategoryFilter.PrType_list, blank=True, verbose_name='Тип')	

	About = models.TextField(blank=True)
	Status = models.CharField(max_length=50, choices=CategoryFilter.Status_list, blank=False, verbose_name='Наличие товара')
	Price =  models.IntegerField(blank=False, verbose_name='Цена')	
	def __str__(self):
		return str(self.Name)


class Coarse_filters(models.Model):
	class Meta:
		verbose_name = 'Фильтры грубой очистки'
		verbose_name_plural = 'Фильтры грубой очистки'

	Category_list = [
		("102", "CEPEX"),
		("214", "NOVHIDRO/ROFISA"),
		("247", "Runxin"),
		("257", "YD"),
		("270", "Aquapro"),
		("242", "BFH"),
		("103", "Cintropur"),
		("215", "NatureWater"),
		("65", "Мультипатронные фильтры AK CF"),
		("80", "Мультипатронные фильтры Aquapro")
	]
	Name = models.CharField(max_length=120, verbose_name='Название')
	Image = models.ImageField(upload_to='coarsefilters/', blank=False, verbose_name='Изображение')
	Category = models.CharField(max_length=50, choices=Category_list, verbose_name='Категория')
	Vendor = models.CharField(max_length=50, choices=CategoryFilter.Vendor_list, verbose_name='Производитель')
	Nomenclature = models.CharField(max_length=50, choices=CategoryFilter.Nomenclature_list, blank=True, verbose_name='Вид номенклатуры')

	PrType = models.CharField(max_length=100, choices=CategoryFilter.PrType_list, blank=True, verbose_name='Тип')	
	Performance = models.CharField(max_length=50, choices=CategoryFilter.Performance_list, blank=True, verbose_name='Производительность')
	Execution = models.CharField(max_length=50, choices=CategoryFilter.Execution_list, blank=True, verbose_name='Исполнение')
	Accession = models.CharField(max_length=50, choices=CategoryFilter.Accession_list, blank=True, verbose_name='Присоединение')

	About = models.TextField(blank=True)
	Status = models.CharField(max_length=50, choices=CategoryFilter.Status_list, blank=False, verbose_name='Наличие товара')
	Price =  models.IntegerField(blank=False, verbose_name='Цена')	
	def __str__(self):
		return str(self.Name)	


class Basket(models.Model):
	class Meta:
		verbose_name = 'Корзина пользователя (системное)'
		verbose_name_plural = 'Корзина пользователя (системное)'

	session_key = models.CharField(max_length=120)
	pr_category_id = models.CharField(max_length=120)
	pr_id = models.CharField(max_length=120)
	pr_value = models.IntegerField()

	def __str__(self):
		return str(self.id)


class Order(models.Model):
	class Meta:
		verbose_name = 'Заказы'
		verbose_name_plural = 'Заказы'

	Status_list = [
		("Обрабатывается", "Обрабатывается"),
		("Доставляется", "Доставляется"),
		("Готово к выдаче", "Готово к выдаче"),
		("Выдано", "Выдано")
	]
	Delivery_list = [
		("Самовывоз", "Самовывоз"),
		("Доставка", "Доставка")
	]
	Code = models.CharField(max_length=120, verbose_name='Номер заказа')
	FIO = models.CharField(max_length=120, verbose_name='ФИО')
	Phone = models.CharField(max_length=120, verbose_name='Номер телефона')
	Email = models.CharField(max_length=120, verbose_name='Почта')
	Order = models.TextField(verbose_name='Заказ')
	Delivery =  models.CharField(max_length=50, choices=Delivery_list, verbose_name='Тип доставки')
	Address = models.CharField(max_length=120, verbose_name='Адрес')
	Comment = models.TextField(verbose_name='Комментарий')
	Price = models.IntegerField(verbose_name='Итоговая цена')
	Status = models.CharField(max_length=50, choices=Status_list, verbose_name='Статус заказа')
	

	def __str__(self):
		return str(self.Code)+" | "+str(self.Status)


class News(models.Model):
	class Meta:
		verbose_name = 'Новости'
		verbose_name_plural = 'Новости'

	Title = models.CharField(max_length=120, verbose_name='Заголовок')
	Image = models.ImageField(upload_to='news/', verbose_name='Изображение')
	Text = models.TextField(verbose_name='Содержание')
	Date = models.DateField(verbose_name='Дата')

	def __str__(self):
		return str(self.id)+" | "+str(self.Title)