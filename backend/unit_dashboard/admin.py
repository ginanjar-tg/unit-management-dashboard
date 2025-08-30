from django.contrib import admin
from .models import Unit


@admin.register(Unit)
class UnitAdmin(admin.ModelAdmin):
    list_display = ['name', 'type', 'status', 'lastUpdated']
    list_filter = ['type', 'status']
    search_fields = ['name']
    readonly_fields = ['lastUpdated']
    list_editable = ['status']
