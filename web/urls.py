from django.urls import include, path
from django.views.generic.base import TemplateView
from . import views

urlpatterns = [
    path('', views.index, name='home'),
    path('catalog', views.catalog),
    path('product', views.redirect_to_catalog),
    path('product/<int:category_id>', views.redirect_to_catalog),
    path('product/<int:category_id>/<int:id>', views.product),
    path('robots.txt', TemplateView.as_view(template_name="robots.txt", content_type="text/plain"))
    ]