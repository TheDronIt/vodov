from django.shortcuts import render, redirect
from django.http import HttpResponseRedirect
from django.core.mail import send_mail
from .models import *
import random


def index(request):
	slider = Slider.objects.all()

	data = {
		'slider': slider 
	}
	return render(request, 'page/index.html', data) 

def catalog(request):

	category = [191, 192, 193]
	DB_product_category = Household_filters
	category_id = 1
	#print(category)
	if request.method == "GET":
		if 'category' in request.GET:
			category = str(request.GET['category'])	
			#Бытовые фильтры
			if category == "6":
				category = [191, 192, 193, 140, 196, 197, 198, 195, 199, 271, 223, 221, 222, 219, 226, 225, 133, 25, 26, 27, 28]
			elif category == "135":
				category = [191, 192, 193, 140, 196, 197, 198, 195, 199]
			elif category == "141":
				category = [191, 192]
			elif category == "142":
				category = [193, 140, 196, 197, 198, 195, 199]
			elif category == "194":
				category = [197, 198]
			elif category == "143":
				category = [199]
			elif category == "132":
				category = [223, 221, 222, 219, 226, 225]
			elif category == "220":
				category = [221, 222]
			elif category == "218":
				category = [219, 226]
			elif category == "224":
				category = [225]
			elif category == "133":
				category = [25, 26, 27, 28]
			#Дополнительное оборудование 
			elif category == "5":
				category = [13,12,66,77,227,19,22,20,21,79,106,105,107,81,83,85]
			elif category == "62":
				category = [13,12]
			elif category == "63":
				category = [19,22,20,21]
			elif category == "75":
				category = [106,105,107]
			elif category == "70":
				category = [83,85]
			#Комплектующие
			elif category == "3":
				category = [71,56,55,23,267,57,58,59,60,108,212,110,112,38,46,44,43,49,45]
			elif category == "40":
				category = [56,55,23,267,57,58,59,60]
			elif category == "52":
				category = [56,55]
			elif category == "50":
				category = [23,267]
			elif category == "53":
				category = [57,58]
			elif category == "54":
				category = [59,60]
			elif category == "76":
				category = [108,212,110,112]
			elif category == "39":
				category = [46,44,43,49,45]
			#Комплекты
			elif category == "7":
				category = [263,262,233,232,231,160,162,157,161,168,166,170,172,211,173,175,176,159,251,250,249,181,182,179,183,178,180,187,189,186,188,185,190]
			elif category == "155":
				category = [263,262]
			elif category == "228":
				category = [263,262]
			elif category == "156":
				category = [233,232,231]
			elif category == "152":
				category = [160,162,157,161,168,166,170,172,211,173,175,176,159]
			elif category == "163":
				category = [168,166,170]
			elif category == "164":
				category = [172,211,173,175,176]
			elif category == "248":
				category = [251,250,249]
			elif category == "153":
				category = [181,182,179,183,178,180]
			elif category == "154":
				category = [187,189,186,188,185,190]
			#Осмосы и Ультрафильтрация
			elif category == "240":
				category = [217,269,208,213,123,124,266,125,127,129,120,115,260,268,259,272,239,235]
			elif category == "78":
				category = [217,269,208,213,123,124,266,125,127,129,120,260,268,259,272,239]
			elif category == "121":
				category = [269,208,213,123,124,266,125,127,129]
			elif category == "207":
				category = [269,208,213,123,124]
			elif category == "206":
				category = [266,125,127,129]
			elif category == "115":
				category = [260,268,259,272,239]
			elif category == "238":
				category = [260,268,259,272]
			elif category == "64":
				category = [235]
			#УФ стерилизаторы
			elif category == "72":
				category = [91,90,86,244,246]
			elif category == "89":
				category = [91,90]
			elif category == "88":
				category = [244,246]
			#Фильтрующие материалы
			elif category == "4":
				category = [42,41]
			#Фильтры грубой очистки
			elif category == "74":
				category = [102,214,247,257,270,242,103,215,65,80]
			elif category == "241":
				category = [102,214,247,257]
			elif category == "4":
				category = [270,242,103,215]
			elif category == "67":
				category = [65,80]
			else:
				category = [int(category)]

			#Select category DB name by id of category
			if int(request.GET['category']) in [6,135,141,191,192,142,193,140,196,194,197,198,195,143,199,271,132,223,220,221,222,218,219,226,224,225,133,25,26,27,28]:
				DB_product_category = Household_filters
				category_id = 1
			elif int(request.GET['category']) in [5,62,13,12,66,77,227,63,18,19,22,20,21,79,75,106,105,107,81,70,83,85]:
				DB_product_category = Optional_equipment
				category_id = 2
			elif int(request.GET['category']) in [3,71,40,52,56,55,50,23,267,53,57,58,54,59,60,76,108,212,110,112,38,39,46,44,43,49,45]:
				DB_product_category = Components
				category_id = 3
			elif int(request.GET['category']) in [7,155,228,263,262,156,233,232,231,152,160,162,157,161,163,168,166,170,164,172,211,173,175,176,159,248,251,250,249,153,181,182,179,183,178,180,154,187,189,186,188,185,190]:
				DB_product_category = Kits
				category_id = 4
			elif int(request.GET['category']) in [240,78,217,121,207,269,208,213,123,124,206,266,125,127,129,120,115,238,260,268,259,272,239,64,235]:
				DB_product_category = Osmosis_and_Ultrafiltration
				category_id = 5
			elif int(request.GET['category']) in [72,89,91,90,86,88,244,246]:
				DB_product_category = Ultraviolet_sterilizers
				category_id = 6
			elif int(request.GET['category']) in [4,42,41]:
				DB_product_category = Filter_materials
				category_id = 7
			elif int(request.GET['category']) in [74,241,102,214,247,257,4,270,242,103,215,67,65,80]:
				DB_product_category = Coarse_filters
				category_id = 8



	Product = DB_product_category.objects.filter(Category__in = category).order_by("Status")
	data = {
		'category_id':category_id,
		'Product': Product,
		'DB_product_category': DB_product_category,
	}
	#print(Product)
	return render(request, 'page/catalog.html', data)

def product(request,category_id,id):
	if category_id == 1:
		DB_product_category = Household_filters
	elif category_id == 2:
		DB_product_category = Optional_equipment
	elif category_id == 3:
		DB_product_category = Components
	elif category_id == 4:
		DB_product_category = Kits
	elif category_id == 5:
		DB_product_category = Osmosis_and_Ultrafiltration
	elif category_id == 6:
		DB_product_category = Ultraviolet_sterilizers
	elif category_id == 7:
		DB_product_category = Filter_materials
	elif category_id == 8:
		DB_product_category = Coarse_filters
	else:
		return HttpResponseRedirect("/catalog")

	Product = DB_product_category.objects.get(id=id) 

	session_key = request.session.session_key
	if not session_key:
		request.session.cycle_key()

		
	basket_info = Basket.objects.filter(session_key=session_key).filter(pr_category_id=category_id).filter(pr_id=id)

	button = "В корзину"
	if basket_info:
			element_exist = Basket.objects.filter(session_key=session_key).filter(pr_category_id=category_id).get(pr_id=id)
			if element_exist.pr_value:
				button = "В корзине"

	if request.method == "POST":
		if Product.Status == "В наличии":
			if basket_info:
				return HttpResponseRedirect("/basket")
			else:
				db = Basket(session_key = session_key, pr_category_id = category_id, pr_id = id, pr_value = 1)
				db.save()
				return HttpResponseRedirect("/product/"+str(category_id)+"/"+str(id))
		else:
			return HttpResponseRedirect("/catalog/category="+Product.Category)




	data = {
		'Product':Product,
		'category_id':category_id,
		'id':id,
		'button':button
	}
	return render(request, 'page/product.html',data) 


def redirect_to_catalog(request, category_id):
	return HttpResponseRedirect("/catalog")

def basket(request):
	session_key = request.session.session_key
	if not session_key:
		request.session.cycle_key()
	#basket_info = Basket.objects.filter(session_key=session_key).filter(pr_category_id=category_id).filter(pr_id=id)

	finish_order = 0

	basket_available = Basket.objects.filter(session_key=session_key).order_by('id')

	basket_product = []

	if basket_available:
		for product in basket_available:

			if product.pr_category_id == "1":
				DB_product_category = Household_filters
			elif product.pr_category_id == "2":
				DB_product_category = Optional_equipment
			elif product.pr_category_id == "3":
				DB_product_category = Components
			elif product.pr_category_id == "4":
				DB_product_category = Kits
			elif product.pr_category_id == "5":
				DB_product_category = Osmosis_and_Ultrafiltration
			elif product.pr_category_id == "6":
				DB_product_category = Ultraviolet_sterilizers
			elif product.pr_category_id == "7":
				DB_product_category = Filter_materials
			elif product.pr_category_id == "8":
				DB_product_category = Coarse_filters

			about_basket_product = DB_product_category.objects.get(id=product.pr_id)
			
			basket_product.append(
				dict(
					name=about_basket_product.Name,
					link="/product/"+product.pr_category_id+"/"+product.pr_id,
					image=about_basket_product.Image.url,
					pr_id=product.pr_id,
					pr_category_id=product.pr_category_id,
					pr_value=product.pr_value,
					price=about_basket_product.Price,
					full_product_price=about_basket_product.Price * product.pr_value,
				))


	basket_price = 0	
	for product in basket_product:
		basket_price = basket_price + (product['price'] * product['pr_value'])



	if request.method == "POST":
		button = request.POST['button']
		if button != "Оформить":
			product_id = request.POST['pr_id']
			product_category_id = request.POST['pr_category_id']

			get_value_order = Basket.objects.filter(session_key=session_key).filter(pr_category_id=product_category_id).get(pr_id=product_id)
			if button == "+":
				Basket.objects.filter(session_key=session_key).filter(pr_category_id=product_category_id).filter(pr_id=product_id).update(pr_value = int(get_value_order.pr_value)+1)
			elif button == "-":
				Basket.objects.filter(session_key=session_key).filter(pr_category_id=product_category_id).filter(pr_id=product_id).update(pr_value = int(get_value_order.pr_value)-1)
				get_value_order = Basket.objects.filter(session_key=session_key).filter(pr_category_id=product_category_id).get(pr_id=product_id)
				if get_value_order.pr_value < 1:
					Basket.objects.filter(session_key=session_key).filter(pr_category_id=product_category_id).filter(pr_id=product_id).delete()
			elif button == "✖":
				Basket.objects.filter(session_key=session_key).filter(pr_category_id=product_category_id).filter(pr_id=product_id).delete()
		
			return HttpResponseRedirect("/basket")
		else:
			ERROR = 0
			FIO = request.POST['FIO']
			Phone = request.POST['Phone']
			Email = request.POST['Email']
			Comment = request.POST['Comment']
			order_number = ""
			

			Address = ""
			Delivery = ""
			if request.POST['Delivery_type'] == "1":
				Delivery = "Самовывоз"
			elif request.POST['Delivery_type'] == "2":
				Delivery = "Доставка"

			if request.POST['Delivery_type'] == "2":
				Street = "-"
				House = "-"
				Door = "-"
				if request.POST['Street']:
					Street = request.POST['Street']
				if request.POST['House']:
					House = request.POST['House']
				if request.POST['Door']:
					Door = request.POST['Door']
				Address = Street +" "+House+", "+Door
				

			Order_name = []
			Order_value = []
			Order_price = []
			Order_full_price = []
			Order_type = []
			Order_id = []
			for basket_product in basket_product:
				Order_name.append(basket_product['name'])
				Order_value.append(basket_product['pr_value'])
				Order_price.append(basket_product['price'])
				Order_full_price.append(basket_product['full_product_price'])
				Order_type.append(basket_product['pr_category_id'])
				Order_id.append(basket_product['pr_id'])

		
			db_Order = ""
			for i in range(0, len(basket_available)):
				OP_name = ''.join(Order_name[i])
				OP_value = ''.join(str(Order_value[i]))
				OP_price = ''.join(str(Order_price[i]))
				OP_full_price = ''.join(str(Order_full_price[i]))
				db_Order = str(db_Order) + str(i+1) + ") " +OP_name + " | Кол-во: "  + OP_value + " | за 1: " +  OP_price  + "р. | Сумма: " + OP_full_price + "р \n"
			Price = basket_price

			Order_info = Order.objects.filter(FIO=FIO).filter(Phone=Phone).filter(Email=Email).filter(Status="Обрабатывается").filter(Order=db_Order)
			
			
			if not db_Order:
				return HttpResponseRedirect("/")

			if not Order_info:
	
				def customer_code():
					if request.POST['Delivery_type'] == "1":
						Delivery_code_word = "P"
					elif request.POST['Delivery_type'] == "2":
						Delivery_code_word = "D"
					elif request.POST['Delivery_type'] == "2":
						Delivery_code_word = "ERROR"
					code = [Delivery_code_word]
					for i in range(10): 
						code.append(str(random.randint(0,9)))
					order_number = "".join(code)
					return order_number
					
				unique_code = 0
				while unique_code != 1:
					order_number = customer_code()
					print(order_number)
					if not Order.objects.filter(Code=order_number):
						unique_code = 1


				db = Order(Code=order_number, FIO=FIO, Phone=Phone, Email=Email, Address=Address, Comment=Comment, Order=db_Order, Delivery=Delivery, Price=Price, Status="Обрабатывается")
				Basket.objects.filter(session_key=session_key).delete()
				db.save()

				mail = send_mail(
				    'Vodov | Информация по заказу',
				    'Код вашего заказа: '+str(order_number)+'\nВы можете узнать состояние вашего заказа, вписав этот код на сайте в пунке "Заказ".\n\nСпособ доставки: '+Delivery,
				    'supvportk@gmail.com',
				    [str(Email)],
				    fail_silently=False,
				)
			if order_number == "":
				return HttpResponseRedirect("/")
			data = {
				'order_number': order_number,
				'order_delivery_type' :Delivery,
				'order_delivery_address': Address,
				'order_phone': Phone,
				'order_email': Email,
				'order_FIO': FIO,
				'ERROR': ERROR
			}
			
			return render(request, 'include/order.html', data)

	data = {
		'basket_product': basket_product,
		'basket_price': basket_price,
		'finish_order': finish_order
	}

	return render(request, 'page/basket.html',data)


def solutions(request):
	solutions = Solutions.objects.all().order_by("-id")
	return render(request, 'page/solutions.html', locals())



def aboutorder(request):
	code_found = 0
	message = ""
	code_number = ""
	code_status = ""
	if request.method == "POST":
		button = request.POST['button']
		if button == "Получить информацию":
			code = request.POST['code']
			is_order_code = Order.objects.filter(Code=code)
			if is_order_code:
				order_code = Order.objects.get(Code=code)
				code_found = 1
				code_number = code
				code_status = order_code.Status
			else:
				message = "Заказ не найден"
	data = {
		'message': message,
		'code_found': code_found,
		'code_number': code_number,
		'code_status': code_status
	}
	return render(request, 'page/aboutorder.html',data)

def contacts(request):
	return render(request, 'page/contacts.html')

def search(request):
	search = []
	ERROR = ""
	if request.method == "GET":
		if not 'q' in request.GET:
			return HttpResponseRedirect("/search?q=")
		q = request.GET['q']
		if q == "":
			ERROR = "Не указана строка запроса."
		else:
			product = Household_filters.objects.filter(Name__icontains=q)
			for i in product:
				search.append(dict(
					name = str(i.Name),
					price = str(i.Price),
					image = str(i.Image.url),
					vendor = str(i.Vendor),
					link = "/product/1/"+str(i.id)
				))

			product = Optional_equipment.objects.filter(Name__icontains=q)
			for i in product:
				search.append(dict(
					name = str(i.Name),
					price = str(i.Price),
					image = str(i.Image.url),
					vendor = str(i.Vendor),
					link = "/product/2/"+str(i.id)
				))

			product = Components.objects.filter(Name__icontains=q)
			for i in product:
				search.append(dict(
					name = str(i.Name),
					price = str(i.Price),
					image = str(i.Image.url),
					vendor = str(i.Vendor),
					link = "/product/3/"+str(i.id)
				))

			product = Kits.objects.filter(Name__icontains=q)
			for i in product:
				search.append(dict(
					name = str(i.Name),
					price = str(i.Price),
					image = str(i.Image.url),
					vendor = str(i.Vendor),
					link = "/product/4/"+str(i.id)
				))

			product = Osmosis_and_Ultrafiltration.objects.filter(Name__icontains=q)
			for i in product:
				search.append(dict(
					name = str(i.Name),
					price = str(i.Price),
					image = str(i.Image.url),
					vendor = str(i.Vendor),
					link = "/product/5/"+str(i.id)
				))

			product = Ultraviolet_sterilizers.objects.filter(Name__icontains=q)
			for i in product:
				search.append(dict(
					name = str(i.Name),
					price = str(i.Price),
					image = str(i.Image.url),
					vendor = str(i.Vendor),
					link = "/product/6/"+str(i.id)
				))

			product = Filter_materials.objects.filter(Name__icontains=q)
			for i in product:
				search.append(dict(
					name = str(i.Name),
					price = str(i.Price),
					image = str(i.Image.url),
					vendor = str(i.Vendor),
					link = "/product/7/"+str(i.id)
				))

			product = Coarse_filters.objects.filter(Name__icontains=q)
			for i in product:
				search.append(dict(
					name = str(i.Name),
					price = str(i.Price),
					image = str(i.Image.url),
					vendor = str(i.Vendor),
					link = "/product/8/"+str(i.id)
				))
			
			if len(search) == 0:
				ERROR = "По вашему запросу ничего не найдено."


			page = 1

			if 'page' in request.GET:
				page = int(request.GET['page'])


			search_el = len(search)
			page_el = 12	

			page_value = int(search_el / page_el)

			if search_el % page_el != 0:
				page_value = page_value + 1

			page_before = page - 2
			if page_before < 1:
				page_before = 1

			page_after = page + 2
			if page_after > page_value:
				page_after = page_value

			page_range = []
			for i in range(page_before, page_after+1):
				page_range.append(i)
	
			from_first = 0
			to_last = 0
			if page_before != 1:
				from_first = 1
			if page_after != page_value:
				to_last = page_value
			
			show_pagination = 1
			if len(page_range) == 1:
				show_pagination = 0

			search_all = []
			search_all = search
			show_search_el_to = page * page_el
			show_search_el_from = show_search_el_to - page_el + 1
			search = []
			
			if show_search_el_to > len(search_all):
				show_search_el_to = len(search_all)

			for i in range(show_search_el_from-1, show_search_el_to):	
				if 'title' in search_all[i]:
					search.append(dict(
						title = str(search_all[i]['title']),
						image = str(search_all[i]['image']),
						link = str(search_all[i]['link']),
						date =  str(search_all[i]['date'])
					))
				else:
					search.append(dict(
						name = str(search_all[i]['name']),
						price = str(search_all[i]['price']),
						image = str(search_all[i]['image']),
						vendor = str(search_all[i]['vendor']),
						link = str(search_all[i]['link']),
					))
				
			
	data = {
		'page':page,
		'page_range':page_range,
		'from_first': from_first,
		'to_last': to_last,
		'show_pagination': show_pagination,

		'search': search,
		'ERROR': ERROR,
		'q':q
	}
	return render(request, 'page/search.html', data)

def services(request):
	return render(request, 'page/services.html')