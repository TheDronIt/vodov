from django.shortcuts import render, redirect
from django.http import HttpResponseRedirect
from .models import *


def index(request):
	return render(request, 'page/index.html') 

def catalog(request):

	category = [191, 192, 193]
	print(category)
	if request.method == "GET":
		if 'category' in request.GET:
			category = str(request.GET['category'])	
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
			else:
				category = [int(category)]
	'''
	Product = Household_filters.objects.filter(Category=category)
	'''
	Product = Household_filters.objects.filter(Category__in = category)
	data = {
		'Product': Product
	}
	print(Product)
	return render(request, 'page/catalog.html', data)