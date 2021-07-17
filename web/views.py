from django.shortcuts import render, redirect
from django.http import HttpResponseRedirect
from .models import *


def index(request):
	return render(request, 'page/index.html') 

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



	Product = DB_product_category.objects.filter(Category__in = category)
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

	data = {
		'Product':Product,
		'category_id':category_id,
		'id':id
	}
	return render(request, 'page/product.html',data) 


def redirect_to_catalog(request, category_id):
	return HttpResponseRedirect("/catalog")