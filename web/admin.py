from django.contrib import admin
from .models import *
from django import forms
from ckeditor_uploader.widgets import CKEditorUploadingWidget



class Household_filtersAdminForm(forms.ModelForm):
    About = forms.CharField(widget=CKEditorUploadingWidget())
    class Meta:
        model = Household_filters
        fields = '__all__'

class Household_filtersAdmin(admin.ModelAdmin):
    form = Household_filtersAdminForm 


class Optional_equipmentAdminForm(forms.ModelForm):
    About = forms.CharField(widget=CKEditorUploadingWidget())
    class Meta:
        model = Optional_equipment
        fields = '__all__'

class Optional_equipmentAdmin(admin.ModelAdmin):
    form = Optional_equipmentAdminForm  


class ComponentsAdminForm(forms.ModelForm):
    About = forms.CharField(widget=CKEditorUploadingWidget())
    class Meta:
        model = Components
        fields = '__all__'

class ComponentsAdmin(admin.ModelAdmin):
    form = ComponentsAdminForm  


class KitsAdminForm(forms.ModelForm):
    About = forms.CharField(widget=CKEditorUploadingWidget())
    class Meta:
        model = Kits
        fields = '__all__'

class KitsAdmin(admin.ModelAdmin):
    form = KitsAdminForm  


class Osmosis_and_UltrafiltrationAdminForm(forms.ModelForm):
    About = forms.CharField(widget=CKEditorUploadingWidget())
    class Meta:
        model = Osmosis_and_Ultrafiltration
        fields = '__all__'

class Osmosis_and_UltrafiltrationAdmin(admin.ModelAdmin):
    form = Osmosis_and_UltrafiltrationAdminForm 


class Ultraviolet_sterilizersAdminForm(forms.ModelForm):
    About = forms.CharField(widget=CKEditorUploadingWidget())
    class Meta:
        model = Ultraviolet_sterilizers
        fields = '__all__'

class Ultraviolet_sterilizersAdmin(admin.ModelAdmin):
    form = Ultraviolet_sterilizersAdminForm 


class Filter_materialsAdminForm(forms.ModelForm):
    About = forms.CharField(widget=CKEditorUploadingWidget())
    class Meta:
        model = Filter_materials
        fields = '__all__'

class Filter_materialsAdmin(admin.ModelAdmin):
    form = Filter_materialsAdminForm


class Coarse_filtersAdminForm(forms.ModelForm):
    About = forms.CharField(widget=CKEditorUploadingWidget())
    class Meta:
        model = Coarse_filters
        fields = '__all__'

class Coarse_filtersAdmin(admin.ModelAdmin):
    form = Coarse_filtersAdminForm   


class OrderAdmin(admin.ModelAdmin):
    search_fields = ("Code__startswith","FIO__startswith","Phone__startswith")

admin.site.register(Household_filters, Household_filtersAdmin)
admin.site.register(Optional_equipment, Optional_equipmentAdmin)
admin.site.register(Components, ComponentsAdmin)
admin.site.register(Kits, KitsAdmin)
admin.site.register(Osmosis_and_Ultrafiltration, Osmosis_and_UltrafiltrationAdmin)
admin.site.register(Ultraviolet_sterilizers, Ultraviolet_sterilizersAdmin)
admin.site.register(Filter_materials, Filter_materialsAdmin)
admin.site.register(Coarse_filters, Coarse_filtersAdmin)
admin.site.register(Basket)
admin.site.register(Order, OrderAdmin)
admin.site.register(Solutions)


